const componentsFile = require('../../components.json');
const componentsMds = getComponentsMds(componentsFile);

function getComponentsMds(components) {
  return Object.keys(components).map(item => {
    return `/components/${item}`;
  });
}

module.exports = {
  title: 'xt-vue-components',
  base: '/xt-vue-components/',
  dest: './dist',
  themeConfig: {
    repo: '',
    search: false,
    sidebar: [
      {
        title: '指南',
        path: '/guide/',
        collapsable: false,
      },
      {
        title: '组件',
        collapsable: false,
        children: componentsMds,
      },
    ],
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
    ],
  },
  head: [
  ],
  plugins: ['demo-block'],
};
