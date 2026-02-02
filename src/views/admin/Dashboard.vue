<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Painel do Super Administrador</h1>
      <button 
        @click="fetchStats" 
        class="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        title="Atualizar dados"
      >
        <RefreshCw class="w-5 h-5" :class="{ 'animate-spin': loading }" />
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Oficinas -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">Total de Oficinas</p>
            <h3 class="text-3xl font-bold text-gray-800 mt-2">{{ stats.overview?.totalTenants || 0 }}</h3>
          </div>
          <div class="p-3 bg-blue-50 rounded-lg">
            <Building class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <!-- Oficinas Ativas -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">Oficinas Ativas</p>
            <h3 class="text-3xl font-bold text-green-600 mt-2">{{ stats.overview?.activeTenants || 0 }}</h3>
          </div>
          <div class="p-3 bg-green-50 rounded-lg">
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <!-- Oficinas Inativas -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">Oficinas Inativas</p>
            <h3 class="text-3xl font-bold text-red-600 mt-2">{{ stats.overview?.inactiveTenants || 0 }}</h3>
          </div>
          <div class="p-3 bg-red-50 rounded-lg">
            <XCircle class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <!-- Total Usuários -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">Total de Usuários</p>
            <h3 class="text-3xl font-bold text-gray-800 mt-2">{{ stats.overview?.totalUsers || 0 }}</h3>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <Users class="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Tenants -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-800">Oficinas Recentes</h2>
        <router-link to="/admin/tenants" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
          Ver todas
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th class="px-6 py-3 font-semibold">Oficina</th>
              <th class="px-6 py-3 font-semibold">Email</th>
              <th class="px-6 py-3 font-semibold">Data Cadastro</th>
              <th class="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="tenant in stats.recentActivity?.recentTenants" :key="tenant.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900">{{ tenant.name }}</td>
              <td class="px-6 py-4 text-gray-600">{{ tenant.email }}</td>
              <td class="px-6 py-4 text-gray-600">{{ new Date(tenant.createdAt).toLocaleDateString() }}</td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="tenant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ tenant.isActive ? 'Ativa' : 'Inativa' }}
                </span>
              </td>
            </tr>
            <tr v-if="!stats.recentActivity?.recentTenants?.length">
              <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                Nenhuma oficina recente encontrada.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Building, Users, CheckCircle, XCircle, RefreshCw } from 'lucide-vue-next'
import adminService from '@/services/adminService'
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref(false)
const stats = ref({})

const fetchStats = async () => {
  try {
    loading.value = true
    const response = await adminService.getStats()
    stats.value = response.data.data
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    toast.error('Erro ao carregar dados do dashboard')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>
