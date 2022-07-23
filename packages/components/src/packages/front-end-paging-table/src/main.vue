<template>
  <div>
    <Table
      :columns="columns"
      :data="showData"
      :loading="loading"
      :show-header="true"
      @on-row-click="handleRowClick"
      @on-select="handleOnSelect"
      @on-select-all="handleSelectAll"
      @on-selection-change="handleSelectionChange"
      @on-select-all-cancel="handleSelectAllCancel"
      @on-expand='handleOnExpand'
      class="table-wrapper"
    >
      <template v-for="item in columns" :slot='item.slot' slot-scope="params">
        <slot :name="item.slot" v-bind="params" v-if="item.slot"></slot>
      </template>
    </Table>
    <Page
      v-if="showPageCom"
      :transfer="true"
      :page-size-opts="sizeOptions"
      :total="data.total"
      :current="current"
      :page-size="pageSize"
      show-total
      show-sizer
      @on-change="handleChangePage"
      @on-page-size-change="handleChangePageSize"></Page>
  </div>
</template>
<script>
export default {
  name: 'FrontEndPagingTable',
  props: {
    showPageCom: {
      required: false,
      default: true
    },
    columns: {
      required: true,
      default: () => []
    },
    loading: {
      required: true,
      default: false
    },
    data: {
      required: true,
      default: () => {
        return {
          list: [],
          total: 0
        }
      }
    },
    defaultPageSize: {
      type: Number,
      default: () => 10
    },
    sizeOptions: {
      type: Array,
      default: () => [5, 10, 25, 50, 100]
    }
  },
  data () {
    return {
      current: 1,
      pageSize: 0
    }
  },
  computed: {
    showData () {
      let begin = (this.current - 1) * this.pageSize
      let end = this.current * this.pageSize
      return this.data.list.slice(begin, end)
    }
  },
  watch: {
    data: {
      handler () {
        this.current = 1
      }
    }
  },
  methods: {
    async handleChangePage (pageNum) {
      this.current = pageNum
      this.$emit('on-change', pageNum)
    },
    async handleChangePageSize (pageSize) {
      this.pageSize = pageSize
      this.$emit('on-page-size-change', pageSize)
    },
    /**
     * 在多选模式下有效，选中某一项触发，
     * retrun (selection, row)，分别为已选项和刚选择的项。
     */
    handleOnSelect (selection, row) {
      this.$emit('on-select', selection, row)
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
    /**
     * 单击某一行时触发
     * retrun currentRowData: 当前行的数据
     * retrun currentIndex: 当前行的索引
     */
    handleRowClick (currentRowData, currentIndex) {
      this.$emit('on-row-click', currentRowData, currentIndex)
    },
    handleOnExpand (...arr) {
      this.$emit('on-expand', arr)
    }
  },
  created () {
    this.pageSize = this.defaultPageSize
  }
}
</script>
