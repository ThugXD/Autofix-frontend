<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Proprietário</th>
          <th>Marca/Modelo</th>
          <th>Ano</th>
          <th>Matrícula</th>
          <th>Cor</th>
          <th>Tipo de Combustível</th>
          <th>Quilometragem</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="9" class="text-center py-8">
            <LoadingSpinner size="md" text="Carregando veículos..." />
          </td>
        </tr>

        <tr v-else-if="!veiculos.length">
          <td colspan="9" class="text-center py-8 text-gray-500">
            Nenhum veículo encontrado
          </td>
        </tr>

        <tr v-else v-for="veiculo in veiculos" :key="veiculo.id">
          <td class="font-medium text-gray-900">#{{ veiculo.id }}</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ veiculo.cliente_name }}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Car class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ veiculo.brand }}</p>
                <p class="text-xs text-gray-500">{{ veiculo.model }}</p>
              </div>
            </div>
          </td>
          <td class="text-gray-600">{{ veiculo.year }}</td>
          <td>
            <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 font-mono text-sm font-medium">
              {{ veiculo.plate }}
            </span>
          </td>
          <td class="text-gray-600">{{ veiculo.color || '-' }}</td>
          <td>
            <span
              :class="[
                'badge',
                fuelTypeClasses[veiculo.fuel_type] || 'badge-info'
              ]"
            >
              {{ fuelTypeLabels[veiculo.fuel_type] || veiculo.fuel_type }}
            </span>
          </td>
          <td class="text-gray-600">
            {{ veiculo.mileage ? veiculo.mileage.toLocaleString() + ' km' : '-' }}
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