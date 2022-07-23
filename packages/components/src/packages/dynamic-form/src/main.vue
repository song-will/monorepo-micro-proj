<script>
import { Form } from 'iview'
import { transDefinitionToVnode } from './transDefinition'
import { setObjPropByPath } from './utils'

export default {
  name: 'DynamicForm',
  provide () {
    return {
      getFormValue: () => this.value,
      setFiledValue: (prop, value) => this.updateFiledValue(prop, value)
    }
  },
  model: {
    prop: 'value',
    event: 'formValueChange'
  },
  props: {
    formDefinition: {
      type: [Array, Function],
      default: () => []
    },
    value: {
      type: Object,
      required: true
    },
    formProps: {
      type: Object,
      default: () => ({})
    },
    createFormOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      definitionForUse: []
    }
  },
  watch: {
    formDefinition: {
      async handler (val, oldVal) {
        if (Array.isArray(val)) {
          this.definitionForUse = val || []
        }
        if (val?.constructor === Function) {
          this.definitionForUse = await val(this.value)
        }
      },
      immediate: true
    }
  },
  methods: {
    updateFiledValue (prop, value) {
      setObjPropByPath(this.value, prop, value)
      this.$emit('formValueChange', { ...this.value })
    },
    validate (validCb = (valid) => {}) {
      return this.$refs.theForm.validate(validCb)
    },
    validateField (prop, cb) {
      this.$refs.theForm.validateField(prop, cb)
    },
    resetFields () {
      this.$refs.theForm.resetFields()
    },

    /**
     * retrive rules form the definition array
     *
     * @param {*[]} formDefinition
     * @return {*}
     */
    rulesRetriever (formDefinition = []) {
      return formDefinition.reduce((pre, definition) => {
        if (definition.rules) {
          return {
            ...pre,
            [definition.prop]: definition.rules
          }
        }
        return pre
      }, {})
    }
  },
  render (h) {
    const dnFormItems = this.definitionForUse.map(
      (definition) => transDefinitionToVnode(h, definition)
    )
    const rules = this.rulesRetriever(this.definitionForUse)
    const form = h(Form, {
      props: {
        model: this.value,
        rules: rules,
        ...this.formProps
      },
      ...this.createFormOptions,
      ref: 'theForm'
    }, dnFormItems)
    this.formInstance = form

    return h('div', [form])
  }
}
</script>
