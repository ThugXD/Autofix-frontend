<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @change="handleChange"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
      >
        <option value="">{{ placeholder }}</option>
        <option
          v-for="cliente in clientes"
          :key="cliente.id"
          :value="cliente.id"
        >
          {{ cliente.name }} - {{ cliente.phone }}
        </option>
      </select>

      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown class="w-5 h-5 text-gray-400" />
      </div>
    </div>

    <p v-if="error" class="mt-1.5 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { clientesService } from '@/services/clientesService'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).substr(2, 9)}`
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Selecione um cliente'
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const clientes = ref([])
const loading = ref(false)

const selectClasses = computed(() => [
  'input appearance-none cursor-pointer',
  {
    'input-error': props.error,
    'bg-gray-100 cursor-not-allowed': props.disabled
  }
])

onMounted(async () => {
  await loadClientes()
})

const loadClientes = async () => {
  try {
    loading.value = true
    const response = await clientesService.getAll({ per_page: 1000 })
    clientes.value = response.data.data
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
  } finally {
    loading.value = false
  }
}

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>