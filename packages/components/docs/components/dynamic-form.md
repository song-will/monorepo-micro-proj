
# DynamicForm

::: tip
这里描述组件的简介
:::

### 基础用法
::: demo
插入示例code
```html
<template>
  <dynamic-form
    v-model="formData"
    :form-definition="formDefinition"
    :form-props="{
      labelWidth: 80
    }"
  />
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      formDefinition: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'gender',
          componentName: 'Select',
          options: [
            {
              value: 'male',
              label: '男'
            },
            {
              value: 'female',
              label: '女'
            }
          ]
        }
      ]
    }
  }
}
</script>
```
::: 



### Attributes

支持下列属性：

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |

