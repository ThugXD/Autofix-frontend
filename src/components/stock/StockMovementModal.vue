<template>
  <BaseModal
    v-model="isOpen"
    title="Movimentar Stock"
    size="md"
    :closable="!loading"
  >
    <div v-if="peca" class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Package class="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p class="font-semibold text-gray-900">{{ peca.name }}</p>
          <p class="text-sm text-gray-600">Stock atual: <span class="font-bold">{{ peca.quantityInStock }} un.</span></p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Tipo de Movimento -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Movimento <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="form.tipo = 'entrada'"
            :class="[
              'p-4 border-2 rounded-lg transition-all text-center',
              form.tipo === 'entrada'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            <TrendingUp :class="['w-6 h-6 mx-auto mb-2', form.tipo === 'entrada' ? 'text-green-600' : 'text-gray-400']" />
            <span :class="['text-sm font-medium', form.tipo === 'entrada' ? 'text-green-900' : 'text-gray-700']">
              Entrada
            </span>
          </button>
          <button
            @click="form.tipo = 'saida'"
            :class="[
              'p-4 border-2 rounded-lg transition-all text-center',
              form.tipo === 'saida'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            <TrendingDown :class="['w-6 h-6 mx-auto mb-2', form.tipo === 'saida' ? 'text-red-600' : 'text-gray-400']" />
            <span :class="['text-sm font-medium', form.tipo === 'saida' ? 'text-red-900' : 'text-gray-700']">
              Saída
            </span>
          </button>
        </div>
      </div>

      <!-- Quantidade -->
      <BaseInput
        v-model="form.quantidade"
        label="Quantidade"
        type="number"
        min="1"
        required
        :error="errors.quantidade"
      />

      <!-- Motivo -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Motivo / Observação <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.motivo"
          rows="3"
          placeholder="Ex: Chegada de encomenda, Ajuste de inventário..."
          class="input resize-none"
          :class="{ 'border-red-500': errors.motivo }"
        ></textarea>
        <p v-if="errors.motivo" class="mt-1 text-xs text-red-600">{{ errors.motivo }}</p>
      </div>

      <!-- Preview -->
      <div class="p-3 rounded-lg border flex items-center justify-between" 
        :class="form.tipo === 'entrada' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'">
        <span class="text-sm font-medium">Novo stock calculado:</span>
        <span class="text-lg font-bold">
          {{ novoStock }} un.
        </span>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="isOpen = false" :disabled="loading">
        Cancelar
      </BaseButton>
      <BaseButton
        variant="primary"
        @click="handleSubmit"
        :loading="loading"
        loading-text="Registando..."
      >
        Confirmar Movimento
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Package, TrendingUp, TrendingDown } from 'lucide-vue-next'
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

const form = ref({
  tipo: 'entrada',
  quantidade: 1,
  motivo: ''
})

const errors = ref({})

const novoStock = computed(() => {
  if (!props.peca) return 0
  const qtd = parseInt(form.value.quantidade) || 0
  return form.value.tipo === 'entrada' 
    ? props.peca.quantityInStock + qtd
    : Math.max(0, props.peca.quantityInStock - qtd)
})

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    form.value = { tipo: 'entrada', quantidade: 1, motivo: '' }
    errors.value = {}
  }
})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.quantidade || form.value.quantidade < 1) {
    errors.value.quantidade = 'Quantidade deve ser maior que 0'
    isValid = false
  }

  if (!form.value.motivo.trim()) {
    errors.value.motivo = 'Motivo é obrigatório'
    isValid = false
  }

  if (form.value.tipo === 'saida' && form.value.quantidade > (props.peca?.quantityInStock || 0)) {
    errors.value.quantidade = 'Stock insuficiente para esta saída'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return
  emit('submit', { 
    id: props.peca.id, 
    data: {
      tipo: form.value.tipo,
      quantidade: parseInt(form.value.quantidade),
      motivo: form.value.motivo
    }
  })
}
</script>
