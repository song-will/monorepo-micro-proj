### 组件方案
  1. 组件统一放入packages目录
  2. 组件内部必须有index.js index.less src目录 README.md
  3. 执行node ./build/bin.new.js 组件名, 将组件添加到项目中

### 文档方案
  执行npm run docs查看文档

### 本地调试
  在examples/play.js引入生成文件,在App.vue编写测试代码,执行npm run dev:play查看效果