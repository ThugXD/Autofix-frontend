<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Comunicacoes Recentes</h3>
        <p class="text-sm text-gray-600">Ultimas criancas identificadas</p>
      </div>
      <router-link
        to="/ponto-focal/comunicacao"
        class="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Ver todas
      </router-link>
    </div>

    <div class="space-y-4">
      <div
        v-for="comunicacao in comunicacoes"
        :key="comunicacao.id"
        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div class="flex items-center gap-4 flex-1">
          <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Baby class="w-6 h-6 text-gray-600" />
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-semibold text-gray-900">{{ comunicacao.id }}</span>
              <span
                :class="[
                  'badge',
                  statusClasses[comunicacao.status]
                ]"
              >
                {{ statusLabels[comunicacao.status] }}
              </span>
            </div>
            <p class="text-sm text-gray-600 truncate">
              {{ comunicacao.crianca }}
            </p>
            <p class="text-xs text-gray-500 mt-0.5">{{ comunicacao.bairro }}</p>
          </div>
        </div>

        <div class="text-right ml-4">
          <p class="text-xs text-gray-500 mt-0.5">
            {{ formatDate(comunicacao.data) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { Baby } from 'lucide-vue-next'

defineProps({
  comunicacoes: {
    type: Array,
    required: true
  }
})

const statusLabels = {
  pendente: 'Pendente',
  aprovada: 'Aprovada',
  em_cadastro: 'Em Cadastro',
  rejeitada: 'Rejeitada'
}

const statusClasses = {
  pendente: 'badge-warning',
  aprovada: 'badge-success',
  em_cadastro: 'badge-info',
  rejeitada: 'badge-danger'
}

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return date
  }
}
</script>
