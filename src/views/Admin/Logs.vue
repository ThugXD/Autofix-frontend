<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Logs de Auditoria</h1>
        <p class="text-gray-500 mt-1">Histórico de ações realizadas por utilizadores no sistema</p>
      </div>
      <BaseButton variant="secondary" :icon="Download" @click="exportLogs">
        Exportar CSV
      </BaseButton>
    </div>

    <!-- Filters -->
    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Procurar por utilizador ou ação..."
            :icon-left="Search"
            clearable
          />
        </div>
        <select v-model="typeFilter" class="input">
          <option value="">Todos os tipos</option>
          <option value="create">Criação</option>
          <option value="update">Atualização</option>
          <option value="delete">Exclusão</option>
          <option value="auth">Autenticação</option>
        </select>
        <select v-model="periodFilter" class="input">
          <option value="today">Hoje</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mês</option>
        </select>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Utilizador</th>
              <th>Ação</th>
              <th>Módulo</th>
              <th>IP</th>
              <th class="text-center">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filteredLogs" :key="log.id">
              <td class="text-sm text-gray-600">
                {{ format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss') }}
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {{ log.user.charAt(0) }}
                  </div>
                  <span class="font-medium text-gray-900">{{ log.user }}</span>
                </div>
              </td>
              <td>
                <span :class="['badge', typeClasses[log.type]]">
                  {{ log.action }}
                </span>
              </td>
              <td class="text-gray-600">{{ log.module }}</td>
              <td class="text-xs text-gray-500 font-mono">{{ log.ip }}</td>
              <td class="text-center">
                <button class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { Search, Download, Eye } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const searchQuery = ref('')
const typeFilter = ref('')
const periodFilter = ref('week')

const typeClasses = {
  create: 'bg-green-100 text-green-700',
  update: 'bg-blue-100 text-blue-700',
  delete: 'bg-red-100 text-red-700',
  auth: 'bg-purple-100 text-purple-700'
}

const mockLogs = [
  {
    id: 1,
    timestamp: '2026-03-13T12:45:00',
    user: 'Carlos Administrador',
    action: 'Login efetuado',
    type: 'auth',
    module: 'Autenticação',
    ip: '192.168.1.102'
  },
  {
    id: 2,
    timestamp: '2026-03-13T11:30:00',
    user: 'Beatriz Gestora',
    action: 'Aprovação de interesse',
    type: 'update',
    module: 'Apadrinhamentos',
    ip: '192.168.1.105'
  },
  {
    id: 3,
    timestamp: '2026-03-13T10:15:00',
    user: 'Carlos Administrador',
    action: 'Criação de novo utilizador',
    type: 'create',
    module: 'Utilizadores',
    ip: '192.168.1.102'
  },
  {
    id: 4,
    timestamp: '2026-03-13T09:00:00',
    user: 'Amélia Comunitária',
    action: 'Cadastro de criança',
    type: 'create',
    module: 'Crianças',
    ip: '192.168.1.110'
  },
  {
    id: 5,
    timestamp: '2026-03-12T16:20:00',
    user: 'João Padrinho',
    action: 'Expressão de interesse',
    type: 'create',
    module: 'Apadrinhamentos',
    ip: '10.0.0.54'
  }
]

const filteredLogs = computed(() => {
  return mockLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !typeFilter.value || log.type === typeFilter.value
    return matchesSearch && matchesType
  })
})

const exportLogs = () => {
  toast.info('Exportando logs...')
}
</script>
