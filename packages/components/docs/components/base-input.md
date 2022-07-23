
# BaseInput

::: tip
这是BaseInput组件
:::

### 基础用法
::: demo
```html
<template>
   <base-input
          id="add-baseType-name"
          v-model="addForm.input"
          type="input"
          placeholder="这是占位"
          :options="nameOption"
        />     
</template>
<script>
export default {
  data() {
    return {
        addForm: {
            input: ''
        },
        nameOption: []
    }
  }
}
</script>
```
:::

### 高级用法
::: demo
插入示例code
:::


### Attributes

支持下列属性：

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |

