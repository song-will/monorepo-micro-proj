export const argTypes = {
  formProps: {
    description: '内部iview Form组件的prop，详细查阅：http://v3.iviewui.com/components/form#Form_props',
    table: {
      type: {
        summary: 'Object'
      }
    }
  },
  createFormOptions: {
    description: 'createElement创建iview Form组件时的第二个参数，详细查阅：https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象',
    table: {
      type: {
        summary: 'Object'
      }
    }
  },
  'formDefinition.placeholder': {
    description: '占位文本',
    table: {
      category: 'formDefinition',
      type: {
        summary: 'string'
      }
    }
  },
  'formDefinition.prop': {
    description: '对应定义控件的值要影响到的value下的字段名，比如prop为name，DynamicForm下\'v-model\'绑定的是value，那绑定的字段就是value.name',
    table: {
      category: 'formDefinition',
      type: {
        summary: 'string'
      }
    }
  },
  'formDefinition.label': {
    description: '对应的标签文本',
    table: {
      category: 'formDefinition',
      type: {
        summary: 'string'
      }
    }
  },
  'formDefinition.rules': {
    description: '表单验证规则，详细请查阅iview文档：http://v3.iviewui.com/components/form',
    table: {
      category: 'formDefinition',
      type: {
        summary: 'array'
      }
    }
  }
}
