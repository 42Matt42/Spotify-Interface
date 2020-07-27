import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search/:research',
      name: 'Search',
      component: () => import('../views/Search.vue'),
      props: true,
    },
    {
      path: '/albums',
      name: 'Albums',
      component: () => import('../views/Albums.vue'),
      props: true,
    },
    { 
      path: '*', 
      redirect: '/' 
    }
  ]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
