
# DetailExtendForm

::: tip
DetailExtendForm组件用于日常业务中的 新增/修改表单-详情 之间的显示、跳转、和保存。
当配置内容中使用 this 时，options传入function类型，其他情况传入 array 即可。
:::

### 基础用法
::: demo
```html
<template>
  <detail-extend-form
    ref="DetailExtendForm"
    title="修改人员信息"
    :options="options"
    :detail-query-method="detailQueryMethod"
    :edit-submit-method="editSubmitMethod"
    :rules="rules"
  />
</template>
<script>
export default {
  name: 'Base',
  data () {
    return {
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
          disabled: !this.$refs.DetailExtendForm?.$refs.extendForm.formData.province
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
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    editSubmitMethod (val) {
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

### 新增
::: demo
```html
<template>
  <detail-extend-form
    title="新增/修改人员信息"
    :options="options"
    :addible="true"
    :detail-query-method="detailQueryMethod"
    :edit-submit-method="editSubmitMethod"
    :add-submit-method="addSubmitMethod"
  />
</template>
<script>
export default {
  name: 'Base',
  data () {
    return {
      options: [
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
        }
      ],
      res: {
        "name": "王大锤",
        "sex": "01"
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    editSubmitMethod (val) {
      return new Promise((resolve) => {
        this.res = val
        resolve()
      })
    },
    addSubmitMethod (val) {
      return new Promise((resolve) => {
        resolve()
      })
    }
  }
}
</script>
```
:::
### 表单显示样式
::: tip
表单的显示支持3种样式：Modal、Drawer、Cover。
通过传递 pattern 参数实现，默认值 Modal。
:::

::: demo
```html
<template>
  <div>
    <div>
      <RadioGroup v-model="pattern1">
        <Radio label="Modal"></Radio>
        <Radio label="Drawer"></Radio>
      </RadioGroup>
    </div>
    <detail-extend-form
      :options="options"
      :detail-query-method="detailQueryMethod"
      :edit-submit-method="editSubmitMethod"
      :pattern="pattern1"
    />
    <div>
      <RadioGroup v-model="pattern2">
        <Radio label="Cover"></Radio>
      </RadioGroup>
    </div>
    <detail-extend-form
      :options="options"
      :detail-query-method="detailQueryMethod"
      :edit-submit-method="editSubmitMethod"
      :pattern="pattern2"
    />
  </div>
</template>
<script>
export default {
  name: 'Pattern1',
  data () {
    return {
      pattern1: 'Modal',
      pattern2: 'Cover',
      options: [
        {
          itemLabel: '姓名',
          key: 'name',
          inputType: 'Input'
        }
      ],
      res: {
        "name": "王大锤"
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    editSubmitMethod (val) {
      return new Promise((resolve) => {
        this.res = val
        resolve()
      })
    }
  }
}
</script>
```
:::


### label
::: tip
对齐方式有3种样式：right、left、top。
通过 label-position 参数实现（涵盖 详情页面 和 表单页面 ），默认值 left(详情页)、right(表单页)。
form-item-position 参数可额外定义 表单页面 的 label 对齐方式，默认值 right。
整体宽度：统一配置所有label的宽度，默认自动计算，label-width 参数可以进行配置。
单个宽度：options配置项中可配置 item-label-width 参数，用于指定某个item的label宽度。
:::

::: demo
```html
<template>
  <div>
    <div>
      labelPosition： <RadioGroup v-model="labelPosition">
        <Radio label="right"></Radio>
        <Radio label="left"></Radio>
        <Radio label="top"></Radio>
      </RadioGroup>
      <br>
      formLabelPosition： <RadioGroup v-model="formLabelPosition">
        <Radio label="right"></Radio>
        <Radio label="left"></Radio>
        <Radio label="top"></Radio>
      </RadioGroup>
    </div>
    <detail-extend-form
      :options="options"
      :detail-query-method="detailQueryMethod"
      :edit-submit-method="editSubmitMethod"
      :label-position="labelPosition"
      :form-label-position="formLabelPosition"
      :label-width="60"
    />
  </div>
</template>
<script>
export default {
  name: 'Label',
  data () {
    return {
      labelPosition: 'left',
      formLabelPosition: 'right',
      options: [
        {
          itemLabel: '姓名',
          key: 'name',
          inputType: 'Input'
        },
        {
          itemLabel: '详细家庭住址（精确到门牌号）',
          key: 'age',
          inputType: 'Input',
          itemLabelWidth: 200
        }
      ],
      res: {
        "name": "王大锤",
        "age": 20
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    editSubmitMethod (val) {
      return new Promise((resolve) => {
        this.res = val
        resolve()
      })
    }
  }
}
</script>
```
:::

### 栅格布局
::: tip
整体布局：colSpan 默认为24 ，每个item为一整行，可进行配置。 
item布局：options配置项中可配置 colSpan 参数，默认为24 ，用于指定某个item的栅格宽度。 
:::

::: demo
```html
<template>
  <detail-extend-form
    :options="options"
    :detail-query-method="detailQueryMethod"
    :edit-submit-method="editSubmitMethod"
    col-span="12"
  />
</template>
<script>
export default {
  name: 'ColSpan',
  data () {
    return {
      options: [
        {
          itemLabel: '姓名',
          key: 'name',
          inputType: 'Input'
        },
        {
          itemLabel: '年龄',
          key: 'age',
          inputType: 'Input'
        },
        {
          itemLabel: '备注',
          key: 'memo',
          inputType: 'Input',
          colSpan: '24'
        }
      ],
      res: {
        "name": "王大锤",
        "age": 20,
        "memo": "万万没想到啦啦啦啦啦"
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    editSubmitMethod (val) {
      return new Promise((resolve) => {
        this.res = val
        resolve()
      })
    }
  }
}
</script>
```
:::

### 插槽
::: tip
包括：详情页顶部插槽、详情页尾部插槽、详情页按钮组插槽、详情页item插槽、表单页顶部插槽、表单页尾部插槽、表单页按钮组插槽、表单页item插槽。
注意：表单页item插槽配置时，需指定 key。
:::

::: demo
```html
<template>
  <detail-extend-form
    :options="options"
    :detail-query-method="detailQueryMethod"
    :edit-submit-method="editSubmitMethod"
  >
    <template
      slot="detailItemSlot"
      slot-scope="scope"
    >
      <Button type="warning">
        {{ scope.option.label }}
      </Button>
    </template>
    <template
      slot="formItemSlot"
      slot-scope="scope"
    >
      <Button type="warning">
        {{ scope.option.label }}
      </Button>
    </template>
    <template
      slot="detailButtons"
    >
      <Button type="warning">
        detailButtons插槽
      </Button>
    </template>
    <template
      slot="detailHeader"
    >
      <Button type="warning">
        detailHeader插槽
      </Button>
    </template>
    <template
      slot="detailFooter"
    >
      <Button type="warning">
        detailFooter插槽
      </Button>
    </template>
    <template
      slot="formButtons"
    >
      <Button type="warning">
        formButtons插槽
      </Button>
    </template>
    <div
      slot="formFooter"
    >
      <Button type="warning">
        formFooter插槽
      </Button>
    </div>
    <div
      slot="formHeader"
    >
      <Button type="warning">
        formHeader插槽
      </Button>
    </div>
  </detail-extend-form>
</template>
<script>
export default {
  name: 'Slot1',
  data () {
    return {
      options: [
        {
          itemLabel: '姓名',
          key: 'name',
          inputType: 'Input'
        },
        {
          key: 'slot',
          detailSlotName: 'detailItemSlot',
          formSlotName: 'formItemSlot',
          label: 'detailItem位置插槽',
          inputType: 'div'
        },
        {
          itemLabel: '年龄',
          key: 'age',
          inputType: 'Input'
        }
      ],
      res: {
        "name": "王大锤",
        "age": 20,
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    editSubmitMethod (val) {
      return new Promise((resolve) => {
        this.res = val
        resolve()
      })
    }
  }
}
</script>
```
:::
### Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| options | item配置项，具体参数参见下文 | Array, Function（当内容中使用 this 时使用） | - | [] |
| pattern | 表单显示样式 | String | Modal, Drawer, Cover | Modal |
| title | 表单页title | String | - | '新增/修改' |
| labelWidth | 配置所有item的label宽度，不传此参数时，详情页自适应，表单页会自动计算统一适配的宽度，传auto时，详情页和表单页会自动计算统一适配的宽度 | Number,String | auto | null |
| formWidth | 配置表单页宽度 | String | - | Drawer、Modal模式下为1000 |
| labelPosition | 配置所有item的label位置 | String | left,right,top | 详情页（left）、表单页（right） |
| formLabelPosition |  配置表单页所有item的label位置 | String | left,right,top | - |
| rules | 表单页的表单验证配置 | Object | - | {} |
| colSpan | 配置所有item的栅格布局 | String | 1-24 | 24 |
| editable | 是否显示编辑按钮 | Boolean | - | true |
| addible | 是否显示编辑按钮 | Boolean | - | false |
| detailVisible | 是否显示详情页 | BOOlearn | - | true |
| detailQueryMethod | 详情页信息的查询方法 | Function | - | - |
| editSubmitMethod | 编辑表单页的保存方法 | Function(formData) | - | — |
| addSubmitMethod | 新增表单页的保存方法 | Function(formData) | - | — |
| initData | 新增表单页初始数据 | Object | - | {} |
| addOptionsConfig | 新增表单页options的个性化配置，传入想要配置的options中的key集合 | Array | - | [] |
| editOptionsConfig | 编辑表单页options的个性化配置，传入想要配置的options中的key集合 | Array | - | [] |

##### options item Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| key | item绑定的字段，使用formSlotName时必填 | String | - | — |
| itemLabel | item的label名 | String | - | - |
| itemLabelWidth | item的label宽度 | Number | - | - |
| labelRender | item的label的render函数 | Function(h, { option, detailData }) | - | - |
| detailRender | 详情页item内容的render函数 | Function(h, { option, detailData }) | - | - |
| formRender | 表单页item内容的render函数 | Function(h, { option, formData }) | - | - |
| inputType | item的表单控件名，对应iview组件类型，可传入Input,Select,DatePicker，等对应iview表单基础组件名称| String | - | Input |
| childrenOptions | item的options，用于含有子组件的表单组件配置，比如Select，RadioGroup，CheckboxGroup等  | Array, Object | - |
| type | 表单控件的type，含有type属性值的表单组件使用，等于传入组件的type属性值，比如DatePicker  | String | - | - |
| clearable | 是否显示清空按钮 | Boolearn | - | true |
| placeholder | 表单控件框内默认文字 | String | - | input（请输入）、其他（请选择） |
| labelPosition | 配置item的label位置 | String | left,right,top | 详情页（left）、表单页（right） |
| detailSlotName | item关联的插槽，显示在详情页中 | String | - |
| formSlotName | item关联的插槽，显示在表单页中 | String | - |
其余对应iview表单控件支持的属性，均可配置。

### Methods

| 方法名          | 说明            | 参数            |
|-------------  |---------------- |---------------- |
| handleDetailQuery | 详情信息查询方法 | - |


### Scoped Slot

| name          | 说明            | 参数           |
|-------------  |---------------- | --------------- |
| detailButtons | 详情页按钮组插槽 | detailData |
| detailHeader | 详情页顶部插槽 | detailData |
| detailFooter | 详情页尾部插槽 | detailData |
| formButtons | 表单页按钮组插槽 | formData |
| formHeader | 表单页顶部插槽 | formData |
| formFooter | 表单页尾部插槽 | formData |
| 其他 | 可通过options item 中的 detailSlotName 和 formSlotName 对 item位置插槽进行关联 | detailSlotName：{ detailData, option }、formSlotName：{formData, option} |
