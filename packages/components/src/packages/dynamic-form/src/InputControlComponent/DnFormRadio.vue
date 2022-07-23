<script>
import { Radio } from 'iview'
import { InputControlMixin } from './common'

export default {
  name: 'DnFormRadio',
  mixins: [InputControlMixin],
  render (h) {
    const inputControlProps = this.definition?.inputControlProps || {}
    return this.renderCommon(h, [
      h(Radio, {
        props: {
          type: 'text',
          value: this.fieldVal,
          ...inputControlProps
        },
        on: {
          'on-change': (val) => {
            this.setValToFormField(val)
          }
        }
      })
    ])
  }
}
</script>
