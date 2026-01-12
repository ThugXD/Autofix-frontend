<template>
  <div :class="['flex items-center justify-center', containerClass]">
    <div
      :class="[
        'spinner border-4 rounded-full',
        sizeClasses[size],
        `border-${color}-200 border-t-${color}-600`
      ]"
    ></div>
    <span v-if="text" :class="['ml-3 text-gray-600', textSizeClasses[size]]">
      {{ text }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'gray'
  },
  text: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: 'py-8'
  }
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 0.8s linear infinite;
}
</style>