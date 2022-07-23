<template>
  <Form
    ref="form"
    :model="formValue"
    v-bind="$attrs"
    v-on="$listeners"
    :rules="formRules"
  >
    <Row :gutter="16" class="row-wrap">
      <slot name="preItem" />
      <template v-for="item in options">
        <Col v-if="item.key" :key="item.key" :span="item.colSpan || colSpan">
          <template v-if="item.formSlotName && $scopedSlots[item.formSlotName]">
            <slot :name="item.formSlotName" :data="formValue" :option="item" />
          </template>
          <template v-else>
            <FormItem
              :key="item.key"
              :prop="item.key"
              :label="item.itemLabel"
              :label-width="item.itemLabelWidth"
              v-bind="item.formItemOptions"
            >
              <template v-if="item.formRender">
                <Render
                  :render="item.formRender"
                  :form-data="formValue"
                  :option="item"
                />
              </template>
              <template v-else>
                <BaseInput
                  v-model="formValue[item.key]"
                  :inputWidth="inputWidth"
                  :form-value="formValue"
                  v-bind="getAttr(item)"
                  v-on="getListener(item)"
                  @on-change="setFormData"
                />
              </template>
            </FormItem>
          </template>
        </Col>
      </template>
      <slot />
    </Row>
  </Form>
</template>
<script>
import BaseInput from "./BaseInput.vue";
import _ from "lodash";
import Render from "./render";

export default {
  name: "XForm",
  components: {
    BaseInput,
    Render,
  },
  model: {
    prop: "formData",
    event: "formChange",
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    inputWidth: {
      type: [String, Number],
      default: "",
    },
    formOptions: {
      type: [Array, Function],
      default: () => [],
    },
    colSpan: {
      type: String,
      default: "24",
    },
  },
  data() {
    return {
      formValue: {},
      formRules: {}
    };
  },
  computed: {
    options() {
      if (typeof this.formOptions === "function") {
        return this.formOptions();
      } else {
        return this.formOptions;
      }
    },
  },
  watch: {
    formData: {
      handler (val) {
        this.formValue = val;
      },
      immediate: true
    },
    formOptions: {
      handler () {
        let rules=this.getFormRules()
        this.formRules={
          ...rules,
          ...this.rules
        }
      },
      immediate: true
    }
  },
  methods: {
    getFormRules() {
      let rules = {};
      let InputTypeList = ["Input", "InputNumber"];
      this.formOptions.forEach((item) => {
        const prefix = InputTypeList.includes(item.inputType)
          ? "请输入"
          : "请选择";
        let message = item.message || prefix + item.itemLabel;
        let trigger = InputTypeList.includes(item.inputType)
          ? "blur"
          : "change";
        if (item.required) {
          rules[item.key] = [{ required: true, message, trigger }];
        }
      });
      return rules;
    },
    setFormData() {
      this.$emit("formChange", this.formValue);
    },
    isListener(key) {
      //判断传入参数是否为事件
      const preStr = key.substring(0, 2);
      return preStr.toLowerCase() === "on";
    },
    formatListenerName(name) {
      const str = name.charAt(2);
      if (str === "-") {
        return name;
      } else {
        return "on-" + name.substring(2).toLowerCase();
      }
    },
    getAttr(item) {
      const attrs = {};
      for (const i in item) {
        if (typeof item[i] !== "function") {
          attrs[i] = item[i];
        } else {
          if (!this.isListener(i)) {
            attrs[i] = item[i];
          }
        }
      }
      delete attrs.itemLabel;
      delete attrs.itemLabelWidth;
      delete attrs.formItemOptions;
      delete attrs.key;
      delete attrs.required;
      delete attrs.message;
      return attrs;
    },
    getListener(item) {
      const listeners = {};
      for (const i in item) {
        if (typeof item[i] === "function") {
          if (this.isListener(i)) {
            listeners[this.formatListenerName(i)] = (...args) =>
              item[i].call(this, ...args, this.formValue);
          }
        }
      }
      return listeners;
    },
    validate() {
      return this.$refs.form.validate();
    },
    validateField(prop) {
      return this.$refs.form.validateField(prop);
    },
    resetFields() {
      this.$refs.form.resetFields();
      this.$emit("formChange", this.formValue);
    },
  },
};
</script>
