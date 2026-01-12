let mockServicos = [
  {
    id: 1,
    name: 'Troca de óleo',
    description: 'Troca de óleo do motor com filtro',
    category: 'manutencao',
    default_price: 800.00,
    estimated_time: 30,
    is_active: true,
    created_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 2,
    name: 'Troca de pastilhas de freio',
    description: 'Substituição de pastilhas dianteiras e traseiras',
    category: 'reparo',
    default_price: 1200.00,
    estimated_time: 60,
    is_active: true,
    created_at: '2024-01-10T09:30:00Z'
  },
  {
    id: 3,
    name: 'Alinhamento',
    description: 'Alinhamento e balanceamento de rodas',
    category: 'manutencao',
    default_price: 450.00,
    estimated_time: 45,
    is_active: true,
    created_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 4,
    name: 'Revisão completa',
    description: 'Revisão geral do veículo incluindo filtros e fluidos',
    category: 'manutencao',
    default_price: 1500.00,
    estimated_time: 120,
    is_active: true,
    created_at: '2024-01-10T10:30:00Z'
  },
  {
    id: 5,
    name: 'Diagnóstico eletrônico',
    description: 'Diagnóstico completo do sistema eletrônico do veículo',
    category: 'diagnostico',
    default_price: 300.00,
    estimated_time: 30,
    is_active: true,
    created_at: '2024-01-10T11:00:00Z'
  },
  {
    id: 6,
    name: 'Troca de bateria',
    description: 'Substituição de bateria automotiva',
    category: 'reparo',
    default_price: 250.00,
    estimated_time: 20,
    is_active: true,
    created_at: '2024-01-10T11:30:00Z'
  },
  {
    id: 7,
    name: 'Instalação de som',
    description: 'Instalação completa de sistema de som',
    category: 'instalacao',
    default_price: 800.00,
    estimated_time: 90,
    is_active: true,
    created_at: '2024-01-10T12:00:00Z'
  }
]

let nextId = 8

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const mockServicosService = {
  async getAll(params = {}) {
    await delay()

    let filtered = [...mockServicos]

    if (params.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(search) ||
        (s.description && s.description.toLowerCase().includes(search))
      )
    }

    if (params.category) {
      filtered = filtered.filter(s => s.category === params.category)
    }

    if (params.is_active !== undefined) {
      filtered = filtered.filter(s => s.is_active === params.is_active)
    }

    const orderBy = params.order_by || 'name'
    const orderDirection = params.order_direction || 'asc'
    filtered.sort((a, b) => {
      const aVal = a[orderBy] || ''
      const bVal = b[orderBy] || ''
      if (typeof aVal === 'number') {
        return orderDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      return orderDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })

    const page = parseInt(params.page) || 1
    const perPage = parseInt(params.per_page) || 10
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedData = filtered.slice(start, end)

    return {
      data: {
        data: paginatedData,
        current_page: page,
        per_page: perPage,
        total: filtered.length,
        last_page: Math.ceil(filtered.length / perPage)
      }
    }
  },

  async getById(id) {
    await delay()
    const servico = mockServicos.find(s => s.id === parseInt(id))
    if (!servico) {
      throw new Error('Serviço não encontrado')
    }
    return { data: servico }
  },

  async create(data) {
    await delay()
    const newServico = {
      id: nextId++,
      ...data,
      created_at: new Date().toISOString()
    }
    mockServicos.unshift(newServico)
    return { data: newServico }
  },

  async update(id, data) {
    await delay()
    const index = mockServicos.findIndex(s => s.id === parseInt(id))
    if (index === -1) {
      throw new Error('Serviço não encontrado')
    }
    mockServicos[index] = {
      ...mockServicos[index],
      ...data
    }
    return { data: mockServicos[index] }
  },

  async delete(id) {
    await delay()
    const index = mockServicos.findIndex(s => s.id === parseInt(id))
    if (index === -1) {
      throw new Error('Serviço não encontrado')
    }
    mockServicos.splice(index, 1)
    return { data: { success: true } }
  },

  async getActive() {
    await delay()
    const active = mockServicos.filter(s => s.is_active)
    return { data: active }
  }
}