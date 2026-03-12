let mockUsers = [
  {
    id: 1,
    name: 'Carlos Administrador',
    email: 'admin@sacco.org.mz',
    phone: '841000001',
    role: 'admin',
    avatar: null,
    is_active: true,
    last_login: '2026-03-12T09:00:00Z',
    created_at: '2025-01-01T08:00:00Z'
  },
  {
    id: 2,
    name: 'Beatriz Gestora',
    email: 'gestora@sacco.org.mz',
    phone: '841000002',
    role: 'gestor',
    avatar: null,
    is_active: true,
    last_login: '2026-03-12T08:30:00Z',
    created_at: '2025-01-05T09:00:00Z'
  },
  {
    id: 3,
    name: 'Amélia Comunitária',
    email: 'amelia.pf@sacco.org.mz',
    phone: '841000003',
    role: 'ponto_focal',
    avatar: null,
    is_active: true,
    last_login: '2026-03-11T14:00:00Z',
    created_at: '2025-02-01T10:00:00Z'
  },
  {
    id: 4,
    name: 'Domingos SADD',
    email: 'domingos.sadd@sacco.org.mz',
    phone: '841000004',
    role: 'ponto_focal_tematico',
    avatar: null,
    is_active: true,
    last_login: '2026-03-10T11:00:00Z',
    created_at: '2025-02-05T10:00:00Z'
  },
  {
    id: 5,
    name: 'Fátima Nutrição',
    email: 'fatima.sanc@sacco.org.mz',
    phone: '841000005',
    role: 'ponto_focal_tematico',
    avatar: null,
    is_active: true,
    last_login: '2026-03-09T10:00:00Z',
    created_at: '2025-02-10T10:00:00Z'
  },
  {
    id: 6,
    name: 'Rosa Tutora',
    email: 'rosa.tutora@gmail.com',
    phone: '841000006',
    role: 'tutor',
    avatar: null,
    is_active: true,
    last_login: '2026-03-08T09:30:00Z',
    created_at: '2025-03-01T12:00:00Z'
  },
  {
    id: 7,
    name: 'Manuel Tutor',
    email: 'manuel.tutor@gmail.com',
    phone: '841000007',
    role: 'tutor',
    avatar: null,
    is_active: false,
    last_login: '2026-02-25T08:00:00Z',
    created_at: '2025-03-10T11:00:00Z'
  },
  {
    id: 8,
    name: 'João Padrinho',
    email: 'joao.padrinho@gmail.com',
    phone: '841000008',
    role: 'padrinho',
    avatar: null,
    is_active: true,
    last_login: '2026-03-11T20:00:00Z',
    created_at: '2025-06-01T15:00:00Z'
  },
  {
    id: 9,
    name: 'Sofia Madrinha',
    email: 'sofia.madrinha@gmail.com',
    phone: '841000009',
    role: 'padrinho',
    avatar: null,
    is_active: true,
    last_login: '2026-03-12T07:45:00Z',
    created_at: '2025-07-15T14:00:00Z'
  }
]

let nextId = 10

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