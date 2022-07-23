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
    detailData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  render: (h, ctx) => {
    const params = {
      option: ctx.props.option,
      detailData: ctx.props.detailData
    }
    return ctx.props.render(h, params)
  }
}
