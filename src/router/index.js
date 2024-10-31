import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Post from '@/views/Post/index.vue'
import Auth from '@/views/Auth/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
    {
      path:'/auth/:mode',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/auth',
      redirect: '/auth/login'
    }
  ]
})

export default router
