import '../../utils/story-common-base'
import DynamicForm from '../../../packages/dynamic-form'
import DnFormCheckbox from '../../../packages/dynamic-form/src/InputControlComponent/DnFormCheckbox.vue'
import { action } from '@storybook/addon-actions'
import { argTypes } from './storyCommon'

export default {
  title: '组件库/DynamicForm/Checkbox',
  component: DynamicForm,
  argTypes
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DynamicForm, DnFormCheckbox },
  methods: {
    formValueChange1: action('formValurChange')
  },
  template: `
      <DynamicForm @formValueChange="formValueChange1" v-bind="$props" >
      </DynamicForm>
    `
})

export const mainCheckbox = Template.bind({})
mainCheckbox.args = {
  formDefinition: [
    {
      prop: 'agree',
      componentName: 'Checkbox',
      label: '同意',
      inputControlProps: {
        size: 'large'
        // value: '同意'
      }
    }
  ],
  value: {
    agree: false
  }
}
mainCheckbox.storyName = '基础用法'
