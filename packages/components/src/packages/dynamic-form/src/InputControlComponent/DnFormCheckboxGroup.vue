<script>
import { CheckboxGroup, Checkbox } from 'iview'
import { InputControlMixin } from './common'

export default {
  name: 'DnFormCheckboxGroup',
  mixins: [InputControlMixin],
  render (h) {
    const inputControlProps = this.definition?.inputControlProps || {}
    const opts = this.innerOptionsState.map(optOptions => {
      const optProps = {
        ...optOptions
      }
      if (optOptions.slotRender) {
        return h(Checkbox, {
          props: optProps,
          key: `t-${optProps.key || optProps.value}`,
          value: optProps.value
        }, [h('OptionSlotRender', {
          props: {
            renderCall: optOptions.slotRender,
            rawOptionData: optProps
          }
        })])
      } else {
        return h(Checkbox, {
          props: optProps,
          key: `f-${optProps.key || optProps.value}`
        })
      }
    })
    return this.renderCommon(h, [
      h(CheckboxGroup, {
        props: {
          value: this.fieldVal,
          ...inputControlProps
        },
        on: {
          'on-change': (val) => {
            this.setValToFormField(val)
          }
        }
      }, opts)
    ])
  }
}
</script>
