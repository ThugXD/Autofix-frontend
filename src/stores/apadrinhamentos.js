import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// =====================================================
// STATUS DO FLUXO DE APADRINHAMENTO
// =====================================================
export const STATUS = {
  PENDENTE_TUTOR:   'pendente_tutor',    // Padrinho submeteu, aguarda Tutor
  ACEITO_TUTOR:     'aceito_tutor',      // Tutor aceitou, aguarda Gestor
  REJEITADO_TUTOR:  'rejeitado_tutor',   // Tutor rejeitou
  APROVADO_GESTOR:  'aprovado_gestor',   // Gestor aprovou = apadrinhamento ativo
  REJEITADO_GESTOR: 'rejeitado_gestor',  // Gestor rejeitou
}

export const STATUS_PAGAMENTO = {
  PENDENTE: 'pendente',
  CONFIRMADO: 'confirmado',
  REJEITADO: 'rejeitado'
}

export const STATUS_LABELS = {
  [STATUS.PENDENTE_TUTOR]:   'Aguarda Tutor',
  [STATUS.ACEITO_TUTOR]:     'Aguarda Gestor',
  [STATUS.REJEITADO_TUTOR]:  'Rejeitado pelo Tutor',
  [STATUS.APROVADO_GESTOR]:  'Ativo',
  [STATUS.REJEITADO_GESTOR]: 'Rejeitado pelo Gestor',
}

export const STATUS_CLASSES = {
  [STATUS.PENDENTE_TUTOR]:   'bg-amber-100 text-amber-800',
  [STATUS.ACEITO_TUTOR]:     'bg-blue-100 text-blue-800',
  [STATUS.REJEITADO_TUTOR]:  'bg-red-100 text-red-800',
  [STATUS.APROVADO_GESTOR]:  'bg-green-100 text-green-800',
  [STATUS.REJEITADO_GESTOR]: 'bg-red-100 text-red-800',
}

// =====================================================
// DADOS MOCK INICIAIS
// =====================================================
const mockApadrinhamentos = [
  {
    id: 1,
    criancaId: '1',
    criancaNome: 'Ana Dlamini',
    criancaIdade: 10,
    criancaFoto: '/img/children/ana_dlamini.png',
    criancaRegiao: 'Maputo',
    tutorId: 6,
    tutorNome: 'Rosa Tutora',
    padrinhoNome: 'Pedro Padrinho',
    padrinhoEmail: 'pedro@sacco.org',
    padrinhoTelefone: '+258 84 000 0001',
    padrinhoRegiao: 'Maputo',
    padrinhoMensagem: 'Quero contribuir para o futuro desta criança.',
    padrinhoId: 5,
    valorMensal: 2500,
    orcamentoAnual: 15000,
    orcamentoCoberto: 5000,
    status: STATUS.APROVADO_GESTOR,
    dataSolicitacao: '2026-03-01T09:00:00Z',
    dataRespostaTutor: '2026-03-02T10:00:00Z',
    dataRespostaGestor: '2026-03-03T14:00:00Z',
    notaTutor: 'Padrinha de confiança.',
    notaGestor: 'Contrato aprovado.',
    historico: [
      { estado: STATUS.PENDENTE_TUTOR,   data: '2026-03-01T09:00:00Z', por: 'Sofia Madrinha' },
      { estado: STATUS.ACEITO_TUTOR,     data: '2026-03-02T10:00:00Z', por: 'Rosa Tutora' },
      { estado: STATUS.APROVADO_GESTOR,  data: '2026-03-03T14:00:00Z', por: 'Beatriz Gestora' },
    ]
  },
  {
    id: 102,
    criancaId: '2',
    criancaNome: 'Mateus Silva',
    tutorId: 6,
    padrinhoNome: 'Novo Interessado',
    padrinhoId: 88,
    status: STATUS.PENDENTE_TUTOR,
    dataSolicitacao: new Date().toISOString(),
    historico: []
  }
]

let nextId = 2

