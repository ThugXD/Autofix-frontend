<template>
  <BaseModal
    v-model="isOpen"
    title="Atualizar Status"
    size="sm"
    :closable="!loading"
  >
    <div v-if="ordem" class="space-y-4">
      <div class="bg-gray-50 rounded-lg p-4">
        <p class="text-sm text-gray-600">Ordem</p>
        <p class="font-semibold text-gray-900">{{ ordem.numero }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Novo Status
        </label>
        <select v-model="newStatus" class="input">
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="aguardando_pecas">Aguardando Peças</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
    </div>

    <template #footer>
      <BaseButton
        variant="secondary"
        @click="isOpen = false"
        :disabled="loading"
      >
        Cancelar
      </BaseButton>
      <BaseButton
        variant="primary"
        @click="handleUpdate"
        :loading="loading"
        loading-text="Atualizando..."
      >
        Atualizar
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrdensServicoStore } from '@/stores/ordensServico'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  ordem: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'updated'])

const ordensStore = useOrdensServicoStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const newStatus = ref('')
const loading = ref(false)

watch(() => props.ordem, (ordem) => {
  if (ordem) {
    newStatus.value = ordem.status
  }
})

const handleUpdate = async () => {
  if (!props.ordem || !newStatus.value) return

  loading.value = true
  const success = await ordensStore.updateStatus(props.ordem.id, newStatus.value)
  loading.value = false

  if (success) {
    isOpen.value = false
    emit('updated')
  }
}
</script>