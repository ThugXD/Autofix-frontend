let mockPecas = [
  { id: 1, name: 'Óleo Sintético 5W30', code: 'OL-001', brand: 'Castrol', category: 'Lubrificantes', unit_price: 100.00, quantity_in_stock: 50, min_stock_level: 10, location: 'Prateleira A1', supplier: 'Distribuidora ABC', is_active: true, created_at: '2024-01-10T09:00:00Z' },
  { id: 2, name: 'Filtro de Óleo', code: 'FT-002', brand: 'Mann', category: 'Filtros', unit_price: 50.00, quantity_in_stock: 30, min_stock_level: 15, location: 'Prateleira B2', supplier: 'AutoPeças XYZ', is_active: true, created_at: '2024-01-10T10:00:00Z' },
  { id: 3, name: 'Pastilha Freio Dianteira', code: 'FR-003', brand: 'Bosch', category: 'Freios', unit_price: 400.00, quantity_in_stock: 8, min_stock_level: 10, location: 'Prateleira C3', supplier: 'Bosch Parts', is_active: true, created_at: '2024-01-10T11:00:00Z' },
  { id: 4, name: 'Bateria 60Ah', code: 'BT-004', brand: 'Moura', category: 'Elétrica', unit_price: 1200.00, quantity_in_stock: 5, min_stock_level: 3, location: 'Depósito 1', supplier: 'Moura Oficial', is_active: true, created_at: '2024-01-10T12:00:00Z' },
  { id: 5, name: 'Vela de Ignição', code: 'VL-005', brand: 'NGK', category: 'Ignição', unit_price: 35.00, quantity_in_stock: 60, min_stock_level: 20, location: 'Prateleira D4', supplier: 'NGK Brasil', is_active: true, created_at: '2024-01-10T13:00:00Z' }
]

let nextId = 6

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const mockPecasService = {
  async getAll(params = {}) {
    await delay()
    let filtered = [...mockPecas]

    if (params.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.code.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search)
      )
    }

    if (params.category) {
      filtered = filtered.filter(p => p.category === params.category)
    }

    if (params.low_stock) {
      filtered = filtered.filter(p => p.quantity_in_stock <= p.min_stock_level)
    }

    const page = parseInt(params.page) || 1
    const perPage = parseInt(params.per_page) || 10
    const start = (page - 1) * perPage
    const paginatedData = filtered.slice(start, start + perPage)

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
    const peca = mockPecas.find(p => p.id === parseInt(id))
    if (!peca) throw new Error('Peça não encontrada')
    return { data: peca }
  },

  async create(data) {
    await delay()
    const newPeca = { id: nextId++, ...data, created_at: new Date().toISOString() }
    mockPecas.unshift(newPeca)
    return { data: newPeca }
  },

  async update(id, data) {
    await delay()
    const index = mockPecas.findIndex(p => p.id === parseInt(id))
    if (index === -1) throw new Error('Peça não encontrada')
    mockPecas[index] = { ...mockPecas[index], ...data }
    return { data: mockPecas[index] }
  },

  async delete(id) {
    await delay()
    const index = mockPecas.findIndex(p => p.id === parseInt(id))
    if (index === -1) throw new Error('Peça não encontrada')
    mockPecas.splice(index, 1)
    return { data: { success: true } }
  },

  async addMovement(id, data) {
    await delay()
    const peca = mockPecas.find(p => p.id === parseInt(id))
    if (!peca) throw new Error('Peça não encontrada')
    if (data.tipo === 'entrada') {
      peca.quantity_in_stock += data.quantidade
    } else {
      peca.quantity_in_stock -= data.quantidade
    }
    return { data: { success: true } }
  },

  async getLowStock() {
    await delay()
    const lowStock = mockPecas.filter(p => p.quantity_in_stock <= p.min_stock_level)
    return { data: lowStock }
  }
}