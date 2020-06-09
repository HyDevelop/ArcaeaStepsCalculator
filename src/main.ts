import Vue from 'vue'
import App from './app/App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  render: h => h(App),
}).$mount('#app')
