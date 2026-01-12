<template>
  <div class="card">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Veículos por Marca</h3>
      <p class="text-sm text-gray-600">Distribuição de marcas na oficina</p>
    </div>
    <div class="flex flex-col lg:flex-row items-center gap-6">
      <div class="w-full lg:w-1/2">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>
      <div class="w-full lg:w-1/2 space-y-3">
        <div
          v-for="(item, index) in data"
          :key="item.brand"
          class="flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: colors[index] }"
            ></div>
            <span class="text-sm font-medium text-gray-900">{{ item.brand }}</span>
          </div>
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900">{{ item.count }}</span>
            <span class="text-xs text-gray-500 ml-1">
              ({{ ((item.count / totalVehicles) * 100).toFixed(1) }}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const colors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#6B7280'  // Gray
]

const totalVehicles = computed(() => {
  return props.data.reduce((sum, item) => sum + item.count, 0)
})

const chartData = computed(() => ({
  labels: props.data.map(item => item.brand),
  datasets: [
    {
      data: props.data.map(item => item.count),
      backgroundColor: colors,
      borderColor: '#ffffff',
      borderWidth: 3,
      hoverOffset: 8
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      callbacks: {
        label: (context) => {
          const label = context.label || ''
          const value = context.parsed || 0
          const percentage = ((value / totalVehicles.value) * 100).toFixed(1)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  },
  cutout: '65%'
}
</script>

<style scoped>
canvas {
  max-height: 250px;
}
</style>