<script setup name="Home">
import Navigation from './components/Navigation.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterView />
    <Navigation></Navigation>
  </div>
</template>