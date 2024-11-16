<script setup name="Analysis">
import LineChart from './components/LineChart.vue';
import PercentageChart from './components/PercentageChart.vue';
import { ref, onMounted, provide, computed } from 'vue'
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';
import { calendarGetEmotionsAPI } from '@/apis/calendar';
import { useDateStore } from '@/stores/date';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()
const dateStore = useDateStore()
const { selectedMonth, selectedYear } = storeToRefs(dateStore)
const monthlyData = ref([])

const startDate = computed(() => {
  return dayjs(`${selectedYear.value}-${selectedMonth.value}`).startOf('M').format('YYYY-MM-DD')
})
const endDate = computed(() => {
  return dayjs(`${selectedYear.value}-${selectedMonth.value}`).add(30, 'day').format('YYYY-MM-DD')
})

const getMonthlyData = async () => {
  const uid = userStore.user.uid
  const data = await calendarGetEmotionsAPI(uid, startDate.value, endDate.value)
  monthlyData.value = data
}

getMonthlyData()

provide('monthlyData', monthlyData)


</script>
<template>
  <LineChart :startDate="startDate" :endDate="endDate" :monthlyData="monthlyData" />
  <PercentageChart :monthlyData="monthlyData" />
</template>
<style></style>