<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useDateStore } from "@/stores/date";
import { toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import {
  diaryUploadImgAPI,
  diaryPostNewDiaryAPI,
  diaryGetDiaryAPI,
  diaryDelDiaryAPI,
  diaryDelImgAPI,
} from "@/apis/diary.js";
import { useUserStore } from "@/stores/user";
import { showLoadingToast } from "vant";
import "vant/es/toast/style";

const { selectedYear, selectedMonth, selectedDay, selectedWeekday } =
  toRefs(useDateStore());
const dateStore = useDateStore();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const diaryEmotion = ref("");
const resetDiary = () => {
  diaryImg.value = "";
  diaryContent.value = "";
  diaryEmotion.value = "";
};

let compareData = reactive({
  date: "",
  imgUrl: "",
  postContent: "",
  emotion: "",
});

const resetCompareData = () => {
  const emptyData = {
    date: "",
    imgUrl: "",
    postContent: "",
    emotion: "",
  };
  Object.assign(compareData, emptyData);
};

const getDiaryData = async () => {
  resetCompareData();

  const uid = userStore.user.uid;
  const response = await diaryGetDiaryAPI(uid, dateStore.indexDate);
  if (response) {
    Object.assign(compareData, response);
    diaryImg.value = response.imgUrl;
    diaryContent.value = response.postContent;
    diaryEmotion.value = response.emotion;
  }
};

onMounted(async () => {
  const { fullDate } = route.query;
  await getDiaryData(fullDate);
});

const diaryContent = ref("");
// 用戶上傳照片
const afterRead = async (file) => {
  const toast = showLoadingToast({
    message: "上傳中",
    forbidClick: true,
    loadingType: "spinner",
  });
  diaryImg.value = await diaryUploadImgAPI(
    file,
    userStore.user.uid,
    dateStore.selectedFullDate,
  );
  toast.close();
};

const diaryImg = ref("");

const postDiary = async () => {
  // 進行一次資料校驗以避免重複請求
  if (
    compareData.imgUrl == diaryImg.value &&
    compareData.postContent == diaryContent.value &&
    compareData.emotion == diaryEmotion.value
  ) {
    return;
    // 如果已經刪除就不再發請求
  } else if (!diaryContent.value && !diaryEmotion.value && !diaryImg.value) {
    return;
  } else {
    const uid = userStore.user.uid;
    await diaryPostNewDiaryAPI(
      uid,
      dateStore.selectedFullDate,
      diaryImg.value,
      diaryContent.value,
      diaryEmotion.value,
      dateStore.indexDate,
    );
  }
};

const closePopup = async () => {
  await postDiary();
  resetDiary();
  resetCompareData();
  router.push("/home");
};

const delDiary = async () => {
  // 如果都是空的話就不做刪除動作
  if (!diaryContent.value && !diaryImg.value && !diaryEmotion.value) {
    return;
  }
  const uid = userStore.user.uid;
  // 有內容才刪
  if (diaryContent.value || diaryEmotion.value) {
    await diaryDelDiaryAPI(uid, dateStore.indexDate);
    // 刪除成功提示
  }
  if (diaryImg.value) {
    await diaryDelImgAPI(uid, dateStore.indexDate);
  }
  resetDiary();
};

const changeDay = async (value) => {
  // 點選換天時，改變路由，改使用者選擇日期的數據
  await postDiary();
  let newDay = dayjs(
    `${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`,
  )
    .add(value, "day")
    .format("YYYY-M-D-dddd");
  newDay = newDay.split("-");
  selectedYear.value = +newDay[0];
  selectedMonth.value = +newDay[1];
  selectedDay.value = +newDay[2];
  selectedWeekday.value = newDay[3];

  router.push({
    name: "diary",
    query: {
      fullDate: dateStore.selectedFullDate,
    },
  });
};

watch(
  () => route.query.fullDate,
  async () => {
    resetDiary();
    const { fullDate } = route.query;
    await getDiaryData(fullDate);
  },
);

const showAction = ref(false);
const actions = [{ name: "刪除", color: "#ee0a24" }];

const showOptions = () => {
  showAction.value = true;
};

const onCancel = () => {
  showAction.value = false;
};

const onSelect = async (item) => {
  if (item.name == "刪除") {
    await delDiary();
  }
};

const emotionsData = [
  {
    emotion: "veryhappy",
    alt: "VerryHappyIcon",
    activeImgUrl: "/src/assets/emotions/veryhappy.png",
    notActiveImgUrl: "/src/assets/emotions/notchosenveryhappy.png",
  },
  {
    emotion: "happy",
    alt: "HappyIcon",
    activeImgUrl: "/src/assets/emotions/happy.png",
    notActiveImgUrl: "/src/assets/emotions/notchosenhappy.png",
  },
  {
    emotion: "neutral",
    alt: "NeutralIcon",
    activeImgUrl: "/src/assets/emotions/neutral.png",
    notActiveImgUrl: "/src/assets/emotions/notchosenneutral.png",
  },
  {
    emotion: "sad",
    alt: "SadIcon",
    activeImgUrl: "/src/assets/emotions/sad.png",
    notActiveImgUrl: "/src/assets/emotions/notchosensad.png",
  },
  {
    emotion: "verysad",
    alt: "VerySadIcon",
    activeImgUrl: "/src/assets/emotions/verysad.png",
    notActiveImgUrl: "/src/assets/emotions/notchosenverysad.png",
  },
];

const setEmotion = (emotion) => {
  diaryEmotion.value = emotion;
};
</script>

<template>
  <div class="section">
    <div class="btn-container">
      <div class="ellipsis-btn" @click="showOptions">
        <van-icon size="1.2rem" name="ellipsis" color="#000000" />
      </div>
      <div class="close-btn" @click="closePopup">
        <van-icon size="1.2rem" name="cross" color="#000000" />
      </div>
    </div>
    <div class="img-container">
      <van-image
        width="100%"
        fit="cover"
        height="100%"
        :src="diaryImg"
        v-if="diaryImg"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="emotion-section">
      <p class="emotion-sec-text">今天過得怎麼樣？</p>
      <div class="emotion-container">
        <div
          @click="setEmotion(emotion.emotion)"
          class="emotion-img-container"
          v-for="emotion in emotionsData"
          :key="emotion.emotion"
        >
          <img
            v-if="diaryEmotion != emotion.emotion"
            class="emotion-img"
            :src="
              !diaryEmotion ? emotion.activeImgUrl : emotion.notActiveImgUrl
            "
            alt="emotion.alt"
          />
          <img
            v-else
            class="emotion-img"
            :src="emotion.activeImgUrl"
            alt="emotion.alt"
          />
        </div>
      </div>
    </div>
    <van-cell-group inset class="field-container">
      <van-field
        class="input-field"
        v-model="diaryContent"
        rows="2"
        autosize
        :label="dateStore.selectedFullDate"
        type="textarea"
        placeholder="今天過得如何呢？"
        label-align="top"
        size="large"
      />
    </van-cell-group>
    <van-tabbar :border="true" :safe-area-inset-bottom="true" :fixed="true">
      <van-tabbar-item
        @click="changeDay(-1)"
        name="left-arrow"
        icon="arrow-left"
      ></van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <van-uploader :after-read="afterRead" accept=".jpg,.jpeg,.png">
            <van-icon name="photo-o" />
          </van-uploader>
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        @click="changeDay(1)"
        name="right-arrow"
        icon="arrow"
      ></van-tabbar-item>
    </van-tabbar>
    <van-action-sheet
      @select="onSelect"
      v-model:show="showAction"
      @cancel="onCancel"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<style scoped>
.section {
  margin-bottom: 53px;
}

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
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.input-field {
  width: 100%;
  padding: 0;
  margin-top: 1rem;
}

.field-container {
  width: 90%;
  margin: 0 auto;
  margin-top: 0.2rem;
}

.van-image {
  vertical-align: bottom;
}

.emotion-section {
  width: 90%;
  aspect-ratio: 4 / 1;
  background-color: white;
  margin: 0 auto;
  margin-top: 1.3rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.emotion-sec-text {
  font-size: 0.8rem;
  padding-bottom: 0.4rem;
}

.emotion-container {
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.emotion-img-container {
  width: 15%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: transform 0.15s;
  position: relative;
}

.emotion-img-container:active {
  transform: scale(120%);
  transition: transform 0.15s;
}

.van-cell-group {
  margin-top: 1.3rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 0 2rem;
  min-height: 12rem;
}
</style>
