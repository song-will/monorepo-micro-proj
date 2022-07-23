<script>
import { Table, Page } from 'iview'
import tableSelectUsage from './usageModeGenerateOptions/tableSelect/tableSelect'
import tableSelectMixin from './usageModeGenerateOptions/tableSelect/tableSelectMixin'
import expandRowUsageOptions from './usageModeGenerateOptions/expandRow/expandRow'
import expandRowMixin from './usageModeGenerateOptions/expandRow/expandRowMixin'

const genInitialState = (preset = {}) => {
  const { pageState, tableState, total } = preset
  return ({
    // 分页状态
    pageState: {
      page: pageState.page || 1,
      size: pageState.size || 10
    },
    // 表格状态
    tableState: {
      loading: true,
      ...tableState
    },
    // 总数
    total: total || 0
  })
}

export default {
  name: 'ApiDataTable',
  mixins: [tableSelectMixin, expandRowMixin],
  props: {
    // 表格数据请求api
    // 本质是一个promise返回，如果是本地模拟数据，可以直接promise.resolve({list:[]})返回一个数据
    dataRequest: {
      type: Function,
      required: true
    },
    // 请求表格数据携带的参数，会与分页状态混合放到dataRequest的参数中
    queryParams: {
      type: Object,
      default: () => ({})
    },
    // 表格列定义
    columns: {
      type: Array,
      required: true
    },
    // 是否使用分页
    usePagination: {
      type: Boolean,
      default: () => true
    },
    // presetPageSizeOpt
    pageSizeOpts: {
      type: Array,
      default () {
        return [5, 10, 25, 50, 100]
      }
    },
    // 是否显示分页大小选择器
    showSizer: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 是否显示总数
    showTotal: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 是否显示电梯跳转
    showElevator: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 预设的分页状态，在初始化state状态时会被使用到
    presetPageState: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // 表格数据
      data: [],
      // 内部状态
      state: genInitialState({
        pageState: this.presetPageState
      })
    }
  },
  computed: {
    // 混合组件内的state与传入的query state
    mixedQueryParams () {
      return {
        ...this.queryParams,
        ...this.state.pageState
      }
    }
  },
  watch: {
    // 当请求方法改变后，页码状态重置，重新请求数据
    dataRequest: {
      handler (dataRequest, old) {
        if (dataRequest !== old) {
          this.initializeState()
          this.fetchDataAction()
        }
      }
    },
    // 查询参数改变后，页码状态重置，重新请求数据
    queryParams: {
      handler (queryParams, old) {
        if (queryParams !== old) {
          this.initializeState()
          this.fetchDataAction()
        }
      },
      immediate: true,
      deep: true
    },
    // 分页大小改变后，页码重置为1，重新请求数据
    'state.pageState.size': {
      handler (size, old) {
        if (size !== old) {
          this.state.pageState.page = 1
          this.fetchDataAction()
        }
      }
    }
  },
  methods: {
    // 根据index选中一项
    singleSelectRowByIndex (index) {
      this.$set(this.data[index], '_highlight', true)
      this.selectionState.selected = [this.data[index]]
    },
    // 切换表格loading状态
    toggleTableLoading (target = undefined) {
      this.state.tableState.loading = target === undefined ? (!this.state.tableState.loading) : target
    },
    // 设置分页状态
    setPageState (incommingState = {}) {
      this.state.pageState = {
        ...this.state.pageState,
        ...incommingState
      }
      this.fetchDataAction()
    },
    // 将状态重新初始化，但保留分页大小
    initializeState () {
      this.state = genInitialState({
        pageState: {
          size: this.state.pageState.size
        }
      })
    },
    // 获取表格数据，整理参数并调用dataRequest
    fetchDataAction () {
      this.toggleTableLoading(true)
      this.dataRequest(this.mixedQueryParams).then(response => {
        this.data = response?.list || []
        this.state.total = response?.total || 0
      }).finally(_ => {
        this.toggleTableLoading(false)
      })
    }
  },
  render (h) {
    const { usePagination } = this
    const pagination = usePagination
      ? [
          h(Page, {
            props: {
              total: this.state.total,
              showSizer: this.showSizer,
              showTotal: this.showTotal,
              showElevator: this.showElevator,
              current: this.state.pageState.page,
              pageSize: this.state.pageState.size,
              pageSizeOpts: this.pageSizeOpts,
              transfer: true
            },
            on: {
              'on-change': (page) => {
                this.setPageState({
                  page
                })
              },
              'on-page-size-change': (size) => {
                this.setPageState({
                  size
                })
              }
            }
          })
        ]
      : []
    // 获取用法生成的options，后续createElement或者说h生成VNode时混入到参数中
    // 详见https://cn.vuejs.org/v2/guide/render-function.html#createElement-参数
    const tableSelectUsageOpts = tableSelectUsage(this)
    const expandRowUsageOpts = expandRowUsageOptions(this)
    return h('div', [
      h(Table, {
        props: {
          loading: this.state.tableState.loading,
          data: this.data,
          columns: this.columns,
          // 混入用法生成的props
          ...tableSelectUsageOpts.props,
          ...expandRowUsageOpts.props
        },
        on: {
          // 混入用法生成的事件响应on
          ...tableSelectUsageOpts.on,
          ...expandRowUsageOpts.on
        },
        class: ['xt-api-table']
      }),
      h('div', {
        style: {
          position: 'relative',
          margin: '20px'
        }
      }, pagination)
    ])
  }
}
</script>

<style lang="less" scoped>
@import './usageModeGenerateOptions/tableSelect/tableSelect.less';
</style>
