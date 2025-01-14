<script setup name="Tabbar">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const toPath = (name) => {
  router.push({
    name,
  });
};

const active = ref(0);
const footerRelations = ["calendar", "analysis"];

watch(
  () => route.name,
  (value) => {
    const currentPosition = footerRelations.indexOf(value);
    active.value = currentPosition;
  },
  { immediate: true },
);
</script>

<template>
  <van-tabbar
    :safe-area-inset-bottom="true"
    v-model="active"
    class="max-w-[480px] mx-auto"
  >
    <van-tabbar-item
      @click="toPath('calendar')"
      icon="smile-o"
    ></van-tabbar-item>
    <van-tabbar-item
      @click="toPath('analysis')"
      icon="bar-chart-o"
    ></van-tabbar-item>
    <van-tabbar-item icon="wap-nav"></van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.van-tabbar--fixed {
  left: unset;
}

.new-page {
  padding: 16px;
  background-color: white;
}
</style>
