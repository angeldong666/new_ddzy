/* eslint-disable no-new */
import Vue from 'vue'
// import VueRouter from 'vue-router'
import axios from '@/config/http'
// import 'mint-ui/lib/style.css'
import App from './App'
// import Mint from 'mint-ui'
// import VueLazyload from 'vue-lazyload'
// import routes from './routes.js'

import Toast from '@/components/toast.js'
// import store from './store.js'
// import { imgHttpsSrc } from '../../utils/utils.js'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

import {
  gameApi
} from '@/config/api'
// // NProgress简单配置
/*
 * @param {{inc:Number}} NProgress
 * */
// NProgress.inc(0.2)
// NProgress.configure({
//   easing: 'ease',
//   speed: 500,
//   showSpinner: false
// })

// Vue.config.debug = true
// Vue.config.devTools = true
// 如果是非正式环境，加载 VConsole
if (process.env.NODE_ENV !== 'production') {
  let VConsole = require('vconsole/dist/vconsole.min.js');
  let vConsole = new VConsole();
}

Vue.$toast = Vue.prototype.$toast = Toast
Vue.$apis = Vue.prototype.$apis = gameApi;
Vue.prototype.$http = axios
Vue.prototype.$loading = function (type) {
  document.getElementById('loading').style.display = type == 'show' ? 'block' : 'none';
}
// 注册全局过滤器
// Vue.filter('imgHttpsSrc', imgHttpsSrc)

// Vue.use(VueRouter)
// 载入router配置 默认hash;history
// let router = new VueRouter({
//   mode: '',
//   routes: routes
// })

// router.beforeEach((to, from, next) => {
//   Vue.prototype.$loading('show')
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   NProgress.start()
//   next()
// })
// router.afterEach(() => {
//   NProgress.done()
// })
document.body.addEventListener('touchstart', function () {});
new Vue({
  el: '#app',
  // router,
  // store,
  render: h => h(App)
})