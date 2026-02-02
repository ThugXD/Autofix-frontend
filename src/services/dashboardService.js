import api from './api'

export default {
  /**
   * Buscar estatísticas gerais
   */
  getStats(period = 30) {
    return api.get('/dashboard/stats', { params: { period } })
  },

  /**
   * Buscar gráfico de serviços por status
   */
  getServicesChart(days = 30) {
    return api.get('/dashboard/charts/services', { params: { days } })
  },

  /**
   * Buscar gráfico de receita por período
   */
  getRevenueChart(days = 30) {
    return api.get('/dashboard/charts/revenue', { params: { days } })
  },

  /**
   * Buscar serviços recentes
   */
  getRecentServices() {
    return api.get('/dashboard/recent-services')
  },

  /**
   * Buscar serviços mais realizados
   */
  getTopServices() {
    return api.get('/dashboard/top-services')
  }
}