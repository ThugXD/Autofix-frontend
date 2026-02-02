<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Logs de Auditoria</h1>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          v-model="filters.action"
          type="text" 
          placeholder="Filtrar por ação..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          @input="debounceSearch"
        />
      </div>

      <div>
        <select 
          v-model="filters.tenantId"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          @change="handleTenantChange"
        >
          <option value="">Todas as Oficinas</option>
          <option v-for="tenant in tenantsList" :key="tenant.id" :value="tenant.id">
            {{ tenant.name }}
          </option>
        </select>
      </div>

      <div>
        <select 
          v-model="filters.userId"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          :disabled="!filters.tenantId && !usersList.length"
          @change="fetchLogs(1)"
        >
          <option value="">Todos os Usuários</option>
          <option v-for="user in usersList" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div>
        <input 
          v-model="filters.startDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          title="Data Inicial"
          @change="fetchLogs(1)"
        />
      </div>

      <div>
        <input 
          v-model="filters.endDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          title="Data Final"
          @change="fetchLogs(1)"
        />
      </div>

      <div class="flex justify-end">
        <button 
          @click="resetFilters"
          class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors w-full"
        >
          Limpar
        </button>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th class="px-6 py-3 font-semibold">Data/Hora</th>
              <th class="px-6 py-3 font-semibold">Ação</th>
              <th class="px-6 py-3 font-semibold">Usuário</th>
              <th class="px-6 py-3 font-semibold">Oficina</th>
              <th class="px-6 py-3 font-semibold">Entidade</th>
              <th class="px-6 py-3 font-semibold">IP</th>
              <th class="px-6 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <template v-if="loading">
              <tr v-for="i in 5" :key="i" class="animate-pulse">
                <td colspan="7" class="px-6 py-4">
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              </tr>
            </template>
            <tr v-else-if="!logs || !logs.length">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                <Shield class="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>Nenhum log encontrado.</p>
              </td>
            </tr>
            <tr v-else v-for="log in logs" :key="log.id" class="hover:bg-gray-50 text-sm">
              <td class="px-6 py-4 text-gray-600 whitespace-nowrap">
                {{ new Date(log.createdAt).toLocaleString() }}
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-2 py-1 rounded-md font-medium text-xs"
                  :class="getActionClass(log.action)"
                >
                  {{ log.action }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-900">
                <div v-if="log.user">
                  <p class="font-medium">{{ log.user.name }}</p>
                  <p class="text-xs text-gray-500">{{ log.user.role }}</p>
                </div>
                <span v-else class="text-gray-400 italic">Sistema</span>
              </td>
              <td class="px-6 py-4 text-gray-600">
                {{ log.tenant?.name || 'N/A' }}
              </td>
              <td class="px-6 py-4 text-gray-600">
                {{ log.entityType }}: {{ log.entityId.substring(0, 8) }}...
              </td>
              <td class="px-6 py-4 text-gray-500 text-xs font-mono">
                {{ log.ipAddress || '-' }}
              </td>
              <td class="px-6 py-4 text-right">
                <button 
                  @click="showDetails(log)"
                  class="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  title="Ver Detalhes"
                >
                  <Eye class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center" v-if="pagination.totalPages > 1">
        <button 
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page === 1"
          class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-sm text-gray-600">
          Página {{ pagination.page }} de {{ pagination.totalPages }}
        </span>
        <button 
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page === pagination.totalPages"
          class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <BaseModal
      v-model="modal.show"
      :title="'Detalhes do Log: ' + modal.log?.action"
      size="lg"
    >
      <div v-if="modal.log" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p class="text-xs text-gray-500 uppercase font-semibold mb-1">Entidade</p>
            <p class="text-gray-900">{{ modal.log.entityType }} ({{ modal.log.entityId }})</p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p class="text-xs text-gray-500 uppercase font-semibold mb-1">IP / User Agent</p>
            <p class="text-gray-900">{{ modal.log.ipAddress || '-' }}</p>
            <p class="text-xs text-gray-400 truncate" :title="modal.log.userAgent">{{ modal.log.userAgent || 'N/A' }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Valors Antigos -->
          <div>
            <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span class="w-2 h-2 bg-red-400 rounded-full"></span>
              Valores Anteriores
            </h4>
            <div class="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[400px]">
              <pre class="text-xs text-pink-400 font-mono">{{ JSON.stringify(modal.log.oldValues || {}, null, 2) }}</pre>
            </div>
          </div>

          <!-- Novos Valores -->
          <div>
            <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Novos Valores
            </h4>
            <div class="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[400px]">
              <pre class="text-xs text-green-400 font-mono">{{ JSON.stringify(modal.log.newValues || {}, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton @click="modal.show = false">Fechar</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, Shield, Eye } from 'lucide-vue-next'
import adminService from '@/services/adminService'
import { useToast } from 'vue-toastification'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const toast = useToast()
const loading = ref(false)
const logs = ref([])
const tenantsList = ref([])
const usersList = ref([])
const pagination = ref({ page: 1, limit: 20, total: 0, totalPages: 0 })

const modal = reactive({
  show: false,
  log: null
})

const showDetails = (log) => {
  modal.log = log
  modal.show = true
}

const filters = reactive({
  action: '',
  startDate: '',
  endDate: '',
  tenantId: '',
  userId: ''
})

const fetchInitialData = async () => {
  try {
    const response = await adminService.getAllTenants({ limit: 100 })
    tenantsList.value = response.data.data.tenants
  } catch (error) {
    console.error('Erro ao buscar oficinas:', error)
  }
}

const handleTenantChange = async () => {
  filters.userId = ''
  usersList.value = []
  
  if (filters.tenantId) {
    try {
      const response = await adminService.getTenantById(filters.tenantId)
      usersList.value = response.data.data.users
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }
  
  fetchLogs(1)
}

const fetchLogs = async (page = 1) => {
  try {
    loading.value = true
    const params = {
      page,
      limit: pagination.value.limit,
      ...filters
    }
    const response = await adminService.getAuditLogs(params)
    logs.value = response.data.data.logs
    pagination.value = response.data.data.pagination
  } catch (error) {
    console.error('Erro ao buscar logs:', error)
    toast.error('Erro ao carregar auditoria')
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  fetchLogs(page)
}

const debounceSearch = () => {
  clearTimeout(window._auditSearchTimer)
  window._auditSearchTimer = setTimeout(() => {
    fetchLogs(1)
  }, 500)
}

const resetFilters = () => {
  filters.action = ''
  filters.startDate = ''
  filters.endDate = ''
  filters.tenantId = ''
  filters.userId = ''
  usersList.value = []
  fetchLogs(1)
}

const getActionClass = (action) => {
  if (action === 'LOGIN') return 'bg-blue-100 text-blue-800'
  if (action === 'LOGOUT') return 'bg-gray-100 text-gray-800'
  if (action.includes('CREATE')) return 'bg-green-100 text-green-800'
  if (action.includes('UPDATE')) return 'bg-yellow-100 text-yellow-800'
  if (action.includes('DELETE') || action.includes('DEACTIVATE')) return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-600'
}

onMounted(() => {
  fetchInitialData()
  fetchLogs()
})
</script>
