import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入 Home 组件
const Home = resolve => {
  require.ensure(['../views/Home.vue'], () => {
    resolve(require('../views/Home.vue'))
  })
}

// 引入 About 组件
const About = resolve => {
  require.ensure(['../views/About.vue'], () => {
    resolve(require('../views/About.vue'))
  })
}

Vue.use(VueRouter)

let base = `${process.env.BASE_URL}`; // 获取二级目录

export default new VueRouter({
  mode: 'history',
  base: base,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/about',
    name: 'about',
    component: About
  }]
})