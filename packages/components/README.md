## @xt-boss/xt-vue-components UI 组件库

基于 iView@3.x 和 Element 的 UI 组件库。

## 使用

### 组件在线文档
https://boss-comp.xtrfr.cn/

### 完整引入(基于rollup打包)
在 `main.js` 中写入以下内容：

```js
import XtVueComponents from '@xt-boss/xt-vue-components';
import '@xt-boss/xt-vue-components/lib/index.css';

Vue.use(XtVueComponents);
```

### 按需引入(基于webpack打包)

1. npm install babel-plugin-import --save-dev
2. 配置 babel.config.js

```
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: '@xt-boss/xt-vue-components',
        style: true,
      },
    ],
  ],
};

```

3. 引入

```
import { SearchTable } from "@xt-boss/xt-vue-components";
Vue.use(SearchTable);
```

## 开发

### 新组件添加

`make new <component-name> [中文名]`

### 文档开发
你可以在本地开发的同时，编写文档。

`make dev`

### 本地测试
启动本地playground，调试组件

`make play`

### 业务测试
- 通过 `npm link` 将此组件库链接到全局
- ```
  cd bussiness-repo
  npm link @xt-boss/xt-vue-components
  ```

### 发布
1. 提交功能代码
2. 执行npm run release (**存在remote url时会自动push到remote**)
3. 合并分支到master（**开发分支只允许发beta包**）
4. 登录Jenkins --> Dev_Tool --> Dev_Tool_PublishNpmPackages --> Dev_Tool_PublishNpmPackages --> appname: `pkg-name` branch: `master | dev-branch`

**注意⚠️**

执行Jenkins Jobs时，遇到构建失败 `npm ERR! code E400` 说明组件库代码 `version` 未更新

jenkins选择开发分支时，**只允许构建beta包**

