import '../../utils/story-common-base'
import DynamicForm from '../../../packages/dynamic-form'
import DnFormRadio from '../../../packages/dynamic-form/src/InputControlComponent/DnFormRadio.vue'
import { action } from '@storybook/addon-actions'
import { argTypes } from './storyCommon'

export default {
  title: '组件库/DynamicForm/Radio',
  component: DynamicForm,
  argTypes
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DynamicForm, DnFormRadio },
  methods: {
    formValueChange1: action('formValurChange')
  },
  template: `
    <DynamicForm @formValueChange="formValueChange1" v-bind="$props" >
    </DynamicForm>
  `
})

export const mainRadio = Template.bind({})
mainRadio.args = {
  formDefinition: [
    {
      prop: 'agree',
      componentName: 'Radio',
      inputControlProps: {
        size: 'large',
        label: '同意'
      }
    }
  ],
  formProps: {
    // inline: true
  },
  value: {
    agree: false
  }
}
mainRadio.storyName = '基础用法'
