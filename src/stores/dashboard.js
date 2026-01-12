import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dashboardService } from '@/services/dashboardService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const stats = ref({
    totalClientes: 0,
    totalVeiculos: 0,
    servicosConcluidos: 0,
    servicosPendentes: 0,
    receitaMensal: 0,
    ticketMedio: 0
  })

  const trends = ref({
    clientes: { value: 0, isPositive: true },
    veiculos: { value: 0, isPositive: true },
    servicos: { value: 0, isPositive: true },
    pendentes: { value: 0, isPositive: false },
    receita: { value: 0, isPositive: true },
    ticket: { value: 0, isPositive: true }
  })

  const recentServices = ref([])
  const servicesChart = ref({ labels: [], concluidos: [], pendentes: [] })
  const revenueChart = ref({ labels: [], receita: [] })
  const topServices = ref([])
  const vehiclesByBrand = ref([])
  const loading = ref(false)

  // Actions
  const fetchDashboardData = async () => {
    try {
      loading.value = true
      const response = await dashboardService.getDashboardData()
      
      stats.value = response.data.stats
      trends.value = response.data.trends
      recentServices.value = response.data.recentServices
      servicesChart.value = response.data.servicesChart
      revenueChart.value = response.data.revenueChart
      topServices.value = response.data.topServices
      vehiclesByBrand.value = response.data.vehiclesByBrand
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      loading.value = false
    }
  }

  const refreshStats = async () => {
    try {
      const response = await dashboardService.getStats()
      stats.value = response.data
      toast.success('Estatísticas atualizadas!')
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error)
      toast.error('Erro ao atualizar estatísticas')
    }
  }

  return {
    // State
    stats,
    trends,
    recentServices,
    servicesChart,
    revenueChart,
    topServices,
    vehiclesByBrand,
    loading,
    
    // Actions
    fetchDashboardData,
    refreshStats
  }
})