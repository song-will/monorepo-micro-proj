import { getObjPropByPath } from '../utils'
import DnFormItemWrapper from './DnFormItemWrapper.vue'

export const InputControlMixin = {
  props: {
    definition: {
      type: Object,
      required: true
    }
  },
  components: {
    OptionSlotRender: {
      name: 'OptionSlotRender',
      props: {
        renderCall: {
          type: Function,
          required: true
        },
        rawOptionData: {
          type: [Object, Array, String, Number, Symbol],
          required: true
        }
      },
      render (h) {
        return this.renderCall(h, this.rawOptionData)
      }
    }
  },
  inject: ['getFormValue', 'setFiledValue'],
  data () {
    return {
      innerOptionsState: [],
      loading: false
    }
  },
  watch: {
    // 用于关联了数据触发重新请求选项数据
    'definition.recomputeInnerOptionTriggger': {
      handler (val, oldVal) {
        if (val !== oldVal) {
          this.computeInnerOptionsState()
        }
      },
      deep: true
    },
    'definition.options': {
      handler (val, oldVal) {
        if (val) {
          this.computeInnerOptionsState()
        }
      }
    }
  },
  computed: {
    fieldVal () {
      return getObjPropByPath(this.formValue, this.definition.prop)
    },
    formValue () {
      return this.getFormValue()
    },
    /**
     * 用来抽出某些prop和attr混淆的用法，比如placeholder，在select中，其实是作为attr使用的
     * @returns Object
     */
    extractedInputProps () {
      const { placeholder } = this.definition
      return {
        placeholder
      }
    },
    remoteMethod () {
      if (this.definition.remote && this.definition.remoteMethod) {
        return (() => {
          let timeup = true
          let timmer = null
          const timeCount = (query = () => {}) => {
            timeup = false
            timmer = setTimeout(() => {
              timeup = true
              query()
            }, this.definition.remoteDelay || 600)
          }
          return (...params) => {
            if (timmer) {
              clearTimeout(timmer)
              timmer = null
            }
            timeCount(() => {
              if (timeup) {
                timeup = false
                this.loading = true
                this.definition.remoteMethod(...params).then(res => {
                  this.innerOptionsState = res
                }).finally(_ => {
                  this.loading = false
                })
              }
            })
          }
        })()
      }
      return undefined
    }
  },
  beforeMount () {
    this.setValToFormField(this.fieldVal)
  },
  mounted () {
    this.computeInnerOptionsState()
  },
  methods: {
    setValToFormField (value) {
      this.definition.onValueChange?.(value, this.fieldVal)
      this.setFiledValue(this.definition.prop, value)
    },
    renderCommon (h, childrenVNode) {
      return h(DnFormItemWrapper, {
        props: {
          definition: this.definition
        }
      }, childrenVNode)
    },
    computeInnerOptionsState () {
      // 直接给出option
      if (Array.isArray(this.definition.options)) {
        this.innerOptionsState = this.definition.options
      }
      // 远程搜索option
      if (this.definition.remote && this.definition.remoteMethod) {
        this.remoteMethod?.()?.()
      }
      // 一次性远程获取option
      if (this.definition.remoteOnece && this.definition.remoteMethod) {
        this.definition.remoteMethod().then(options => {
          this.innerOptionsState = options
        })
      }
    }
  }
}
