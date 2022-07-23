import BaseInput from '../../base-input/src/main.vue'
import BackEndPagingTable from '../../back-end-paging-table/src/main.vue'
import FrontEndPagingTable from '../../front-end-paging-table/src/main.vue'
import { Form, FormItem, Row, Col, Button } from 'iview'
import { handleMapErrorInfo } from '../../../utils/errorMap'

export default {
  name: 'SearchTable',
  props: {
    searchMethod: {
      required: true,
      default: Function
    },
    sizeOptions: Array,
    filterForm: Function,
    searchOptions: Array,
    columns: Array,
    searchResult: Object,
    searchForm: Object,
    tableType: {
      type: String,
      default: () => 'BackEndPagingTable'
    },
    showSearch: {
      type: Boolean,
      default: () => true
    },
    searchRules: Object,
    id: String,
    searchDataFilter: Function,
    useVirtual: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number,
      default: 400
    },
    rowKeyFieldName: {
      type: String,
      default: 'leadsId'
    }
  },
  components: {
    BaseInput,
    BackEndPagingTable,
    FrontEndPagingTable
  },
  data () {
    return {
      formData: {
        page: 1,
        size: 10
      },
      configOptions: {},
      scopeSlots: {},
      autoSearchResult: {
        loading: false,
        data: {
          list: [],
          total: 0
        }
      },
      clearTable: false
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler (val) {
        Object.keys(val).forEach(item => {
          this.$set(this.formData, item, val[item])
        })
        // Object.assign(this.formData, val)
      }
    }
  },
  computed: {
    slots () {
      return this.columns.map(v => v.slot)
    },
    autoRequest () {
      return this.searchResult ? this.searchResult : this.autoSearchResult
    },
    autoFilterForm () {
      return this.filterForm ? this.filterForm(this.formData) : this.formData
    }
  },
  methods: {
    scrollToRowKey(option) {
      this.$refs.BackEndPagingTable.scrollToRowKey(option)
    },
    setHighlightRow(option) {
      this.$refs.BackEndPagingTable.setHighlightRow(option)
    },
    handleChangePageSize (val) {
      this.formData.size = val
      this.$emit('on-page-size-change', val)
    },
    handleChangePageNum (val) {
      this.formData.page = val
      this.$emit('on-change-pageNum', val)
    },
    async handleQuery (init = true) {
      await this.$emit('on-beforeQuery')
      if (this.searchRules) {
        const data = await this.$refs.searchForm.validate()
        if (!data) {
          this.$Message.error('搜索条件错误')
          return
        }
      }
      if (init) {
        this.formData.page = 1
        this.formData.size = 10
        this.$refs[this.tableType].pageSize = 10
        this.$refs[this.tableType].current = 1
      }
      Object.assign(this.formData, this.searchForm)
      if (this.searchResult) {
        await this.searchMethod(this.autoFilterForm)
      } else {
        await this.getTableData()
      }
      this.$emit('on-query')
    },
    async getTableData () {
      if (this.tableType === 'FrontEndPagingTable') {
        this.autoSearchResult.loading = true
        let data = await this.searchMethod(this.autoFilterForm).catch(err => handleMapErrorInfo(err))
        this.autoSearchResult.loading = false
        if (data) {
          data = this.searchDataFilter ? this.searchDataFilter(data) : data
          this.autoSearchResult.data = { data, total: data.length }
        }
      } else {
        this.$nextTick(() => {
          this.$refs.BackEndPagingTable.queryFormForData()
        })
      }
    },
    clearTableData () {
      const data = this.$options.data().autoSearchResult
      if (this.searchResult) {
        this.searchResult = data
      } else {
        this.autoSearchResult = data
        if (this.$refs.BackEndPagingTable) {
          this.$refs.BackEndPagingTable.autoDataModel = {
            list: [],
            total: 0
          }
        }
      }
    },
    initFormData (status = 'clear') {
      if (this.showSearch) {
        this.searchOptions.forEach(v => {
          if (v === 'currentKey') {
            console.error('currentKey can\'t be a key')
            return
          }
          if (status === 'clear') {
            this.$set(this.searchForm, v.key, null)
          } else if (!this.searchForm.hasOwnProperty(v)) {
            this.$set(this.searchForm, v.key, null)
          }
          this.configOptions[v.key] = {
            value: null
          }
          if (v.options && v.selectDisabled) this.configOptions[v.key].selectDisabled = this.selectInit(v.options, v.selectDisabled)
        })
        this.$refs.searchForm.resetFields()
      }
    },
    inputChange (options, index, row) {
      this.configOptions.currentKey = row.key
      this.configOptions[row.key] = options
      this.$nextTick(() => {
        this.$emit('on-change', this.configOptions)
      })
      this.formData = { ...this.formData, ...this.searchForm }
    },
    selectInit (options, selectDisabled) { //初始化
      if (options instanceof Array) {
        options.forEach(v => {
          if (!selectDisabled[v]) {
            this.$set(selectDisabled, v, false)
          }
        })
      } else {
        Object.keys(options).forEach(v => {
          if (!selectDisabled[v]) {
            this.$set(selectDisabled, v, false)
          }
        })
      }
      return selectDisabled
    },
    onRowClick (...arr) {
      this.$emit('on-row-click', ...arr)
    },
    onExpand ([...arr]) {
      this.$emit('on-expand', ...arr)
    },
    onSortChange (...arr) {
      this.$emit('on-sort-change', ...arr)
    },
    resetFields () {
      this.$refs.searchForm.resetFields()
    },
    onSelectionChange (arr) {
      this.$emit('on-selection-change', arr)
    }
  },
  mounted () {
    this.initFormData('init')
  },
  render () {
    return <div class="searchTable components">
      {
        this.showSearch &&
        <Form ref="searchForm" props={{ model: this.searchForm }} rules={this.searchRules} class="searchForm">
          <Row gutter={16} type='flex' justify="start">
            {this.searchOptions.map((item, index) =>
              item.type !== 'slot' ?
                <Col span={4} key={index} style={item.style}>
                  <FormItem prop={item.key}>
                    <BaseInput type={item.type} id={item.id || `searchForm-${item.key}`} multiple={item.multiple} inputStyle={item.inputStyle} placeholder={item.placeholder} selectDisabled={item.selectDisabled} options={item.options} clearable={item.clearable} innerContent={item.innerContent} format={item.format} remote={item.remote} remoteMethod={item['remote-method']} disabled={item.disabled} name={item.id || item.key} inputValue={this.searchForm[item.key]} on-value={(value) => { this.searchForm[item.key] = value }} on-on-change={(options) => { this.inputChange(options, index, item) }}/>
                  </FormItem>
                </Col>
                : <Col span={item.span}>{this.$scopedSlots[item.slotName]}</Col>
            )}
            {/* fix修复button高度问题 */}
            {this.$scopedSlots.queryInputs && this.$scopedSlots.queryInputs()}
            <Button type="primary" on-click={this.handleQuery} id={this.id} class='query' loading={this.autoRequest.loading}>查询</Button>
            {this.$scopedSlots.buttons && this.$scopedSlots.buttons()}
            {this.$scopedSlots.show && this.$scopedSlots.show()}
          </Row>
        </Form>
      }
      {this.tableType === 'BackEndPagingTable' &&
      <BackEndPagingTable
        ref='BackEndPagingTable'
        id={this.id}
        formData={this.autoFilterForm}
        ajaxMethod={this.searchMethod}
        searchDataFilter={this.searchDataFilter ? this.searchDataFilter : null}
        on-on-change={this.handleChangePageNum}
        on-on-page-size-change={this.handleChangePageSize}
        on-on-row-click={this.onRowClick}
        on-on-expand={this.onExpand}
        on-on-selection-change={this.onSelectionChange}
        on-on-sort-change={this.onSortChange}
        loading={this.autoRequest.loading}
        columns={this.columns}
        sizeOptions={this.sizeOptions}
        data={this.searchResult ? this.autoRequest.data : null}
        useVirtual={this.useVirtual}
        max-height={this.maxHeight}
        row-key-field-name={this.rowKeyFieldName}
        scopedSlots = {{ ...this.$scopedSlots }}
      >
      </BackEndPagingTable>}
      {this.tableType === 'FrontEndPagingTable' &&
      <FrontEndPagingTable
        ref='FrontEndPagingTable'
        id={this.id}
        formData={this.autoFilterForm}
        on-on-change={this.handleChangePageNum}
        on-on-page-size-change={this.handleChangePageSize}
        on-on-row-click={this.onRowClick}
        on-on-expand={this.onExpand}
        on-on-selection-change={this.onSelectionChange}
        loading={this.autoRequest.loading}
        columns={this.columns}
        data={this.autoRequest.data}
        scopedSlots = {{ ...this.$scopedSlots }}
      >
      </FrontEndPagingTable>}
    </div>
  }
}
