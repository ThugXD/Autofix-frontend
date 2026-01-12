// Mock Service para testar sem backend
let mockVeiculos = [
  {
    id: 1,
    cliente_id: 1810,
    cliente_name: 'Luis Sitoe',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    plate: 'ABC-1234',
    color: 'Preto',
    vin: '1HGBH41JXMN109186',
    fuel_type: 'gasoline',
    mileage: 45000,
    photos: [],
    notes: 'Veículo em bom estado',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    cliente_id: 1811,
    cliente_name: 'Carmen Tovela',
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    plate: 'XYZ-5678',
    color: 'Branco',
    vin: '2HGFC2F59KH542678',
    fuel_type: 'gasoline',
    mileage: 52000,
    photos: [],
    notes: '',
    created_at: '2024-01-16T14:20:00Z'
  },
  {
    id: 3,
    cliente_id: 1812,
    cliente_name: 'Hollyfield Marabill',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    plate: 'DEF-9012',
    color: 'Cinza',
    vin: 'WVWZZZ1KZBW123456',
    fuel_type: 'diesel',
    mileage: 30000,
    photos: [],
    notes: '',
    created_at: '2024-01-17T09:15:00Z'
  },
  {
    id: 4,
    cliente_id: 1812,
    cliente_name: 'Hollyfield Marabill',
    brand: 'Volkswagen',
    model: 'Polo',
    year: 2018,
    plate: 'GHI-3456',
    color: 'Azul',
    vin: 'WVWZZZ6RZEW123789',
    fuel_type: 'gasoline',
    mileage: 68000,
    photos: [],
    notes: 'Segunda viatura do cliente',
    created_at: '2024-01-17T09:20:00Z'
  },
  {
    id: 5,
    cliente_id: 1813,
    cliente_name: 'Valter Zandamela',
    brand: 'Nissan',
    model: 'Sentra',
    year: 2022,
    plate: 'JKL-7890',
    color: 'Vermelho',
    vin: '3N1AB7AP8EY123456',
    fuel_type: 'hybrid',
    mileage: 15000,
    photos: [],
    notes: '',
    created_at: '2024-01-18T16:45:00Z'
  },
  {
    id: 6,
    cliente_id: 1814,
    cliente_name: 'João Silva',
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    plate: 'MNO-1234',
    color: 'Preto',
    vin: 'JM3KFBDM6N0123456',
    fuel_type: 'gasoline',
    mileage: 8000,
    photos: [],
    notes: 'Veículo novo',
    created_at: '2024-01-19T11:00:00Z'
  }
]

let nextId = 7

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const mockVeiculosService = {
  async getAll(params = {}) {
    await delay()

    let filtered = [...mockVeiculos]

    // Busca
    if (params.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(v =>
        v.brand.toLowerCase().includes(search) ||
        v.model.toLowerCase().includes(search) ||
        v.plate.toLowerCase().includes(search) ||
        v.cliente_name.toLowerCase().includes(search)
      )
    }

    // Filtro por cliente
    if (params.cliente_id) {
      filtered = filtered.filter(v => v.cliente_id === parseInt(params.cliente_id))
    }

    // Filtro por marca
    if (params.brand) {
      filtered = filtered.filter(v => v.brand === params.brand)
    }

    // Filtro por ano
    if (params.year) {
      filtered = filtered.filter(v => v.year === parseInt(params.year))
    }

    // Ordenação
    const orderBy = params.order_by || 'created_at'
    const orderDirection = params.order_direction || 'desc'
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

    // Paginação
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
    const veiculo = mockVeiculos.find(v => v.id === parseInt(id))
    if (!veiculo) {
      throw new Error('Veículo não encontrado')
    }
    return { data: veiculo }
  },

  async getByCliente(clienteId) {
    await delay()
    const veiculos = mockVeiculos.filter(v => v.cliente_id === parseInt(clienteId))
    return { data: veiculos }
  },

  async create(data) {
    await delay()
    const newVeiculo = {
      id: nextId++,
      ...data,
      photos: [],
      created_at: new Date().toISOString()
    }
    mockVeiculos.unshift(newVeiculo)
    return { data: newVeiculo }
  },

  async update(id, data) {
    await delay()
    const index = mockVeiculos.findIndex(v => v.id === parseInt(id))
    if (index === -1) {
      throw new Error('Veículo não encontrado')
    }
    mockVeiculos[index] = {
      ...mockVeiculos[index],
      ...data
    }
    return { data: mockVeiculos[index] }
  },

  async delete(id) {
    await delay()
    const index = mockVeiculos.findIndex(v => v.id === parseInt(id))
    if (index === -1) {
      throw new Error('Veículo não encontrado')
    }
    mockVeiculos.splice(index, 1)
    return { data: { success: true } }
  },

  async search(query) {
    await delay()
    const search = query.toLowerCase()
    const results = mockVeiculos.filter(v =>
      v.brand.toLowerCase().includes(search) ||
      v.model.toLowerCase().includes(search) ||
      v.plate.toLowerCase().includes(search)
    ).slice(0, 10)
    return { data: results }
  },

  async uploadPhotos(id, photos) {
    await delay()
    // Simular upload
    return { data: { success: true, photos: [] } }
  },

  async deletePhoto(id, photoUrl) {
    await delay()
    return { data: { success: true } }
  }
}