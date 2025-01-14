<script setup name="Analysis">
import LineChart from "./components/LineChart.vue";
import PercentageChart from "./components/PercentageChart.vue";
import { ref, computed, watch } from "vue";
import { useUserStore } from "@/stores/user";
import dayjs from "dayjs";
import { calendarGetEmotionsAPI } from "@/apis/calendar";
import { useDateStore } from "@/stores/date";
import { storeToRefs } from "pinia";
import { PlayIcon } from "@heroicons/vue/20/solid";

const userStore = useUserStore();
const dateStore = useDateStore();
const { selectedMonth, selectedYear } = storeToRefs(dateStore);
const monthlyData = ref([]);

const startDate = computed(() => {
  return dayjs(`${selectedYear.value}-${selectedMonth.value}`)
    .startOf("M")
    .format("YYYY-MM-DD");
});
const endDate = computed(() => {
  return dayjs(`${selectedYear.value}-${selectedMonth.value}`)
    .endOf("month")
    .format("YYYY-MM-DD");
});

const getMonthlyData = async () => {
  const uid = userStore.user.uid;
  const data = await calendarGetEmotionsAPI(
    uid,
    startDate.value,
    endDate.value,
  );
  monthlyData.value = data;
};

getMonthlyData();

const minDate = new Date(1900, 0);
const maxDate = computed(() => {
  return new Date();
});
const showDatePicker = ref(false);
const currentDate = ref([`${selectedYear.value}`, `${selectedMonth.value}`]);
const columnType = ["year", "month"];

const handleConfirm = () => {
  selectedYear.value = +currentDate.value[0];
  selectedMonth.value = +currentDate.value[1];
  showDatePicker.value = false;
};

const handleCancel = () => {
  showDatePicker.value = false;
};

watch([selectedYear, selectedMonth], () => {
  getMonthlyData();
});
</script>
<template>
  <div class="p-5 bg-blue-50 h-dvh">
    <h3 class="text-center font-bold text-lg mb-1">分析</h3>
    <div
      class="justify-center flex items-center mb-5"
      @click="showDatePicker = !showDatePicker"
    >
      <span class="text-lg">{{ `${selectedYear}年${selectedMonth}月` }}</span>
      <PlayIcon class="ml-2 hover:cursor-pointer size-4 font-bold rotate-90" />
    </div>
    <LineChart
      class="mb-5"
      :startDate="startDate"
      :endDate="endDate"
      :monthlyData="monthlyData"
    />
    <PercentageChart :monthlyData="monthlyData" />
    <van-popup
      v-model:show="showDatePicker"
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
        @confirm="handleConfirm"
        @cancel="handleCancel()"
      >
        <template #confirm> 確認 </template>
      </van-date-picker>
    </van-popup>
  </div>
</template>
<style></style>
