import Vue from 'vue';
import Element from 'main/index.js';
import App from './play/index.vue';
import 'main/theme/index.scss';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'font-awesome/css/font-awesome.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@babel/polyfill'

Vue.use(Element);
Vue.use(iView);
Vue.use(ElementUI);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
