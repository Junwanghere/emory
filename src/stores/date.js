import { defineStore } from "pinia";
import dayjs from "dayjs";
import { ref, computed } from "vue";
import 'dayjs/locale/zh-tw'; 


export const useDateStore = defineStore('date',() => {
  dayjs.locale('zh-tw');


  const today = ref(dayjs().format('YYYY-M-D-dddd').split('-'))
  
  const yearOfToday = computed(() => {
    return today.value[0]
  })

  const monthOfToday = computed(() => {
    return today.value[1]
  })

  const dayOfToday = computed(() => {
    return today.value[2]
  })

  const weekdayOfToday = computed(() => {
    return today.value[3]
  })

  const setMonth = (value) => {
    if(selectedYear.value == yearOfToday.value && selectedMonth.value == monthOfToday.value && value == 1){
      return
     }
    selectedMonth.value += value
     if(selectedMonth.value > 12){
      selectedMonth.value = 12
     }
     if(selectedMonth.value < 1){
      selectedMonth.value = 1
     }
  }

  const selectYear = (value) => {
    selectedYear.value = value
  }
  const selectedYear = ref(+yearOfToday.value)
  const selectedMonth = ref(+monthOfToday.value)
  const selectedDay = ref(+dayOfToday.value)
  const selectedWeekday = ref(weekdayOfToday.value)
  const selectedFullDate = computed(() => {
    return `${selectedYear.value}年${selectedMonth.value}月${selectedDay.value}日${selectedWeekday.value}`
  })

  const indexDate = computed(() => {
    return dayjs(`${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`, 'YYYY-M-D').format('YYYY-MM-DD')
  })

  const setSelectedDate = (year, month, date, day) => {
    selectedYear.value = year
    selectedMonth.value = month
    selectedDay.value = date
    selectedWeekday.value = day
  }

  return {
    today,
    yearOfToday,
    monthOfToday,
    dayOfToday,
    weekdayOfToday,
    setMonth,
    selectYear,
    selectedMonth,
    selectedYear,
    selectedDay,
    selectedWeekday,
    selectedFullDate,
    setSelectedDate,
    indexDate
  }
})