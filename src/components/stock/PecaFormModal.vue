<template>
  <BaseModal
    v-model="isOpen"
    :title="isEdit ? 'Editar Peça' : 'Nova Peça'"
    size="lg"
    :closable="!loading"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Identificação -->
      <BaseInput
        v-model="form.name"
        label="Nome da Peça"
        placeholder="Ex: Filtro de Óleo"
        required
        :error="errors.name"
      />

      <BaseInput
        v-model="form.code"
        label="Código / SKU"
        placeholder="Ex: FLT-123"
        required
        :error="errors.code"
      />

      <!-- Marca e Categoria -->
      <BaseInput
        v-model="form.brand"
        label="Marca"
        placeholder="Ex: Bosch"
      />

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Categoria
        </label>
        <select v-model="form.category" class="input">
          <option value="">Selecione</option>
          <option value="motor">Motor</option>
          <option value="suspensao">Suspensão</option>
          <option value="freio">Travões</option>
          <option value="eletrica">Elétrica</option>
          <option value="manutencao">Manutenção Geral</option>
        </select>
      </div>

      <!-- Financeiro e Stock -->
      <BaseInput
        v-model="form.unitPrice"
        label="Preço Unitário (MT)"
        type="number"
        step="0.01"
        min="0"
        required
        :error="errors.unitPrice"
      />

      <!-- Stock Management -->
      <div class="space-y-1">
        <BaseInput
          v-model="form.quantityInStock"
          :label="isEdit ? 'Stock Atual' : 'Stock Inicial'"
          type="number"
          min="0"
          :disabled="isEdit"
          :placeholder="isEdit ? '' : '0'"
          class="disabled:bg-gray-100 disabled:cursor-not-allowed"
          :error="errors.quantityInStock"
        />
        <p v-if="isEdit" class="text-[11px] text-gray-500 italic px-1">
          Para ajustar o stock, utilize o botão de <strong>Movimentação</strong> na tabela.
        </p>
      </div>

      <BaseInput
        v-model="form.minStockLevel"
        label="Nível Mínimo (Alerta)"
        type="number"
        min="0"
        placeholder="E.g. 5"
      />

      <!-- Logística -->
      <BaseInput
        v-model="form.location"
        label="Localização no Armazém"
        placeholder="Ex: Prateleira A1"
      />

      <BaseInput
        v-model="form.supplier"
        label="Fornecedor Principal"
        placeholder="Ex: AutoPeças Lda"
      />

      <!-- Descrição -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Descrição Técnica
        </label>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Detalhes sobre compatibilidade, especificações..."
          class="input resize-none"
        ></textarea>
      </div>

      <div class="flex items-center gap-2 md:col-span-2">
        <input
          type="checkbox"
          v-model="form.isActive"
          id="isActivePeca"
          class="w-4 h-4 text-blue-600 rounded"
        />
        <label for="isActivePeca" class="text-sm font-medium text-gray-700">
          Disponível para venda
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
  peca: { type: Object, default: null },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isEdit = computed(() => !!props.peca)

const form = ref({
  name: '',
  code: '',
  brand: '',
  description: '',
  category: '',
  unitPrice: 0,
  quantityInStock: 0,
  minStockLevel: 5,
  location: '',
  supplier: '',
  isActive: true
})

const errors = ref({})

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.peca) {
      form.value = {
        name: props.peca.name || '',
        code: props.peca.code || '',
        brand: props.peca.brand || '',
        description: props.peca.description || '',
        category: props.peca.category || '',
        unitPrice: props.peca.unitPrice || 0,
        quantityInStock: props.peca.quantityInStock || 0,
        minStockLevel: props.peca.minStockLevel || 0,
        location: props.peca.location || '',
        supplier: props.peca.supplier || '',
        isActive: props.peca.isActive !== undefined ? props.peca.isActive : true
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
    code: '',
    brand: '',
    description: '',
    category: '',
    unitPrice: 0,
    quantityInStock: 0,
    minStockLevel: 5,
    location: '',
    supplier: '',
    isActive: true
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

  if (!form.value.code.trim()) {
    errors.value.code = 'Código é obrigatório'
    isValid = false
  }

  if (!form.value.unitPrice || form.value.unitPrice < 0) {
    errors.value.unitPrice = 'Preço unitário é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  const data = {
    ...form.value,
    unitPrice: parseFloat(form.value.unitPrice),
    quantityInStock: parseInt(form.value.quantityInStock) || 0,
    minStockLevel: parseInt(form.value.minStockLevel) || 0
  }

  emit('submit', data)
}

const handleCancel = () => {
  if (!props.loading) {
    isOpen.value = false
  }
}
</script>
