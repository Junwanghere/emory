<script setup>
import { onMounted, computed, reactive, ref, watch } from 'vue'
import { useDateStore } from '@/stores/date';
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { postUploadImgAPI, postNewPostAPI, postGetDiaryAPI, postDelDiaryAPI, postDelImgAPI } from '@/apis/post.js'
import { useUserStore } from '@/stores/user';


const { selectedYear, selectedMonth, selectedDate, selectedDay } = toRefs(useDateStore())
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const userSelectDate = computed(() => {
  return `${selectedYear.value}年${selectedMonth.value}月${selectedDate.value}日${selectedDay.value}`
})


const resetDiary = () => {
  imagePreview.value = ''
  dailyContent.value = ''
}

let compareData = reactive({
  date: '',
  imgUrl: '',
  postContent: ''
})

const resetCompareData = () => {
  const emptyData = {
    date: '',
    imgUrl: '',
    postContent: ''
  }
  Object.assign(compareData, emptyData)
}

const getDiaryData = async () => {
  resetCompareData()

  const uid = userStore.user.uid
  console.log(userSelectDate.value)
  const response = await postGetDiaryAPI(uid ,userSelectDate.value)
  if (response) {
    Object.assign(compareData, response)
    imagePreview.value = response.imgUrl
    dailyContent.value = response.postContent
  }
}

onMounted(async () => {
  const { date, day } = route.query
  selectedDate.value = date
  selectedDay.value = day
  await getDiaryData()
})



const dailyContent = ref('')
// 用戶上傳照片
const afterRead = async (file) => {
  const toast = showLoadingToast({
    message: '上傳中',
    forbidClick: true,
    loadingType: 'spinner',
  });
  imagePreview.value = await postUploadImgAPI(file, userStore.user.uid, userSelectDate.value )
  toast.close()
}

const imagePreview = ref('')

const postDiary = async () => {
  // 進行一次資料校驗以避免重複請求
  const date = `${selectedYear.value}年${selectedMonth.value}月${selectedDate.value}日${selectedDay.value}`
  if (compareData.imgUrl == imagePreview.value && compareData.postContent == dailyContent.value) {
    return
  } else {
    const uid = userStore.user.uid
    await postNewPostAPI(uid, date, imagePreview.value, dailyContent.value)
  }
}

const closePopup = async () => {
  await postDiary()
  resetDiary()
  resetCompareData()
  router.push('/home')
}

const delDiary = async () => {
  if (!dailyContent.value && !imagePreview.value) {
    return
  }
  const uid = userStore.user.uid
  await postDelDiaryAPI(uid, userSelectDate.value)
  await postDelImgAPI(uid ,userSelectDate.value)
  resetDiary()
}

const changeDay = async (value) => {
  // 點選換天時，改變路由，改使用者選擇日期的數據
  await postDiary()
  let newDay = dayjs(`${selectedYear.value}-${selectedMonth.value}-${selectedDate.value}`).add(value, 'day').format('YYYY-M-D-dddd')
  newDay = newDay.split('-')
  selectedYear.value = +newDay[0]
  selectedMonth.value = +newDay[1]
  selectedDate.value = +newDay[2]
  selectedDay.value = newDay[3]

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
}

watch(() => route.query.date, async () => {
  resetDiary()
  await getDiaryData()
})

const showAction = ref(false)
const actions = [
  { name: '刪除', color: '#ee0a24' },
];

const showOptions = () => {
  showAction.value = true
}

const onCancel = () => {
  showAction.value = false
}



const onSelect = async (item) => {
  if (item.name == '刪除') {
    await delDiary()
  }
}

</script>

<template>
  <div>
    <div class="btn-container">
      <div class="ellipsis-btn" @click="showOptions">
        <van-icon size="1.2rem" name="ellipsis" color="#000000" />
      </div>
      <div class="close-btn" @click="closePopup">
        <van-icon size="1.2rem" name="cross" color="#000000" />
      </div>
    </div>
    <div class="img-container">
      <van-image width="100%" fit="cover" height="100%" :src="imagePreview" v-if="imagePreview">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>

    <van-cell-group inset class="field-container">
      <van-field class="input-field" v-model="dailyContent" rows="2" autosize
        :label="`${selectedYear}年${selectedMonth}月${selectedDate}日${selectedDay}`" type="textarea"
        placeholder="今天過得如何呢？" label-align="top" size="large" />
    </van-cell-group>
    <van-tabbar :border="true" :safe-area-inset-bottom="true" :fixed="true">
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
    <van-action-sheet @select="onSelect" v-model:show="showAction" @cancel="onCancel" :actions="actions"
      cancel-text="取消" close-on-click-action />
  </div>
</template>

<style scoped>
.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-container {
  position: absolute;
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: end;
  right: 5%;
  top: 3%;
}

.ellipsis-btn {
  background-color: #e0e0e0;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 0.7rem;
}

.close-btn {
  background-color: #e0e0e0;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
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

.van-image {
  vertical-align: bottom;
}
</style>