<template>
  <div>
    <div
      v-if="useVirtual"
      class="ve__table"
    >
      <ve-table
        ref="veTable"
        class="table"
        :max-height="cHeight"
        :columns="veTableColumns"
        :table-data="tableData"
        :cell-style-option="cellStyleOption"
        :row-key-field-name="rowKey"
        border-around
        border-x
        :virtual-scroll-option="virtualScrollOption"
        :cell-selection-option="{
          enable: false,
          ...cellSelectionOption
        }"
        :checkbox-option="checkboxOptionTmp"
        :event-custom-option="eventCustomOptionTmp"
        :scroll-width="scrollWidth || scrollWidthDefault"
        :sort-option="sortOption"
        v-bind="$attrs"
      />
      <div
        v-if="tableData.length === 0"
        class="text-empty"
      >
        暂无数据
      </div>
      <Spin
        v-show="queryLoading"
        size="large"
        fix
      />
    </div>
    <div
      v-else
    >
      <Table
        :id="`${id}_table`"
        highlight-row
        :columns="columns"
        :data="autoData.list || []"
        :loading="queryLoading"
        :show-header="true"
        class="table-wrapper"
        @on-row-click="handleRowClick"
        @on-select="handleOnSelect"
        @on-select-all="handleSelectAll"
        @on-selection-change="handleSelectionChange"
        @on-select-all-cancel="handleSelectAllCancel"
        @on-expand='handleOnExpand'
        @on-sort-change="handleSortChange"
      >
        <template
          v-for="item in columns"
          v-if="item.slot"
          :slot="item.slot"
          slot-scope="params"
        >
          <slot
            :name="item.slot"
            v-bind="params"
          />
        </template>
      </Table>
    </div>
    <Page
      v-if="showPageComponent"
      :transfer="true"
      :page-size-opts="sizeOptions"
      :total="autoData.total"
      :current="current"
      :page-size="pageSize"
      show-total
      show-sizer
      @on-change="handleChangePage"
      @on-page-size-change="handleChangePageSize"
    />
  </div>
</template>
<script>
import 'vue-easytable/libs/theme-default/ve-table.css'
import 'vue-easytable/libs/theme-default/ve-checkbox.css'
import 'vue-easytable/libs/theme-default/ve-icon.css'

import _ from 'lodash'
import { handleMapErrorInfo } from '../../../utils/errorMap'

/**
 * queryFormForData  获取当前分页列表数据
 * initTableData     获取初始分页列表数据
 * autoData  列表数据
 */

