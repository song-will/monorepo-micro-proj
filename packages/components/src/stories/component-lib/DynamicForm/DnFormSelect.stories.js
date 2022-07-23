import '../../utils/story-common-base'
import DynamicForm from '../../../packages/dynamic-form'
import DnFormSelect from '../../../packages/dynamic-form/src/InputControlComponent/DnFormSelect.vue'
import { action } from '@storybook/addon-actions'
import { argTypes } from './storyCommon'

export default {
  title: '组件库/DynamicForm/Select',
  component: DynamicForm,
  argTypes
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DynamicForm, DnFormSelect },
  methods: {
    formValueChange1: action('formValueChange')
  },
  template: `
          <DynamicForm @formValueChange="formValueChange1" v-bind="$props" >
          </DynamicForm>
      `
})

export const mainSelect = Template.bind({})
mainSelect.args = {
  formDefinition: [
    {
      placeholder: '请选择数据类型',
      prop: 'dataType',
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
    }
  ],
  formProps: {},
  value: {
    dataType: ''
  },
  createFormOptions: {
    style: {
      width: '200px'
    }
  }
}
mainSelect.storyName = '基础用法-本地option'

export const remoteOption = Template.bind({})
remoteOption.args = {
  formDefinition: [
    {
      placeholder: '指标对象',
      prop: 'dataType',
      componentName: 'Select',
      remote: true,
      filterable: true,
      remoteMethod: async (query) => {
        await setTimeout(() => {
          console.log('loading')
        }, 1000)
        return [
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
      }
    }
  ],
  formProps: {},
  value: {
    dataType: ''
  },
  createFormOptions: {
    style: {
      width: '200px'
    }
  }
}
remoteOption.storyName = '远程搜索option'

export const remoteOnceOption = Template.bind({})
remoteOnceOption.args = {
  formDefinition: [
    {
      placeholder: '指标对象',
      prop: 'dataType',
      componentName: 'Select',
      remoteOnece: true,
      filterable: true,
      remoteMethod: async (query) => {
        await setTimeout(() => {
          console.log('loading')
        }, 1000)
        return [
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
      }
    }
  ],
  formProps: {},
  value: {
    dataType: ''
  },
  createFormOptions: {
    style: {
      width: '200px'
    }
  }
}
remoteOnceOption.storyName = '远程option（一次性获取）'

export const withSlotOption = Template.bind({})
withSlotOption.args = {
  formDefinition: [
    {
      placeholder: '指标对象',
      prop: 'dataType',
      componentName: 'Select',
      remoteOnece: true,
      filterable: false,
      options: [
        {
          label: '苹果',
          value: 'apple',
          slotRender: (h, option) => {
            return h('span', {}, [
              h('span', {}, option.label),
              h('span', {
                style: {
                  float: 'right',
                  color: '#ccc'
                }
              }, option.value)
            ])
          }
        },
        {
          label: '安卓',
          value: 'android',
          slotRender: (h, option) => {
            return h('span', {}, [
              h('span', {}, option.label),
              h('span', {
                style: {
                  float: 'right',
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
                  color: '#ccc'
                }
              }, option.value)
            ])
          }
        }
      ]
    }
  ],
  formProps: {},
  value: {
    dataType: ''
  },
  createFormOptions: {
    style: {
      width: '200px'
    }
  }
}
withSlotOption.storyName = '自定义模板'
