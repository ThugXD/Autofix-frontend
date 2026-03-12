<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Cadastros em Andamento</h3>
        <p class="text-sm text-gray-600">Progresso das fichas tecnicas</p>
      </div>
      <router-link
        to="/ponto-focal/cadastro"
        class="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Ver todos
      </router-link>
    </div>

    <div class="space-y-4">
      <div
        v-for="cadastro in cadastros"
        :key="cadastro.id"
        class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <User class="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ cadastro.nome }}</p>
              <p class="text-xs text-gray-500">Inicio: {{ formatDate(cadastro.dataInicio) }}</p>
            </div>
          </div>
          <span
            :class="[
              'badge',
              cadastro.progresso === cadastro.total ? 'badge-success' : 'badge-info'
            ]"
          >
            {{ cadastro.progresso }}/{{ cadastro.total }} PFs
          </span>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-300"
            :class="cadastro.progresso === cadastro.total ? 'bg-green-500' : 'bg-blue-500'"
            :style="{ width: `${(cadastro.progresso / cadastro.total) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { User } from 'lucide-vue-next'

defineProps({
  cadastros: {
    type: Array,
    required: true
  }
})

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return date
  }
}
</script>
