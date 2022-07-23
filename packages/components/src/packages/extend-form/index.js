import ExtendForm from './src/main';

/* istanbul ignore next */
ExtendForm.install = function(Vue) {
  Vue.component(ExtendForm.name, ExtendForm);
};

export default ExtendForm;
