<script>
import { Input } from 'iview'
import { InputControlMixin } from './common'

export default {
  name: 'DnFormInput',
  mixins: [InputControlMixin],
  render (h) {
    const inputControlProps = this.definition?.inputControlProps || {}
    return this.renderCommon(h, [
      h(Input, {
        props: {
          type: 'text',
          value: this.fieldVal,
          ...this.extractedInputProps,
          ...inputControlProps
        },
        on: {
          'on-change': (e) => {
            this.setValToFormField(e.target.value)
          }
        }
      })
    ])
  }
}
</script>
