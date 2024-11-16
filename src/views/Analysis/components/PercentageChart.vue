<script setup>
import { ref, computed, watch, toRefs } from 'vue'



const emotionData = ref([
  {
    emotion: 'veryhappy',
    activeImg: '/src/assets/emotions/veryhappy.png',
    inActiveImg: '/src/assets/emotions/notchosenveryhappy.png',
    percentage: 0
  },
  {
    emotion: 'happy',
    activeImg: '/src/assets/emotions/happy.png',
    inActiveImg: '/src/assets/emotions/notchosenhappy.png',
    percentage: 0
  },
  {
    emotion: 'neutral',
    activeImg: '/src/assets/emotions/neutral.png',
    inActiveImg: '/src/assets/emotions/notchosenneutral.png',
    percentage: 0
  },
  {
    emotion: 'sad',
    activeImg: '/src/assets/emotions/sad.png',
    inActiveImg: '/src/assets/emotions/notchosensad.png',
    percentage: 0
  },
  {
    emotion: 'verysad',
    activeImg: '/src/assets/emotions/verysad.png',
    inActiveImg: '/src/assets/emotions/notchosenverysad.png',
    percentage: 0
  }
])

const resetEmotionPercentage = () => {
  emotionData.value.forEach(item => item.percentage = 0)
}


const getEmotionPercentage = (newData) => {
  resetEmotionPercentage()
  const emotionMap = new Map()
  if (newData) {
    let emotionCount = 0
    newData.forEach(data => {
      if (data.emotion) {
        emotionCount++
        if (emotionMap.has(data.emotion)) {
          emotionMap.set(data.emotion, emotionMap.get(data.emotion) + 1)
        } else {
          emotionMap.set(data.emotion, 1)
        }
      }
    })
    // 有填寫emotion
    if (emotionCount) {
      emotionMap.forEach((value, key) => {
        emotionMap.set(key, (value / emotionCount) * 100)
      })
      emotionMap.forEach((value, key) => {
        emotionData.value.forEach((data) => {
          if (data.emotion == key) {
            data.percentage = value
          }
        })
      })
    } else {
      //資料裡面沒有emotion
      return
    }
  } else {
    //沒抓到資料
    return
  }
}

const hasData = computed(() => {
  return !emotionData.value.some((data) => {
    return data.percentage > 0
  })
})

const props = defineProps({ 
  monthlyData: {
    type: Array,
    default: ref([])
  }
})

const { monthlyData } = toRefs(props)

watch(monthlyData, (newData) => {
  getEmotionPercentage(newData)
}, { immediate: true })

</script>
<template>
  <div class="container w-fill p-5 border	rounded-2xl bg-white">
    <p class="mb-7">心情分佈</p>
    <p class="text-center text-sm mb-6 text-gray-400" v-if="hasData">還沒有紀錄...</p>
    <div class="emotion-container flex gap-7">
      <div class="emotion-card flex-1" v-for="item in emotionData" :key="item.emotion">
        <div class="emotion-container">
          <img class="aspect-square" :src="item.percentage ? item.activeImg : item.inActiveImg" alt="">
        </div>
        <p :class="{ 'valid-percentage': item.percentage }"
          class="percentage-text text-center mt-3 bg-gray-200 rounded-2xl">{{ `${item.percentage.toFixed()}%` }}</p>
      </div>
    </div>
    <div class="percentage-bar w-fill mt-5 flex rounded-full overflow-hidden bg-gray-200">
      <div :style="{ width: `${emotionData[0].percentage}%` }" class="bar bg-[#C1E3DC]"></div>
      <div :style="{ width: `${emotionData[1].percentage}%` }" class="bar bg-[#E5F5E2]"></div>
      <div :style="{ width: `${emotionData[2].percentage}%` }" class="bar bg-[#FFFADF]"></div>
      <div :style="{ width: `${emotionData[3].percentage}%` }" class="bar bg-[#FFE9D8]"></div>
      <div :style="{ width: `${emotionData[4].percentage}%` }" class="bar bg-[#F3A2A2]"></div>
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

.valid-percentage {
  background-color: #C1E3DC;
}
</style>