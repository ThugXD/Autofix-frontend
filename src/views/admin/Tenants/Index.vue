<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-2xl font-bold text-gray-800">Gerir Oficinas</h1>
      
      <router-link 
        to="/admin/tenants/create"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus class="w-5 h-5" />
        Nova Oficina
      </router-link>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          v-model="filters.search"
          type="text" 
          placeholder="Buscar por nome, email ou NUIT..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          @input="debounceSearch"
        />
      </div>
      <div class="w-full sm:w-48">
        <select 
          v-model="filters.status"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          @change="fetchTenants"
        >
          <option value="">Todos os Status</option>
          <option value="active">Ativas</option>
          <option value="inactive">Inativas</option>
        </select>
      </div>
    </div>

    <!-- Tenants Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th class="px-6 py-3 font-semibold">Oficina</th>
              <th class="px-6 py-3 font-semibold">Contato</th>
              <th class="px-6 py-3 font-semibold">Plano</th>
              <th class="px-6 py-3 font-semibold">Usuários</th>
              <th class="px-6 py-3 font-semibold">Status</th>
              <th class="px-6 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <template v-if="loading">
              <tr v-for="i in 5" :key="i" class="animate-pulse">
                <td colspan="6" class="px-6 py-4">
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="tenant in tenants" :key="tenant.id" class="hover:bg-gray-50 group">
                <td class="px-6 py-4">
                  <div>
                    <p class="font-medium text-gray-900">{{ tenant.name }}</p>
                    <p class="text-xs text-gray-500">NUIT: {{ tenant.nuit || 'N/A' }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <div class="flex flex-col">
                    <span class="flex items-center gap-1"><Mail class="w-3 h-3" /> {{ tenant.email }}</span>
                    <span class="flex items-center gap-1" v-if="tenant.phone"><Phone class="w-3 h-3" /> {{ tenant.phone }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="capitalize px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium text-xs">
                    {{ tenant.subscriptionPlan }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ tenant._count?.users || 0 }}
                </td>
                <td class="px-6 py-4">
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="tenant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  >
                    {{ tenant.isActive ? 'Ativa' : 'Inativa' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button 
                      @click="toggleStatus(tenant)"
                      class="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
                      :title="tenant.isActive ? 'Desativar' : 'Ativar'"
                    >
                      <Power class="w-4 h-4" :class="tenant.isActive ? 'text-red-500' : 'text-green-500'" />
                    </button>
                    <!-- TODO: Edit View
                    <router-link 
                      :to="`/admin/tenants/${tenant.id}`"
                      class="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                      title="Detalhes"
                    >
                      <Eye class="w-4 h-4" />
                    </router-link>
                    -->
                  </div>
                </td>
              </tr>
              <tr v-if="!tenants.length">
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  <Building class="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>Nenhuma oficina encontrada.</p>
                </td>
              </tr>
            </template>
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
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Plus, Search, Mail, Phone, Power, Eye, Building } from 'lucide-vue-next'
import adminService from '@/services/adminService'
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref(false)
const tenants = ref([])
const pagination = ref({ page: 1, limit: 10, total: 0, totalPages: 0 })

const filters = reactive({
  search: '',
  status: ''
})

const fetchTenants = async (page = 1) => {
  try {
    loading.value = true
    const params = {
      page,
      limit: pagination.value.limit,
      search: filters.search,
      status: filters.status
    }
    const response = await adminService.getAllTenants(params)
    tenants.value = response.data.data.tenants
    pagination.value = response.data.data.pagination
  } catch (error) {
    console.error('Erro ao buscar oficinas:', error)
    toast.error('Erro ao listar oficinas')
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  fetchTenants(page)
}

const debounceSearch = () => {
  // Simple debounce implementation if lodash not available
  clearTimeout(window._searchTimer)
  window._searchTimer = setTimeout(() => {
    fetchTenants(1)
  }, 500)
}

const toggleStatus = async (tenant) => {
  if (!confirm(`Tem certeza que deseja ${tenant.isActive ? 'desativar' : 'ativar'} a oficina "${tenant.name}"?`)) return

  try {
    const newStatus = !tenant.isActive
    // Note: The backend 'deleteTenant' soft deletes (deactivates).
    // The 'updateTenant' handles general updates.
    // For simplicity, let's use updateTenant for activation/deactivation logic if implemented fully,
    // or use deleteTenant for deactivation.
    // Based on my backend implementation, deleteTenant only sets isActive = false.
    // To reactivate, I need to use updateTenant.
    
    await adminService.updateTenant(tenant.id, { isActive: newStatus })
    
    tenant.isActive = newStatus
    toast.success(`Oficina ${newStatus ? 'ativada' : 'desativada'} com sucesso!`)
  } catch (error) {
    console.error('Erro ao alterar status:', error)
    toast.error('Erro ao alterar status da oficina')
  }
}

onMounted(() => {
  fetchTenants()
})
</script>
