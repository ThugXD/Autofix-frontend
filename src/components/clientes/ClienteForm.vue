<template>
  <BaseModal
    v-model="isOpen"
    :title="isEdit ? 'Editar Cliente' : 'Registar Novo Cliente'"
    size="lg"
    :closable="!loading"
    :close-on-overlay="!loading"
  >
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Nome -->
        <BaseInput
          v-model="form.name"
          label="Nome"
          placeholder="Nome completo"
          required
          :error="errors.name"
          :disabled="loading"
          class="md:col-span-2"
        />

        <!-- Telefone -->
        <BaseInput
          v-model="form.phone"
          label="Telefone"
          type="tel"
          placeholder="870000000"
          required
          :error="errors.phone"
          :disabled="loading"
        />

        <!-- Email -->
        <BaseInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="cliente@exemplo.com"
          required
          :error="errors.email"
          :disabled="loading"
        />

        <!-- Endereço -->
        <BaseInput
          v-model="form.address"
          label="Endereço"
          placeholder="Endereço completo"
          :error="errors.address"
          :disabled="loading"
          class="md:col-span-2"
        />

        <!-- Notas (Opcional) -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Notas (Opcional)
          </label>
          <textarea
            v-model="form.notes"
            rows="3"
            placeholder="Observações sobre o cliente..."
            class="input resize-none"
            :disabled="loading"
          ></textarea>
        </div>
      </div>
    </form>

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
        :loading-text="isEdit ? 'Salvando...' : 'Cadastrando...'"
      >
        {{ isEdit ? 'Salvar' : 'Cadastrar' }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  cliente: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isEdit = computed(() => !!props.cliente)

const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: ''
})

const errors = ref({})

// Resetar ou preencher formulário quando o modal abrir/fechar
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.cliente) {
      // Edição: preencher com dados existentes
      form.value = {
        name: props.cliente.name || '',
        phone: props.cliente.phone || '',
        email: props.cliente.email || '',
        address: props.cliente.address || '',
        notes: props.cliente.notes || ''
      }
    } else {
      // Novo: limpar formulário
      resetForm()
    }
    errors.value = {}
  }
})

const resetForm = () => {
  form.value = {
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  }
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.name.trim()) {
    errors.value.name = 'Nome é obrigatório'
    isValid = false
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Telefone é obrigatório'
    isValid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email inválido'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  const data = {
    ...form.value,
    ...(isEdit.value && { id: props.cliente.id })
  }

  emit('submit', data)
}

const handleCancel = () => {
  if (!props.loading) {
    isOpen.value = false
    resetForm()
  }
}
</script>