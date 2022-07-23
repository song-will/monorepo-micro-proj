
export const tableSelectTypeEnum = {
  MULTIPLE: 'multiple',
  SINGLE: 'single'
}

export default {
  props: {
    // 表格选择使用模式
    // single、multiple，单多选
    tableSelect: {
      type: String,
      default: () => '',
      validator: (val) => {
        return ['', tableSelectTypeEnum.SINGLE, tableSelectTypeEnum.MULTIPLE].includes(val)
      }
    }
  },
  data () {
    return {
      selectionState: {
        selected: []
      }
    }
  }
}
