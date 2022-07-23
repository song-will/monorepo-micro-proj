
<script>
import { FormItem } from 'iview'
export default {
  name: 'DnFormItemWrapper',
  props: {
    definition: {
      type: Object,
      required: true
    }
  },
  render (h) {
    return h(FormItem, {
      props: {
        ...this.definition
      }
    },
    [
      h('div', {
        style: {
          display: 'flex',
          justifyContent: 'flex-start'
        },
        ...this.definition.formItemWrapperBoxOption
      }, [
        this.definition.prefixRender?.(h, this.definition),
        h('div', {
          style: {
            width: '100%'
          },
          ...this.definition.formItemMainContentWrapperOption
        }, this.$slots.default),
        this.definition.suffixRender?.(h, this.definition)
      ])
    ])
  }
}
</script>
