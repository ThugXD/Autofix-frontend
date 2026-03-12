import api from './api'

// Mock data para dashboard SACCO - Ponto Focal Comunitário
const mockDashboardData = {
  stats: {
    criancasIdentificadas: 24,
    emCadastro: 8,
    aguardandoRevisao: 5,
    publicadas: 11
  },
  
  trends: {
    identificadas: { value: 15, isPositive: true },
    emCadastro: { value: 10, isPositive: true },
    aguardandoRevisao: { value: -5, isPositive: true },
    publicadas: { value: 20, isPositive: true }
  },

  recentComunicacoes: [
    {
      id: 'COM-2024-001',
      crianca: 'Esperança Mondlane',
      bairro: 'Maxaquene A',
      status: 'pendente',
      data: '2024-03-10'
    },
    {
      id: 'COM-2024-002',
      crianca: 'Carlos Sitoe',
      bairro: 'Chamanculo C',
      status: 'aprovada',
      data: '2024-03-09'
    },
    {
      id: 'COM-2024-003',
      crianca: 'Ana Mabunda',
      bairro: 'Polana Caniço',
      status: 'em_cadastro',
      data: '2024-03-08'
    },
    {
      id: 'COM-2024-004',
      crianca: 'Pedro Nhamussua',
      bairro: 'Hulene B',
      status: 'aprovada',
      data: '2024-03-07'
    }
  ],

  cadastrosChart: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    identificadas: [5, 8, 12, 10, 15, 24],
    publicadas: [2, 4, 6, 5, 8, 11]
  },

  necessidadesChart: {
    labels: ['SADD', 'SANC', 'SASBE', 'SAAD', 'SAEIE', 'SAPS', 'SAPE'],
    valores: [15, 22, 18, 20, 25, 12, 16]
  },

  cadastrosEmAndamento: [
    { 
      id: 1,
      nome: 'Esperança Mondlane', 
      progresso: 3, 
      total: 7,
      dataInicio: '2024-03-05'
    },
    { 
      id: 2,
      nome: 'Carlos Sitoe', 
      progresso: 7, 
      total: 7,
      dataInicio: '2024-02-20'
    },
    { 
      id: 3,
      nome: 'Ana Mabunda', 
      progresso: 5, 
      total: 7,
      dataInicio: '2024-02-28'
    },
    { 
      id: 4,
      nome: 'Luísa Tembe', 
      progresso: 1, 
      total: 7,
      dataInicio: '2024-03-08'
    }
  ],

  vulnerabilidadesPorRegiao: [
    { regiao: 'Maputo Cidade', count: 12 },
    { regiao: 'Maputo Província', count: 8 },
    { regiao: 'Gaza', count: 5 },
    { regiao: 'Inhambane', count: 4 },
    { regiao: 'Sofala', count: 3 }
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

  async getRecentComunicacoes() {
    await delay()
    return { data: mockDashboardData.recentComunicacoes }
  },

  async getCadastrosChart() {
    await delay()
    return { data: mockDashboardData.cadastrosChart }
  },

  async getNecessidadesChart() {
    await delay()
    return { data: mockDashboardData.necessidadesChart }
  },

  async getCadastrosEmAndamento() {
    await delay()
    return { data: mockDashboardData.cadastrosEmAndamento }
  },

  async getVulnerabilidadesPorRegiao() {
    await delay()
    return { data: mockDashboardData.vulnerabilidadesPorRegiao }
  },

  async getDashboardData() {
    await delay()
    return { data: mockDashboardData }
  }
}
