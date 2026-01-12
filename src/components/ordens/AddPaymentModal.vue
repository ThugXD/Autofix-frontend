<template>
  <BaseModal
    v-model="isOpen"
    title="Registar Pagamento"
    size="md"
    :closable="!loading"
  >
    <div class="space-y-4">
      <!-- Informação da Ordem -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-blue-700">Total da Ordem:</span>
          <span class="font-semibold text-blue-900">{{ formatCurrency(ordem?.total || 0) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-blue-700">Valor Restante:</span>
          <span class="font-bold text-lg text-blue-900">{{ formatCurrency(valorRestante) }}</span>
        </div>
      </div>

      <!-- Valor -->
      <BaseInput
        v-model="form.valor"
        label="Valor do Pagamento (MT)"
        type="number"
        step="0.01"
        min="0"
        :max="valorRestante"
        placeholder="0,00"
        required
        :error="errors.valor"
      />

      <!-- Método de Pagamento -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Método de Pagamento <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="metodo in metodosPagamento"
            :key="metodo.value"
            @click="form.metodo = metodo.value"
            :class="[
              'p-3 border-2 rounded-lg transition-all text-left',
              form.metodo === metodo.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            <component 
              :is="metodo.icon" 
              :class="['w-5 h-5 mb-1', form.metodo === metodo.value ? 'text-blue-600' : 'text-gray-400']" 
            />
            <span :class="['text-sm font-medium block', form.metodo === metodo.value ? 'text-blue-900' : 'text-gray-700']">
              {{ metodo.label }}
            </span>
          </button>
        </div>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Status <span class="text-red-500">*</span>
        </label>
        <select v-model="form.status" class="input">
          <option value="confirmado">Confirmado</option>
          <option value="pendente">Pendente</option>
        </select>
      </div>

      <!-- Observações -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Observações
        </label>
        <textarea
          v-model="form.observacoes"
          rows="2"
          placeholder="Informações adicionais sobre o pagamento..."
          class="input resize-none"
        ></textarea>
      </div>

      <!-- Resumo -->
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-green-700">Valor a Registar:</span>
          <span class="text-xl font-bold text-green-900">
            {{ formatCurrency(parseFloat(form.valor) || 0) }}
          </span>
        </div>
        <div v-if="parseFloat(form.valor) > 0" class="flex justify-between items-center mt-2 pt-2 border-t border-green-200">
          <span class="text-sm text-green-700">Restante após pagamento:</span>
          <span class="text-sm font-semibold text-green-900">
            {{ formatCurrency(valorRestante - (parseFloat(form.valor) || 0)) }}
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
        variant="success"
        @click="handleSubmit"
        :loading="loading"
        loading-text="Registando..."
      >
        Registar Pagamento
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useOrdensServicoStore } from '@/stores/ordensServico'
import {
  Banknote,
  CreditCard,
  Smartphone,
  ArrowRightLeft
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  ordem: {
    type: Object,
    default: null
  },
  valorRestante: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue', 'added'])

const ordensStore = useOrdensServicoStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const metodosPagamento = [
  { value: 'dinheiro', label: 'Dinheiro', icon: Banknote },
  { value: 'cartao_credito', label: 'Cartão Crédito', icon: CreditCard },
  { value: 'cartao_debito', label: 'Cartão Débito', icon: CreditCard },
  { value: 'pix', label: 'M-Pesa', icon: Smartphone },
  { value: 'transferencia', label: 'Transferência', icon: ArrowRightLeft }
]

const form = ref({
  valor: 0,
  metodo: 'dinheiro',
  status: 'confirmado',
  observacoes: ''
})

const errors = ref({})
const loading = ref(false)

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    resetForm()
  }
})

watch(() => props.valorRestante, (valor) => {
  if (valor > 0 && props.modelValue) {
    form.value.valor = valor
  }
})

const resetForm = () => {
  form.value = {
    valor: props.valorRestante,
    metodo: 'dinheiro',
    status: 'confirmado',
    observacoes: ''
  }
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  const valor = parseFloat(form.value.valor)

  if (!valor || valor <= 0) {
    errors.value.valor = 'Valor deve ser maior que 0'
    isValid = false
  }

  if (valor > props.valorRestante) {
    errors.value.valor = `Valor não pode ser maior que ${formatCurrency(props.valorRestante)}`
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  
  const paymentData = {
    valor: parseFloat(form.value.valor),
    metodo: form.value.metodo,
    status: form.value.status,
    observacoes: form.value.observacoes.trim()
  }

  const success = await ordensStore.addPayment(props.ordem.id, paymentData)
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