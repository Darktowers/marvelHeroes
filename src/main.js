import Vue from 'vue'
import vueRouter from 'vue-router'
import App from './App.vue'
import Heroes from './Heroes.vue'
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)
Vue.use(vueRouter);
const routes = [
  { path: '/heroes', component: Heroes },
  { path: '/', component: Heroes },
];
const router = new vueRouter({
  routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
