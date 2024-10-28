<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useDateStore } from '@/stores/date';
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { postUploadImgAPI, postNewPostAPI, postGetDiaryAPI } from '@/apis/post.js'


const { selectedYear, selectedMonth, selectedDate, selectedDay } = toRefs(useDateStore())
const router = useRouter()
const route = useRoute()

const getData =  () => {
  const userSelectDate = `${selectedYear.value}年${selectedMonth.value}月${selectedDate.value}日${selectedDay.value}`
  postGetDiaryAPI(userSelectDate)
  const data = JSON.parse(localStorage.getItem(userSelectDate))
  if (data) {
    dailyContent.value = data.dailyContent
    imagePreview.value = data.imgUrl
  }
}

onMounted(() => {
  const { date, day } = route.query
  selectedDate.value = date
  selectedDay.value = day
  getData()
})


const active = ref(0)

const dailyContent = ref('')
// 用戶上傳照片
const afterRead = async (file) => {
  imagePreview.value = await postUploadImgAPI(file)
}

const imagePreview = ref('')

const closePopup = async () => {
  router.push('/home')
  const date = `${selectedYear.value}年${selectedMonth.value}月${selectedDate.value}日${selectedDay.value}`

  await postNewPostAPI(date, imagePreview.value, dailyContent.value)
  const data = {
    imgUrl: imagePreview.value,
    dailyContent: dailyContent.value
  }
  if (imagePreview.value || dailyContent.value) {
    localStorage.setItem(date, JSON.stringify(data))
    imagePreview.value = ''
    dailyContent.value = ''
  }
}

const changeDay = (value) => {
  let newDay = dayjs(`${selectedYear.value}-${selectedMonth.value}-${selectedDate.value}`).add(value, 'day').format('YYYY-M-D-dddd')
  newDay = newDay.split('-')
  selectedYear.value = +newDay[0]
  selectedMonth.value = +newDay[1]
  selectedDate.value = +newDay[2]
  selectedDay.value = newDay[3]
}

watch(selectedDate, () => {
  imagePreview.value = ''
  dailyContent.value = ''
  const data = {
    year: selectedYear.value,
    month: selectedMonth.value,
    date: selectedDate.value,
    day: selectedDay.value
  }
  router.push({
    name: 'post',
    query: data
  })
  getData()
})

</script>

<template>
  <div>
    <div class="close-btn" @click="closePopup">
      <van-icon size="1.2rem" name="cross" color="#000000" />
    </div>

    <div class="img-container">
      <img v-if="imagePreview" class="img-preview" :src="imagePreview" alt="圖片預覽" />
    </div>

    <van-cell-group inset class="field-container">
      <van-field class="input-field" v-model="dailyContent" rows="2" autosize
        :label="`${selectedYear}年${selectedMonth}月${selectedDate}日${selectedDay}`" type="textarea"
        placeholder="今天過得如何呢？" label-align="top" size="large" />
    </van-cell-group>
    <van-tabbar v-model="active" :border="true" :safe-area-inset-bottom="true" :fixed="true">
      <van-tabbar-item @click="changeDay(-1)" name="left-arrow" icon="arrow-left"></van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <van-uploader :after-read="afterRead" accept=".jpg,.jpeg,.png">
            <van-icon name="photo-o" />
          </van-uploader>
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click=changeDay(1) name="right-arrow" icon="arrow"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close-btn {
  background-color: #e0e0e0;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  right: 1rem;
}




.img-container {
  width: 90%;
  margin: 0 auto;
  margin-top: 3.5rem;
  aspect-ratio: 1 / 1;
  border: 1px solid black
}

.input-field {
  width: 100%;
  padding: 0;
  margin-top: 1rem;
}

.field-container {
  width: 90%;
  margin: 0 auto;
}
</style>