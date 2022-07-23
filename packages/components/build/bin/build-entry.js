const Components = require('../../components.json');
const fs = require('fs');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const path = require('path');
const endOfLine = require('os').EOL;

// 入口文件生成路径
const OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
const OUTPUT_CSS_PATH = path.join(__dirname, '../../src/theme/index.scss');

// 模块引入
const IMPORT_TEMPLATE = 'import {{name}} from \'./packages/{{package}}/index.js\';';

const IMPORT_CSS_TEMPLATE = '@import \'../packages/{{package}}/index.scss\';';

// 安装包名列表
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}';

const MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}

const components = [
{{install}},
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '{{version}}',
  install,
{{list}}
};
`;

const ComponentNames = Object.keys(Components);

const includeComponentTemplate = [];
const installTemplate = [];
const listTemplate = [];
const includeComponentCssTemplate = [];

ComponentNames.forEach(name => {
  const componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));

  installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
    name: componentName,
    component: name
  }));

  listTemplate.push(`  ${componentName}`);

  // css components
  if (fs.existsSync(path.join(__dirname, `../../src/packages/${name}/index.scss`))) {
    includeComponentCssTemplate.push(render(IMPORT_CSS_TEMPLATE, {
      name: componentName,
      package: name
    }));
  }
});

// css iconfont
// if (fs.existsSync(path.join(__dirname, `../../src/theme/iconfont.scss`))) {
//   includeComponentCssTemplate.push(`@import './iconfont.scss';`);
// }

// js入口文件模版
const template = render(MAIN_TEMPLATE, {
  // 模块引入
  include: includeComponentTemplate.join(endOfLine),
  // 模块安装
  install: installTemplate.join(',' + endOfLine),
  // 版本
  version: process.env.VERSION || require('../../package.json').version,
  // 模块列表
  list: listTemplate.join(',' + endOfLine)
});

// css入口文件模版
const cssTemplate = render(`{{include}}`, {
  include: includeComponentCssTemplate.join(endOfLine),
});

fs.writeFileSync(OUTPUT_PATH, template);
fs.writeFileSync(OUTPUT_CSS_PATH, cssTemplate);
console.log('[build entry] DONE:', OUTPUT_PATH);