// =====================================================
// STORE
// =====================================================
export const useApadrinhamentosStore = defineStore('apadrinhamentos', () => {
  const lista = ref([...mockApadrinhamentos])
  const pagamentos = ref([
    {
      id: 1001,
      padrinhoId: 5,
      padrinhoNome: 'Pedro Padrinho',
      criancaId: '1',
      criancaNome: 'Ana Dlamini',
      valor: 3000,
      itens: ['Matrícula e Mensalidades'],
      comprovativoUrl: '/img/temp_comprovativo.png',
      dataSubmissao: new Date().toISOString(),
      status: STATUS_PAGAMENTO.PENDENTE,
      nota: 'Pagamento da matrícula da Ana.'
    }
  ]) // Lista de comprovativos submetidos
  const notificacoes = ref([]) // Notificações do sistema

  // ---- Getters ----------------------------------------

  /** Todos os pedidos a aguardar resposta do Tutor (por tutorId) */
  const getPedidosPorTutor = (tutorId) =>
    computed(() => lista.value.filter(a => a.tutorId === tutorId && a.status === STATUS.PENDENTE_TUTOR))

  /** Todos os pedidos aceitos pelo Tutor, a aguardar Gestor */
  const getPedidosPendentesGestor = computed(() =>
    lista.value.filter(a => a.status === STATUS.ACEITO_TUTOR)
  )

  /** Apadrinhamentos ativos de um padrinho concreto */
  const getApadrinhamentosAtivosDosPadrinho = (padrinhoId) =>
    computed(() => lista.value.filter(a => a.padrinhoId === padrinhoId && a.status === STATUS.APROVADO_GESTOR))

  /** Histórico completo de um padrinho */
  const getHistoricoPadrinho = (padrinhoId) => {
    return lista.value.filter(item => item.padrinhoId === padrinhoId)
  }

  /**
   * Retorna o status de apadrinhamento de um padrinho para uma criança específica
   */
  const getSponsorshipStatus = (padrinhoId, criancaId) => {
    const found = lista.value.find(item => 
      String(item.padrinhoId) === String(padrinhoId) && 
      String(item.criancaId) === String(criancaId)
    )
    return found ? found.status : null
  }

  const notificacoesNaoLidas = computed(() => notificacoes.value.filter(n => !n.read))

  /** Todos os apadrinhamentos (para admin/gestor) */
  const todos = computed(() => lista.value)

  // ---- Ações ------------------------------------------

  /**
   * (1) Padrinho submete formulário de interesse
   */
  const expressarInteresse = async (payload) => {
    await delay(800)
    const novo = {
      id: nextId++,
      criancaId:      payload.criancaId,
      criancaNome:    payload.criancaNome,
      criancaFoto:    payload.criancaFoto,
      criancaRegiao:  payload.criancaRegiao,
      tutorId:        payload.tutorId,
      tutorNome:      payload.tutorNome,
      padrinhoId:     payload.padrinhoId,
      padrinhoNome:   payload.padrinhoNome,
      padrinhoEmail:  payload.padrinhoEmail,
      padrinhoTelefone: payload.padrinhoTelefone,
      padrinhoRegiao: payload.padrinhoRegiao,
      padrinhoMensagem: payload.mensagem,
      valorMensal:    payload.valorMensal || 1500,
      criancaIdade: payload.criancaIdade || 10,
      orcamentoAnual: payload.orcamentoAnual,
      orcamentoCoberto: payload.orcamentoCoberto,
      status:         STATUS.PENDENTE_TUTOR,
      dataSolicitacao: new Date().toISOString(),
      dataRespostaTutor: null,
      dataRespostaGestor: null,
      notaTutor: null,
      notaGestor: null,
      historico: [
        { estado: STATUS.PENDENTE_TUTOR, data: new Date().toISOString(), por: payload.padrinhoNome }
      ]
    }
    lista.value.unshift(novo)
    return novo
  }

  /**
   * (2→3) Tutor aceita ou rejeita
   */
  const responderTutor = async (apadrinhamentoId, aceito, nota = '') => {
    await delay(600)
    const item = lista.value.find(a => a.id === apadrinhamentoId)
    if (!item) throw new Error('Apadrinhamento nao encontrado')

    const novoStatus = aceito ? STATUS.ACEITO_TUTOR : STATUS.REJEITADO_TUTOR
    item.status = novoStatus
    item.dataRespostaTutor = new Date().toISOString()
    item.notaTutor = nota
    item.historico.push({ estado: novoStatus, data: new Date().toISOString(), por: item.tutorNome })
    return item
  }

  /**
   * (4→5) Gestor aprova ou rejeita
   */
  const responderGestor = async (apadrinhamentoId, aprovado, nota = '') => {
    await delay(600)
    const item = lista.value.find(a => a.id === apadrinhamentoId)
    if (!item) throw new Error('Apadrinhamento nao encontrado')

    const novoStatus = aprovado ? STATUS.APROVADO_GESTOR : STATUS.REJEITADO_GESTOR
    item.status = novoStatus
    item.dataRespostaGestor = new Date().toISOString()
    item.notaGestor = nota
    item.historico.push({ estado: novoStatus, data: new Date().toISOString(), por: 'Gestor' })
    return item
  }

  /**
   * (6) Padrinho submete comprovativo de pagamento
   */
  const submeterPagamento = async (payload) => {
    await delay(1000)
    const novo = {
      id: Date.now(),
      padrinhoId: payload.padrinhoId,
      criancaId: payload.criancaId,
      valor: payload.valor,
      itens: payload.itens, // Array de IDs ou nomes dos itens pagos
      comprovativoUrl: payload.comprovativoUrl,
      dataSubmissao: new Date().toISOString(),
      status: STATUS_PAGAMENTO.PENDENTE,
      nota: payload.nota || ''
    }
    pagamentos.value.unshift(novo)

    // Notificar o Tutor (mock id 6)
    adicionarNotificacao({
      tutorId: 6, // Rosa Tutora
      type: 'info',
      title: 'Novo Pagamento Submetido',
      message: `${payload.padrinhoNome || 'Um padrinho'} submeteu um comprovativo de ${payload.valor} MZN.`,
      time: 'Agora'
    })

    return novo
  }

  /**
   * (7) Tutor confirma pagamento
   */
  const confirmarPagamento = async (pagamentoId) => {
    await delay(800)
    const pag = pagamentos.value.find(p => p.id === pagamentoId)
    if (!pag) throw new Error('Pagamento não encontrado')
    
    pag.status = STATUS_PAGAMENTO.CONFIRMADO
    pag.dataConfirmacao = new Date().toISOString()
    
    // Atualizar o orçamento na lista de apadrinhamentos (para refletir no dashboard do padrinho)
    const sponsorship = lista.value.find(s => 
      String(s.criancaId) === String(pag.criancaId) && 
      String(s.padrinhoId) === String(pag.padrinhoId)
    )
    if (sponsorship) {
      sponsorship.orcamentoCoberto = (sponsorship.orcamentoCoberto || 0) + pag.valor
    }

    // Adicionar notificação para o Padrinho
    adicionarNotificacao({
      padrinhoId: pag.padrinhoId,
      type: 'success',
      title: 'Pagamento Confirmado',
      message: `O seu pagamento foi confirmado pelo Tutor. Obrigado pela sua contribuição!`,
      time: 'Agora'
    })
    
    return pag
  }

  const adicionarNotificacao = (payload) => {
    notificacoes.value.unshift({
      id: Date.now(),
      read: false,
      ...payload
    })
  }

  const marcarComoLida = (id) => {
    const n = notificacoes.value.find(notif => notif.id === id)
    if (n) n.read = true
  }

  const limparNotificacoes = () => {
    notificacoes.value = []
  }

  return {
    lista,
    pagamentos,
    todos,
    getPedidosPorTutor,
    getPedidosPendentesGestor,
    getApadrinhamentosAtivosDosPadrinho,
    getHistoricoPadrinho,
    getSponsorshipStatus,
    expressarInteresse,
    responderTutor,
    responderGestor,
    submeterPagamento,
    confirmarPagamento,
    notificacoes,
    notificacoesNaoLidas,
    adicionarNotificacao,
    marcarComoLida,
    limparNotificacoes,
    // Constantes
    STATUS,
    STATUS_LABELS,
    STATUS_CLASSES,
    STATUS_PAGAMENTO
  }
})

const delay = (ms = 500) => new Promise(r => setTimeout(r, ms))
