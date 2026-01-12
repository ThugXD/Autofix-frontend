<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Serviços Recentes</h3>
        <p class="text-sm text-gray-600">Últimas ordens de serviço</p>
      </div>
      <router-link
        to="/ordem-servico"
        class="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Ver todos
      </router-link>
    </div>

    <div class="space-y-4">
      <div
        v-for="service in services"
        :key="service.id"
        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div class="flex items-center gap-4 flex-1">
          <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Wrench class="w-6 h-6 text-gray-600" />
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-semibold text-gray-900">{{ service.id }}</span>
              <span
                :class="[
                  'badge',
                  statusClasses[service.status]
                ]"
              >
                {{ statusLabels[service.status] }}
              </span>
            </div>
            <p class="text-sm text-gray-600 truncate">
              {{ service.cliente }} • {{ service.veiculo }}
            </p>
            <p class="text-xs text-gray-500 mt-0.5">{{ service.servico }}</p>
          </div>
        </div>

        <div class="text-right ml-4">
          <p class="text-sm font-semibold text-gray-900">
            {{ formatCurrency(service.valor) }}
          </p>
          <p class="text-xs text-gray-500 mt-0.5">
            {{ formatDate(service.data) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { Wrench } from 'lucide-vue-next'

defineProps({
  services: {
    type: Array,
    required: true
  }
})

const statusLabels = {
  concluido: 'Concluído',
  em_andamento: 'Em Andamento',
  pendente: 'Pendente',
  cancelado: 'Cancelado'
}

const statusClasses = {
  concluido: 'badge-success',
  em_andamento: 'badge-info',
  pendente: 'badge-warning',
  cancelado: 'badge-danger'
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MZN'
  }).format(value)
}

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return date
  }
}
</script>