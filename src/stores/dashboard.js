import { defineStore } from 'pinia'
import { ref } from 'vue'
import dashboardApi from '@/services/dashboardService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useDashboardStore = defineStore('dashboard', () => {
  // ========== STATE ==========
  const loading = ref(false)
  
  // Estatísticas
  const stats = ref({
    totalClientes: 0,
    totalVeiculos: 0,
    totalOrdens: 0,
    ordensAbertas: 0,
    servicosConcluidos: 0,
    servicosPendentes: 0,
    receitaTotal: 0,
    receitaMensal: 0,
    ticketMedio: 0,
    pecasEstoqueBaixo: 0
  })

  // Gráficos
  const servicesChart = ref([])
  const revenueChart = ref([])
  const recentServices = ref([])
  const topServices = ref([])
  const vehiclesByBrand = ref([])

  // Trends (para StatCard)
  const trends = ref({
    clientes: { value: 0, isUp: true },
    veiculos: { value: 0, isUp: true },
    servicos: { value: 0, isUp: true },
    pendentes: { value: 0, isUp: false },
    receita: { value: 0, isUp: true },
    ticket: { value: 0, isUp: true }
  })

  // ========== ACTIONS ==========

  /**
   * Buscar todos os dados do dashboard
   */
  const fetchDashboardData = async (period = 30) => {
    try {
      loading.value = true

      // Buscar todos os dados em paralelo
      const [
        statsResponse,
        servicesChartResponse,
        revenueChartResponse,
        recentServicesResponse,
        topServicesResponse
      ] = await Promise.all([
        dashboardApi.getStats(period),
        dashboardApi.getServicesChart(period),
        dashboardApi.getRevenueChart(period),
        dashboardApi.getRecentServices(),
        dashboardApi.getTopServices()
      ])

      // Processar estatísticas
      const statsData = statsResponse.data.data
      
      stats.value = {
        totalClientes: statsData.clientes?.total || 0,
        totalVeiculos: statsData.veiculos?.total || 0,
        totalOrdens: statsData.ordens?.total || 0,
        ordensAbertas: statsData.ordens?.abertas || 0,
        servicosConcluidos: statsData.ordens?.concluidas || 0,
        servicosPendentes: statsData.ordens?.abertas || 0,
        receitaTotal: statsData.receita?.total || 0,
        receitaMensal: statsData.receita?.periodo || 0,
        ticketMedio: statsData.ordens?.concluidas > 0 
          ? (statsData.receita?.periodo || 0) / statsData.ordens.concluidas 
          : 0,
        pecasEstoqueBaixo: statsData.alertas?.pecasEstoqueBaixo || 0
      }

      // Processar gráficos
      servicesChart.value = servicesChartResponse.data.data || []
      revenueChart.value = revenueChartResponse.data.data || []
      recentServices.value = recentServicesResponse.data.data || []
      topServices.value = topServicesResponse.data.data || []

      // Calcular trends (simulado - você pode implementar lógica real depois)
      trends.value = {
        clientes: { value: 12, isUp: true },
        veiculos: { value: 8, isUp: true },
        servicos: { value: 15, isUp: true },
        pendentes: { value: 5, isUp: false },
        receita: { value: 20, isUp: true },
        ticket: { value: 10, isUp: true }
      }

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      loading.value = false
    }
  }

  /**
   * Buscar apenas estatísticas
   */
  const fetchStats = async (period = 30) => {
    try {
      const response = await dashboardApi.getStats(period)
      const statsData = response.data.data

      stats.value = {
        totalClientes: statsData.clientes?.total || 0,
        totalVeiculos: statsData.veiculos?.total || 0,
        totalOrdens: statsData.ordens?.total || 0,
        ordensAbertas: statsData.ordens?.abertas || 0,
        servicosConcluidos: statsData.ordens?.concluidas || 0,
        servicosPendentes: statsData.ordens?.abertas || 0,
        receitaTotal: statsData.receita?.total || 0,
        receitaMensal: statsData.receita?.periodo || 0,
        ticketMedio: statsData.ordens?.concluidas > 0 
          ? (statsData.receita?.periodo || 0) / statsData.ordens.concluidas 
          : 0,
        pecasEstoqueBaixo: statsData.alertas?.pecasEstoqueBaixo || 0
      }
    } catch (error) {
      toast.error('Erro ao carregar estatísticas:', error)
    }
  }

  // ========== RETURN ==========
  return {
    // State
    loading,
    stats,
    servicesChart,
    revenueChart,
    recentServices,
    topServices,
    vehiclesByBrand,
    trends,
    // Actions
    fetchDashboardData,
    fetchStats
  }
})