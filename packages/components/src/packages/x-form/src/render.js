export default {
  name: 'Render',
  functional: true,
  props: {
    render: {
      type: Function,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  render: (h, ctx) => {
    const params = {
      option: ctx.props.option,
      formData: ctx.props.formData
    }
    return ctx.props.render(h, params)
  }
}
