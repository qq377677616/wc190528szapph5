import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'common/css/reset.css'
import 'common/css/base.css'
import 'mint-ui/lib/style.css'
import animated from 'animate.css'
import 'common/js/remAdaptation.js'
// import 'common/js/cordova.js'
import Mint from 'mint-ui'
import FastClick  from 'fastclick'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
import ElementUI from 'element-ui'
// import {post,fetch} from './api/http'
Vue.component('v-chart', ECharts)
FastClick .attach(document.body)
// import VueTouch from 'vue-touch'
// Vue.prototype.$post=post;
// Vue.prototype.$get=fetch;
Vue.use(ElementUI)
Vue.use(Mint)
Vue.use(animated)
// Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
