<template>
  <div class="grid-table-group">
    <div class="grid-table">
      <template v-for="column in columnsData">
        <div
          :key="column.key"
          :class="['grid-table-column', column.align ? ('grid-align-' + column.align) : '']"
        >
          {{ column.title }}
        </div>
      </template>
      <template v-for="(row, i) in tableData">
        <template v-for="(column, j) in columnsData">
          <div
            :key="'grid_' + i + '_' + j"
            :class="['grid-table-cell', column.align ? ('grid-align-' + column.align) : '', hlIndex === i ? 'grid-table-row-hl' : '']"
            @focus="hlIndex = i"
          >
            <template v-if="column.render">
              <TableRender
                :row="row"
                :column="column"
                :render="column.render"
                :index="i"
              />
            </template>
            <template v-else-if="column.slot">
              <TableSlot
                :row="row"
                :column="column"
                :name="column.slot"
                :index="i"
              />
            </template>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </div>
        </template>
      </template>
    </div>
    <template v-if="tableData.length <= 0">
      <div class="null-data-tip">
        暂无数据
      </div>
    </template>
  </div>
</template>

<script>
import TableRender from './render'
import TableSlot from './slot'

export default {
  name: 'GridTable',
  components: { TableRender, TableSlot },
  provide () {
    return {
      tableRoot: this
    }
  },
  props: {
    columns: {
      default: () => [],
      type: Array
    },
    data: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      columnsData: [],
      hlIndex: null
    }
  },
  computed: {
    tableData () {
      return this.initData()
    }
  },
  watch: {
    columns: {
      handler: function () {
        this.initColumns()
      }
    }
  },
  mounted () {
    this.initColumns()
  },
  methods: {
    initColumns () {
      const { columns } = this.$props
      if (columns.length < 0 || !this.$el) {
        return
      }
      this.columnsData = columns
      const str = columns.map(one => one.width ? (one.width + 'px') : `minmax(${one.minWidth ? one.minWidth : 80}px, ${one.maxWidth ? (one.maxWidth + 'px') : '1fr'})`).join(' ')
      this.$el.childNodes[0].style.gridTemplateColumns = str
    },
    initData () {
      const { data, columns } = this.$props
      if (columns.length < 0 || data.length < 0) {
        return []
      }
      return data
    }
  }
}
</script>