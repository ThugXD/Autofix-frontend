import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dashboardService } from '@/services/dashboardService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useDashboardStore = defineStore('dashboard', () => {
  // State - Adaptado para SACCO
  const stats = ref({
    criancasIdentificadas: 0,
    emCadastro: 0,
    aguardandoRevisao: 0,
    publicadas: 0
  })

  const trends = ref({
    identificadas: { value: 0, isPositive: true },
    emCadastro: { value: 0, isPositive: true },
    aguardandoRevisao: { value: 0, isPositive: true },
    publicadas: { value: 0, isPositive: true }
  })

  const recentComunicacoes = ref([])
  const cadastrosChart = ref({ labels: [], identificadas: [], publicadas: [] })
  const necessidadesChart = ref({ labels: [], valores: [] })
  const cadastrosEmAndamento = ref([])
  const vulnerabilidadesPorRegiao = ref([])
  const pontosFocaisAlocados = ref([])
  const loading = ref(false)

  // Actions
  const fetchDashboardData = async () => {
    try {
      loading.value = true
      const response = await dashboardService.getDashboardData()
      
      stats.value = response.data.stats
      trends.value = response.data.trends
      recentComunicacoes.value = response.data.recentComunicacoes
      cadastrosChart.value = response.data.cadastrosChart
      necessidadesChart.value = response.data.necessidadesChart
      cadastrosEmAndamento.value = response.data.cadastrosEmAndamento
      vulnerabilidadesPorRegiao.value = response.data.vulnerabilidadesPorRegiao
      pontosFocaisAlocados.value = response.data.pontosFocaisAlocados
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
    recentComunicacoes,
    cadastrosChart,
    necessidadesChart,
    cadastrosEmAndamento,
    vulnerabilidadesPorRegiao,
    pontosFocaisAlocados,
    loading,
    
    // Actions
    fetchDashboardData,
    refreshStats
  }
})
