import '../../utils/story-common-base'
import DynamicForm from '../../../packages/dynamic-form'
import { action } from '@storybook/addon-actions'
import { argTypes } from './storyCommon'

export default {
  title: '组件库/DynamicForm/Form',
  component: DynamicForm,
  argTypes
}

const Template = (args, { argTypes }) => ({
  props: Reflect.ownKeys(argTypes),
  components: { DynamicForm },
  mounted () {
    // console.log(this.$refs.form.validate)
  },
  methods: {
    formValueChange1: action('formValueChange'),
    reset () {
      this.$refs.form.resetFields()
    }
  },
  template: `
    <div>
      <DynamicForm @formValueChange="formValueChange1" ref="form" v-bind="$props" />
      <Button @click="reset">重置</Button>
    </div>
  `
})

export const mainForm = Template.bind({})
mainForm.args = {
  formDefinition: [
    {
      placeholder: '请输入姓名',
      prop: 'name',
      label: '姓名',
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
    },
    {
      placeholder: '请选择数据类型',
      prop: 'system1',
      label: '系统1',
      componentName: 'Select',
      options: [
        {
          label: '苹果',
          value: 'apple'
        },
        {
          label: '安卓',
          value: 'android'
        },
        {
          label: 'Windows',
          value: 'windows'
        }
      ]
    },
    {
      prop: 'system2',
      componentName: 'RadioGroup',
      inputControlProps: {
        size: 'large'
      },
      label: '系统2',
      options: [
        {
          label: 'Apple',
          value: 'apple'
        },
        {
          label: 'Android',
          value: 'android'
        },
        {
          label: 'Windows',
          value: 'windows'
        }
      ]
    },
    {
      prop: 'system3',
      componentName: 'CheckboxGroup',
      inputControlProps: {
        size: 'large'
      },
      label: '系统3',
      options: [
        {
          label: 'Apple',
          value: 'apple'
        },
        {
          label: 'Android',
          value: 'android'
        },
        {
          label: 'Windows',
          value: 'windows'
        }
      ]
    }
  ],
  formProps: {
    labelWidth: 60
  },
  value: {
    name: '',
    system1: '',
    system2: '',
    system3: []
  },
  createFormOptions: {
    style: {
      width: '300px'
    }
  }
  // rootFormRef: 'system'
}
mainForm.storyName = '基础用法-本地option'
