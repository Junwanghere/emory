<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';
import { calendarGetEmotionsAPI } from '@/apis/calendar';
import { useDateStore } from '@/stores/date';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()
const dateStore = useDateStore()
const { selectedMonth, selectedYear } = storeToRefs(dateStore) 

const getMonthlyData = async() => {
  const uid = userStore.user.uid
  const startDate = dayjs(`${selectedYear.value}-${selectedMonth.value}`).startOf('M').format('YYYY-MM-DD')
  const endDate = dayjs(`${selectedYear.value}-${selectedMonth.value}`).endOf('M').format('YYYY-MM-DD')
  const monthlyData = await calendarGetEmotionsAPI(uid, startDate, endDate)
  console.log(monthlyData)  
}

onMounted( async() => {
  await getMonthlyData()
})


const emotionData = ref([
  {
    emotion: 'veryhappy', 
    activeImg:   'src/assets/emotions/veryhappy.png', inActiveImg: 'src/assets/emotions/notchosenveryhappy.png',
    perctenage: '25%'
  },
  {
    emotion: 'happy', 
    activeImg:  'src/assets/emotions/happy.png', 
    inActiveImg: 'src/assets/emotions/notchosenhappy.png',
    perctenage: '25%'
  },
  {
    emotion: 'neutral', 
    activeImg: 'src/assets/emotions/neutral.png', inActiveImg: 'src/assets/emotions/notchosenneutral.png',
    perctenage: '25%'
  },
  {
    emotion: 'sad', 
    activeImg: 'src/assets/emotions/sad.png',
    inActiveImg: 'src/assets/emotions/notchosensad.png',
    perctenage: '25%'
  },
  {
    emotion: 'verysad', 
    activeImg:   'src/assets/emotions/verysad.png',
    inActiveImg:   'src/assets/emotions/notchosenverysad.png', 
    perctenage: '25%'
  }
])

</script>
<template>
  <div class="container w-fill p-5 ">
    <p>心情分佈</p>
    <div class="emotion-container flex gap-7">
      <div class="emotion-card flex-1" v-for="item in emotionData">
        <div class="emotion-container">
          <img class="aspect-square" :src="item.activeImg" alt="">
        </div>
        <p class="percentage-text text-center mt-3 bg-gray-200 rounded-2xl">{{ item.perctenage }}</p>
      </div>
    </div>
    <div class="percentage-bar w-fill mt-5 flex rounded-full overflow-hidden bg-gray-200">
      <div :style="{ width: emotionData[0].perctenage}" class="bar bg-[#C1E3DC]"></div>
      <div :style="{ width: emotionData[1].perctenage}" class="bar bg-[#E5F5E2]"></div>
      <div :style="{ width: emotionData[2].perctenage}" class="bar bg-[#FFFADF]"></div>
      <div :style="{ width: emotionData[3].perctenage}" class="bar bg-[#FFE9D8]"></div>
      <div :style="{ width: emotionData[4].perctenage}" class="bar bg-[#F3A2A2]"></div>
    </div>
  </div>
</template>

<style scoped>

.percentage-text {
  font-size: 0.6rem;
  padding: 0.15rem 0;
}

.percentage-bar {
  aspect-ratio: 10 / 1;
}
</style> 