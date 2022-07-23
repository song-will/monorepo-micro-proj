<template>
  <component
    :is="pattern === 'Cover' ? 'div': pattern"
    id="extendForm"
    :value="visible"
    :title="title"
    :width="formContainerWidth"
    v-on="{'on-visible-change': onVisibleChange}"
  >
    <div :slot="pattern === 'Modal' ? 'footer': null" :class="{ 'btns-container': (pattern !== 'Modal')}">
      <Button
        type="primary"
        style="margin-right:15px"
        :loading="submitLoading"
        @click="submitForm"
      >
        保存
      </Button>
      <slot name="formButtons" :formData="formData"/>
      <a
        style="margin-right: 15px;"
        @click="resetForm"
      >重置</a>
      <a
        @click="onVisibleChange(false)"
      >取消</a>
    </div>
    <slot name="formHeader" :formData="formData"/>
    <XForm
      ref="XForm"
      :form-data="formData"
      :form-options="options"
      :label-width="(formLabelPosition === 'top' || !formLabelPosition && labelPosition === 'top') ? null : labelWidth"
      :label-position="formLabelPosition || labelPosition"
      :rules="rules"
      :col-span="colSpan"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template
        v-for="(val, key) in $scopedSlots"
        :slot="key"
        slot-scope="scope"
      >
        <slot
          :name="key"
          :data="scope.data"
          :option="scope.option"
        />
      </template>
    </XForm>
    <slot name="formFooter" :formData="formData"/>
  </component>
</template>

<script>
import _ from 'lodash'
import { handleMapErrorInfo } from '../../../utils/errorMap'

export default {
  name: 'ExtendForm',
  props: {
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    options: {
      type: [Array, Function],
      default: () => {
        return []
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    pattern: {
      type: String,
      default: 'Modal'
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    formLabelPosition: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '新增/修改'
    },
    submitMethod: {
      type: Function,
      default: () => {}
    },
    formWidth: {
      type: String,
      default: ''
    },
    colSpan: {
      type: String,
      default: '24'
    }
  },
  data () {
    return {
      formData: {},
      submitLoading: false
    }
  },
  computed: {
    formContainerWidth () {
      if (this.formWidth) return this.formWidth
      if (this.pattern === 'Drawer') return '1000'
      else if (this.pattern === 'Modal') return '600'
      else return ''
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.resetForm()
      }
    }
  },
  mounted() {
    this.resetForm()
  },
  methods: {
    submitForm () {
      this.validate().then(valid => {
        if (!valid) return
        if (JSON.stringify(this.formData) === JSON.stringify(this.initData)) {
          this.$Message.warning('表单内容没有发生改变！')
          return
        }
        this.submitLoading = true
        if (this.submitMethod) {
          const params = _.cloneDeep(this.formData)
          this.submitMethod(params).then(res => {
            this.$Message.success('保存成功！')
            this.$emit('handleAfterSubmitSuccess')
            this.onVisibleChange(false)
            this.submitLoading = false
          }).catch((error) => {
            handleMapErrorInfo(error)
            this.submitLoading = false
          })
        }
      })
    },
    validate () {
      return this.$refs.XForm.validate()
    },
    onVisibleChange (val) {
      if (!val) {
        this.$emit('update:visible', val)
      }
    },
    resetForm () {
      this.$refs.XForm.resetFields()
      this.formData = _.cloneDeep(this.initData)
    }
  }
}
</script>
