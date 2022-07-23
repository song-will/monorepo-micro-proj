<script>
import { RadioGroup, Radio } from 'iview'
import { InputControlMixin } from './common'

export default {
  name: 'DnFormRadioGroup',
  mixins: [InputControlMixin],
  render (h) {
    const inputControlProps = this.definition?.inputControlProps || {}
    const radioOpts = this.innerOptionsState.map(optOptions => {
      const optProps = {
        ...optOptions
      }
      if (optOptions.slotRender) {
        return h(Radio, {
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
        return h(Radio, {
          props: optProps,
          key: `f-${optProps.key || optProps.value}`
        })
      }
    })
    return this.renderCommon(h, [
      h(RadioGroup, {
        props: {
          value: this.fieldVal,
          ...inputControlProps
        },
        on: {
          'on-change': (val) => {
            this.setValToFormField(val)
          }
        }
      }, radioOpts)
    ])
  }
}
</script>
