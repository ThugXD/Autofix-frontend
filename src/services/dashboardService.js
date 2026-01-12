import api from './api'

// Mock data para dashboard
const mockDashboardData = {
  stats: {
    totalClientes: 132,
    totalVeiculos: 193,
    servicosConcluidos: 143,
    servicosPendentes: 50,
    receitaMensal: 45000,
    ticketMedio: 850
  },
  
  trends: {
    clientes: { value: 12, isPositive: true },
    veiculos: { value: 8, isPositive: true },
    servicos: { value: 15, isPositive: true },
    pendentes: { value: -3, isPositive: false },
    receita: { value: 18, isPositive: true },
    ticket: { value: 5, isPositive: true }
  },

  recentServices: [
    {
      id: 'OS-2024-001',
      cliente: 'Luis Sitoe',
      veiculo: 'Toyota Corolla',
      servico: 'Troca de óleo',
      status: 'concluido',
      valor: 1200,
      data: '2024-01-08'
    },
    {
      id: 'OS-2024-002',
      cliente: 'Carmen Tovela',
      veiculo: 'Honda Civic',
      servico: 'Revisão completa',
      status: 'em_andamento',
      valor: 2500,
      data: '2024-01-08'
    },
    {
      id: 'OS-2024-003',
      cliente: 'Hollyfield Marabill',
      veiculo: 'Volkswagen Golf',
      servico: 'Troca de pastilhas',
      status: 'pendente',
      valor: 800,
      data: '2024-01-07'
    },
    {
      id: 'OS-2024-004',
      cliente: 'Valter Zandamela',
      veiculo: 'Nissan Sentra',
      servico: 'Alinhamento',
      status: 'concluido',
      valor: 450,
      data: '2024-01-07'
    }
  ],

  servicesChart: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    concluidos: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85],
    pendentes: [12, 15, 10, 18, 14, 20, 22, 16, 25, 20, 18, 15]
  },

  revenueChart: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    receita: [28000, 32000, 29000, 38000, 35000, 42000, 45000, 43000, 48000, 52000, 49000, 55000]
  },

  topServices: [
    { name: 'Troca de óleo', count: 45, revenue: 54000 },
    { name: 'Revisão completa', count: 32, revenue: 80000 },
    { name: 'Troca de pastilhas', count: 28, revenue: 22400 },
    { name: 'Alinhamento', count: 25, revenue: 11250 },
    { name: 'Balanceamento', count: 22, revenue: 8800 }
  ],

  vehiclesByBrand: [
    { brand: 'Toyota', count: 42 },
    { brand: 'Honda', count: 35 },
    { brand: 'Volkswagen', count: 28 },
    { brand: 'Nissan', count: 24 },
    { brand: 'Mazda', count: 20 },
    { brand: 'Outros', count: 44 }
  ]
}

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const dashboardService = {
  async getStats() {
    await delay()
    return { data: mockDashboardData.stats }
  },

  async getTrends() {
    await delay()
    return { data: mockDashboardData.trends }
  },

  async getRecentServices() {
    await delay()
    return { data: mockDashboardData.recentServices }
  },

  async getServicesChart() {
    await delay()
    return { data: mockDashboardData.servicesChart }
  },

  async getRevenueChart() {
    await delay()
    return { data: mockDashboardData.revenueChart }
  },

  async getTopServices() {
    await delay()
    return { data: mockDashboardData.topServices }
  },

  async getVehiclesByBrand() {
    await delay()
    return { data: mockDashboardData.vehiclesByBrand }
  },

  async getDashboardData() {
    await delay()
    return { data: mockDashboardData }
  }
}