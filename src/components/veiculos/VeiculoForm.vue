<template>
  <BaseModal
    v-model="isOpen"
    :title="isEdit ? 'Editar Veículo' : 'Registar Novo Veículo'"
    size="lg"
    :closable="!loading"
    :close-on-overlay="!loading"
  >
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Cliente -->
        <div class="md:col-span-2">
          <ClienteSelect
            v-model="form.cliente_id"
            label="Proprietário"
            placeholder="Selecione o cliente"
            required
            :error="errors.cliente_id"
            :disabled="loading"
          />
        </div>

        <!-- Marca -->
        <BaseInput
          v-model="form.brand"
          label="Marca"
          placeholder="Ex: Toyota"
          required
          :error="errors.brand"
          :disabled="loading"
        />

        <!-- Modelo -->
        <BaseInput
          v-model="form.model"
          label="Modelo"
          placeholder="Ex: Corolla"
          required
          :error="errors.model"
          :disabled="loading"
        />

        <!-- Ano -->
        <BaseInput
          v-model="form.year"
          label="Ano"
          type="number"
          placeholder="2020"
          required
          :min="1900"
          :max="new Date().getFullYear() + 1"
          :error="errors.year"
          :disabled="loading"
        />

        <!-- Matrícula -->
        <BaseInput
          v-model="form.plate"
          label="Matrícula"
          placeholder="ABC-1234"
          required
          :error="errors.plate"
          :disabled="loading"
        />

        <!-- Cor -->
        <BaseInput
          v-model="form.color"
          label="Cor"
          placeholder="Ex: Preto"
          :error="errors.color"
          :disabled="loading"
        />

        <!-- Tipo de Combustível -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Tipo de Combustível
          </label>
          <select v-model="form.fuel_type" class="input" :disabled="loading">
            <option value="">Selecione</option>
            <option value="gasoline">Gasolina</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Elétrico</option>
            <option value="hybrid">Híbrido</option>
          </select>
        </div>

        <!-- Chassi (VIN) -->
        <BaseInput
          v-model="form.vin"
          label="Chassi (VIN)"
          placeholder="17 caracteres"
          :maxlength="17"
          :error="errors.vin"
          :disabled="loading"
        />

        <!-- Quilometragem -->
        <BaseInput
          v-model="form.mileage"
          label="Quilometragem"
          type="number"
          placeholder="0"
          :min="0"
          :error="errors.mileage"
          :disabled="loading"
        />

        <!-- Notas -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Notas (Opcional)
          </label>
          <textarea
            v-model="form.notes"
            rows="3"
            placeholder="Observações sobre o veículo..."
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
import ClienteSelect from '@/components/common/ClienteSelect.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  veiculo: {
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

const isEdit = computed(() => !!props.veiculo)

const form = ref({
  cliente_id: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  plate: '',
  color: '',
  fuel_type: '',
  vin: '',
  mileage: 0,
  notes: ''
})

const errors = ref({})

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.veiculo) {
      form.value = {
        cliente_id: props.veiculo.cliente_id || '',
        brand: props.veiculo.brand || '',
        model: props.veiculo.model || '',
        year: props.veiculo.year || new Date().getFullYear(),
        plate: props.veiculo.plate || '',
        color: props.veiculo.color || '',
        fuel_type: props.veiculo.fuel_type || '',
        vin: props.veiculo.vin || '',
        mileage: props.veiculo.mileage || 0,
        notes: props.veiculo.notes || ''
      }
    } else {
      resetForm()
    }
    errors.value = {}
  }
})

const resetForm = () => {
  form.value = {
    cliente_id: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    plate: '',
    color: '',
    fuel_type: '',
    vin: '',
    mileage: 0,
    notes: ''
  }
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.cliente_id) {
    errors.value.cliente_id = 'Cliente é obrigatório'
    isValid = false
  }

  if (!form.value.brand.trim()) {
    errors.value.brand = 'Marca é obrigatória'
    isValid = false
  }

  if (!form.value.model.trim()) {
    errors.value.model = 'Modelo é obrigatório'
    isValid = false
  }

  if (!form.value.year) {
    errors.value.year = 'Ano é obrigatório'
    isValid = false
  }

  if (!form.value.plate.trim()) {
    errors.value.plate = 'Matrícula é obrigatória'
    isValid = false
  }

  if (form.value.vin && form.value.vin.length !== 17) {
    errors.value.vin = 'Chassi (VIN) deve ter exatamente 17 caracteres'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  const data = {
    ...form.value,
    year: parseInt(form.value.year),
    mileage: parseInt(form.value.mileage) || 0,
    ...(isEdit.value && { id: props.veiculo.id })
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