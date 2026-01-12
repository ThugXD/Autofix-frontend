<template>
  <BaseModal
    v-model="isOpen"
    title="Confirmar Exclusão"
    size="sm"
    :closable="!loading"
    :close-on-overlay="!loading"
  >
    <div class="text-center py-4">
      <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle class="w-8 h-8 text-red-600" />
      </div>
      
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ title }}
      </h3>
      
      <p class="text-gray-600">
        {{ message }}
      </p>
      
      <p class="text-sm text-gray-500 mt-2">
        Esta ação não pode ser desfeita.
      </p>
    </div>

    <template #footer>
      <BaseButton
        variant="secondary"
        @click="handleCancel"
        :disabled="loading"
      >
        Cancelar
      </BaseButton>
      <BaseButton
        variant="danger"
        @click="handleConfirm"
        :loading="loading"
        loading-text="Removendo..."
      >
        Confirmar Exclusão
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Tem certeza?'
  },
  message: {
    type: String,
    default: 'Deseja realmente excluir este item?'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  if (!props.loading) {
    isOpen.value = false
    emit('cancel')
  }
}
</script>