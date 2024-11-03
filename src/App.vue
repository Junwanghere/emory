<script setup>
import { RouterView, useRouter } from 'vue-router';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const router = useRouter()
onMounted(() => {
  const userStore = useUserStore()
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.setUser(user)
    } else {
      //一發現沒登入就請你去登入
      userStore.setUser(null)
      router.push({
        path: '/auth/login'
      })
    }
  })
})

</script>
<template>
  <RouterView></RouterView>
</template>
<style></style>