<script setup>
import { onUnmounted, ref } from 'vue'
import emitter from '@/utils/emitter';

const show = ref(false)
emitter.on('open-post',(value) => {
  show.value = value
})

onUnmounted(() => {
  emitter.off('open-post')
})
</script>

<template>
  <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">内容
    <div class="close-btn" @click="show = false">
      <van-icon size="1.2rem" name="cross" color="#000000"/>
    </div>
  </van-popup>
</template>

<style scoped>
.close-btn {
  background-color: #e0e0e0;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

</style>