import '../../utils/story-common-base'
import DynamicForm from '../../../packages/dynamic-form'
import DnFormRadioGroup from '../../../packages/dynamic-form/src/InputControlComponent/DnFormRadioGroup.vue'
import { action } from '@storybook/addon-actions'
import { argTypes } from './storyCommon'

export default {
  title: '组件库/DynamicForm/RadioGroup',
  component: DynamicForm,
  argTypes
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DynamicForm, DnFormRadioGroup },
  methods: {
    formValueChange1: action('formValurChange')
  },
  template: `
      <DynamicForm @formValueChange="formValueChange1" v-bind="$props" >
      </DynamicForm>
    `
})

export const mainRadioGroup = Template.bind({})
mainRadioGroup.args = {
  formDefinition: [
    {
      prop: 'system',
      componentName: 'RadioGroup',
      inputControlProps: {
        size: 'large'
      },
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
  value: {
    system: 'Apple'
  }
}
mainRadioGroup.storyName = '基础用法'

export const radioGroupWithSlot = Template.bind({})
radioGroupWithSlot.args = {
  formDefinition: [
    {
      prop: 'system',
      componentName: 'RadioGroup',
      inputControlProps: {
        size: 'large'
      },
      options: [
        {
          label: 'Apple',
          value: 'apple',
          slotRender: (h, option) => {
            return h('span', {}, [
              h('span', {}, option.label),
              h('span', {
                style: {
                  float: 'right',
                  margin: '0 10px',
                  color: '#ccc'
                }
              }, option.value)
            ])
          }
        },
        {
          label: 'Android',
          value: 'android',
          slotRender: (h, option) => {
            return h('span', {}, [
              h('span', {}, option.label),
              h('span', {
                style: {
                  float: 'right',
                  margin: '0 10px',
                  color: '#ccc'
                }
              }, option.value)
            ])
          }
        },
        {
          label: 'Windows',
          value: 'windows',
          slotRender: (h, option) => {
            return h('span', {}, [
              h('span', {}, option.label),
              h('span', {
                style: {
                  float: 'right',
                  margin: '0 10px',
                  color: '#ccc'
                }
              }, option.value)
            ])
          }
        }
      ]
    }
  ],
  value: {
    system: 'Apple'
  }
}
radioGroupWithSlot.storyName = '自定义模板'
