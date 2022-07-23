import { Radio } from 'iview'
import { tableSelectTypeEnum } from './tableSelectMixin'

// 生成使用模式需要的配置option
// 统一单、多选使用模式对外的接口
// 无论单、多选，选中触发改变后都触发onSelectionChange事件
function tableSelectUsage (vueInstance) {
  const readyOptions = {
    props: {},
    on: {}
  }
  if (vueInstance.tableSelect === tableSelectTypeEnum.MULTIPLE) {
    readyOptions.props.columns = (vueInstance.columns.find(c => c?.type === 'selection')
      ? []
      : [{
          type: 'selection',
          width: 60,
          align: 'center'
        }]).concat(vueInstance.columns)
    readyOptions.on['on-selection-change'] = (selection) => {
      vueInstance.$emit('onSelectionChange', selection)
      vueInstance.selectionState.selected = selection
    }
  }
  if (vueInstance.tableSelect === tableSelectTypeEnum.SINGLE) {
    readyOptions.props.highlightRow = true
    readyOptions.on['on-current-change'] = (curRow, oldCurRow) => {
      if (curRow !== oldCurRow) {
        vueInstance.$emit('onSelectionChange', [curRow])
        vueInstance.selectionState.selected = [curRow]
      }
    }
    readyOptions.props.columns = [{
      key: 'api-table-radio-checked-hint',
      width: 60,
      align: 'center',
      render (h, { row }) {
        return <span class="api-table-radio-dot">
          <Radio class="radio-checked" value={true} />
          <Radio class="radio-not-checked" value={false} />
        </span>
      }
    }].concat(vueInstance.columns)
  }
  return readyOptions
}
export default tableSelectUsage
