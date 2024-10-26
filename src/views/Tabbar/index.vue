<script setup name="Tabbar">
import { ref } from 'vue'
const active = ref(0)
</script>

<template>
  <van-tabbar v-model="active" >
    <van-tabbar-item @click="show = true" icon="smile-o"></van-tabbar-item>  
    <van-tabbar-item icon="bar-chart-o"></van-tabbar-item>
    <van-tabbar-item icon="wap-nav"></van-tabbar-item>
  </van-tabbar>


</template>  

<style scoped>
.new-page {
  padding: 16px;
  background-color: white;
}

</style>