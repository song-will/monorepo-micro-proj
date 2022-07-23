
# ExtendForm

::: tip
这里描述组件的简介
:::

### 基础用法
::: demo
插入示例code
```html
<template>
  <div>
    <Button @click="openForm" type="primary">显示表单</Button>
    <extend-form
      ref="extendForm"
      :options="options"
      :initData="res"
      :rules="rules"
      :visible.sync="visible"
      :submitMethod="submitMethod"
      :labelWidth="80"
    />
  </div>
</template>
<script>
export default {
  name: 'ExtendDetail2',
  data () {
    return {
      visible: false,
      options: () => [
      {
        itemLabel: '姓名',
        key: 'name',
        inputType: 'Input'
      },
      {
        itemLabel: '性别',
        key: 'sex',
        inputType: 'RadioGroup',
        childrenOptions: {
          '01': '男',
          '02': '女'
        }
      },
      {
        itemLabel: '出生日期',
        key: 'birthday',
        inputType: 'DatePicker'
      },
      {
        itemLabel: '人生目标',
        key: 'flag',
        inputType: 'CheckboxGroup',
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
        inputType: 'Select',
        childrenOptions: {
          '01': '万合天宜',
        }
      },
      {
        itemLabel: '地址',
        colSpan: '12',
        key: 'province',
        inputType: 'Select',
        childrenOptions: {
          '01': '上海',
          '02': '广东'
        },
        'on-change': this.changeProvinve
      },
      {
        colSpan: '12',
        itemLabelWidth: 0,
        key: 'city',
        inputType: 'Select',
        childrenOptions: this.city,
        disabled: !this.$refs.extendForm?.formData.province
      },
      {
        itemLabel: '备注',
        key: 'memo',
        inputType: 'Input',
        type: 'textarea'
      }
    ],
      rules: {
        name: [
          { required: true, message: '姓名不能为空！', trigger: 'blur' }
        ]
      },
      city: {},
      citys: {
        '01': {
          '01': '浦东',
          '02': '浦西'
        },
        '02': {
          '01': '深圳',
          '02': '广州'
        }
      },
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
    openForm () {
      this.visible = true
      this.changeProvinve(this.res.province, {})
    },
    submitMethod (val) {
      return new Promise((resolve) => {
        this.res = val
        resolve()
      })
    },
    changeProvinve (val, obj) {
      if (obj.city) {
        obj.city = null
      }
      this.city = this.citys[val]
    }
  }
}
</script>
```
:::

### Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| visible | 控制表单的显示与隐藏 | Boolearn | - | false |
| options | item配置项，具体参数参见下文 | Array, Function（当内容中使用 this 时使用） | - | [] |
| pattern | 表单显示样式 | String | Modal, Drawer, Cover | Modal |
| title | 表单页title | String | - | '新增/修改' |
| labelWidth | 配置所有item的label宽度 | Number | - | 0 |
| formWidth | 配置表单页宽度 | String | - | Drawer、Modal模式下为1000 |
| labelPosition | 配置所有item的label位置 | String | left,right,top | 详情页（left）、表单页（right） |
| formLabelPosition |  配置表单页所有item的label位置 | String | left,right,top | - |
| rules | 表单页的表单验证配置 | Object | - | {} |
| colSpan | 配置所有item的栅格布局 | String | 1-24 | 24 |
| submitMethod | 表单页的保存方法 | Function(formData) | - | — |
| initData | 表单页初始数据 | Object | - | {} |

##### options item Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| key | item绑定的字段，使用formSlotName时必填 | String | - | — |
| itemLabel | item的label名 | String | - | - |
| itemLabelWidth | item的label宽度 | Number | - | - |
| formRender | 表单页item内容的render函数 | Function(h, { option, formData }) | - | - |
| inputType | item的表单控件名，对应iview组件类型，可传入Input,Select,DatePicker，等对应iview表单基础组件名称| String | - | Input |
| childrenOptions | item的options，用于含有子组件的表单组件配置，比如Select，RadioGroup，CheckboxGroup等  | Array, Object | - |
| type | 表单控件的type，含有type属性值的表单组件使用，等于传入组件的type属性值，比如DatePicker  | String | - | - |
| clearable | 是否显示清空按钮 | Boolearn | - | true |
| placeholder | 表单控件框内默认文字 | String | - | input（请输入）、其他（请选择） |
| labelPosition | 配置item的label位置 | String | left,right,top | 详情页（left）、表单页（right） |
| formSlotName | item关联的插槽，显示在表单页中 | String | - |
其余对应iview表单控件支持的属性，均可配置。

### Methods

| 方法名          | 说明            | 参数            |
|-------------  |---------------- |---------------- |
| validate | 表单校验方法 | - |

### Event

| 事件名          | 说明            | 参数            |
|-------------  |---------------- |---------------- |
| handleAfterSubmitSuccess | 表单成功提交后触发 | - |

### Scoped Slot

| name          | 说明            | 参数           |
|-------------  |---------------- | --------------- |
| formButtons | 表单页按钮组插槽 | formData |
| formHeader | 表单页顶部插槽 | formData |
| formFooter | 表单页尾部插槽 | formData |
| 其他 | 可通过options item 中的 formSlotName 对 item位置插槽进行关联 | {formData, option} |


