<template>
  <div class="card">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Top Serviços</h3>
      <p class="text-sm text-gray-600">Serviços mais realizados</p>
    </div>

    <div class="space-y-4">
      <div
        v-for="(service, index) in services"
        :key="service.name"
        class="relative"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
              :class="getRankColor(index)"
            >
              {{ index + 1 }}
            </div>
            <span class="text-sm font-medium text-gray-900">{{ service.name }}</span>
          </div>
          <span class="text-sm font-semibold text-gray-900">
            {{ service.count }}x
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500"
            :class="getBarColor(index)"
            :style="{ width: getPercentage(service.count) + '%' }"
          ></div>
        </div>

        <div class="flex justify-between items-center mt-1">
          <span class="text-xs text-gray-500">
            Receita: {{ formatCurrency(service.revenue) }}
          </span>
          <span class="text-xs text-gray-500">
            {{ getPercentage(service.count) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  services: {
    type: Array,
    required: true
  }
})

const maxCount = computed(() => {
  return Math.max(...props.services.map(s => s.count))
})

const getPercentage = (count) => {
  return ((count / maxCount.value) * 100).toFixed(0)
}

const getRankColor = (index) => {
  const colors = [
    'bg-yellow-100 text-yellow-700',
    'bg-gray-200 text-gray-700',
    'bg-orange-100 text-orange-700',
    'bg-blue-100 text-blue-700',
    'bg-purple-100 text-purple-700'
  ]
  return colors[index] || 'bg-gray-100 text-gray-700'
}

const getBarColor = (index) => {
  const colors = [
    'bg-yellow-500',
    'bg-gray-400',
    'bg-orange-500',
    'bg-blue-500',
    'bg-purple-500'
  ]
  return colors[index] || 'bg-gray-400'
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 0
  }).format(value)
}
</script>