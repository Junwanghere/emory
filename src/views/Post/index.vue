<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import emitter from '@/utils/emitter';
import { useDateStore } from '@/stores/date';
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const {selectedYear, selectedMonth, selectedDate, selectedDay} = toRefs(useDateStore())
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const {date, day}= route.query
  selectedDate.value = date
  selectedDay.value = day
  const userSelectDate = `${selectedYear.value}年${selectedMonth.value}月${selectedDate.value}日${selectedDay.value}`
  const data = JSON.parse(localStorage.getItem(userSelectDate))
  if(data){
    dailyContent.value = data.dailyContent
    imagePreview.value = data.imgUrl
  }
})


const active = ref(0)

const dailyContent = ref('')

const afterRead = (file) => {
  imagePreview.value = file.objectUrl
}

const imagePreview = ref('')

const closePopup = () =>{
  router.push('/home')
  const date = `${selectedYear.value}年${selectedMonth.value}月${selectedDate.value}日${selectedDay.value}`
  const data = {
    imgUrl: imagePreview.value,
    dailyContent: dailyContent.value
  }
  if(imagePreview.value || dailyContent.value){
    localStorage.setItem(date, JSON.stringify(data))
    imagePreview.value = ''
    dailyContent.value = ''
  }
}
</script>

<template>
  <div>
    <div class="close-btn" @click="closePopup">
      <van-icon size="1.2rem" name="cross" color="#000000"/>
    </div>

    <div  class="img-container">
      <img v-if="imagePreview" class="img-preview" :src="imagePreview" alt="圖片預覽" />
    </div>

    <van-cell-group inset>
      <van-field
        class="input-field"
        v-model="dailyContent"
        rows="2"
        autosize
        :label="`${selectedYear}年${selectedMonth}月${selectedDate}日${selectedDay}`"
        type="textarea"
        placeholder="今天過得如何呢？"
        label-align="top"
        size="large"
      />
    </van-cell-group>
    <van-tabbar v-model="active" :border="true" :safe-area-inset-bottom="true" :fixed="true">
      <van-tabbar-item name="left-arrow" icon="arrow-left"></van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <van-uploader :after-read="afterRead" accept=".jpg,.jpeg,.png" >
            <van-icon name="photo-o" />
          </van-uploader>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="right-arrow" icon="arrow"></van-tabbar-item>
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

/* .input-field {
} */
</style>