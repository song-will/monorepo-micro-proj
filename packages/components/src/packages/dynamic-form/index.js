import DynamicForm from './src/main';

/* istanbul ignore next */
DynamicForm.install = function(Vue) {
  Vue.component(DynamicForm.name, DynamicForm);
};

export default DynamicForm;
