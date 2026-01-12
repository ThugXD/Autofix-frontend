// Mock Service para testar sem backend
let mockOrdens = [
  {
    id: 1,
    numero: 'OS-2024-001',
    cliente_id: 1810,
    cliente_name: 'Luis Sitoe',
    veiculo_id: 1,
    veiculo_info: 'Toyota Corolla 2020 (ABC-1234)',
    responsavel_id: 1,
    responsavel_name: 'João Mecânico',
    status: 'concluido',
    priority: 'media',
    data_abertura: '2024-01-05T09:00:00Z',
    data_prevista: '2024-01-06T17:00:00Z',
    data_conclusao: '2024-01-06T15:30:00Z',
    problema_relatado: 'Troca de óleo e filtro',
    diagnostico: 'Óleo estava escuro, filtro sujo',
    observacoes: 'Cliente solicitou troca de óleo sintético',
    subtotal_servicos: 800,
    subtotal_pecas: 400,
    desconto: 0,
    taxa_adicional: 0,
    total: 1200,
    itens: [
      {
        id: 1,
        tipo: 'servico',
        descricao: 'Troca de óleo',
        quantidade: 1,
        preco_unitario: 800,
        subtotal: 800
      },
      {
        id: 2,
        tipo: 'peca',
        descricao: 'Óleo Sintético 5W30',
        quantidade: 4,
        preco_unitario: 100,
        subtotal: 400
      }
    ],
    pagamentos: [
      {
        id: 1,
        valor: 1200,
        metodo: 'dinheiro',
        status: 'confirmado',
        data_pagamento: '2024-01-06T15:30:00Z'
      }
    ],
    created_at: '2024-01-05T09:00:00Z'
  },
  {
    id: 2,
    numero: 'OS-2024-002',
    cliente_id: 1811,
    cliente_name: 'Carmen Tovela',
    veiculo_id: 2,
    veiculo_info: 'Honda Civic 2019 (XYZ-5678)',
    responsavel_id: 1,
    responsavel_name: 'João Mecânico',
    status: 'em_andamento',
    priority: 'alta',
    data_abertura: '2024-01-08T10:30:00Z',
    data_prevista: '2024-01-09T18:00:00Z',
    data_conclusao: null,
    problema_relatado: 'Barulho estranho ao frear',
    diagnostico: 'Pastilhas de freio gastas, necessário substituição',
    observacoes: '',
    subtotal_servicos: 1200,
    subtotal_pecas: 1300,
    desconto: 0,
    taxa_adicional: 0,
    total: 2500,
    itens: [
      {
        id: 3,
        tipo: 'servico',
        descricao: 'Troca de pastilhas de freio',
        quantidade: 1,
        preco_unitario: 1200,
        subtotal: 1200
      },
      {
        id: 4,
        tipo: 'peca',
        descricao: 'Pastilhas de freio dianteiras',
        quantidade: 1,
        preco_unitario: 800,
        subtotal: 800
      },
      {
        id: 5,
        tipo: 'peca',
        descricao: 'Pastilhas de freio traseiras',
        quantidade: 1,
        preco_unitario: 500,
        subtotal: 500
      }
    ],
    pagamentos: [],
    created_at: '2024-01-08T10:30:00Z'
  },
  {
    id: 3,
    numero: 'OS-2024-003',
    cliente_id: 1812,
    cliente_name: 'Hollyfield Marabill',
    veiculo_id: 3,
    veiculo_info: 'Volkswagen Golf 2021 (DEF-9012)',
    responsavel_id: 1,
    responsavel_name: 'João Mecânico',
    status: 'pendente',
    priority: 'baixa',
    data_abertura: '2024-01-08T14:00:00Z',
    data_prevista: '2024-01-10T17:00:00Z',
    data_conclusao: null,
    problema_relatado: 'Revisão dos 30.000 km',
    diagnostico: '',
    observacoes: 'Revisão agendada',
    subtotal_servicos: 1500,
    subtotal_pecas: 0,
    desconto: 0,
    taxa_adicional: 0,
    total: 1500,
    itens: [
      {
        id: 6,
        tipo: 'servico',
        descricao: 'Revisão completa 30.000 km',
        quantidade: 1,
        preco_unitario: 1500,
        subtotal: 1500
      }
    ],
    pagamentos: [],
    created_at: '2024-01-08T14:00:00Z'
  },
  {
    id: 4,
    numero: 'OS-2024-004',
    cliente_id: 1813,
    cliente_name: 'Valter Zandamela',
    veiculo_id: 5,
    veiculo_info: 'Nissan Sentra 2022 (JKL-7890)',
    responsavel_id: 1,
    responsavel_name: 'João Mecânico',
    status: 'aguardando_pecas',
    priority: 'urgente',
    data_abertura: '2024-01-07T11:00:00Z',
    data_prevista: '2024-01-09T17:00:00Z',
    data_conclusao: null,
    problema_relatado: 'Motor não liga',
    diagnostico: 'Bateria com defeito, necessário substituição',
    observacoes: 'Aguardando chegada da bateria',
    subtotal_servicos: 300,
    subtotal_pecas: 1200,
    desconto: 0,
    taxa_adicional: 0,
    total: 1500,
    itens: [
      {
        id: 7,
        tipo: 'servico',
        descricao: 'Troca de bateria',
        quantidade: 1,
        preco_unitario: 300,
        subtotal: 300
      },
      {
        id: 8,
        tipo: 'peca',
        descricao: 'Bateria 60Ah',
        quantidade: 1,
        preco_unitario: 1200,
        subtotal: 1200
      }
    ],
    pagamentos: [],
    created_at: '2024-01-07T11:00:00Z'
  }
]

