<template>
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click.self="handleOverlayClick"
      >
        <div
          :class="[
            'modal-content',
            sizeClasses[size]
          ]"
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header"
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <slot name="header">
              <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
            </slot>
            
            <button
              v-if="closable"
              @click="handleClose"
              class="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer || showDefaultFooter"
            class="flex items-center justify-end gap-3 p-6 border-t border-gray-200"
          >
            <slot name="footer">
              <BaseButton
                v-if="showDefaultFooter"
                variant="secondary"
                @click="handleClose"
              >
                Cancelar
              </BaseButton>
              <BaseButton
                v-if="showDefaultFooter"
                variant="primary"
                :loading="loading"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </BaseButton>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  showDefaultFooter: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'confirm'])

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-[95vw]'
}

const handleClose = () => {
  if (props.closable && !props.loading) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay && props.closable && !props.loading) {
    handleClose()
  }
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}
</style>