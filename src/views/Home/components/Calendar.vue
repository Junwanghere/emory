<script setup name="Calendar">
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon, PlayIcon } from '@heroicons/vue/20/solid'
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { useDateStore } from '@/stores/date';
import {  useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { logOutAPI } from '@/apis/auth';
import { calendarGetEmotionsAPI } from '@/apis/calendar';

const monthlyData = ref([])



const userStore = useUserStore()
const { selectedYear, setMonth, selectedMonth, yearOfToday, monthOfToday, dateOfToday } = toRefs(useDateStore())
dayjs.locale('zh-tw');
const weekday = ['日', '一', '二', '三', '四', '五', '六']

// 獲得各月有幾點
const daysInMonth = computed(() => {
  return dayjs(`${selectedYear.value}-${selectedMonth.value}`).daysInMonth()
})

// 轉換月份格式
const numberToMonth = computed(() => {
  return dayjs(`${selectedMonth.value}`, 'M').format('MMMM')
})

const getMonthlyData = async() => {
  const uid = userStore.user.uid
  monthlyData.value = await calendarGetEmotionsAPI(uid, selectedYear.value, selectedMonth.value)
}

onMounted(async() => {
  await getMonthlyData()
  monthlyData.value.forEach((item) => {
    const matchDay = dayList.find((day) => {
      return item.date == day.fullDate
    })
    matchDay.emotion = `@/assets/emotions/${item.emotion}.png`
  })
})


// 根據該年該月生成日立
let dayList = []
watch([selectedYear, selectedMonth], () => {
  const firstDayOfMonth = dayjs(`${selectedYear.value}-${selectedMonth.value}`).format('d')
  dayList = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayList.push({
      year: selectedYear.value,
      month: selectedMonth.value,
      date: ''
    })
  }
  for (let i = 1; i < (daysInMonth.value + 1); i++) {
    const day = dayjs(`${selectedYear.value}-${selectedMonth.value}-${i}`).format('dddd')
    const date = `${selectedYear.value}年${selectedMonth.value}月${i}日${day}`
    dayList.push({
      fullDate: date,
      year: selectedYear.value,
      month: selectedMonth.value,
      date: i,
      day: day
    })
    
  }
}, { immediate: true })

const matchToday = (item) => {
  if (item.year == yearOfToday.value && item.month == monthOfToday.value && item.date == dateOfToday.value) {
    return true
  }
}




const currentDate = ref([`${selectedYear.value}`, `${selectedMonth.value}`])
const columnType = ['year', 'month']
const minDate = new Date(1900, 0)
const maxDate = computed(() => {
  return new Date()
})

const handleConfirm = () => {
  selectedYear.value = +currentDate.value[0]
  selectedMonth.value = +currentDate.value[1]
  show.value = false
}

const handleCancel = () => {
  show.value = false
}

const show = ref(false);

const router = useRouter()

const openPost = (item) => {
  router.push({
    name: 'post',
    query: item
  })
}

const userSignOut = () => {
  showConfirmDialog({
    title: '小提醒',
    message:
      '你確定要登出嗎？',
    confirmButtonText:
      '確定',
    cancelButtonText:
      '取消'
  })
    .then(async () => {
      userStore.setUser(null)
      await logOutAPI()
      router.push({
        path: '/auth',
      })
    }).catch(e => { })
}

</script>

<template>
  <div class="calendar-container">
    <div class="header">
      <span @click="userSignOut" class="absolute top-3 right-5">登出</span>
      <div class="year-section" @click="show = !show">
        <span class="year">{{ selectedYear }}</span>
        <PlayIcon class="ml-2 hover:cursor-pointer size-4 font-bold rotate-90" />
      </div>
      <div class="selectBar">
        <ChevronDoubleLeftIcon @click="setMonth(-1)" class="hover:cursor-pointer	 size-7 font-bold">
        </ChevronDoubleLeftIcon>
        <span class="month" @click="show = true">{{ numberToMonth }}</span>
        <ChevronDoubleRightIcon @click="setMonth(1)" class="hover:cursor-pointer size-7 font-bold">
        </ChevronDoubleRightIcon>
      </div>
    </div>
    <div class="days-container">
      <span v-for="item in weekday" class="weekday">{{ item }}</span>
      <div v-for="item in dayList" class="day-container">
        <div :class="{ icon: item.date }" @click="openPost(item)">
          <img v-if="item.date && !item.emotion" src="@/assets/emotions/notchosenneutral.png" alt="">
          <img v-else-if="item.date && item.emotion" src="@/assets/emotions/happy.png" alt="">
        </div>
        <span class="date" :class="{ highlight: matchToday(item) }">
          {{ item.date }}
        </span>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '35%' }" round>
      <van-date-picker v-if="true" v-model="currentDate" title="選擇年月" :min-date="minDate" :max-date="maxDate"
        :columns-type="columnType" visible-option-num="4" @confirm="handleConfirm" @cancel="handleCancel()">
        <template #confirm>
          確認
        </template>
      </van-date-picker>
    </van-popup>

  </div>

</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 10%
}

.weekday {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.days-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(8, 1fr);
  height: 90%;
  align-items: center;
}

.day-container {
  width: 100%;
  height: 100%;
  text-align: center;
  justify-self: end;
}

.date {
  font-size: 0.8rem;
}

.calendar-container {
  width: 100%;
  height: 100vh;
}

.icon {
  width: 80%;
  aspect-ratio: 1 / 1;
  justify-self: center;
}

.year {
  font-size: 2rem;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 700;
}

.year-section {
  position: absolute;
  top: 0;
  left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.month {
  font-size: 1.5rem;
}

.selectBar {
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.highlight {
  color: white;
  display: inline-block;
  background-color: gray;
  padding: 0 0.35rem;
  border-radius: 1rem;
}
</style>