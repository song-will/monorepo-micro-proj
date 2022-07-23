<script>
export default {
  name: 'DetailExtendForm',
  props: {
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editable: {
      type: Boolean,
      default: true
    },
    addible: {
      type: Boolean,
      default: false
    },
    options: {
      type: [Array, Function],
      default: () => {
        return []
      }
    },
    labelWidth: {
      type: [Number, String],
      default: null
    },
    pattern: {
      type: String,
      default: 'Modal'
    },
    editSubmitMethod: {
      type: Function,
      default: () => {}
    },
    addSubmitMethod: {
      type: Function,
      default: () => {}
    },
    addOptionsConfig: {
      type: Array,
      default: () => {
        return []
      }
    },
    editOptionsConfig: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    paramsOptions () {
      if (typeof this.options === 'function') {
        return this.options()
      } else {
        return this.options
      }
    }
  },
  data () {
    return {
      visible: false,
      submitMethodType: '',
      computedAutoWidth: 80
    }
  },
  methods: {
    handleOpenEditForm () {
      this.visible = true
      this.submitMethodType = 'editSubmitMethod'
    },
    handleOpenAddForm () {
      this.visible = true
      this.submitMethodType = 'addSubmitMethod'
    },
    getLabelWidth (msg) {
      this.computedAutoWidth = msg
    },
    handleDetailQuery () {
      this.$refs.extendDetail?.handleDetailQuery()
    }
  },
  render () {
    let addOptions = this.paramsOptions
    let editOptions = this.paramsOptions
    if (this.addOptionsConfig?.length > 0 || this.editOptionsConfig?.length > 0) {
      const optionsObject = {}
      this.paramsOptions.forEach(item => {
        if (item.key) {
          optionsObject[item.key] = item
        }
      })
      if (this.addOptionsConfig?.length > 0) {
        addOptions = this.addOptionsConfig.reduce((pre, cur) => {
          return [...pre, optionsObject[cur]]
        }, [])
      }
      if (this.editOptionsConfig?.length > 0) {
        editOptions = this.editOptionsConfig.reduce((pre, cur) => {
          return [...pre, optionsObject[cur]]
        }, [])
      }
    }
    const params = {
      ...this.$props,
      ...this.$attrs,
      visible: this.visible,
      submitMethodType: this.submitMethodType,
      options: this.paramsOptions
    }
    const extendDetailData = {
      ref: 'extendDetail',
      attrs: params,
      on: {
        clickEditButton: this.handleOpenEditForm,
        clickAddButton: this.handleOpenAddForm,
        getLabelWidth: this.getLabelWidth,
        ...this.$listeners
      },
      class: {
        hidden: this.pattern === 'Cover' && this.visible === true
      },
      scopedSlots: this.$scopedSlots
    }
    const extendFormData = {
      ref: 'extendForm',
      attrs: {
        ...params,
        ...{
          initData: this.submitMethodType === 'addSubmitMethod' ? this.initData : this.$refs.extendDetail?.detailData,
          submitMethod: this[this.submitMethodType],
          options: this.submitMethodType === 'addSubmitMethod' ? addOptions : editOptions,
          labelWidth: this.computedAutoWidth
        }
      },
      on: {
        'update:visible': val => { this.visible = val },
        handleAfterSubmitSuccess: () => this.handleDetailQuery(),
        ...this.$listeners
      },
      class: {
        hidden: this.pattern === 'Cover' && this.visible === false
      },
      scopedSlots: this.$scopedSlots
    }
    const extendDetail = (<ExtendDetail { ...extendDetailData }/>)
    const extendForm = (<ExtendForm { ...extendFormData }/>)
    return (<div>{ extendDetail }{ (this.editable || this.addible) ? extendForm : '' }</div>)
  }
}
</script>