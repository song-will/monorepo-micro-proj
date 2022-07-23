import BackEndPagingTable from './src/main';

/* istanbul ignore next */
BackEndPagingTable.install = function(Vue) {
  Vue.component(BackEndPagingTable.name, BackEndPagingTable);
};

export default BackEndPagingTable;
