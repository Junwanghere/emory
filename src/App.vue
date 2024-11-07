<script setup>
import { RouterView, useRouter } from 'vue-router';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";


const checkAuthState = () => {
  return new Promise((res) => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      res(user)
    })
  })
}


const router = useRouter()
onMounted(async() => {
  const userStore = useUserStore()
  const auth = getAuth()
  try{
    await setPersistence(auth, browserLocalPersistence)
    const user = await checkAuthState()

    if(user){
      userStore.setUser(user)
    }else{
      userStore.setUser(null)
      router.push({
        path: '/auth/login'
      })
    }
  }catch(e){
    console.log(e)
  }
})

</script>
<template>
  <RouterView></RouterView>
</template>
<style></style>