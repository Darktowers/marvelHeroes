import Vue from 'vue'
import vueRouter from 'vue-router'
import App from './App.vue'
import Heroes from './Heroes.vue'
import Home from './Home.vue'



Vue.use(vueRouter);
const routes = [
  { path: '/heroes', component: Heroes },
  { path: '/', component: Home },
];
const router = new vueRouter({
  routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
