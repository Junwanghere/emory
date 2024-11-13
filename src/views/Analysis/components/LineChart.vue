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
import { ref, onMounted } from 'vue'

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
        label: function(tooltipItem) {
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

const data = {
  datasets: [
    {
      label: '心情評分',
      backgroundColor: '#7EC69A',
      borderColor: '#7EC69A',
      borderWidth: 2,
      data: [{x: '2024-11-01', y: 3}, {x: '2024-11-03', y: 3}, {x: '2024-11-06', y: 3},{x: '2024-11-11', y: 3}, {x: '2024-11-16', y: 1}, {x: '2024-11-21', y: 1}, {x: '2024-11-30', y: 1}, {x: '2024-12-01', y: 1}]
    }
  ],
}


</script>
<template>
  <Line class="border	rounded-2xl" :data="data" :options="options" />
</template>

<style scoped>



</style>