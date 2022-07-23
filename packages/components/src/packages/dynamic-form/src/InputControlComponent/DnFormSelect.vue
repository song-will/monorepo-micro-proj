<template>
  <dn-form-item-wrapper :definition="definition">
    <Select
      :value="fieldVal"
      :placeholder="definition.placeholder"
      :remote-method="remoteMethod"
      :multiple="definition.multiple"
      :filterable="definition.filterable"
      :clearable="definition.clearable"
      :remote="definition.remote"
      :loading="loading"
      :disabled="definition.disabled"
      :style="{
        minWidth: '160px'
      }"
      @on-change="(val) => {
        setValToFormField(val)
      }"
    >
      <template v-for="option in innerOptionsState">
        <Option
          v-if="option.slotRender"
          :key="`t-${option.key || option.value}`"
          :value="option.value"
          :label="option.label"
          :disabled="option.disabled"
        >
          <option-slot-render
            :render-call="option.slotRender"
            :raw-option-data="option"
          />
        </Option>
        <Option
          v-else
          :key="`f-${option.key || option.value}`"
          :value="option.value"
          :label="option.label"
          :disabled="option.disabled"
        />
      </template>
    </Select>
  </dn-form-item-wrapper>
</template>

<script>
import { Select, Option } from 'iview'
import { InputControlMixin } from './common'
import DnFormItemWrapper from './DnFormItemWrapper.vue'

export default {
  name: 'DnFormSelect',
  components: {
    DnFormItemWrapper,
    Select,
    Option
  },
  mixins: [InputControlMixin]
}
</script>
