<template>
  <div class="dashboard-card hover:shadow-card-hover transition-all cursor-pointer group">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 mb-1">{{ label }}</p>
        <h3 class="text-3xl font-bold text-gray-900">{{ formattedValue }}</h3>
        
        <div v-if="trend" class="flex items-center gap-1 mt-2">
          <component
            :is="trend.isPositive ? TrendingUp : TrendingDown"
            :class="[
              'w-4 h-4',
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            ]"
          />
          <span
            :class="[
              'text-sm font-medium',
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            ]"
          >
            {{ Math.abs(trend.value) }}%
          </span>
          <span class="text-xs text-gray-500 ml-1">vs. mês anterior</span>
        </div>
      </div>

      <div
        :class="[
          'w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110',
          colorClasses[color]
        ]"
      >
        <component :is="icon" class="w-7 h-7 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'orange', 'green', 'red', 'purple'].includes(value)
  },
  trend: {
    type: Object,
    default: null
  },
  format: {
    type: String,
    default: 'number',
    validator: (value) => ['number', 'currency', 'percentage'].includes(value)
  }
})

const colorClasses = {
  blue: 'bg-dashboard-blue',
  orange: 'bg-dashboard-orange',
  green: 'bg-dashboard-green',
  red: 'bg-dashboard-red',
  purple: 'bg-purple-500'
}

const formattedValue = computed(() => {
  const val = typeof props.value === 'string' ? parseFloat(props.value) : props.value
  
  switch (props.format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MZN',
        minimumFractionDigits: 0
      }).format(val)
    case 'percentage':
      return `${val}%`
    default:
      return props.value
  }
})
</script>