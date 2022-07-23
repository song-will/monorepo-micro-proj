<template>
  <detail-extend-form
    :options="options"
    :detail-query-method="detailQueryMethod"
    :edit-submit-method="editSubmitMethod"
  />
</template>
<script>
export default {
  name: 'ColSpan',
  data () {
    return {
      options: [
        {
          itemLabel: '金额',
          key: 'amount',
          inputType: 'Input',
          labelRender (h, { option, detailData }) {
            return (
              <div>
                <Icon type="md-brush" />
                <span>金额</span>
              </div>
            )
          },
          detailRender (h, { option, detailData }) {
            return (
              <div>
                <span>{ detailData.amount }</span>
                <span>元</span>
              </div>
            )
          },
          formRender (h, { option, formData }) {
            return (
              <div>
                <Input value={formData.amount} onInput={(val) => formData.amount = val} style="width: 100px"></Input>
                <span>RMB</span>
              </div>
            )
          }
        }
      ],
      res: {
        "amount": 100
      }
    }
  },
  methods: {
    detailQueryMethod () {
      return new Promise((resolve) => {
        resolve(this.res)
      })
    },
    editSubmitMethod (val) {
      return new Promise((resolve) => {
        this.res = val
        resolve()
      })
    }
  }
}
</script>