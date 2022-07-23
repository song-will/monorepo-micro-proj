
# ApiDataTable

::: tip
这里描述组件的简介
:::

### 基础用法
::: demo
插入示例code
```html
<template>
  <api-data-table
    :columns="tableColumnsDefs"
    :data-request="tableDataReq"
    :query-params="queryParams"
  />
</template>
<script>
export default {
  data() {
    return {
      queryParams: {},
      tableColumnsDefs: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        }
      ]
    }
  },
  methods: {
    tableDataReq () {
      return Promise.resolve({
        list: [
          {
            name: 'zhangsan',
            age: 19
          },
          {
            name: 'lisi',
            age: 20
          }
        ],
        total: 2
      })
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

