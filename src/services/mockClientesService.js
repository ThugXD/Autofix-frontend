// Mock Service para testar sem backend
let mockClientes = [
  {
    id: 1810,
    name: 'Luis Sitoe',
    email: 'luisvasco@gmail.com',
    phone: '871978801',
    address: 'DSD5Dad',
    notes: '',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 1811,
    name: 'Carmen Tovela',
    email: 'carentovela@gmail.com',
    phone: '845678985',
    address: 'Agente 1',
    notes: '',
    created_at: '2024-01-16T14:20:00Z'
  },
  {
    id: 1812,
    name: 'Hollyfield Marabill',
    email: 'hollyfieldmarabill@gmail.com',
    phone: '873000515',
    address: 'Agente 1',
    notes: '',
    created_at: '2024-01-17T09:15:00Z'
  },
  {
    id: 1813,
    name: 'Valter Zandamela',
    email: 'Valterzandamela@gmail.com',
    phone: '8456829021',
    address: 'Agente 1',
    notes: '',
    created_at: '2024-01-18T16:45:00Z'
  },
  {
    id: 1814,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '847123456',
    address: 'Av. Julius Nyerere, 123',
    notes: 'Cliente VIP',
    created_at: '2024-01-19T11:00:00Z'
  },
  {
    id: 1815,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '823456789',
    address: 'Rua da Liberdade, 456',
    notes: '',
    created_at: '2024-01-20T13:30:00Z'
  }
]

let nextId = 1816

// Simular delay de rede
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const mockClientesService = {
  async getAll(params = {}) {
    await delay()

    let filtered = [...mockClientes]

    // Busca
    if (params.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.phone.includes(search)
      )
    }

    // Ordenação
    const orderBy = params.order_by || 'name'
    const orderDirection = params.order_direction || 'asc'
    filtered.sort((a, b) => {
      const aVal = a[orderBy] || ''
      const bVal = b[orderBy] || ''
      return orderDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
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
    const cliente = mockClientes.find(c => c.id === parseInt(id))
    if (!cliente) {
      throw new Error('Cliente não encontrado')
    }
    return { data: cliente }
  },

  async create(data) {
    await delay()
    const newCliente = {
      id: nextId++,
      ...data,
      created_at: new Date().toISOString()
    }
    mockClientes.unshift(newCliente)
    return { data: newCliente }
  },

  async update(id, data) {
    await delay()
    const index = mockClientes.findIndex(c => c.id === parseInt(id))
    if (index === -1) {
      throw new Error('Cliente não encontrado')
    }
    mockClientes[index] = {
      ...mockClientes[index],
      ...data
    }
    return { data: mockClientes[index] }
  },

  async delete(id) {
    await delay()
    const index = mockClientes.findIndex(c => c.id === parseInt(id))
    if (index === -1) {
      throw new Error('Cliente não encontrado')
    }
    mockClientes.splice(index, 1)
    return { data: { success: true } }
  },

  async search(query) {
    await delay()
    const search = query.toLowerCase()
    const results = mockClientes.filter(c =>
      c.name.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search)
    ).slice(0, 10)
    return { data: results }
  }
}