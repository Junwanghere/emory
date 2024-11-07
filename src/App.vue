<script setup>
import { RouterView, useRouter } from 'vue-router';
import { onBeforeMount, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import {  onAuthStateChanged,} from "firebase/auth";
import { auth } from './firebase';

onBeforeMount(() => {
  const userStore = useUserStore()
  onAuthStateChanged(auth, (user) => {
    if(user){
      userStore.setUser(user)
    }else{
      userStore.setUser(null)
    }
  })
})

</script>
<template>
  <RouterView></RouterView>
</template>
<style></style>