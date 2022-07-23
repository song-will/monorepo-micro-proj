import '../../utils/story-common-base'
import DynamicForm from '../../../packages/dynamic-form'
import DnFormInput from '../../../packages/dynamic-form/src/InputControlComponent/DnFormInput.vue'
import { action } from '@storybook/addon-actions'
// import { InputControlMixin } from '@/components/DynamicForm/InputControlComponent/common'
import { argTypes } from './storyCommon'

export default {
  title: '组件库/DynamicForm/Input',
  component: DynamicForm,
  argTypes
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DynamicForm, DnFormInput },
  methods: {
    formValueChange1: action('formValueChange')
  },
  template: `
        <DynamicForm @formValueChange="formValueChange1" v-bind="$props" >
        </DynamicForm>
    `
})

export const mainInput = Template.bind({})
mainInput.args = {
  formDefinition: [
    {
      placeholder: '请输入姓名',
      prop: 'name',
      inputControlProps: {
        size: 'large'
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
mainInput.storyName = '基础用法'

export const withDefaultValueInput = Template.bind({})
withDefaultValueInput.args = {
  formDefinition: [
    {
      placeholder: '请输入姓名',
      prop: 'name'
    }
  ],
  formProps: {
    inline: true
  },
  value: {
    name: 'zhangsan'
  }
}
withDefaultValueInput.storyName = '带有初始值的输入框'

export const withIconInput = Template.bind({})
withIconInput.args = {
  formDefinition: [
    {
      placeholder: '请输入姓名',
      prop: 'name',
      inputControlProps: {
        icon: 'ios-clock-outline'
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
withIconInput.storyName = '带有Icon的输入框'

export const disabledInput = Template.bind({})
disabledInput.args = {
  formDefinition: [
    {
      placeholder: '请输入姓名',
      prop: 'name',
      inputControlProps: {
        disabled: true
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
disabledInput.storyName = '禁用状态输入框'

export const clearableInput = Template.bind({})
clearableInput.args = {
  formDefinition: [
    {
      placeholder: '请输入姓名',
      prop: 'name',
      inputControlProps: {
        clearable: true
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
clearableInput.storyName = '可清空输入框'

export const textareaInput = Template.bind({})
textareaInput.args = {
  formDefinition: [
    {
      placeholder: '请输入姓名',
      prop: 'name',
      type: 'texterea',
      inputControlProps: {
        type: 'textarea',
        rows: 4
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
textareaInput.storyName = '文本输入框'
