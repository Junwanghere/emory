<script setup name="LineChart">
import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "vue-chartjs";
import { ref, watch, toRefs, computed } from "vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

let delayed;
const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    clip: false,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const yValue = tooltipItem.raw.y;
            return `心情: ${yValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          padding: 15,
          stepSize: 1,
          color: ["#C1E3DC", "#E5F5E2", "#FFFADF", "#FFE9D8", "#F3A2A2"],
          backdropPadding: {
            x: 5,
          },
          showLabelBackdrop: true,
          backdropColor: "transparent",
          callback: () => {
            return "•";
          },
          font: {
            size: 45,
          },
        },
      },
      x: {
        type: "time",
        time: {
          displayFormats: {
            day: "MM/DD",
          },
          tooltipFormat: "YYYY-MM-DD",
        },
        ticks: {
          maxTicksLimit: 7,
          crossAlign: "center",
          padding: 10,
          font: {
            size: 10,
          },
        },
        alignToPixels: true,
        min: startDate.value,
        max: endDate.value,
        border: {
          display: false,
        },
      },
    },
  };
});

const lineChart = ref(null);
const monthlyEmoData = ref([]);

const data = computed(() => {
  return {
    datasets: [
      {
        label: "心情評分",
        backgroundColor: "#7EC69A",
        borderColor: "#7EC69A",
        borderWidth: 2,
        data: monthlyEmoData.value,
      },
    ],
  };
});

const props = defineProps({
  monthlyData: { type: Array, default: ref([]) },
  endDate: { type: String },
  startDate: { type: String },
});
const { monthlyData, endDate, startDate } = toRefs(props);
const valueOfEmotions = {
  veryhappy: 5,
  happy: 4,
  neutral: 3,
  sad: 2,
  verysad: 1,
};

const formatMonData = (newData) => {
  monthlyEmoData.value = [];
  if (newData) {
    newData.forEach((data) => {
      if (data.emotion) {
        monthlyEmoData.value.push({
          x: data.indexDate,
          y: valueOfEmotions[data.emotion],
        });
      }
    });
  } else {
    return;
  }
};

watch(monthlyData, (newData) => {
  formatMonData(newData);
});
</script>
<template>
  <div class="border rounded-2xl bg-white">
    <p class="pt-3 pl-3">心情流</p>
    <Line ref="lineChart" :data="data" :options="options" />
  </div>
</template>

<style scoped></style>
