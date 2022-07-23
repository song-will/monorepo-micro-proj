import SearchTable from './src/main';

/* istanbul ignore next */
SearchTable.install = function(Vue) {
  Vue.component(SearchTable.name, SearchTable);
};

export default SearchTable;
