<template>
  <BaseModal
    v-model="isOpen"
    :title="isEdit ? 'Editar Serviço' : 'Novo Serviço'"
    size="md"
    :closable="!loading"
  >
    <div class="space-y-4">
      <BaseInput
        v-model="form.name"
        label="Nome do Serviço"
        placeholder="Ex: Troca de óleo"
        required
        :error="errors.name"
      />

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Descrição
        </label>
        <textarea
          v-model="form.description"
          rows="2"
          placeholder="Descrição breve do serviço..."
          class="input resize-none"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Categoria <span class="text-red-500">*</span>
        </label>
        <select v-model="form.category" class="input" required>
          <option value="">Selecione</option>
          <option value="manutencao">Manutenção</option>
          <option value="reparo">Reparo</option>
          <option value="diagnostico">Diagnóstico</option>
          <option value="instalacao">Instalação</option>
        </select>
        <p v-if="errors.category" class="mt-1.5 text-sm text-red-600">
          {{ errors.category }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          v-model="form.default_price"
          label="Preço Padrão (MT)"
          type="number"
          step="0.01"
          min="0"
          placeholder="0,00"
          required
          :error="errors.default_price"
        />

        <BaseInput
          v-model="form.estimated_time"
          label="Tempo (minutos)"
          type="number"
          min="0"
          placeholder="30"
          :error="errors.estimated_time"
        />
      </div>

      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          v-model="form.is_active"
          id="is_active"
          class="w-4 h-4 text-blue-600 rounded"
        />
        <label for="is_active" class="text-sm font-medium text-gray-700">
          Serviço ativo
        </label>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="handleCancel" :disabled="loading">
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
import { ref, computed, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  servico: { type: Object, default: null },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isEdit = computed(() => !!props.servico)

const form = ref({
  name: '',
  description: '',
  category: '',
  default_price: 0,
  estimated_time: 30,
  is_active: true
})

const errors = ref({})

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.servico) {
      form.value = {
        name: props.servico.name || '',
        description: props.servico.description || '',
        category: props.servico.category || '',
        default_price: props.servico.default_price || 0,
        estimated_time: props.servico.estimated_time || 30,
        is_active: props.servico.is_active !== undefined ? props.servico.is_active : true
      }
    } else {
      resetForm()
    }
    errors.value = {}
  }
})

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    category: '',
    default_price: 0,
    estimated_time: 30,
    is_active: true
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

  if (!form.value.category) {
    errors.value.category = 'Categoria é obrigatória'
    isValid = false
  }

  if (!form.value.default_price || form.value.default_price < 0) {
    errors.value.default_price = 'Preço é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  const data = {
    ...form.value,
    default_price: parseFloat(form.value.default_price),
    estimated_time: parseInt(form.value.estimated_time) || 0,
    ...(isEdit.value && { id: props.servico.id })
  }

  emit('submit', data)
}

const handleCancel = () => {
  if (!props.loading) {
    isOpen.value = false
  }
}
</script>