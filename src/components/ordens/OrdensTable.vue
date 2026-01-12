<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Nº Ordem</th>
          <th>Cliente</th>
          <th>Veículo</th>
          <th>Status</th>
          <th>Prioridade</th>
          <th>Data Abertura</th>
          <th>Total</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="8" class="text-center py-8">
            <LoadingSpinner size="md" text="Carregando ordens..." />
          </td>
        </tr>

        <tr v-else-if="!ordens.length">
          <td colspan="8" class="text-center py-8 text-gray-500">
            Nenhuma ordem de serviço encontrada
          </td>
        </tr>

        <tr v-else v-for="ordem in ordens" :key="ordem.id">
          <td>
            <span class="font-mono font-semibold text-gray-900">
              {{ ordem.numero }}
            </span>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User class="w-5 h-5 text-blue-600" />
              </div>
              <span class="font-medium text-gray-900">{{ ordem.cliente_name }}</span>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-2">
              <Car class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-700">{{ ordem.veiculo_info }}</span>
            </div>
          </td>
          <td>
            <span :class="['badge', statusClasses[ordem.status]]">
              {{ statusLabels[ordem.status] }}
            </span>
          </td>
          <td>
            <span :class="['badge', priorityClasses[ordem.priority]]">
              {{ priorityLabels[ordem.priority] }}
            </span>
          </td>
          <td class="text-gray-600">
            {{ formatDate(ordem.data_abertura) }}
          </td>
          <td>
            <span class="font-semibold text-gray-900">
              {{ formatCurrency(ordem.total) }}
            </span>
          </td>
          <td>
            <div class="flex items-center justify-center gap-2">
              <button
                @click="$emit('view', ordem)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Ver detalhes"
              >
                <Eye class="w-4 h-4" />
              </button>
              <button
                @click="$emit('edit', ordem)"
                class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Editar"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button
                v-if="ordem.status !== 'concluido'"
                @click="$emit('updateStatus', ordem)"
                class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Atualizar status"
              >
                <CheckCircle class="w-4 h-4" />
              </button>
              <button
                @click="$emit('delete', ordem)"
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
import { format } from 'date-fns'
import { User, Car, Eye, Edit, CheckCircle, Trash2 } from 'lucide-vue-next'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  ordens: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view', 'edit', 'updateStatus', 'delete'])

const statusLabels = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  aguardando_pecas: 'Aguardando Peças',
  concluido: 'Concluído',
  cancelado: 'Cancelado'
}

const statusClasses = {
  pendente: 'badge-warning',
  em_andamento: 'badge-info',
  aguardando_pecas: 'badge-warning',
  concluido: 'badge-success',
  cancelado: 'badge-danger'
}

const priorityLabels = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
  urgente: 'Urgente'
}

const priorityClasses = {
  baixa: 'bg-gray-100 text-gray-700',
  media: 'bg-blue-100 text-blue-700',
  alta: 'bg-orange-100 text-orange-700',
  urgente: 'bg-red-100 text-red-700'
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return '-'
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 0
  }).format(value)
}
</script>