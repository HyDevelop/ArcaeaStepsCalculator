import Vue from 'vue'
import App from './app/App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import VueI18n from "vue-i18n";
Vue.use(VueI18n)

// @ts-ignore
import {t} from './res/strings.js'
export const i18n = new VueI18n({locale: 'en', messages: t})

new Vue({ i18n,
  render: h => h(App),
}).$mount('#app')
