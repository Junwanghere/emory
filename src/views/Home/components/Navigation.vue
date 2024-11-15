<script setup name="Tabbar">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toPath = (name) => {
  router.push({
    name
  })
}

const active = ref(0)
</script>

<template>
  <van-tabbar v-model="active">
    <van-tabbar-item @click="toPath('calendar')" icon="smile-o"></van-tabbar-item>
    <van-tabbar-item @click="toPath('analysis')" icon="bar-chart-o"></van-tabbar-item>
    <van-tabbar-item icon="wap-nav"></van-tabbar-item>
  </van-tabbar>


</template>

<style scoped>
.new-page {
  padding: 16px;
  background-color: white;
}
</style>