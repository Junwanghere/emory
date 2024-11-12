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
        padding: 15,
        stepSize: 1,
      }
    },
    x: {
      type: 'time',
      time: {
        displayFormats: {
          day: 'MM/DD'
        }
      },
      ticks: {
        // autoSkip: true,
        // autoSkipPadding	: 7,
        // labelOffset: 10,
        maxTicksLimit: 6,
        crossAlign: 'center',
        padding: 10
      },
      alignToPixels: true,
      min: '2024-11-01',  // 最小日期
      max: '2024-12-01',  // 最大日期
      border: {
        display: false
      },
    }
  }
}

const data = {
  datasets: [
    {
      label: '心情評分',
      backgroundColor: '#7EC69A',
      borderColor: '#7EC69A',
      data: [{x: '2024-11-01', y: 5}, {x: '2024-11-06', y: 3},{x: '2024-11-11', y: 5}, {x: '2024-11-16', y: 1}, {x: '2024-11-21', y: 1}, {x: '2024-11-30', y: 1}, {x: '2024-12-01', y: 1}]
    }
  ],
}

</script>
<template>
  <p>
    Hi
  </p>
  <div class="border-2 rounded-2xl" >
    <Line :data="data" :options="options" />
  </div>
</template>
<style scoped>
</style>