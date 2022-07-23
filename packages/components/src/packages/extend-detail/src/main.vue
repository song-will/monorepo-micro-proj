<template>
  <div class="detail-extend">
    <div class="btns-container">
      <Button
        v-if="editable"
        type="primary"
        @click="clickEditButton"
      >
        编辑
      </Button>
      <Button
        v-if="addible"
        type="primary"
        @click="clickAddButton"
      >
        新增
      </Button>
      <slot name="detailButtons" :detailData="detailData"/>
    </div>
    <slot name="detailHeader" :detailData="detailData"/>
    <Row
      v-if="detailVisible"
      :gutter="16"
    >
      <Col
        v-for="(item, key) in options"
        :key="key"
        :span="item.colSpan || colSpan"
      >
        <div :class="item.labelPosition ? 'detail-extend-item-' + item.labelPosition : '' || labelPosition ? 'detail-extend-item-' + labelPosition : ''">
          <template v-if="item.detailSlotName && $scopedSlots[item.detailSlotName]">
            <slot
              :name="item.detailSlotName"
              :data="detailData"
              :option="item"
            />
          </template>
          <template v-else>
            <div
              class="detail-extend-label"
              :style="{ 'width': item.itemLabelWidth ? item.itemLabelWidth + 'px' : typeof labelWidth === 'number' ? labelWidth + 'px': 'auto'}"
            >
              <template v-if="item.labelRender">
                <Render
                  :render="item.labelRender"
                  :detail-data="detailData"
                  :option="item"
                />
              </template>
              <template v-else>
                <span>{{ item.itemLabel }}</span>
              </template>
            </div>
            <div class="detail-extend-content">
              <template v-if="item.detailRender">
                <Render
                  :render="item.detailRender"
                  :detail-data="detailData"
                  :option="item"
                />
              </template>
              <template v-else>
                <span>{{ detailData[item.key] | filterItemData(item.childrenOptions) }}</span>
              </template>
            </div>
          </template>
        </div>
      </Col>
    </Row>
    <slot name="detailFooter" :detailData="detailData"/>
  </div>
</template>

<script>
import Render from './render'
function findInOptions (val, options) {
  if (Array.isArray(options)) {
    const obj = options.find(item => item.value === val)
    return obj?.label
  } else {
    return options[val]
  }
}

export default {
  name: 'ExtendDetail',
  filters: {
    filterItemData (val, childrenOptions) {
      if (!childrenOptions) return val
      if (Array.isArray(val)) {
        let arr = []
        val.forEach(item => {
          arr.push(findInOptions(item, childrenOptions))
        })
        return arr.toString()
      } else {
        return findInOptions(val, childrenOptions)
      }
    }
  },
  components: {
    Render
  },
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    labelWidth: {
      type: [Number,String],
      default: null
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    colSpan: {
      type: String,
      default: '24'
    },
    editable: {
      type: Boolean,
      default: true
    },
    addible: {
      type: Boolean,
      default: false
    },
    detailVisible: {
      type: Boolean,
      default: true
    },
    detailQueryMethod: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      detailData: {},
      computedAutoWidth: 0,
      changeList: {}
    }
  },
  created () {
    this.handleDetailQuery()
  },
  mounted () {
    this.getLabelWidth()
    this.getChangeList()
  },
  methods: {
    clickEditButton () {
      this.$emit('clickEditButton')
    },
    clickAddButton () {
      this.$emit('clickAddButton')
    },
    async handleDetailQuery () {
      let res = await this.detailQueryMethod()
      const keys = Object.keys(this.changeList)
      if (keys.length > 0) {
        keys.forEach(key => {
          this.changeList[key](res[key], this.detailData)
        })
      }
      this.detailData = res
    },
    getLabelWidth () {
      if(typeof this.labelWidth === 'number'){
        this.$emit('getLabelWidth', this.labelWidth)
        return
      }
      if (this.$el) {
        this.$nextTick(() => {
          this.computedAutoWidth = 0
          const arr = this.$el.querySelectorAll('.detail-extend-label')
          arr.forEach(item => {
            if (item.style.width === 'auto'){
              const currentWidth = Math.ceil(parseFloat(window.getComputedStyle(item).width))
              if (currentWidth > this.computedAutoWidth) {
                this.computedAutoWidth = currentWidth
              }
            }
          })
          if (this.labelWidth === 'auto') {
            arr.forEach(item => {
              if (item.style.width === 'auto'){
                item.style.width = this.computedAutoWidth + 'px'
              }
            })
          }
          this.$emit('getLabelWidth', this.computedAutoWidth)
        })
      }
    },
    getChangeList () {
      this.options.forEach(item => {
        if (typeof item['on-change'] === 'function') {
          this.changeList[item.key] = item['on-change']
        }
      })
    }
  }
}
</script>
