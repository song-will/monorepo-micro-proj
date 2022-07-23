
import * as InputControlComponent from './InputControlComponent'

/**
 * @param {import("vue").CreateElement} h
 * @param {*} definition
 * @return {import('vue').VNode}
 */
export const transDefinitionToVnode = (h, definition, updateFiledValue) => {
  const { DnFormItemWrapper, ...DefinedUseComponent } = InputControlComponent
  // if render defined, use it, or generate here
  const { key, prop, componentName, itemOutStyle, render, ...formItemDefinition } = definition
  if (render) {
    return h(DnFormItemWrapper, {
      key: key || prop,
      props: {
        definition: {
          ...formItemDefinition,
          prop
        }
      },
      style: {
        maxWidth: '100%',
        ...itemOutStyle
      }
    }, [render(h, definition, updateFiledValue)])
  }

  // if component defined, use it, or use iview input
  const targetComponent = `DnForm${componentName || 'Input'}`
  return h(DefinedUseComponent[targetComponent], {
    props: {
      definition
    },
    style: {
      maxWidth: '100%',
      ...itemOutStyle
    },
    key: key || prop
  })
}
