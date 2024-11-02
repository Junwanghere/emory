import { createRouter, createWebHistory, onBeforeRouteLeave } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Post from '@/views/Post/index.vue'
import Auth from '@/views/Auth/index.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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

router.beforeEach((to, from) => {
  const auth =  getAuth()
  if(to.matched.some(record => record.meta.requiresAuth)){
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 已登录，允许访问
        return {name: 'home'}
      }
    });
  }
  }
)


export default router
