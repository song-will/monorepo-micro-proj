import { mount } from '@vue/test-utils'

import { Button } from 'iview'

import DynamicForm from '../../dynamic-form'

import { mainInput } from '../../../stories/component-lib/DynamicForm/DnFormInput.stories.js'

import { mainRadioGroup, radioGroupWithSlot } from '../../../stories/component-lib/DynamicForm/DnFormRadioGroup.stories.js'

import { mainCheckboxGroup, checkboxGroupWithSlot } from '../../../stories/component-lib/DynamicForm/DnFormCheckboxGroup.stories.js'

import { mainRadio } from '../../../stories/component-lib/DynamicForm/DnFormRadio.stories.js'

import { mainSelect, remoteOption, remoteOnceOption, withSlotOption } from '../../../stories/component-lib/DynamicForm/DnFormSelect.stories.js'

import { mainCheckbox } from '../../../stories/component-lib/DynamicForm/DnFormCheckbox.stories.js'

import { mainDatePicker } from '../../../stories/component-lib/DynamicForm/DnFormDatePicker.stories.js'

import { mainForm } from '../../../stories/component-lib/DynamicForm/DnForm.stories.js'

describe('Dynamic.vue', () => {
  it('测试基础用法及默认情况', async () => {
    const mountPropsDefault = {
      propsData: {
        value: {
          name: ''
        }
      }
    }
    mount(DynamicForm, mountPropsDefault)

    const renderProps = {
      propsData: {
        value: {
          name: ''
        },
        formDefinition: [
          {
            render: () => {
              return '这里显示文字'
            }
          }
        ]
      }
    }
    const renderWrapper = mount(DynamicForm, renderProps)
    expect(renderWrapper.find('.ivu-form').text()).toBe('这里显示文字')

    const mountProps = {
      propsData: mainInput.args
    }
    const wrapper = mount(DynamicForm, mountProps)
    await wrapper.vm.$nextTick()
    const input = wrapper.find('.ivu-form input[type="text"]')
    const inputAttr = input.attributes()
    expect(inputAttr.placeholder).toBe('请输入姓名')
    expect(inputAttr.type).toBe('text')
    expect(wrapper.find('.ivu-form').attributes().class).toContain('ivu-form-inline')
    input.setValue('zhangsan')
    const inputComponent = wrapper.find('.ivu-input-type')
    inputComponent.trigger('on-change')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().formValueChange).toBeTruthy()
  })

  it('select-本地options', async () => {
    const mountProps = {
      propsData: mainSelect.args
    }
    mount(DynamicForm, mountProps)
  })

  it('select-远程搜索options', async () => {
    const mountProps = {
      propsData: remoteOption.args
    }
    mount(DynamicForm, mountProps)
    // await wrapper.vm.$nextTick()
    // const input = wrapper.find('.ivu-select-selection input')
  })

  it('select-一次性获取options', async () => {
    const mountProps = {
      propsData: remoteOnceOption.args
    }
    mount(DynamicForm, mountProps)
    // await wrapper.vm.$nextTick()
  })

  it('select-自定义模板', async () => {
    const mountProps = {
      propsData: withSlotOption.args
    }
    mount(DynamicForm, mountProps)
  })

  it('radio-基础用法', async () => {
    const mountProps = {
      propsData: mainRadio.args
    }
    const wrapper = mount(DynamicForm, mountProps)
    await wrapper.vm.$nextTick()
    wrapper.find('.ivu-radio .ivu-radio-input').setChecked()
    expect(wrapper.emitted().formValueChange).toBeTruthy()
  })

  it('radioGroup-基础用法', async () => {
    const mountProps = {
      propsData: mainRadioGroup.args
    }
    const wrapper = mount(DynamicForm, mountProps)
    await wrapper.vm.$nextTick()
    wrapper.find('.ivu-form-item-content .ivu-radio-group .ivu-radio-input').setChecked()
    expect(wrapper.emitted().formValueChange).toBeTruthy()
  })

  it('radioGroup-自定义模板', async () => {
    const mountProps = {
      propsData: radioGroupWithSlot.args
    }
    mount(DynamicForm, mountProps)
  })

  it('checkbox-基本用法', async () => {
    const mountProps = {
      propsData: mainCheckbox.args
    }
    const wrapper = mount(DynamicForm, mountProps)
    await wrapper.vm.$nextTick()
    wrapper.find('.ivu-checkbox-input').setChecked()
    expect(wrapper.emitted().formValueChange).toBeTruthy()
  })

  it('checkboxGroup-基础用法', async () => {
    const mountProps = {
      propsData: mainCheckboxGroup.args
    }
    const wrapper = mount(DynamicForm, mountProps)
    await wrapper.vm.$nextTick()
    wrapper.find('.ivu-form-item-content .ivu-checkbox-wrapper .ivu-checkbox-input').setChecked()
    expect(wrapper.emitted().formValueChange).toBeTruthy()
  })

  it('checkboxGroup-自定义模板', async () => {
    const mountProps = {
      propsData: checkboxGroupWithSlot.args
    }
    mount(DynamicForm, mountProps)
  })

  it('DatePicker-基础用法', async () => {
    const mountProps = {
      propsData: mainDatePicker.args
    }
    const wrapper = mount(DynamicForm, mountProps)
    await wrapper.vm.$nextTick()
    const input = wrapper.find('input[type="text"]')
    // console.log(input)
    await input.setValue('2021-11-01 00:00:00')
    expect(wrapper.find('input').element.value).toBe('2021-11-01 00:00:00')
    // expect(wrapper.emitted().formValueChange).toBeTruthy()
  })

  it('DnForm-基础用法', async () => {
    const mountProps = {
      propsData: mainForm.args
    }
    const wrapper = mount(DynamicForm, mountProps)
    await wrapper.vm.$nextTick()
    // console.log(wrapper.vm)
    mount(Button).find('button').trigger('click')
    // wrapper.find('.reset').trigger('click')
    // console.log(wrapper.findAll({ name: 'Button' }))
  })
})
