module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint', // 采用 babel-eslint 作为语法解析器
    sourceType: 'module', // 指定来源的类型，有两种script或module
    ecmaVersion: 6, // 指定ECMAScript支持的版本，6为ES6
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // 扩展使用 vue 检查规则和eslint推荐规则,
  extends: [
    'eslint:recommended',
  ],
  // required to lint *.vue files
  // eslint-plugin-prettier 插件会调用 prettier对你的代码风格进行检查，
  // 其原理是先使用 prettier对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被 prettier进行标记。
  plugins: [
  ],
  // add your custom rules here
  rules: {
  },
};
