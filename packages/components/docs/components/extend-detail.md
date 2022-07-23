
# ExtendDetail

::: tip
这里描述组件的简介
:::

### 基础用法
::: demo
插入示例code

```html
<template>
  <extend-detail
    :options="options"
    :detail-query-method="detailQueryMethod"
    :editable="false"
  />
</template>
<script>
export default {
  name: 'ExtendDetailBase',
  data () {
    return {
      options: [
        {
          itemLabel: '姓名',
          key: 'name'
        },
        {
          itemLabel: '性别',
          key: 'sex',
          childrenOptions: {
            '01': '男',
            '02': '女'
          }
        },
        {
          itemLabel: '出生日期',
          key: 'birthday'
        },
        {
          itemLabel: '人生目标',
          key: 'flag',
          childrenOptions: {
            '01': '升职加薪',
            '02': '当上总经理',
            '03': '出任CEO',
            '04': '赢取白富美'
          }
        },
        {
          itemLabel: '公司',
          key: 'company',
          childrenOptions: {
            '01': '万合天宜',
          }
        },
        {
          itemLabel: '地址',
          colSpan: '12',
          key: 'province',
          childrenOptions: {
            '01': '上海',
            '02': '广东'
          }
        },
        {
          colSpan: '12',
          itemLabelWidth: 0,
          key: 'city',
          childrenOptions: {
            '01': '浦东',
            '02': '浦西'
          }
        },
        {
          itemLabel: '备注',
          key: 'memo'
        }
      ],
      res: {
        "name": "王大锤",
        "sex": "01",
        "age": 20,
        "birthday": "2000-01-01",
        "flag": ["01", "02"],
        "company": "01",
        "province": "01",
        "city": "01",
        "memo": "万万没想到啦啦啦啦啦"
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    }
  }
}
</script>
```
:::

### 功能按钮
::: demo
插入示例code

```html
<template>
  <extend-detail
    :options="options"
    :detail-query-method="detailQueryMethod"
    :addible="true"
    @clickEditButton="clickEditButton"
    @clickAddButton="clickAddButton"
  />
</template>
<script>
export default {
  name: 'ExtendDetail2',
  data () {
    return {
      options: [
        {
          itemLabel: '姓名',
          key: 'name'
        },
        {
          itemLabel: '性别',
          key: 'sex'
        },
        {
          itemLabel: '出生日期',
          key: 'birthday'
        }
      ],
      res: {
        "name": "王大锤",
        "sex": "男",
        "birthday": "2000-01-01"
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    clickEditButton () {
      this.$Message.success("点击了编辑按钮！")
    },
    clickAddButton () {
      this.$Message.success("点击了新增按钮！")
    }
  }
}
</script>
```
:::

### Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| options | item配置项，具体参数参见下文 | Array | - | [] |
| labelWidth | 配置所有item的label宽度，不传此参数时，详情页自适应，传auto时，详情页会自动计算统一适配的宽度 | Number,String | auto | null |
| labelPosition | 配置所有item的label位置 | String | left,right,top | 详情页（left）、表单页（right） |
| colSpan | 配置所有item的栅格布局 | String | 1-24 | 24 |
| editable | 是否显示编辑按钮 | Boolean | - | true |
| addible | 是否显示编辑按钮 | Boolean | - | false |
| detailVisible | 是否显示详情页 | BOOlearn | - | true |
| detailQueryMethod | 详情页信息的查询方法 | Function | - | - |

##### options item Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| key | item绑定的字段，使用formSlotName时必填 | String | - | — |
| itemLabel | item的label名 | String | - | - |
| itemLabelWidth | item的label宽度 | Number | - | - |
| labelRender | item的label的render函数 | Function(h, { option, detailData }) | - | - |
| detailRender | 详情页item内容的render函数 | Function(h, { option, detailData }) | - | - |
| labelPosition | 配置item的label位置 | String | left,right,top | 详情页（left）、表单页（right） |
| detailSlotName | item关联的插槽，显示在详情页中 | String | - |

### Methods

| 方法名          | 说明            | 参数            |
|-------------  |---------------- |---------------- |
| handleDetailQuery | 详情信息查询方法 | - |

### Event

| 事件名          | 说明            | 参数            |
|-------------  |---------------- |---------------- |
| clickEditButton | 点击编辑按钮触发 | - |
| clickAddButton | 点击新增按钮触发 | - |

### Scoped Slot

| name          | 说明            | 参数           |
|-------------  |---------------- | --------------- |
| detailButtons | 详情页按钮组插槽 | detailData |
| detailHeader | 详情页顶部插槽 | detailData |
| detailFooter | 详情页尾部插槽 | detailData |
| 其他 | 可通过options item 中的 detailSlotName 对 item位置插槽进行关联 | { detailData, option } |
