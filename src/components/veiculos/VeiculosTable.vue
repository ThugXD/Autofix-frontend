<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th class="w-16">ID</th>
          <th>Proprietário</th>
          <th>Viatura</th>
          <th>Ano</th>
          <th>Matrícula</th>
          <th>Combustível</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="7" class="text-center py-8">
            <LoadingSpinner size="md" text="Carregando veículos..." />
          </td>
        </tr>

        <tr v-else-if="!veiculos.length">
          <td colspan="7" class="text-center py-8 text-gray-500">
            Nenhum veículo encontrado
          </td>
        </tr>

        <tr v-else v-for="veiculo in veiculos" :key="veiculo.id">
          <td class="font-medium text-gray-900">#{{ veiculo.id }}</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <User class="w-4 h-4 text-blue-600" />
              </div>
              <div class="truncate">
                <p class="font-medium text-gray-900 truncate">{{ veiculo.cliente?.name || 'N/A' }}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Car class="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ veiculo.brand }} {{ veiculo.model }}</p>
                <p class="text-xs text-gray-500">{{ veiculo.color || '-' }}</p>
              </div>
            </div>
          </td>
          <td class="text-gray-600">{{ veiculo.year }}</td>
          <td>
            <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 font-mono text-sm font-medium">
              {{ veiculo.plate }}
            </span>
          </td>
          <td>
            <span
              :class="[
                'badge',
                fuelTypeClasses[veiculo.fuelType] || 'badge-info'
              ]"
            >
              {{ fuelTypeLabels[veiculo.fuelType] || veiculo.fuelType || '-' }}
            </span>
          </td>
          <td>
            <div class="flex items-center justify-center gap-2">
              <button
                @click="$emit('view', veiculo)"
                class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Ver detalhes"
              >
                <Eye class="w-4 h-4" />
              </button>
              <button
                @click="$emit('edit', veiculo)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Editar"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button
                @click="$emit('delete', veiculo)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Deletar"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { User, Car, Eye, Edit, Trash2 } from 'lucide-vue-next'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  veiculos: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view', 'edit', 'delete'])

const fuelTypeLabels = {
  gasoline: 'Gasolina',
  diesel: 'Diesel',
  electric: 'Elétrico',
  hybrid: 'Híbrido'
}

const fuelTypeClasses = {
  gasoline: 'badge-info',
  diesel: 'badge-warning',
  electric: 'badge-success',
  hybrid: 'badge-info'
}
</script>