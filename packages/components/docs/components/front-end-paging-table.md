
# FrontEndPagingTable

::: tip
这里描述组件的简介
:::

### 基础用法
::: demo
```html
<template>
    <front-end-paging-table
      :loading="false"
      :data="detailData"
      :columns="actionRecordColumns"
    />
</template>

<script>
export default {
  data() {
    return {
      detailData: {
        list: [{
          applyTime: '2021-01-09',
          applyUserName: 'test',
          reviewTime: '2021-02-02',
          emailAddress: 'test@12323.com',
          reviewStatus: 1233,
          reviewComments: '备注备注'
        }
        ],
        total: 10
      },
      actionRecordColumns: [
        {
          title: '申请时间',
          key: 'applyTime',
        },
        {
          title: '申请人员',
          key: 'applyUserName'
        },
        {
          title: '审核时间',
          key: 'reviewTime',
        },
        {
          title: '审核人员',
          key: 'reviewer'
        },
        {
          title: '审核结果',
          key: 'reviewStatus',
        },
        {
          title: '备注',
          key: 'reviewComments'
        }
      ],
    };
  }
};
</script>

```
:::

### Attributes

支持下列属性：

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
