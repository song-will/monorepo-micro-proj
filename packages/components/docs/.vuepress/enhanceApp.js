import Vue from 'vue/dist/vue';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../../src/theme/index.scss';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'font-awesome/css/font-awesome.css'

import XtVueComponents from '../../src';

if (typeof window !== 'undefined') {
  window.Vue = Vue;
}

Vue.use(Element, { size: 'small' });
Vue.use(XtVueComponents);
Vue.use(iView);
