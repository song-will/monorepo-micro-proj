<script>
import { Checkbox } from 'iview'
import { InputControlMixin } from './common'

export default {
  name: 'DnFormCheckbox',
  mixins: [InputControlMixin],
  render (h) {
    const inputControlProps = this.definition?.inputControlProps || {}
    return this.renderCommon(h, [
      h(Checkbox, {
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
