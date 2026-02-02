<template>
  <BaseModal
    v-model="isOpen"
    title="Nova Ordem de Serviço"
    size="lg"
    :closable="!loading"
  >
    <OrdemFormStep1
      v-model="formData"
      :errors="errors"
    />

    <template #footer>
      <BaseButton
        variant="secondary"
        @click="handleCancel"
        :disabled="loading"
      >
        Cancelar
      </BaseButton>
      <BaseButton
        variant="primary"
        @click="handleSubmit"
        :loading="loading"
        loading-text="Criando..."
      >
        Criar Ordem
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrdensServicoStore } from '@/stores/ordensServico'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import OrdemFormStep1 from './OrdemFormStep1.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'created'])

const ordensStore = useOrdensServicoStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const formData = ref({
  clienteId: '',
  veiculoId: '',
  priority: 'media',
  dataPrevista: '',
  problemaRelatado: '',
  observacoes: '',
  status: 'pendente'
})

const errors = ref({})
const loading = ref(false)

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    resetForm()
  }
})

const resetForm = () => {
  formData.value = {
    clienteId: '',
    veiculoId: '',
    priority: 'media',
    dataPrevista: '',
    problemaRelatado: '',
    observacoes: '',
    status: 'pendente'
  }
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!formData.value.clienteId) {
    errors.value.clienteId = 'Cliente é obrigatório'
    isValid = false
  }

  if (!formData.value.veiculoId) {
    errors.value.veiculoId = 'Veículo é obrigatório'
    isValid = false
  }

  if (!formData.value.problemaRelatado.trim()) {
    errors.value.problemaRelatado = 'Problema relatado é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  const ordem = await ordensStore.createOrdem(formData.value)
  loading.value = false

  if (ordem) {
    isOpen.value = false
    emit('created', ordem)
  }
}

const handleCancel = () => {
  if (!loading.value) {
    isOpen.value = false
  }
}
</script>