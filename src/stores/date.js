import { defineStore } from "pinia";
import dayjs from "dayjs";
import { ref, computed } from "vue";
import 'dayjs/locale/zh-tw'; 


export const useDateStore = defineStore('date',() => {
  dayjs.locale('zh-tw');


  const today = ref(dayjs().format('YYYY-M-D-dddd').split('-'))
  
  const yearOfToday = computed(() => {
    return +today.value[0]
  })

  const monthOfToday = computed(() => {
    return +today.value[1]
  })

  const dateOfToday = computed(() => {
    return +today.value[2]
  })

  const dayOfToday = computed(() => {
    return today.value[3]
  })

  const setMonth = (value) => {
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


  const selectedYear = ref(yearOfToday.value)
  const selectedMonth = ref(monthOfToday.value)
  const selectedDate = ref(dateOfToday.value)
  const selectedDay = ref(dayOfToday.value)

  return {
    today,
    yearOfToday,
    monthOfToday,
    dateOfToday,
    dayOfToday,
    setMonth,
    selectYear,
    selectedMonth,
    selectedYear,
    selectedDate,
    selectedDay
  }
})