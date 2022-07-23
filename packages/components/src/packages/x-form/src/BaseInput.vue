<template>
  <component
    v-bind="$attrs"
    :is="inputType"
    v-model="inputValue"
    :style="defaultStyle"
    :clearable="clearable"
    :placeholder="$attrs.placeholder || autoPlaceholder(inputType)"
    v-on="$listeners"
    @input="(val) => $emit('changeValue', val)"
  >
    <component
      :is="getChildrenType"
      v-for="item in formatOptions"
      :key="item.value"
      :value="item.value"
      :label="inputType === 'Select' ? item.label : item.value"
    >
      {{ item.label }}
    </component>
  </component>
</template>
<script>
export default {
  name: "BaseInput",
  model: {
    prop: "value",
    event: "changeValue",
  },
  props: {
    value: {
      type: [String, Array, Number, Date, Boolean],
      default: null,
    },
    inputWidth: {
      type: [String, Number],
      default: "",
    },
    inputType: {
      type: String,
      default: "Input",
    },
    childrenOptions: {
      type: [Array, Object, Function],
      default: () => [],
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputValue: undefined,
    };
  },
  computed: {
    getChildrenType() {
      const typeMap = {
        RadioGroup: "Radio",
        Select: "Option",
        CheckboxGroup: "Checkbox",
      };
      return typeMap[this.inputType] || "";
    },
    defaultStyle() {
      let width = this.inputWidth + "";
      let inputList = ["Input", "Select", "DatePicker", "Cascader"];
      if (inputList.includes(this.inputType)) {
        if (width) {
          let inputWidth = width.includes("px") ? width : width + "px";
          return {
            width: inputWidth,
          };
        } else {
          return {
            width: "100%",
          };
        }
      }
      return "";
    },
    formatOptions() {
      if (typeof this.childrenOptions === "function") {
        return this.formatOption(this.childrenOptions());
      } else {
        return this.formatOption(this.childrenOptions);
      }
    },
  },
  watch: {
    value: {
      handler (val) {
        this.inputValue = val;
      },
      immediate: true
    }
  },
  methods: {
    autoPlaceholder(inputType) {
      if (inputType.toLowerCase() === "input") {
        return "请输入";
      } else {
        return "请选择";
      }
    },
    formatOption(options) {
      if (Array.isArray(options)) {
        return options;
      } else {
        const arr = [];
        for (const i in options) {
          const obj = {
            label: options[i],
            value: i,
          };
          arr.push(obj);
        }
        return arr;
      }
    },
  },
};
</script>
