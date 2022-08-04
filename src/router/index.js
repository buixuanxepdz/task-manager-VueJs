import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layouts/AdminLayout.vue'),
    children:
    [ 
      {
        path:'/profile/:id',
        name:'profile',
        component: () => import('../views/ProfileView.vue')
      },
      {
        path:'/',
        name:'home',
        component: () => import('../views/HomeView.vue')
      },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
