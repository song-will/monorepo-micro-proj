<script>
import { DatePicker } from 'iview'
import { InputControlMixin } from './common'
export default {
  name: 'DnFormDatePicker',
  mixins: [InputControlMixin],
  render (h) {
    const inputControlProps = this.definition?.inputControlProps || {}
    const isRange = ['daterange', 'datetimerange'].includes(inputControlProps.type)
    return this.renderCommon(h, [
      h(DatePicker, {
        props: {
          value: this.fieldVal,
          type: 'datetime',
          placeholder: this.definition.placeholder,
          ...inputControlProps
        },
        style: {
          minWidth: isRange
            ? {
                daterange: '200px',
                datetimerange: '300px'
              }[inputControlProps.type]
            : 'auto'
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
