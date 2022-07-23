import ExtendDetail from './src/main';

/* istanbul ignore next */
ExtendDetail.install = function(Vue) {
  Vue.component(ExtendDetail.name, ExtendDetail);
};

export default ExtendDetail;
