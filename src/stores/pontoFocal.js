import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePontoFocalStore = defineStore('pontoFocal', () => {
  // ==================== STATE ====================
  const comunicacoes = ref([])
  const cadastros = ref([])
  const loading = ref(false)

  // Lista dos 7 Pontos Focais Tematicos
  const pontosFocaisTematicos = ref([
    {
      id: 'sadd',
      codigo: 'SADD',
      nome: 'Servico de Apoio aos Direitos e Documentacao',
      descricao: 'Responsavel pela documentacao legal da crianca',
      cor: 'blue'
    },
    {
      id: 'sanc',
      codigo: 'SANC',
      nome: 'Servico de Apoio Nutricao e Crescimento',
      descricao: 'Avaliacao nutricional e acompanhamento do crescimento',
      cor: 'green'
    },
    {
      id: 'sasbe',
      codigo: 'SASBE',
      nome: 'Servico de Apoio a Saude e Bem-Estar',
      descricao: 'Saude geral e acompanhamento medico',
      cor: 'red'
    },
    {
      id: 'saad',
      codigo: 'SAAD',
      nome: 'Servico de Apoio a Alimentacao Diaria',
      descricao: 'Garantir alimentacao adequada diaria',
      cor: 'orange'
    },
    {
      id: 'saeie',
      codigo: 'SAEIE',
      nome: 'Servico de Apoio a Educacao e Inclusao Escolar',
      descricao: 'Acesso a educacao e inclusao no sistema escolar',
      cor: 'purple'
    },
    {
      id: 'saps',
      codigo: 'SAPS',
      nome: 'Servico de Apoio a Protecao e Seguranca',
      descricao: 'Protecao contra abuso, negligencia e exploracao',
      cor: 'yellow'
    },
    {
      id: 'sape',
      codigo: 'SAPE',
      nome: 'Servico de Apoio Psico-social Emocional',
      descricao: 'Apoio psicologico e emocional',
      cor: 'pink'
    }
  ])

  // Mock data - Comunicacoes (MOD 1)
  const comunicacoesMock = [
    {
      id: 1,
      codigo: 'COM-2024-001',
      nome: 'Esperanca Mondlane',
      idadeAproximada: 8,
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      bairro: 'Maxaquene A',
      descricao: 'Crianca encontrada em situacao de vulnerabilidade. Vive com a avo que nao tem condicoes de sustento.',
      contactoTutor: '84 123 4567',
      status: 'pendente',
      dataCriacao: '2024-03-10',
      criadoPor: 'Joao Silva'
    },
    {
      id: 2,
      codigo: 'COM-2024-002',
      nome: 'Carlos Sitoe',
      idadeAproximada: 12,
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      bairro: 'Chamanculo C',
      descricao: 'Orfao de ambos os pais. Vive com tio que trabalha como vendedor ambulante.',
      contactoTutor: '82 987 6543',
      status: 'aprovada',
      dataCriacao: '2024-03-09',
      criadoPor: 'Maria Santos'
    },
    {
      id: 3,
      codigo: 'COM-2024-003',
      nome: 'Ana Mabunda',
      idadeAproximada: 6,
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      bairro: 'Polana Canico',
      descricao: 'Crianca fora do sistema escolar. Mae solteira sem emprego fixo.',
      contactoTutor: '86 555 1234',
      status: 'em_cadastro',
      dataCriacao: '2024-03-08',
      criadoPor: 'Pedro Nkomo'
    },
    {
      id: 4,
      codigo: 'COM-2024-004',
      nome: 'Pedro Nhamussua',
      idadeAproximada: 10,
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      bairro: 'Hulene B',
      descricao: 'Crianca com deficiencia motora. Familia muito pobre.',
      contactoTutor: '84 777 8888',
      status: 'aprovada',
      dataCriacao: '2024-03-07',
      criadoPor: 'Ana Tembe'
    }
  ]

  // Mock data - Cadastros (MOD 2)
  const cadastrosMock = [
    {
      id: 1,
      comunicacaoId: 2,
      codigo: 'CAD-2024-001',
      // FICHA 00 - Identificacao
      nomeCompleto: 'Carlos Alberto Sitoe',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      dataNascimento: '2012-05-15',
      sexo: 'M',
      localResidencia: 'Chamanculo C, Rua 25',
      provincia: 'Maputo Cidade',
      distrito: 'KaMpfumo',
      // FICHA 00 - Situacao Familiar
      nomeMae: 'Rosa Sitoe',
      situacaoMae: 'falecida',
      nomePai: 'Alberto Sitoe',
      situacaoPai: 'falecido',
      tutorNome: 'Manuel Sitoe (Tio)',
      tutorContacto: '82 987 6543',
      numeroIrmaos: 2,
      situacaoEconomica: 'Familia em situacao de pobreza extrema. O tio trabalha como vendedor ambulante e mal consegue sustentar a propria familia.',
      // FICHA 00 - Vulnerabilidades
      vulnerabilidades: ['pobreza_extrema', 'orfao_ambos', 'fora_escola'],
      outraVulnerabilidade: '',
      // FICHA 00 - Observacoes
      observacoes: 'Carlos e uma crianca inteligente e resiliente. Apesar das dificuldades, demonstra vontade de estudar.',
      // Pontos Focais Selecionados
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-15', observacoes: 'Precisa de certidao de nascimento', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-16', observacoes: 'Avaliacao nutricional urgente', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-17', observacoes: 'Check-up geral', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-18', observacoes: 'Verificar alimentacao diaria', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-19', observacoes: 'Reintegracao escolar', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-20', observacoes: 'Avaliacao de seguranca', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-21', observacoes: 'Apoio psicologico pelo trauma', status: 'concluido' }
      ],
      status: 'aguardando_revisao',
      dataCriacao: '2024-03-10',
      criadoPor: 'Joao Silva'
    },
    {
      id: 2,
      comunicacaoId: 3,
      codigo: 'CAD-2024-002',
      nomeCompleto: 'Ana Beatriz Mabunda',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      dataNascimento: '2018-08-22',
      sexo: 'F',
      localResidencia: 'Polana Canico A, Av. Julius Nyerere',
      provincia: 'Maputo Cidade',
      distrito: 'KaMpfumo',
      nomeMae: 'Teresa Mabunda',
      situacaoMae: 'viva',
      nomePai: 'Desconhecido',
      situacaoPai: 'desaparecido',
      tutorNome: 'Teresa Mabunda (Mae)',
      tutorContacto: '86 555 1234',
      numeroIrmaos: 3,
      situacaoEconomica: 'Mae solteira sem emprego fixo. Faz trabalhos domesticos esporadicos.',
      vulnerabilidades: ['pobreza_extrema', 'fora_escola', 'malnutricao'],
      outraVulnerabilidade: '',
      observacoes: 'Crianca timida mas afetuosa. Necessita urgentemente de apoio escolar.',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-18', observacoes: 'Verificar documentacao', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-19', observacoes: 'Nutricao prioritaria', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-20', observacoes: 'Saude geral', status: 'em_andamento' },
        { pfId: 'saad', dataVisita: '2024-03-21', observacoes: 'Alimentacao', status: 'pendente' },
        { pfId: 'saeie', dataVisita: '2024-03-22', observacoes: 'Inscricao escolar', status: 'pendente' },
        { pfId: 'saps', dataVisita: '2024-03-23', observacoes: 'Protecao', status: 'pendente' },
        { pfId: 'sape', dataVisita: '2024-03-24', observacoes: 'Psico-social', status: 'pendente' }
      ],
      status: 'em_andamento',
      dataCriacao: '2024-03-12',
      criadoPor: 'Maria Santos'
    },
    {
      id: 3,
      comunicacaoId: 1,
      codigo: 'CAD-2024-003',
      nomeCompleto: 'Esperanca Maria Mondlane',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      dataNascimento: '2016-02-10',
      sexo: 'F',
      localResidencia: 'Maxaquene A, Bloco 5',
      provincia: 'Maputo Cidade',
      distrito: 'KaMaxaqueni',
      nomeMae: 'Lucia Mondlane',
      situacaoMae: 'falecida',
      nomePai: 'Jose Mondlane',
      situacaoPai: 'desaparecido',
      tutorNome: 'Marta Mondlane (Avo)',
      tutorContacto: '84 123 4567',
      numeroIrmaos: 1,
      situacaoEconomica: 'Vive com a avo idosa que sobrevive de ajudas dos vizinhos.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_um', 'negligencia'],
      outraVulnerabilidade: '',
      observacoes: 'Crianca necessita de atencao urgente. Avo com saude fragilizada.',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-25', observacoes: 'Documentacao urgente', status: 'pendente' },
        { pfId: 'sanc', dataVisita: '2024-03-26', observacoes: 'Nutricao', status: 'pendente' },
        { pfId: 'sasbe', dataVisita: '2024-03-27', observacoes: 'Saude', status: 'pendente' },
        { pfId: 'saad', dataVisita: '2024-03-28', observacoes: 'Alimentacao', status: 'pendente' },
        { pfId: 'saeie', dataVisita: '2024-03-29', observacoes: 'Educacao', status: 'pendente' },
        { pfId: 'saps', dataVisita: '2024-03-30', observacoes: 'Protecao', status: 'pendente' },
        { pfId: 'sape', dataVisita: '2024-03-31', observacoes: 'Psico-social', status: 'pendente' }
      ],
      status: 'iniciado',
      dataCriacao: '2024-03-14',
      criadoPor: 'Pedro Nkomo'
    }
  ]

  // Lista de vulnerabilidades disponiveis
  const vulnerabilidadesDisponiveis = ref([
    { id: 'pobreza_extrema', label: 'Pobreza extrema' },
    { id: 'orfao_um', label: 'Orfao de um dos pais' },
    { id: 'orfao_ambos', label: 'Orfao de ambos os pais' },
    { id: 'crianca_rua', label: 'Crianca de rua' },
    { id: 'trabalho_infantil', label: 'Trabalho infantil' },
    { id: 'abuso', label: 'Abuso/negligencia' },
    { id: 'deficiencia', label: 'Deficiencia' },
    { id: 'fora_escola', label: 'Fora do sistema escolar' },
    { id: 'malnutricao', label: 'Malnutricao' },
    { id: 'trauma', label: 'Trauma/violencia' },
    { id: 'negligencia', label: 'Negligencia' },
    { id: 'outra', label: 'Outra' }
  ])

  // ==================== GETTERS ====================
  const comunicacoesPendentes = computed(() => 
    comunicacoes.value.filter(c => c.status === 'pendente')
  )

  const comunicacoesAprovadas = computed(() => 
    comunicacoes.value.filter(c => c.status === 'aprovada')
  )

  const cadastrosEmAndamento = computed(() => 
    cadastros.value.filter(c => c.status === 'em_andamento' || c.status === 'iniciado')
  )

  const cadastrosAguardandoRevisao = computed(() => 
    cadastros.value.filter(c => c.status === 'aguardando_revisao')
  )

  const getProgressoCadastro = (cadastro) => {
    if (!cadastro.pontosFocais) return { concluidos: 0, total: 7 }
    const concluidos = cadastro.pontosFocais.filter(pf => pf.status === 'concluido').length
    return { concluidos, total: 7 }
  }

  // ==================== ACTIONS ====================
  const fetchComunicacoes = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      comunicacoes.value = comunicacoesMock
    } catch (error) {
      console.error('Erro ao carregar comunicacoes:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchCadastros = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      cadastros.value = cadastrosMock
    } catch (error) {
      console.error('Erro ao carregar cadastros:', error)
    } finally {
      loading.value = false
    }
  }

  const getComunicacaoById = (id) => {
    return comunicacoes.value.find(c => c.id === parseInt(id))
  }

  const getCadastroById = (id) => {
    return cadastros.value.find(c => c.id === parseInt(id))
  }

  const addComunicacao = async (comunicacao) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newId = Math.max(...comunicacoes.value.map(c => c.id), 0) + 1
      const newCodigo = `COM-2024-${String(newId).padStart(3, '0')}`
      const novaComunicacao = {
        ...comunicacao,
        id: newId,
        codigo: newCodigo,
        status: 'pendente',
        dataCriacao: new Date().toISOString().split('T')[0],
        criadoPor: 'Usuario Atual'
      }
      comunicacoes.value.push(novaComunicacao)
      return novaComunicacao
    } catch (error) {
      console.error('Erro ao adicionar comunicacao:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const addCadastro = async (cadastro) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newId = Math.max(...cadastros.value.map(c => c.id), 0) + 1
      const newCodigo = `CAD-2024-${String(newId).padStart(3, '0')}`
      const novoCadastro = {
        ...cadastro,
        id: newId,
        codigo: newCodigo,
        status: 'iniciado',
        dataCriacao: new Date().toISOString().split('T')[0],
        criadoPor: 'Usuario Atual'
      }
      cadastros.value.push(novoCadastro)
      return novoCadastro
    } catch (error) {
      console.error('Erro ao adicionar cadastro:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const aprovarComunicacao = async (id) => {
    const comunicacao = comunicacoes.value.find(c => c.id === id)
    if (comunicacao) {
      comunicacao.status = 'aprovada'
    }
  }

  const rejeitarComunicacao = async (id) => {
    const comunicacao = comunicacoes.value.find(c => c.id === id)
    if (comunicacao) {
      comunicacao.status = 'rejeitada'
    }
  }

  const iniciarCadastro = async (comunicacaoId) => {
    const comunicacao = comunicacoes.value.find(c => c.id === comunicacaoId)
    if (comunicacao) {
      comunicacao.status = 'em_cadastro'
    }
  }

  const agendarVisitaTecnica = async (cadastroId, pfId, data) => {
    const cadastro = cadastros.value.find(c => c.id === parseInt(cadastroId))
    if (cadastro && cadastro.pontosFocais) {
      const pfItem = cadastro.pontosFocais.find(pf => pf.pfId === pfId)
      if (pfItem) {
        pfItem.dataVisita = data
      } else {
        cadastro.pontosFocais.push({
          pfId,
          dataVisita: data,
          observacoes: '',
          status: 'pendente'
        })
      }
    }
  }

  return {
    // State
    comunicacoes,
    cadastros,
    loading,
    pontosFocaisTematicos,
    vulnerabilidadesDisponiveis,
    
    // Getters
    comunicacoesPendentes,
    comunicacoesAprovadas,
    cadastrosEmAndamento,
    cadastrosAguardandoRevisao,
    getProgressoCadastro,
    
    // Actions
    fetchComunicacoes,
    fetchCadastros,
    getComunicacaoById,
    getCadastroById,
    addComunicacao,
    addCadastro,
    aprovarComunicacao,
    rejeitarComunicacao,
    iniciarCadastro,
    agendarVisitaTecnica
  }
})
