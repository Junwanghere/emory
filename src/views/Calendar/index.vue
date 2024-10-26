<script setup name="Calendar">
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon, PlayIcon} from '@heroicons/vue/20/solid'
import {computed, reactive, ref, watch} from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw'; 
import emitter from '@/utils/emitter';


dayjs.locale('zh-tw');

const weekday = ['日','一','二','三','四','五','六']

const selectYear = ref(dayjs().year())
const selectMonth = ref(dayjs().month()+1)

const modifyMonth = (value) => {
  selectMonth.value+=value
}

// 控制月份選擇範圍
watch(selectMonth,(nv)=>{
  if(nv >= 12){
    selectMonth.value = 12
  }else if (nv <= 1){
    selectMonth.value = 0
  }
})

// 獲得各月有幾點
const daysInMonth = computed(()=>{
  return dayjs(`${selectYear.value}-${selectMonth.value }`).daysInMonth()
})

// 轉換月份格式
const numberToMonth = computed(() => {
  return dayjs(`${selectMonth.value }`, 'M').format('MMMM')
})

// 根據該年該月生成日立
let dayList = reactive([])
watch([selectYear, selectMonth],() => {
  const firtDayOfMonth = dayjs(`${selectYear.value}-${selectMonth.value }`).format('d')
  dayList = []
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
},{immediate: true})


const currentDate = ref([`${selectYear.value}`, `${selectMonth.value}`])
const columnType = ['year', 'month']
const minDate = new Date(1900, 0)
const maxDate = computed(() => {
  return new Date()
})

const handleConfirm = () => {
  selectYear.value = currentDate.value[0]
  selectMonth.value = +currentDate.value[1]
  show.value = false
}

const handleCancel = () => {
  show.value = false
}


const show = ref(false);
</script>

<template>
  <div class="calendar-container">
    <div class="header">
      <div class="year-section" @click="show = !show">
        <span class="year">{{ selectYear }}</span>
        <PlayIcon class="ml-2 hover:cursor-pointer size-4 font-bold rotate-90"/>
      </div>
      <div class="selectBar">
        <ChevronDoubleLeftIcon @click="modifyMonth(-1)" class="hover:cursor-pointer	 size-7 font-bold"></ChevronDoubleLeftIcon>
        <span class="month" @click="show = true">{{ numberToMonth }}</span>    
        <ChevronDoubleRightIcon @click="modifyMonth(1)" class="hover:cursor-pointer size-7 font-bold"></ChevronDoubleRightIcon>
      </div>
    </div>
    <div class="days-container">
      <span v-for="item in weekday" class="weekday">{{ item }}</span>
      <div v-for="item in dayList"  class="day-container">
        <div :class="{icon : item.day}" @click="emitter.emit('open-post',true)">
        </div>
        <span class="day">
          {{ item.day }}
        </span>
      </div>
    </div>
    <van-popup
      v-model:show="show"
      position="bottom"
      :style="{ height: '35%' }"
      round
    >
      <van-date-picker
        v-if="true"
        v-model="currentDate"
        title="選擇年月"
        :min-date="minDate"
        :max-date="maxDate"
        :columns-type="columnType"
        visible-option-num="4"
        @confirm="handleConfirm()"
        @cancel="handleCancel()"
      >
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
  width:40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}
</style>