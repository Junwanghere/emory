<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";

onMounted(() => {
  const userStore = useUserStore()
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.setUser(user)
    } else {
      userStore.setUser(null)
    }
  })
})

</script>
<template>
  <RouterView></RouterView>
</template>
<style></style>