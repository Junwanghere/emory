import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Post from '@/views/Post/index.vue'
import Auth from '@/views/Auth/index.vue'
import { useUserStore } from '@/stores/user'
import { auth } from '@/firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true } 
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
      meta: { requiresAuth: true } 
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



router.beforeEach( (to) => {
  if(to.path === '/auth/login' && auth.currentUser){
    console.log('true!')
  }
  if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
    showToast('請先登入')
    return {path: '/auth/login'}
  }
  }
)


export default router
