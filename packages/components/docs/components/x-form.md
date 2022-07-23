# XForm组件说明

> 使用配置化参数生成Form表单
 ## 参数

| 属性                | 类型             |  说明                                     | 默认值 |
| ------------------ | ---------------- | ---------------------------------------- | ----- |
| formOptions        | Array,Function   | 组件配置文件，使用BaseInput生成对应组件       |       |
| inputWidth         | String,Number    | 设置表单组件默认宽度                         | 100%  |
| colSpan            | String           | 当前item的Colspan属性                      | 24    |
| others             | ---              | iview组件文档中定义Form属性均可作为参数传入    |       |

### formOptions参数

| 属性                | 类型         | 说明                                                               |  默认值  |
| :----------------- | :----------- | :--------------------------------------------------------------   | :------ |
| key                | String       | v-model绑定的属性名,当该项为slot和render函数渲染时只为循环渲染的key值     |         |
| inputType          | String       | 渲染的表单组件名称                                                   |  Input  |
| itemLabel          | String       | formItem的label名称                                                |         |
| itemLabelWidth     | Number       | formItem的label宽度                                                |         |
| formItemOptions    | Object       | formItem的所有属性值对象                                             |         |
| childrenOptions    | Object,Array | 用于含有子组件的表单组件配置，比如Select，RadioGroup，CheckboxGroup等    |         |  
| required           | Boolean      | 填写该属性开启快捷表单校验，当与rules属性冲突以rules为准                  |  false  |
| message            | String       | 表单校验提示语，配合required使用                                      |         |
| formRender         | Function     | 组件支持render函数渲染                                               |         |
| clearable          | Boolean      | 是否显示清除按钮                                                     |  true   |
| formSlotName       | String       | 自定义组件插槽                                                       |         |
| others             | -            | iview组件文档中表单组件属性均可传入                                    |         |

### 方法
> 同iview form组件文档定义，比如this.$refs.XForm.validate()等于触发Form组件的validate方法

### 用法
::: demo
```html
<template>
    <x-form
        v-model="formData"
        :form-options="formOptions"
        :input-width="200"
        :label-width="100"
    >
        <form-item slot="formItemSlot" label="年龄">
            <input-number style="width:200px" v-model="formData.number" />
        </form-item>
    </x-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formOptions: [
        {
          key: 'name',
          itemLabel: '姓名',
          placeholder: '请输入姓名',
          required: true
        },
        {
          key: 'textarea',
          itemLabel: '备注',
          type: 'textarea',
          placeholder: '请输入',
          required: true,
          message: '请填写备注'
        },
        {
          key: 'status',
          itemLabel: '状态',
          inputType: 'Select',
          placeholder: '请选择状态',
          childrenOptions: [
            {
              label: '状态1',
              value: 'status1'
            },
            {
              label: '状态2',
              value: 'status2'
            }
          ]
        },
        {
          key: 'i-switch',
          itemLabel: '开关',
          inputType: 'i-switch'
        },

        {
          key: 'formSlot',
          formSlotName: 'formItemSlot'
        }
      ]
    }
  }
}
</script>

```
:::

> render函数会导致vuePress无法运行，单独展示
``` 
{
    key: 'contactName',
    item: '姓名',
    formRender(h, { option, formData }) {
    return (
            <Input
                value={formData.contactName}
                onInput={val => (formData.contactName = val)}
                style="width:200px"
            >
            </Input>
        )
    }
}
```