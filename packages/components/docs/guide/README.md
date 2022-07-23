## 安装

```sh
# 修改registry
npm config set registry http://registry.xtrfr.cn/repository/npm/

# npm安装
npm install @xt-boss/xt-vue-components

# yarn安装
yarn add @xt-boss/xt-vue-components
```

## 使用

样式暂时只支持 scss，后续更多支持

全部引入(建议)

```sh
import XtVueComponents from '@xt-boss/xt-vue-components';
import '@xt-boss/xt-vue-components/lib/index.scss';

Vue.use(XtVueComponents);
```

按需引入

```sh
import XXX from '@xt-boss/xt-vue-components/lib/xxx';
import '@xt-boss/xt-vue-components/lib/xxx/style';

Vue.use(XXX);
```
