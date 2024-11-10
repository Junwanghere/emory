import '@/assets/tailwind.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {  onAuthStateChanged,} from "firebase/auth";
import { useUserStore } from './stores/user'
import { auth } from './firebase/firebase'

const app = createApp(App)

app.use(createPinia())
app.use(router)


// 在全局掛auth監控，有變化就同步連動userStore，沒auth就去登入
const userStore = useUserStore()
onAuthStateChanged(auth, (user) => {
  if(user) {
    userStore.setUser(user)
  } else {
    userStore.setUser(null)
    router.push('/auth/login')
  }
})





app.mount('#app')
