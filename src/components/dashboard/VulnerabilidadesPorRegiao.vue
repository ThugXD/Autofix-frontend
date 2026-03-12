<template>
  <div class="card">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Criancas por Regiao</h3>
      <p class="text-sm text-gray-600">Distribuicao geografica das criancas identificadas</p>
    </div>

    <div class="space-y-4">
      <div
        v-for="(item, index) in data"
        :key="item.regiao"
        class="flex items-center gap-4"
      >
        <div class="w-32 text-sm font-medium text-gray-700 truncate">
          {{ item.regiao }}
        </div>
        <div class="flex-1">
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="h-3 rounded-full transition-all duration-500"
              :class="barColors[index % barColors.length]"
              :style="{ width: `${(item.count / maxCount) * 100}%` }"
            ></div>
          </div>
        </div>
        <div class="w-10 text-sm font-semibold text-gray-900 text-right">
          {{ item.count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const barColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-red-500'
]

const maxCount = computed(() => {
  if (!props.data || props.data.length === 0) return 1
  return Math.max(...props.data.map(item => item.count))
})
</script>
