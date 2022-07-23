function expandRowUsageOptions (vueInstance) {
  const readyOptions = {}
  if (vueInstance.tableExpanded) {
    readyOptions.on = {
      'on-expand': (row, status) => {
        vueInstance.$emit('onExpandChange', { row, status })
      }
    }
  }
  return readyOptions
}

export default expandRowUsageOptions
