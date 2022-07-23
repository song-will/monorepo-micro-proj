
// 与iview验证prop paht语法一样
export const getObjPropByPath = (obj, path) => {
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')

  return keyArr.reduce((pre, cur, idx, originArr) => {
    const curKey = /^\[\d+\]$/.test(cur) ? cur.replace(/\[(\w+)\]/g, '$1') : cur
    return pre?.[curKey]
  }, obj)
}

// 向对象设置一个值，语法和iview验证prop paht语法一样
export const setObjPropByPath = (obj, path, val) => {
  path = path.replace(/\[(\w+)\]/g, '.[$1]')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')

  const settledVal = keyArr.reduce((pre, cur, idx, originArr) => {
    const curKey = /^\[\d+\]$/.test(cur) ? cur.replace(/\[(\w+)\]/g, '$1') : cur
    if (originArr.length - 1 === idx) {
      pre[curKey] = val
    } else {
      if (!pre[curKey]) {
        pre[curKey] = {}
        // 下一个访问是否为数组
        if (/^\[\d+\]$/.test(originArr[idx + 1])) {
          pre[curKey] = []
        }
      }
    }

    return pre[curKey]
  }, obj)

  return {
    o: obj,
    v: settledVal
  }
}
