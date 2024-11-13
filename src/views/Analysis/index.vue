<script setup name="Analysis">
import LineChart from './components/LineChart.vue';
import PercentageChart from './components/PercentageChart.vue';
import { ref, onMounted, provide } from 'vue'
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';
import { calendarGetEmotionsAPI } from '@/apis/calendar';
import { useDateStore } from '@/stores/date';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()
const dateStore = useDateStore()
const { selectedMonth, selectedYear } = storeToRefs(dateStore) 
const monthlyData = ref([])

const getMonthlyData = async () => {
  const uid = userStore.user.uid
  const startDate = dayjs(`${selectedYear.value}-${selectedMonth.value}`).startOf('M').format('YYYY-MM-DD')
  const endDate = dayjs(`${selectedYear.value}-${selectedMonth.value}`).endOf('M').format('YYYY-MM-DD')
  const data = await calendarGetEmotionsAPI(uid, startDate, endDate)
  monthlyData.value = data
}

getMonthlyData()

provide('monthlyData', monthlyData)
</script>
<template>
  <LineChart  />
  <PercentageChart />
</template>
<style>
</style>