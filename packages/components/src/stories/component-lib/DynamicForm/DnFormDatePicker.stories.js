import '../../utils/story-common-base'
import DynamicForm from '../../../packages/dynamic-form'
import DnFormDatePicker from '../../../packages/dynamic-form/src/InputControlComponent/DnFormDatePicker.vue'
import { action } from '@storybook/addon-actions'
import { argTypes } from './storyCommon'

export default {
  title: '组件库/DynamicForm/DatePicker',
  component: DynamicForm,
  argTypes
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DynamicForm, DnFormDatePicker },
  methods: {
    formValueChange1: action('formValueChange')
  },
  template: `
          <DynamicForm @formValueChange="formValueChange1" v-bind="$props" >
          </DynamicForm>
      `
})

export const mainDatePicker = Template.bind({})
mainDatePicker.args = {
  formDefinition: [
    {
      placeholder: '选择日期',
      prop: 'time',
      componentName: 'DatePicker'
    }
  ],
  formProps: {
    inline: true
  },
  value: {
    name: ''
  }
}
mainDatePicker.storyName = '基础使用'

export const rangeDatePicker = Template.bind({})
rangeDatePicker.args = {
  formDefinition: [
    {
      placeholder: '选择日期',
      prop: 'time',
      componentName: 'DatePicker',
      inputControlProps: {
        type: 'daterange'
      }
    }
  ],
  formProps: {
    inline: true
  },
  value: {
    name: ''
  }
}
rangeDatePicker.storyName = 'daterange'

export const datePickerWithTimer = Template.bind({})
datePickerWithTimer.args = {
  formDefinition: [
    {
      placeholder: '选择日期',
      prop: 'time',
      componentName: 'DatePicker',
      inputControlProps: {
        type: 'datetimerange'
      }
    }
  ],
  formProps: {
    inline: true
  },
  value: {
    name: ''
  }
}
datePickerWithTimer.storyName = 'datetimerange'
