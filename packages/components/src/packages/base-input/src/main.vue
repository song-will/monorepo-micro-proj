<template class="baseInput">
  <Select
    v-if="elType==='select-option-group'"
    :id="elId"
    :filterable="filterable"
    :name="name"
    :value="inputValue"
    :disabled="elDisabled"
    :clearable="clearable"
    :multiple="multiple"
    :placeholder="elPlaceholder"
    :style="inputStyle"
    @on-change="changeInput"
  >
    <OptionGroup
      v-for="(subOptions, key) in elOptions"
      :key="key"
      :label="key"
    >
      <Option
        v-for="(val, k) in subOptions"
        :key="k"
        :value="key + '-'+ val"
        :name="val"
        :disabled="selectDisabled[key]"
      >
        {{ key + '-' +val }}
      </Option>
    </OptionGroup>
  </Select>
  <component
    :is="getInputType()"
    v-else
    v-model="value"
    v-bind="{name, format, type: elType, 'max-lenth': maxLenth, placeholder: elPlaceholder, filterable, clearable, disabled: elDisabled, style: inputStyle, options: elOptions, id: elId, transfer, multiple, 'remote-method': elRemoteMethod, remote}"
  >
    <div
      v-if="innerContent"
      style="display:inline"
      v-html="innerContent"
    />
    <template v-for="(val, key) in elOptions">
      <component
        :is="childrenTypeMap[getInputType()]"
        v-if="elOptions && childrenTypeMap[getInputType()]"
        :key="key"
        :value="key"
        :name="key"
        :label="getInputType() === 'CheckboxGroup' ? key : null"
        :disabled="selectDisabled[key]"
      >
        {{ val }}
      </component>
    </template>
  </component>
</template>
<script>

const childrenTypeMap = {
  Select: 'Option',
  CheckboxGroup: 'Checkbox',
  RadioGroup: 'Radio',
  autoComplete: 'Option',
  'select-option-group': 'Option'
}

export default {
  name: 'BaseInput',
  model: {
    event: 'value',
    prop: 'inputValue'
  },
  props: {
    inputValue: {
      type: [String, Array, Date, Number, Boolean],
      default: () => ''
    },
    type: {
      type: [String, Function],
      default: () => 'text'
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: [String, Function],
      default: () => ''
    },
    clearable: {
      type: Boolean,
      default: () => true
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    filterable: {
      type: Boolean,
      default: () => true
    },
    remoteMethod: {
      type: [Function],
      default: null
    },
    remote: {
      type: Boolean,
      default: () => false
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    options: {
      type: [Array, Object, Function],
      default: () => {
        return {}
      }
    },
    disabled: {
      type: [Boolean, Function],
      default: () => false
    },
    selectDisabled: {
      type: Object,
      default: () => ({})
    },
    inputStyle: {
      type: [String, Array, Object],
      default: () => 'width:100%'
    },
    id: {
      type: [String, Function],
      required: true
    },
    maxLenth: {
      type: Number,
      default: undefined
    },
    innerContent: {
      type: String,
      default: () => null
    },
    format: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      value: null,
      transfer: false,
      childrenTypeMap
    }
  },
  computed: {
    isDatePicker () {
      return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'].includes(this.elType)
    },
    isInput () {
      return ['input', 'text', 'password', 'textarea', 'url', 'email', 'number', 'tel'].includes(this.elType)
    },
    elOptions () {
      if (this.options instanceof Array) {
        return this.initOptionsObj(this.options)
      } else if (this.options instanceof Function) {
        const res = this.options()
        return res instanceof Array ? this.initOptionsObj(res) : res
      } else {
        return this.options
      }
    },
    elId () {
      return this.getPropValue(this.id)
    },
    elType () {
      let type = this.getPropValue(this.type)
      type = type && type.toLowerCase()
      return type === 'input' ? 'text' : type
    },
    elPlaceholder () {
      return this.getPropValue(this.placeholder)
    },
    elDisabled () {
      return this.getPropValue(this.disabled)
    },
    elRemoteMethod () {
      return this.getPropValue(this.remoteMethod)
    }
  },
  watch: {
    value (val) {
      this.changeInput(val)
    },
    inputValue (val) {
      this.filterInputValue(val)
    }
  },
  created () {
    if (this.elType === 'checkboxgroup') {
      this.value = []
    }
  },
  mounted () {
    if (this.isDatePicker || this.elType.toLowerCase() === 'select') {
      this.transfer = true
    }
    this.value = this.inputValue || this.value
  },
  methods: {
    changeInput (value) {
      const options = {
        value,
        selectDisabled: this.selectDisabled
      }
      this.$emit('value', value)
      this.$emit('on-change', options)
    },
    getInputType () {
      const type = this.getPropValue(this.type)
      if (this.isDatePicker) {
        return 'DatePicker'
      } else if (this.isInput) {
        return 'Input'
      } else if (type === 'select') {
        return 'Select'
      } else {
        return type
      }
    },
    getPropValue (value) {
      if (value instanceof Function) {
        return value()
      } else {
        return value
      }
    },
    initOptionsObj (val) {
      const res = {}
      val.forEach(v => {
        res[v] = v
      })
      return res
    },
    filterInputValue (val) {
      if (this.isDatePicker && val && (typeof val === 'string' || typeof val === 'number')) {
        this.value = new Date(val)
        return
      }
      this.value = val
    }
  }
}
</script>
