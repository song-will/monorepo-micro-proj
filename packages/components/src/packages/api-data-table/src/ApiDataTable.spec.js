import { mount } from '@vue/test-utils'

import ApiDataTable from '../../api-data-table'

import { mainTable, singleSelectTable } from '../../../stories/component-lib/ApiDataTable.vue/ApiDataTable.stories'
import flushPromises from 'flush-promises'

describe('ApiDataTable.vue', () => {
  it('基础表格', async () => {
    const mountProps = {
      propsData: mainTable.args
    }
    const wrapper = mount(ApiDataTable, mountProps)
    await wrapper.setProps({
      dataRequest: () => {
        return Promise.resolve({
          total: 4,
          list: [
            {
              name: '王小明1',
              age: 18,
              address: '北京市朝阳区芍药居'
            },
            {
              name: '张小刚1',
              age: 25,
              address: '北京市海淀区西二旗'
            },
            {
              name: '李小红',
              age: 30,
              address: '上海市浦东新区世纪大道'
            },
            {
              name: '周小伟',
              age: 26,
              address: '深圳市南山区深南大道'
            }
          ]
        })
      }
    })
  })

  it('单选表格', async () => {
    jest.useFakeTimers()
    const mountProps = {
      propsData: singleSelectTable.args
    }
    const wrapper = await mount(ApiDataTable, mountProps)
    await wrapper.vm.$nextTick()
    await flushPromises()
    jest.advanceTimersByTime(1000)
    jest.runAllTimers()
    await wrapper.find('tbody>tr:first-of-type').trigger('click')
    await flushPromises()
    expect(wrapper.emitted().onSelectionChange).toBeTruthy()
  })
})
