<script setup>
import { RouterView, useRouter } from 'vue-router';
import { onBeforeMount, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import {  onAuthStateChanged,} from "firebase/auth";
import { auth } from './firebase';



</script>
<template>
  <RouterView></RouterView>
</template>
<style></style>