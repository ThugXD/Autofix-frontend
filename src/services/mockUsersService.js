let mockUsers = [
  {
    id: 1,
    name: 'Admin da Oficina',
    email: 'admin@oficina.com',
    phone: '841234567',
    role: 'admin',
    avatar: null,
    is_active: true,
    last_login: '2024-01-09T10:30:00Z',
    created_at: '2024-01-01T09:00:00Z'
  },
  {
    id: 2,
    name: 'João Mecânico',
    email: 'joao@oficina.com',
    phone: '847654321',
    role: 'mecanico',
    avatar: null,
    is_active: true,
    last_login: '2024-01-09T08:15:00Z',
    created_at: '2024-01-02T10:00:00Z'
  },
  {
    id: 3,
    name: 'Maria Atendente',
    email: 'maria@oficina.com',
    phone: '823456789',
    role: 'atendente',
    avatar: null,
    is_active: true,
    last_login: '2024-01-09T09:00:00Z',
    created_at: '2024-01-03T11:00:00Z'
  },
  {
    id: 4,
    name: 'Pedro Mecânico',
    email: 'pedro@oficina.com',
    phone: '869876543',
    role: 'mecanico',
    avatar: null,
    is_active: true,
    last_login: '2024-01-08T16:45:00Z',
    created_at: '2024-01-05T14:00:00Z'
  },
  {
    id: 5,
    name: 'Ana Atendente',
    email: 'ana@oficina.com',
    phone: '845678901',
    role: 'atendente',
    avatar: null,
    is_active: false,
    last_login: '2024-01-05T12:00:00Z',
    created_at: '2024-01-04T13:00:00Z'
  }
]

let nextId = 6

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const mockUsersService = {
  async getAll(params = {}) {
    await delay()

    let filtered = [...mockUsers]

    if (params.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
      )
    }

    if (params.role) {
      filtered = filtered.filter(u => u.role === params.role)
    }

    if (params.is_active !== undefined) {
      filtered = filtered.filter(u => u.is_active === params.is_active)
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
    const user = mockUsers.find(u => u.id === parseInt(id))
    if (!user) throw new Error('Utilizador não encontrado')
    return { data: user }
  },

  async create(data) {
    await delay()
    const newUser = {
      id: nextId++,
      ...data,
      avatar: null,
      last_login: null,
      created_at: new Date().toISOString()
    }
    mockUsers.unshift(newUser)
    return { data: newUser }
  },

  async update(id, data) {
    await delay()
    const index = mockUsers.findIndex(u => u.id === parseInt(id))
    if (index === -1) throw new Error('Utilizador não encontrado')
    mockUsers[index] = { ...mockUsers[index], ...data }
    return { data: mockUsers[index] }
  },

  async delete(id) {
    await delay()
    const index = mockUsers.findIndex(u => u.id === parseInt(id))
    if (index === -1) throw new Error('Utilizador não encontrado')
    mockUsers.splice(index, 1)
    return { data: { success: true } }
  },

  async updatePassword(id, data) {
    await delay()
    return { data: { success: true } }
  }
}