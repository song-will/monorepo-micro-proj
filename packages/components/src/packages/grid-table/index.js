import GridTable from './src/main';

/* istanbul ignore next */
GridTable.install = function(Vue) {
  Vue.component(GridTable.name, GridTable);
};

export default GridTable;
