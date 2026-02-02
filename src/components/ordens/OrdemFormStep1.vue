<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Informações Básicas
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Cliente -->
        <div class="md:col-span-2">
          <ClienteSelect
            v-model="localData.clienteId"
            label="Cliente"
            placeholder="Selecione o cliente"
            required
            :error="errors.clienteId"
            @update:model-value="handleClienteChange"
          />
        </div>

        <!-- Veículo -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Veículo <span class="text-red-500">*</span>
          </label>
          <select
            v-model="localData.veiculoId"
            class="input"
            required
            :disabled="!veiculos.length"
          >
            <option value="">
              {{ veiculos.length ? 'Selecione o veículo' : 'Selecione um cliente primeiro' }}
            </option>
            <option
              v-for="veiculo in veiculos"
              :key="veiculo.id"
              :value="veiculo.id"
            >
              {{ veiculo.brand }} {{ veiculo.model }} {{ veiculo.year }} ({{ veiculo.plate }})
            </option>
          </select>
          <p v-if="errors.veiculoId" class="mt-1.5 text-sm text-red-600">
            {{ errors.veiculoId }}
          </p>
        </div>

        <!-- Prioridade -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Prioridade <span class="text-red-500">*</span>
          </label>
          <select v-model="localData.priority" class="input" required>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        <!-- Data Prevista -->
        <BaseInput
          v-model="localData.dataPrevista"
          label="Data Prevista de Conclusão"
          type="date"
          :error="errors.dataPrevista"
        />

        <!-- Problema Relatado -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Problema Relatado <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="localData.problemaRelatado"
            rows="3"
            placeholder="Descreva o problema relatado pelo cliente..."
            class="input resize-none"
            required
          ></textarea>
          <p v-if="errors.problemaRelatado" class="mt-1.5 text-sm text-red-600">
            {{ errors.problemaRelatado }}
          </p>
        </div>

        <!-- Observações -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Observações
          </label>
          <textarea
            v-model="localData.observacoes"
            rows="2"
            placeholder="Observações adicionais..."
            class="input resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ClienteSelect from '@/components/common/ClienteSelect.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { veiculosService } from '@/services/veiculosService'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const localData = ref(props.modelValue)
const veiculos = ref([])

watch(localData, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

watch(() => props.modelValue, (newValue) => {
  localData.value = newValue
}, { deep: true })

const handleClienteChange = async (clienteId) => {
  if (!clienteId) {
    veiculos.value = []
    localData.value.veiculoId = ''
    return
  }

  try {
    const response = await veiculosService.getByCliente(clienteId)
    veiculos.value = response.data.data // Fixed: Accessing .data.data
  } catch (error) {
    console.error('Erro ao carregar veículos:', error)
    veiculos.value = []
  }
}
</script>