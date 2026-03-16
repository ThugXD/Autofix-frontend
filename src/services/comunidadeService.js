let mockCommunities = [
  {
    id: 1,
    name: 'Associação Vida Plena',
    location: 'Maputo Cidade',
    responsavel: 'Amélia Comunitária',
    email: 'amelia.pf@sacco.org.mz',
    status: 'Ativo',
    criancas: 45,
    created_at: '2025-01-01T08:00:00Z'
  },
  {
    id: 2,
    name: 'Fundação Esperança',
    location: 'Matola',
    responsavel: 'Fátima Nutrição',
    email: 'fatima.sanc@sacco.org.mz',
    status: 'Ativo',
    criancas: 32,
    created_at: '2025-01-05T09:00:00Z'
  },
  {
    id: 3,
    name: 'ONG Criança Feliz',
    location: 'Beira',
    responsavel: 'João Parceiro',
    email: 'joao.parceiro@ong.org.mz',
    status: 'Pendente',
    criancas: 0,
    created_at: '2025-02-01T10:00:00Z'
  },
  {
    id: 4,
    name: 'Governo Local',
    location: 'Nampula',
    responsavel: 'Carlos Administrador',
    email: 'admin@sacco.org.mz',
    status: 'Ativo',
    criancas: 128,
    created_at: '2025-01-01T08:00:00Z'
  }
]

let nextId = 5

const delay = (ms = 50) => new Promise(resolve => setTimeout(resolve, ms))

export const comunidadeService = {
  async getAll(params = {}) {
    await delay()
    let filtered = [...mockCommunities]

    if (params.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search) ||
        c.responsavel.toLowerCase().includes(search)
      )
    }

    if (params.status) {
      filtered = filtered.filter(c => c.status === params.status)
    }

    return {
      data: {
        data: filtered,
        total: filtered.length
      }
    }
  },

  async create(data) {
    await delay()
    const newCommunity = {
      id: nextId++,
      ...data,
      criancas: 0,
      created_at: new Date().toISOString()
    }
    mockCommunities.unshift(newCommunity)
    return { data: newCommunity }
  },

  async update(id, data) {
    await delay()
    const index = mockCommunities.findIndex(c => c.id === parseInt(id))
    if (index === -1) throw new Error('Comunidade não encontrada')
    mockCommunities[index] = { ...mockCommunities[index], ...data }
    return { data: mockCommunities[index] }
  },

  async delete(id) {
    await delay()
    const index = mockCommunities.findIndex(c => c.id === parseInt(id))
    if (index === -1) throw new Error('Comunidade não encontrada')
    mockCommunities.splice(index, 1)
    return { data: { success: true } }
  }
}
