<script setup name="Calendar">
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from '@heroicons/vue/20/solid'
import {computed, reactive, ref, watch} from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw'; 

dayjs.locale('zh-tw');

const weekday = ['日','一','二','三','四','五','六']

const selectYear = ref(dayjs().year())
const selectMonth = ref(dayjs().month()+1)

const modifyYear = (value) => {
  selectYear.value+=value
}

const modifyMonth = (value) => {
  selectMonth.value+=value
}


watch(selectMonth,(nv)=>{
  if(nv >= 12){
    selectMonth.value = 12
  }else if (nv <= 1){
    selectMonth.value = 1
  }
})

const daysInMonth = computed(()=>{
  return dayjs(`${selectYear.value}-${selectMonth.value}`).daysInMonth()
})

const numberToMonth = computed(() => {
  return dayjs(`${selectMonth.value}`, 'M').format('MMMM')
})

let dayList = reactive([])
console.log(dayjs(`${selectYear.value}-${selectMonth.value}-1`).format('d'))
watch([selectYear, selectMonth],() => {
  const firtDayOfMonth = dayjs(`${selectYear.value}-${selectMonth.value}-1`).format('d')
  dayList = []
  console.log(firtDayOfMonth)
  for(let i = 0; i < firtDayOfMonth; i++){
    dayList.push({
      year: selectYear.value,
      month: selectMonth.value,
      day: ''
    })
  }
  for(let i = 1; i < (daysInMonth.value + 1); i++){
    dayList.push({
      year: selectYear.value,
      month: selectMonth.value,
      day: i
    })
  }
  console.log(dayList)
},{immediate: true})
</script>

<template>
  <div class="calendar-container">
    <div class="selectBar">
    <ChevronDoubleLeftIcon @click="modifyYear(-1)" class="hover:cursor-pointer	 size-6 font-bold"></ChevronDoubleLeftIcon>
      <span class="year">{{ selectYear }}</span>    
    <ChevronDoubleRightIcon @click="modifyYear(1)" class="hover:cursor-pointer size-6 "></ChevronDoubleRightIcon>
  </div>
  <div class="selectBar">
    <ChevronDoubleLeftIcon @click="modifyMonth(-1)" class="hover:cursor-pointer	 size-4 font-bold"></ChevronDoubleLeftIcon>
    <span class="month">{{ numberToMonth }}</span>    
    <ChevronDoubleRightIcon @click="modifyMonth(1)" class="hover:cursor-pointer size-4 "></ChevronDoubleRightIcon>
  </div>
  <div class="days-container">
    <span v-for="item in weekday" class="weekday">{{ item }}</span>
    <div v-for="item in dayList"  class="day-container">
      <div :class="{icon : item.day}">
      </div>
      <span class="day">
        {{ item.day }}
      </span>
    </div>
  </div>
  </div>

</template>

<style scoped>
.selectBar {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
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

.day {
  font-size: 0.8rem;
}

.calendar-container {
  width: 100%;
  height:100vh;
}

.icon {
  width: 80%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #e0e0e0;
  justify-self: center;
}

.year {
  font-size: 2rem;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 700;
}
</style>