<script setup name="LineChart">
import 'chartjs-adapter-moment'
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
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { ref, onMounted, watch, toRefs } from 'vue'




ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
)


const options = {
  responsive: true,
  maintainAspectRatio: true,
  clip: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const yValue = tooltipItem.raw.y;
          return `心情: ${yValue}`;
        }
      }
    }
  },
  scales: {
    y: {
      min: 1,
      max: 5,
      grid: {
        display: false
      },
      border: {
        display: false
      },
      ticks: {
        autoSkip: false,
        padding: 15,
        stepSize: 1,
        color: ['#C1E3DC', '#E5F5E2', '#FFFADF', '#FFE9D8', '#F3A2A2'],
        backdropPadding: {
          x: 5
        },
        showLabelBackdrop: true,
        backdropColor: 'transparent',
        callback: () => {
          return '•'
        },
        font: {
          size: 45,
        }
      }
    },
    x: {
      type: 'time',
      time: {
        displayFormats: {
          day: 'MM/DD'
        },
        tooltipFormat: 'YYYY-MM-DD'
      },
      ticks: {
        maxTicksLimit: 7,
        crossAlign: 'center',
        padding: 10,
        font: {
          size: 10,
        }
      },
      alignToPixels: true,
      min: '2024-11-01',
      max: '2024-12-01',
      border: {
        display: false
      },
    }
  },
}


const monthlyEmoData = ref([])

const data = {
  datasets: [
    {
      label: '心情評分',
      backgroundColor: '#7EC69A',
      borderColor: '#7EC69A',
      borderWidth: 2,
      data: monthlyEmoData.value
    }
  ],
}

const props = defineProps({ monthlyData: { type: Array, default: ref([]) } })
const { monthlyData } = toRefs(props)

const valueOfEmotions = {
  veryhappy: 5,
  happy: 4,
  neutral: 3,
  sad: 2,
  verysad: 1
}

const formatMonData = (newData) => {
  monthlyEmoData.value = []
  newData.forEach(data => {
    if (data.emotion) {
      monthlyEmoData.value.push({ x: data.indexDate, y: valueOfEmotions[data.emotion] })
    }
  })
}


watch(monthlyData, (newData) => {
  formatMonData(newData)
  console.log(monthlyEmoData.value)
})

</script>
<template>
  <Line class="border	rounded-2xl" :data="data" :options="options" />
</template>

<style scoped></style>