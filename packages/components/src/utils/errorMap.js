import { Message } from 'iview'

// 通用错误要定义在这里
export const SYS_ERR = {
  SERVICE_ERROR: 'SERVICE_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  COMMON_ERROR: 'COMMON_ERROR',
  RESOURCE_PERMISSION_DENIED: 'RESOURCE_PERMISSION_DENIED',
  DATA_PERMISSION_DENIED: 'DATA_PERMISSION_DENIED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  NO_DATA_ACCESS: 'NO_DATA_ACCESS',
  NOT_FOUND: 'NOT_FOUND'
}

/**
 * @param {String} errorResponse  错误信息
 * @param {Object} errorMap 错误codeMap
 * @param {Object} options 弹窗配置 {type: 弹窗类型}
 * @returns
 */
export const handleMapErrorInfo = (errorResponse, errorMap, options = {}) => {
  if (
    errorResponse.status === 502 ||
    errorResponse.status === 403 ||
    errorResponse.status === 401
  ) {
    return
  }
  errorMap = errorMap || {}
  const type = options.type || 'error'
  let errorCode = errorResponse.data.errorCode
  let defaultErrorMsg =
    (errorResponse.data && errorResponse.data.message) ||
    '未知错误类型,请联系后端人员!'
  if (errorResponse.request.responseType === 'blob') {
    const reader = new FileReader()
    let data = errorResponse.data
    reader.readAsText(data)
    reader.onload = function () {
      let data = JSON.parse(reader.result)
      if (data && data.message) {
        Message[type]({content: data && data.message, ...options})
      } else {
        Message[type]({content: defaultErrorMsg, ...options})
      }
    }
    return
  }
  if (errorMap[errorCode]) {
    // 处理业务错误
    Message[type]({content: errorMap[errorCode], ...options})
  } else if (!SYS_ERR[errorCode]) {
    // 处理未匹配到的错误(非系统 AND 未定义的错误)
    Message[type]({content: defaultErrorMsg, ...options})
  }
}

// 处理通用错误
const errorTranslate = errorMessage => {
  let errorCode = (errorMessage.data && errorMessage.data.errorCode) || null
  let message = (function map () {
    switch (errorCode) {
      // 系统错误
      case SYS_ERR.SERVICE_ERROR:
        return '系统内部错误，请重试'
      case SYS_ERR.COMMON_ERROR:
        return '系统内部错误，请重试'
      case SYS_ERR.INTERNAL_SERVER_ERROR:
        return '系统内部错误，请重试'
      case SYS_ERR.RESOURCE_PERMISSION_DENIED:
        return '您没有访问这个接口的权限，如需访问，请在BOSS系统申请权限。'
      case SYS_ERR.DATA_PERMISSION_DENIED:
        return '没有查看数据的权限'
      case SYS_ERR.NO_DATA_ACCESS:
        return '没有查看数据的权限,请联系管理员添加数据权限'
      case SYS_ERR.INVALID_TOKEN:
        return '请重新登录'
      case SYS_ERR.NOT_FOUND:
        return '没有数据'
      default:
        return ''
    }
  })()
  if (message) {
    Message.error(message)
  }
}

export default errorTranslate