export default {
  name: 'BackEndPagingTable',
  props: {
    'highlight-row': {
      type: Boolean,
      default: false
    },
    showPageComponent: {
      type: Boolean,
      default: true
    },
    formData: {
      required: true,
      default: () => {}
    },
    ajaxMethod: {
      required: true,
      type: Function
    },
    columns: {
      required: true,
      default: () => []
    },
    loading: {
      required: false,
      default: Boolean
    },
    data: {
      type: Object
    },
    defaultPageSize: {
      type: Number,
      default: () => 10
    },
    sizeOptions: {
      type: Array,
      default: () => [5, 10, 25, 50, 100]
    },
    initFlag: {
      required: false,
      default: Boolean
    },
    id: {
      required: false,
      default: null
    },
    searchDataFilter: {
      required: false,
      type: [Function, null],
      default: null
    },
    // 以下都是用于虚拟列表
    useVirtual: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    rowKeyFieldName: {
      type: String,
      default: undefined
    },
    cellSelectionOption: {
      type: Object,
      default: () => {}
    },
    scrollWidth: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      current: 1,
      form: {
        size: 10,
        page: 1
      },
      pageSize: 10,
      queryLoading: false,
      autoDataModel: {
        list: [],
        total: 0
      },
      sortOption: {
        sortChange: (params) => {
          this.sortChange(params);
        }
      },
      cellStyleOption: {
        bodyCellClass: ({ column }) => {
          if (column.type === 'checkbox') {
            if (column.fixed === 'left') {
              return 've-table-cell cell-left-fixed'
            }
          }
          return 've-table-cell'
        },
        headerCellClass: ({ column }) => {
          if (column.type === 'checkbox') {
            if (column.fixed === 'left') {
              return 've-table-header cell-left-fixed'
            }
          }
          return 've-table-header'
        }
      },
      checkboxOptionTmp: {
        selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
          const selection = this.getCheckSelected(selectedRowKeys)
          this.$emit('on-selection-change', selection)
        },
        selectedAllChange: ({ isSelected, selectedRowKeys }) => {
          const selection = this.getCheckSelected(selectedRowKeys)

          if (selection && selection.length) {
            this.$emit('on-select-all', selection)
          } else {
            this.$emit('on-select-all-cancel', selection)
          }
          this.$emit('on-selection-change', selection)
        },
        ...this.checkboxOption
      },
      eventCustomOptionTmp: {
        bodyRowEvents: ({ row, rowIndex }) => {
          return {
            click: () => {
              this.$emit('on-row-click', row, rowIndex)
            }
          }
        },
        ...this.eventCustomOption
      },
      interval: null,
      scrollWidthDefault: 0
    }
  },
  computed: {
    autoData () {
      return this.data ? this.data : this.autoDataModel
    },
    virtualScrollOption () {
      return {
        enable: this.tableData.length > 199
      }
    },
    veTableColumns () {
      return this.iview2VeTableColumns(this.columns)
    },
    tableData () {
      return this.rowKeyFieldName ? this.autoData.list : this.autoData.list.map((item, veIndex) => ({ ...item, veIndex }))
    },
    cHeight () {
      return this.maxHeight || this.height
    },
    rowKey () {
      return this.rowKeyFieldName || 'veIndex'
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler (newV, oldV) {
        this.form = _.cloneDeep(newV)
        this.pageSize = newV.size || this.pageSize
        this.current = newV.page || this.current
      }
    },
    loading: {
      handler (newV, oldV) {
        this.queryLoading = newV
      }
    },
    columns () {
      this.scrollWidthDefault = 0
    },
    tableData () {
      // 没有阻止冒泡机制，采用主动绑定解决点击checkbox触发问题
      setTimeout(() => {
        this.bindStoppropagation()
      })
    }
  },
  created () {
    this.pageSize = this.defaultPageSize
    if (this.initFlag) {
      this.queryFormForData()
    }
  },
  methods: {
    scrollToRowKey (options) {
      this.$refs.veTable.scrollToRowKey(options)
    },
    setHighlightRow (options) {
      this.$refs.veTable.setHighlightRow(options)
    },
    bindStoppropagation () {
      const arr = document.querySelectorAll('td[col-key=veSelect] .ve-checkbox-content')
      if (!arr) {
        return
      }
      arr.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation()
        })
      })
    },
    sortChange(param) {
      Object.keys(param).forEach((key) => {
        if(param[key]) {
          this.$emit('on-sort-change', {
            column: (this.tableData || []).map(item => item[key]),
            key,
            order: param[key]
          })
        }
      })
    },
    async handleChangePage (pageNum) {
      this.$emit('on-change', pageNum)
      this.current = pageNum
      this.queryFormForData()
    },
    async handleChangePageSize (pageSize) {
      this.$emit('on-page-size-change', pageSize)
      this.pageSize = pageSize
      if (this.current === 1) { // iview 源码: 如果当前页码不为 1 。则 handleChangePageSize 函数会自动调用 handleChangePage 函数.将 page 设置为 1
        this.queryFormForData()
      }
    },
    async queryFormForData () {
      this.form = Object.assign(this.form, this.formData)

      this.form.size = this.pageSize
      this.form.page = this.current
      this.queryLoading = true
      if (this.data) {
        await this.ajaxMethod(this.form)
      } else {
        let data = await this.ajaxMethod(this.form).catch(err => handleMapErrorInfo(err))
        data = this.searchDataFilter ? this.searchDataFilter(data) : data
        this.autoDataModel = data || this.$options.data().autoDataModel
      }
      this.queryLoading = false
    },
    async initTableData () {
      this.pageSize = 10
      this.current = 1
      this.$nextTick(v => {
        this.queryFormForData()
      })
    },
    getCheckSelected (selectedRowKeys) {
      return selectedRowKeys.map(key => {
        return this.tableData.find(row => row[this.rowKey] === key)
      }).filter(item => Boolean(item))
      // this.$emit('on-selection-change', selectedRows)
    },
    /**
     * 在多选模式下有效，选中某一项触发，
     * retrun (selection, row)，分别为已选项和刚选择的项。
     */
    handleOnSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    /**
     * 单击某一行时触发
     * retrun currentRowData: 当前行的数据
     * retrun currentIndex: 当前行的索引
     */
    handleRowClick (currentRowData, currentIndex) {
      this.$emit('on-row-click', currentRowData, currentIndex)
    },
    /**
     * 在多选模式下有效，点击全选时触发
     * retrun selection: 已选项数据
     */
    handleSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    /**
     * 在多选模式下有效，点击取消全选时触发
     * retrun selection: 已选项数据
     */
    handleSelectAllCancel (selection) {
      this.$emit('on-select-all-cancel', selection)
    },
    /**
     * 在多选模式下有效，只要选中项发生变化时就会触发
     * retrun selection: 已选项数据
     */
    handleSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    handleOnExpand (...arr) {
      this.$emit('on-expand', arr)
    },
    /**
     * sortable属性设置为custom时生效，点击排序触发方法。
     * retrun sortEvent: 排序事件对象{列对象,列key值,排序方式}
     */
    handleSortChange (soreEvent) {
      this.$emit('on-sort-change', soreEvent)
    },
    iview2VeTableColumns (columns) {
      return columns.map((item, index) => {
        const opt = {
          ...item
        }
        // align default
        if (!opt.align) {
          opt.align = 'left'
        }
        // field polyfill
        if (opt.key && !opt.field) {
          opt.field = opt.key
        }
        // render polyfill
        if (opt.render && !opt.renderBodyCell) {
          opt.renderBodyCell = function ({ row, column, rowIndex }, h) {
            return item.render(h, { row, column, index: rowIndex })
          }
          if (!opt.field && !opt.key) {
            opt.field = `veField_${index}`
            opt.key = `veKey_${index}`
          }
        }
        // minWidth polyfill
        if (opt.minWidth && !opt.width) {
          opt.width = opt.minWidth
        }

        // selection polyfill
        if (opt.type === 'selection') {
          opt.type = 'checkbox'
          opt.key = 'veSelect'
        }

        if(opt.sortable !== undefined) {
          opt.sortBy = ''
        }

        this.scrollWidthDefault += opt.minWidth || opt.width || 0

        return opt
      })
    }
  }
}
</script>
