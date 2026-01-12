<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <component
      v-if="icon && iconPosition === 'left'"
      :is="icon"
      :class="iconClasses"
    />
    
    <LoadingSpinner
      v-if="loading"
      size="sm"
      :color="spinnerColor"
      container-class="inline-flex"
    />
    
    <span v-if="!loading || loadingText">
      {{ loading && loadingText ? loadingText : text }}
    </span>
    
    <slot v-if="!text && !loading" />
    
    <component
      v-if="icon && iconPosition === 'right' && !loading"
      :is="icon"
      :class="iconClasses"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  icon: {
    type: Object,
    default: null
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const variantClasses = {
  primary: 'bg-gray-900 text-white hover:bg-gray-800',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  success: 'bg-green-500 text-white hover:bg-green-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  warning: 'bg-orange-500 text-white hover:bg-orange-600',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base'
}

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

const buttonClasses = computed(() => [
  'btn',
  variantClasses[props.variant],
  sizeClasses[props.size],
  {
    'w-full': props.fullWidth,
    'opacity-50 cursor-not-allowed': props.disabled || props.loading,
    'cursor-pointer': !props.disabled && !props.loading
  }
])

const iconClasses = computed(() => [
  iconSizeClasses[props.size],
  {
    'mr-2': props.iconPosition === 'left' && (props.text || !props.loading),
    'ml-2': props.iconPosition === 'right'
  }
])

const spinnerColor = computed(() => {
  if (['primary', 'success', 'danger', 'warning'].includes(props.variant)) {
    return 'white'
  }
  return 'gray'
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>