<template>
  <BaseModal
    v-model="isOpen"
    title="Adicionar Item"
    size="md"
    :closable="!loading"
  >
    <div class="space-y-4">
      <!-- Tipo -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Item <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="form.tipo = 'servico'"
            :class="[
              'p-4 border-2 rounded-lg transition-all',
              form.tipo === 'servico'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            <Wrench :class="['w-6 h-6 mx-auto mb-2', form.tipo === 'servico' ? 'text-blue-600' : 'text-gray-400']" />
            <span :class="['text-sm font-medium', form.tipo === 'servico' ? 'text-blue-900' : 'text-gray-700']">
              Serviço
            </span>
          </button>
          <button
            @click="form.tipo = 'peca'"
            :class="[
              'p-4 border-2 rounded-lg transition-all',
              form.tipo === 'peca'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            <Package :class="['w-6 h-6 mx-auto mb-2', form.tipo === 'peca' ? 'text-green-600' : 'text-gray-400']" />
            <span :class="['text-sm font-medium', form.tipo === 'peca' ? 'text-green-900' : 'text-gray-700']">
              Peça
            </span>
          </button>
        </div>
      </div>

      <!-- Descrição -->
      <BaseInput
        v-model="form.descricao"
        label="Descrição"
        placeholder="Ex: Troca de óleo, Filtro de ar..."
        required
        :error="errors.descricao"
      />

      <!-- Quantidade e Preço -->
      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          v-model="form.quantidade"
          label="Quantidade"
          type="number"
          min="1"
          required
          :error="errors.quantidade"
          @input="calculateSubtotal"
        />

        <BaseInput
          v-model="form.preco_unitario"
          label="Preço Unitário (MT)"
          type="number"
          step="0.01"
          min="0"
          placeholder="0,00"
          required
          :error="errors.preco_unitario"
          @input="calculateSubtotal"
        />
      </div>

      <!-- Desconto (opcional) -->
      <BaseInput
        v-model="form.desconto"
        label="Desconto (MT)"
        type="number"
        step="0.01"
        min="0"
        placeholder="0,00"
        @input="calculateSubtotal"
      />

      <!-- Subtotal -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700">Subtotal:</span>
          <span class="text-xl font-bold text-gray-900">
            {{ formatCurrency(subtotal) }}
          </span>
        </div>
      </div>
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
        variant="primary"
        @click="handleSubmit"
        :loading="loading"
        loading-text="Adicionando..."
      >
        Adicionar
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrdensServicoStore } from '@/stores/ordensServico'
import { Wrench, Package } from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  ordemId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'added'])

const ordensStore = useOrdensServicoStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref({
  tipo: 'servico',
  descricao: '',
  quantidade: 1,
  preco_unitario: 0,
  desconto: 0
})

const errors = ref({})
const loading = ref(false)
const subtotal = ref(0)

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    resetForm()
  }
})

const resetForm = () => {
  form.value = {
    tipo: 'servico',
    descricao: '',
    quantidade: 1,
    preco_unitario: 0,
    desconto: 0
  }
  errors.value = {}
  subtotal.value = 0
}

const calculateSubtotal = () => {
  const quantidade = parseFloat(form.value.quantidade) || 0
  const preco = parseFloat(form.value.preco_unitario) || 0
  const desconto = parseFloat(form.value.desconto) || 0
  subtotal.value = Math.max(0, (quantidade * preco) - desconto)
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.descricao.trim()) {
    errors.value.descricao = 'Descrição é obrigatória'
    isValid = false
  }

  if (!form.value.quantidade || form.value.quantidade < 1) {
    errors.value.quantidade = 'Quantidade deve ser maior que 0'
    isValid = false
  }

  if (!form.value.preco_unitario || form.value.preco_unitario < 0) {
    errors.value.preco_unitario = 'Preço é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  
  const itemData = {
    tipo: form.value.tipo,
    descricao: form.value.descricao,
    quantidade: parseInt(form.value.quantidade),
    preco_unitario: parseFloat(form.value.preco_unitario),
    desconto: parseFloat(form.value.desconto) || 0,
    subtotal: subtotal.value
  }

  const success = await ordensStore.addItem(props.ordemId, itemData)
  loading.value = false

  if (success) {
    isOpen.value = false
    emit('added')
  }
}

const handleCancel = () => {
  if (!loading.value) {
    isOpen.value = false
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value) + ' MT'
}
</script>