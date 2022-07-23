import ApiDataTable from './src/main';

/* istanbul ignore next */
ApiDataTable.install = function(Vue) {
  Vue.component(ApiDataTable.name, ApiDataTable);
};

export default ApiDataTable;