let nextId = 5
let nextItemId = 9

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const mockOrdensServicoService = {
  async getAll(params = {}) {
    await delay()

    let filtered = [...mockOrdens]

    // Busca
    if (params.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(o =>
        o.numero.toLowerCase().includes(search) ||
        o.cliente_name.toLowerCase().includes(search) ||
        o.veiculo_info.toLowerCase().includes(search)
      )
    }

    // Filtro por status
    if (params.status) {
      filtered = filtered.filter(o => o.status === params.status)
    }

    // Filtro por prioridade
    if (params.priority) {
      filtered = filtered.filter(o => o.priority === params.priority)
    }

    // Filtro por cliente
    if (params.cliente_id) {
      filtered = filtered.filter(o => o.cliente_id === parseInt(params.cliente_id))
    }

    // Ordenação
    const orderBy = params.order_by || 'data_abertura'
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
    const ordem = mockOrdens.find(o => o.id === parseInt(id))
    if (!ordem) {
      throw new Error('Ordem de serviço não encontrada')
    }
    return { data: ordem }
  },

  async create(data) {
    await delay()
    const newOrdem = {
      id: nextId++,
      numero: `OS-2024-${String(nextId).padStart(3, '0')}`,
      ...data,
      itens: [],
      pagamentos: [],
      created_at: new Date().toISOString()
    }
    mockOrdens.unshift(newOrdem)
    return { data: newOrdem }
  },

  async update(id, data) {
    await delay()
    const index = mockOrdens.findIndex(o => o.id === parseInt(id))
    if (index === -1) {
      throw new Error('Ordem de serviço não encontrada')
    }
    mockOrdens[index] = {
      ...mockOrdens[index],
      ...data
    }
    return { data: mockOrdens[index] }
  },

  async updateStatus(id, status) {
    await delay()
    const index = mockOrdens.findIndex(o => o.id === parseInt(id))
    if (index === -1) {
      throw new Error('Ordem de serviço não encontrada')
    }
    mockOrdens[index].status = status
    if (status === 'concluido') {
      mockOrdens[index].data_conclusao = new Date().toISOString()
    }
    return { data: mockOrdens[index] }
  },

  async delete(id) {
    await delay()
    const index = mockOrdens.findIndex(o => o.id === parseInt(id))
    if (index === -1) {
      throw new Error('Ordem de serviço não encontrada')
    }
    mockOrdens.splice(index, 1)
    return { data: { success: true } }
  },

  async addItem(ordemId, itemData) {
    await delay()
    const ordem = mockOrdens.find(o => o.id === parseInt(ordemId))
    if (!ordem) {
      throw new Error('Ordem de serviço não encontrada')
    }
    const newItem = {
      id: nextItemId++,
      ...itemData
    }
    ordem.itens.push(newItem)
    
    // Recalcular totais
    ordem.subtotal_servicos = ordem.itens
      .filter(i => i.tipo === 'servico')
      .reduce((sum, i) => sum + i.subtotal, 0)
    ordem.subtotal_pecas = ordem.itens
      .filter(i => i.tipo === 'peca')
      .reduce((sum, i) => sum + i.subtotal, 0)
    ordem.total = ordem.subtotal_servicos + ordem.subtotal_pecas - ordem.desconto + ordem.taxa_adicional
    
    return { data: newItem }
  },

  async updateItem(ordemId, itemId, itemData) {
    await delay()
    const ordem = mockOrdens.find(o => o.id === parseInt(ordemId))
    if (!ordem) {
      throw new Error('Ordem de serviço não encontrada')
    }
    const itemIndex = ordem.itens.findIndex(i => i.id === parseInt(itemId))
    if (itemIndex === -1) {
      throw new Error('Item não encontrado')
    }
    ordem.itens[itemIndex] = { ...ordem.itens[itemIndex], ...itemData }
    
    // Recalcular totais
    ordem.subtotal_servicos = ordem.itens
      .filter(i => i.tipo === 'servico')
      .reduce((sum, i) => sum + i.subtotal, 0)
    ordem.subtotal_pecas = ordem.itens
      .filter(i => i.tipo === 'peca')
      .reduce((sum, i) => sum + i.subtotal, 0)
    ordem.total = ordem.subtotal_servicos + ordem.subtotal_pecas - ordem.desconto + ordem.taxa_adicional
    
    return { data: ordem.itens[itemIndex] }
  },

  async removeItem(ordemId, itemId) {
    await delay()
    const ordem = mockOrdens.find(o => o.id === parseInt(ordemId))
    if (!ordem) {
      throw new Error('Ordem de serviço não encontrada')
    }
    ordem.itens = ordem.itens.filter(i => i.id !== parseInt(itemId))
    
    // Recalcular totais
    ordem.subtotal_servicos = ordem.itens
      .filter(i => i.tipo === 'servico')
      .reduce((sum, i) => sum + i.subtotal, 0)
    ordem.subtotal_pecas = ordem.itens
      .filter(i => i.tipo === 'peca')
      .reduce((sum, i) => sum + i.subtotal, 0)
    ordem.total = ordem.subtotal_servicos + ordem.subtotal_pecas - ordem.desconto + ordem.taxa_adicional
    
    return { data: { success: true } }
  },

  async addPayment(ordemId, paymentData) {
    await delay()
    const ordem = mockOrdens.find(o => o.id === parseInt(ordemId))
    if (!ordem) {
      throw new Error('Ordem de serviço não encontrada')
    }
    const newPayment = {
      id: ordem.pagamentos.length + 1,
      ...paymentData,
      data_pagamento: new Date().toISOString()
    }
    ordem.pagamentos.push(newPayment)
    return { data: newPayment }
  },

  async getByCliente(clienteId) {
    await delay()
    const ordens = mockOrdens.filter(o => o.cliente_id === parseInt(clienteId))
    return { data: ordens }
  },

  async getByVeiculo(veiculoId) {
    await delay()
    const ordens = mockOrdens.filter(o => o.veiculo_id === parseInt(veiculoId))
    return { data: ordens }
  },

  async uploadPhotos(id, type, photos) {
    await delay()
    return { data: { success: true } }
  },

  async generatePDF(id) {
    await delay()
    return { data: new Blob(['PDF Mock'], { type: 'application/pdf' }) }
  },

  async getStats(params = {}) {
    await delay()
    return {
      data: {
        total: mockOrdens.length,
        pendentes: mockOrdens.filter(o => o.status === 'pendente').length,
        em_andamento: mockOrdens.filter(o => o.status === 'em_andamento').length,
        concluidas: mockOrdens.filter(o => o.status === 'concluido').length,
        receita_total: mockOrdens
          .filter(o => o.status === 'concluido')
          .reduce((sum, o) => sum + o.total, 0)
      }
    }
  }
}