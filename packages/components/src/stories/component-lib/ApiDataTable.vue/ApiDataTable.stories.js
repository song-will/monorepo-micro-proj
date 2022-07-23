import '../../utils/story-common-base'
import ApiDataTable from '../../../packages/api-data-table'
import { action } from '@storybook/addon-actions'

export default {
  title: '组件库/ApiDataTable/ApiDataTable',
  component: ApiDataTable,
  argTypes: {

  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ApiDataTable },
  methods: {
    onSelectionChange1: action('onSelectionChange')
  },
  template: `
    <ApiDataTable @onSelectionChange="onSelectionChange1" v-bind="$props"></ApiDataTable>
  `
})

export const mainTable = Template.bind({})

mainTable.args = {
  dataRequest: () => {
    return Promise.resolve({
      total: 4,
      list: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
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
  },
  columns: [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'age'
    },
    {
      title: '地址',
      key: 'address'
    }
  ]
}

mainTable.storyName = 'Table基础用法'

export const singleSelectTable = Template.bind({})

singleSelectTable.args = {
  dataRequest: () => {
    return Promise.resolve({
      total: 4,
      list: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
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
  },
  queryParams: {},
  columns: [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'age'
    },
    {
      title: '地址',
      key: 'address'
    }
  ],
  usePagination: true,
  tableSelect: 'single'
}

singleSelectTable.storyName = '单选Table'

export const multipleSelectTable = Template.bind({})

multipleSelectTable.args = {
  dataRequest: () => {
    return Promise.resolve({
      total: 4,
      list: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
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
  },
  queryParams: {},
  columns: [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'age'
    },
    {
      title: '地址',
      key: 'address'
    }
  ],
  usePagination: true,
  tableSelect: 'multiple'
}

multipleSelectTable.storyName = '多选Table'
