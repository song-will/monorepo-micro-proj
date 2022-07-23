import XForm from './src/main';

/* istanbul ignore next */
XForm.install = function(Vue) {
  Vue.component(XForm.name, XForm);
};

export default XForm;
