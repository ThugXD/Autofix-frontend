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

      <!-- Seleção de Item -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Selecionar {{ form.tipo === 'servico' ? 'Serviço' : 'Peça' }} <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select
            :value="form.tipo === 'servico' ? form.servicoId : form.pecaId"
            @change="handleItemChange"
            class="input pr-10"
            :disabled="isLoadingItems"
          >
            <option value="">Selecione um item...</option>
            <option v-for="item in availableItems" :key="item.id" :value="item.id">
              {{ item.name }} {{ item.code ? `(${item.code})` : '' }} — {{ formatCurrency(item.defaultPrice || item.unitPrice || 0) }}
            </option>
          </select>
          <div v-if="isLoadingItems" class="absolute right-8 top-1/2 -translate-y-1/2">
            <LoadingSpinner size="xs" />
          </div>
        </div>
        <p v-if="errors.itemId" class="mt-1 text-xs text-red-600">{{ errors.itemId }}</p>
      </div>

      <!-- Descrição -->
      <BaseInput
        v-model="form.descricao"
        label="Descrição customizada"
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
          v-model="form.precoUnitario"
          label="Preço Unitário (MT)"
          type="number"
          step="0.01"
          min="0"
          placeholder="0,00"
          required
          :error="errors.precoUnitario"
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
import { ref, computed, watch, onMounted } from 'vue'
import { useOrdensServicoStore } from '@/stores/ordensServico'
import { useServicosStore } from '@/stores/servicos'
import { usePecasStore } from '@/stores/pecas'
import { Wrench, Package } from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  ordemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'added'])

const ordensStore = useOrdensServicoStore()
const servicosStore = useServicosStore()
const pecasStore = usePecasStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref({
  tipo: 'servico',
  servicoId: '',
  pecaId: '',
  descricao: '',
  quantidade: 1,
  precoUnitario: 0,
  desconto: 0
})

const availableItems = computed(() => {
  return form.value.tipo === 'servico' ? servicosStore.servicos : pecasStore.pecas
})

const isLoadingItems = computed(() => {
  return form.value.tipo === 'servico' ? servicosStore.loading : pecasStore.loading
})

watch(() => form.value.tipo, () => {
  form.value.servicoId = ''
  form.value.pecaId = ''
  form.value.descricao = ''
  form.value.precoUnitario = 0
  if (form.value.tipo === 'servico') {
    servicosStore.fetchServicos(1, { perPage: 100 })
  } else {
    pecasStore.fetchPecas(1, { perPage: 100 })
  }
})

const handleItemChange = (event) => {
  const id = event.target.value
  const item = availableItems.value.find(i => i.id === id)
  
  if (item) {
    if (form.value.tipo === 'servico') {
      form.value.servicoId = item.id
      form.value.pecaId = ''
    } else {
      form.value.pecaId = item.id
      form.value.servicoId = ''
    }
    form.value.descricao = item.name
    form.value.precoUnitario = item.defaultPrice || item.unitPrice || 0
    calculateSubtotal()
  }
}

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
    precoUnitario: 0,
    desconto: 0
  }
  errors.value = {}
  subtotal.value = 0
}

const calculateSubtotal = () => {
  const quantidade = parseFloat(form.value.quantidade) || 0
  const preco = parseFloat(form.value.precoUnitario) || 0
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

  if (!form.value.precoUnitario || form.value.precoUnitario < 0) {
    errors.value.precoUnitario = 'Preço é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  
  const itemData = {
    tipo: form.value.tipo,
    servicoId: form.value.tipo === 'servico' ? form.value.servicoId : null,
    pecaId: form.value.tipo === 'peca' ? form.value.pecaId : null,
    descricao: form.value.descricao,
    quantidade: parseInt(form.value.quantidade),
    precoUnitario: parseFloat(form.value.precoUnitario),
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