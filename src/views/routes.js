export default [{
  path: '/',
  name: 'home',
  meta: {
    title: "蛋蛋庄园",
  },
  component: resolve => require(['./home.vue'], resolve)
}, {
  path: '/dress',
  name: 'dress',
  meta: {
    title: "装扮",
  },
  component: resolve => require(['./dress.vue'], resolve)
}, ]