<script setup>
import { ref } from 'vue'
import emitter from '@/utils/emitter';

const show = ref(false)
emitter.on('open-post',(value) => {
  show.value = value
})
</script>

<template>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">内容</van-popup>
</template>

<script>
</script>