import FrontEndPagingTable from './src/main';

/* istanbul ignore next */
FrontEndPagingTable.install = function(Vue) {
  Vue.component(FrontEndPagingTable.name, FrontEndPagingTable);
};

export default FrontEndPagingTable;
