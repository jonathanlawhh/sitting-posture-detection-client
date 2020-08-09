import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home')
  }, {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/Timeline')
  }, {
    path: '/info',
    name: 'Info',
    component: () => import('../views/Info')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
