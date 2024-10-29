import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Post from '@/views/Post/index.vue'
import Login from '@/views/Login/index.vue'

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
      path:'/login',
      name: 'login',
      component: Login,
    }
  ]
})

export default router
