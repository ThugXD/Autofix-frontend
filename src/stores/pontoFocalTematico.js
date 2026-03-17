import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePontoFocalTematicoStore = defineStore('pontoFocalTematico', () => {
  // ==================== STATE ====================
  const fichasTecnicas = ref([])
  const loading = ref(false)
  const currentPFTematico = ref('sadd') // Simula o PF logado
  const drafts = ref({}) // Armazena rascunhos por fichaId ou (cadastroId + tipo)

  // Mock data - Fichas Tecnicas (MOD 3)
  const fichasTecnicasMock = [
    // Fichas do Carlos Sitoe (CAD-2024-001) - Todas concluidas
    {
      id: 1,
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      criancaFoto: '/img/children/joao_nkomo.png',
      pfTematico: 'sadd',
      dataVisitaPlanejada: '2024-03-15',
      dataSubmissao: '2024-03-15',
      status: 'aprovada_nivel2',
      // Diagnostico
      diagnostico: {
        descricaoAvaliacao: 'Crianca nao possui certidao de nascimento. Foi realizada visita ao registo civil para iniciar o processo de obtencao do documento.',
        dadosColectados: 'Sem documentacao legal. Mae e pai falecidos sem deixar documentos. Tio possui apenas BI.',
        recomendacoes: 'Urgente obtencao de certidao de nascimento atraves de processo judicial de registo tardio.'
      },
      // Dados especializados para o formulario SADD
      especializada: {
        temCertidao: false,
        motivoFaltaCertidao: 'Registro tardio / Pais falecidos',
        outrosDocumentosEmFalta: ['BI', 'NUIT'],
        situacaoPais: 'Ambos falecidos sem documentacao em ordem.'
      },
      // Necessidades
      necessidades: [
        {
          id: 1,
          tipo: 'sadd',
          descricao: 'Certidao de Nascimento',
          fundamentacao: 'Documento essencial para acesso a servicos basicos como educacao e saude.',
          custoEstimado: 500,
          tempoResolver: '30 dias',
          prioridade: 'alta',
          impactoEsperado: 'Crianca tera documento de identidade legal'
        }
      ],
      // Evidencias
      evidencias: [
        { nome: 'foto_visita_registo.jpg', tipo: 'imagem', url: '#' },
        { nome: 'declaracao_tio.pdf', tipo: 'documento', url: '#' }
      ],
      observacoesPF: 'Processo de registo tardio ja foi iniciado.',
      feedbackRevisaoN1: 'Documentacao completa e bem fundamentada.',
      feedbackRevisaoN2: 'Aprovado para publicacao.'
    },
    {
      id: 2,
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      criancaFoto: '/img/children/joao_nkomo.png',
      pfTematico: 'sanc',
      dataVisitaPlanejada: '2024-03-16',
      dataSubmissao: '2024-03-16',
      status: 'aprovada_nivel2',
      diagnostico: {
        descricaoAvaliacao: 'Avaliacao nutricional revelou peso abaixo do ideal para a idade. IMC de 15.2 indica desnutricao moderada.',
        dadosColectados: 'Peso: 28kg, Altura: 1.35m, IMC: 15.2. Alimentacao irregular, 1-2 refeicoes por dia.',
        recomendacoes: 'Acompanhamento nutricional mensal. Suplementacao vitaminica. Garantir 3 refeicoes diarias.'
      },
      // Dados especializados para o formulario SANC
      especializada: {
        peso: 28,
        altura: 1.35,
        imc: 15.2,
        estadoNutricional: 'Desnutrição Moderada',
        frequenciaRefeicoes: 2
      },
      necessidades: [
        {
          id: 2,
          tipo: 'sanc',
          descricao: 'Acompanhamento Nutricional',
          fundamentacao: 'IMC abaixo do normal requer intervencao nutricional urgente.',
          custoEstimado: 1500,
          tempoResolver: '6 meses',
          prioridade: 'alta',
          impactoEsperado: 'Recuperacao do peso ideal e desenvolvimento saudavel'
        },
        {
          id: 3,
          tipo: 'sanc',
          descricao: 'Suplementacao Vitaminica',
          fundamentacao: 'Deficiencia de vitaminas detectada nos exames.',
          custoEstimado: 800,
          tempoResolver: '3 meses',
          prioridade: 'media',
          impactoEsperado: 'Melhoria do sistema imunologico'
        }
      ],
      evidencias: [
        { nome: 'ficha_nutricional.pdf', tipo: 'documento', url: '#' },
        { nome: 'foto_medicao.jpg', tipo: 'imagem', url: '#' }
      ],
      observacoesPF: 'Crianca apresenta sinais de recuperacao apos inicio do acompanhamento.',
      feedbackRevisaoN1: 'Avaliacao detalhada e necessidades bem identificadas.',
      feedbackRevisaoN2: 'Aprovado.'
    },
    {
      id: 3,
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      criancaFoto: '/img/children/joao_nkomo.png',
      pfTematico: 'sasbe',
      dataVisitaPlanejada: '2024-03-17',
      dataSubmissao: '2024-03-17',
      status: 'aprovada_nivel2',
      diagnostico: {
        descricaoAvaliacao: 'Check-up geral realizado. Crianca apresenta boa saude geral, porem necessita de vacinas em atraso.',
        dadosColectados: 'Cartao de vacinas incompleto. Ultima vacina tomada ha 3 anos. Sem doencas cronicas identificadas.',
        recomendacoes: 'Completar esquema vacinal. Consulta oftalmologica recomendada.'
      },
      necessidades: [
        {
          id: 4,
          tipo: 'sasbe',
          descricao: 'Vacinacao Completa',
          fundamentacao: 'Esquema vacinal incompleto expoe a crianca a doencas preveniveis.',
          custoEstimado: 300,
          tempoResolver: '2 meses',
          prioridade: 'alta',
          impactoEsperado: 'Proteccao contra doencas infecciosas'
        },
        {
          id: 5,
          tipo: 'sasbe',
          descricao: 'Consulta Oftalmologica',
          fundamentacao: 'Crianca refere dificuldade em ver ao longe.',
          custoEstimado: 600,
          tempoResolver: '1 mes',
          prioridade: 'media',
          impactoEsperado: 'Melhoria da capacidade visual para estudos'
        }
      ],
      evidencias: [
        { nome: 'cartao_vacinas.jpg', tipo: 'imagem', url: '#' },
        { nome: 'relatorio_medico.pdf', tipo: 'documento', url: '#' }
      ],
      observacoesPF: 'Encaminhado para centro de saude mais proximo.',
      feedbackRevisaoN1: 'Completo.',
      feedbackRevisaoN2: 'Aprovado.'
    },
    {
      id: 4,
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      criancaFoto: '/img/children/joao_nkomo.png',
      pfTematico: 'saad',
      dataVisitaPlanejada: '2024-03-18',
      dataSubmissao: '2024-03-18',
      status: 'aprovada_nivel2',
      diagnostico: {
        descricaoAvaliacao: 'Familia enfrenta inseguranca alimentar. Tio tem rendimento irregular que nao cobre necessidades basicas.',
        dadosColectados: 'Rendimento mensal: ~2000 MZN. Despesas basicas: ~3500 MZN. Deficit mensal significativo.',
        recomendacoes: 'Inclusao em programa de cesta basica. Apoio para horta comunitaria.'
      },
      // Dados especializados para o formulario SAAD
      especializada: {
        membrosAgregado: 5,
        rendimentoMensal: 2000,
        fonteRendimento: 'Trabalho informal (Construção)',
        frequenciaAcessoAlimentos: 'irregular',
        alimentosHabituais: 'Xima, folhas de abóbora, feijão ocasional.'
      },
      necessidades: [
        {
          id: 6,
          tipo: 'saad',
          descricao: 'Cesta Basica Mensal',
          fundamentacao: 'Familia em situacao de inseguranca alimentar cronica.',
          custoEstimado: 2400,
          tempoResolver: '12 meses',
          prioridade: 'alta',
          impactoEsperado: 'Garantia de 3 refeicoes diarias'
        }
      ],
      evidencias: [
        { nome: 'foto_cozinha.jpg', tipo: 'imagem', url: '#' },
        { nome: 'declaracao_rendimentos.pdf', tipo: 'documento', url: '#' }
      ],
      observacoesPF: 'Familia ja recebe apoio pontual de vizinhos.',
      feedbackRevisaoN1: 'Situacao critica bem documentada.',
      feedbackRevisaoN2: 'Aprovado.'
    },
    {
      id: 5,
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      criancaFoto: '/img/children/joao_nkomo.png',
      pfTematico: 'saeie',
      dataVisitaPlanejada: '2024-03-19',
      dataSubmissao: '2024-03-19',
      status: 'aprovada_nivel2',
      diagnostico: {
        descricaoAvaliacao: 'Crianca esta fora do sistema escolar ha 2 anos devido a falta de documentacao e recursos financeiros.',
        dadosColectados: 'Ultima frequencia escolar: 3a classe. Sabe ler e escrever basicamente. Demonstra interesse em estudar.',
        recomendacoes: 'Reintegracao escolar urgente. Apoio com material escolar e uniforme.'
      },
      necessidades: [
        {
          id: 7,
          tipo: 'saeie',
          descricao: 'Inscricao e Matricula Escolar',
          fundamentacao: 'Direito basico a educacao. Crianca motivada para estudar.',
          custoEstimado: 1200,
          tempoResolver: '1 mes',
          prioridade: 'alta',
          impactoEsperado: 'Retorno ao sistema de ensino'
        },
        {
          id: 8,
          tipo: 'saeie',
          descricao: 'Kit Escolar Completo',
          fundamentacao: 'Material necessario para frequencia escolar adequada.',
          custoEstimado: 1500,
          tempoResolver: '1 mes',
          prioridade: 'alta',
          impactoEsperado: 'Condicoes adequadas para aprendizagem'
        }
      ],
      evidencias: [
        { nome: 'historico_escolar.pdf', tipo: 'documento', url: '#' },
        { nome: 'foto_escola_proxima.jpg', tipo: 'imagem', url: '#' }
      ],
      observacoesPF: 'Escola proxima tem vagas disponiveis para 5a classe.',
      feedbackRevisaoN1: 'Excelente documentacao.',
      feedbackRevisaoN2: 'Aprovado.'
    },
    {
      id: 6,
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      criancaFoto: '/img/children/joao_nkomo.png',
      pfTematico: 'saps',
      dataVisitaPlanejada: '2024-03-20',
      dataSubmissao: '2024-03-20',
      status: 'aprovada_nivel2',
      diagnostico: {
        descricaoAvaliacao: 'Ambiente familiar seguro. Tio demonstra cuidado genuino. Sem sinais de abuso ou negligencia grave.',
        dadosColectados: 'Casa pequena mas organizada. Vizinhanca conhecida. Crianca tem rotina estabelecida.',
        recomendacoes: 'Monitoramento periodico. Apoio para melhorias na habitacao.'
      },
      necessidades: [
        {
          id: 9,
          tipo: 'saps',
          descricao: 'Monitoramento Trimestral',
          fundamentacao: 'Garantir continuidade da proteccao e seguranca da crianca.',
          custoEstimado: 400,
          tempoResolver: '12 meses',
          prioridade: 'media',
          impactoEsperado: 'Ambiente seguro mantido'
        }
      ],
      evidencias: [
        { nome: 'foto_ambiente.jpg', tipo: 'imagem', url: '#' },
        { nome: 'relatorio_visita.pdf', tipo: 'documento', url: '#' }
      ],
      observacoesPF: 'Tio cooperativo e interessado no bem-estar do sobrinho.',
      feedbackRevisaoN1: 'Bom.',
      feedbackRevisaoN2: 'Aprovado.'
    },
    {
      id: 7,
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      criancaFoto: '/img/children/joao_nkomo.png',
      pfTematico: 'sape',
      dataVisitaPlanejada: '2024-03-21',
      dataSubmissao: '2024-03-21',
      status: 'aprovada_nivel2',
      diagnostico: {
        descricaoAvaliacao: 'Crianca apresenta sinais de trauma pela perda dos pais. Resiliente mas necessita de apoio emocional.',
        dadosColectados: 'Crianca ainda processa luto. Tem dificuldade em falar sobre os pais. Demonstra ansiedade ocasional.',
        recomendacoes: 'Acompanhamento psicologico semanal por 6 meses. Actividades de grupo com outras criancas.'
      },
      necessidades: [
        {
          id: 10,
          tipo: 'sape',
          descricao: 'Acompanhamento Psicologico',
          fundamentacao: 'Trauma nao processado pode afectar desenvolvimento emocional.',
          custoEstimado: 3000,
          tempoResolver: '6 meses',
          prioridade: 'alta',
          impactoEsperado: 'Saude mental estavel e processamento saudavel do luto'
        }
      ],
      evidencias: [
        { nome: 'avaliacao_psicologica.pdf', tipo: 'documento', url: '#' }
      ],
      observacoesPF: 'Crianca ja iniciou sessoes de terapia em grupo.',
      feedbackRevisaoN1: 'Muito bem documentado.',
      feedbackRevisaoN2: 'Aprovado.'
    },

    // Fichas da Ana Mabunda (CAD-2024-002) - Parcialmente concluidas
    {
      id: 8,
      cadastroId: 2,
      criancaNome: 'Ana Dlamini Mabunda',
      criancaFoto: '/img/children/ana_dlamini.png',
      pfTematico: 'sadd',
      dataVisitaPlanejada: '2024-03-18',
      dataSubmissao: '2024-03-18',
      status: 'aprovada_nivel1',
      diagnostico: {
        descricaoAvaliacao: 'Crianca possui certidao de nascimento mas documento esta danificado e ilegivel.',
        dadosColectados: 'Certidao original de 2018. Documento molhado e rasgado. Dados legiveis apenas parcialmente.',
        recomendacoes: 'Solicitar segunda via da certidao de nascimento.'
      },
      necessidades: [
        {
          id: 11,
          tipo: 'sadd',
          descricao: 'Segunda Via de Certidao',
          fundamentacao: 'Documento actual inutilizavel para fins legais.',
          custoEstimado: 200,
          tempoResolver: '15 dias',
          prioridade: 'media',
          impactoEsperado: 'Documento legal valido'
        }
      ],
      evidencias: [
        { nome: 'certidao_danificada.jpg', tipo: 'imagem', url: '#' }
      ],
      observacoesPF: 'Mae possui copia do assento de nascimento.',
      feedbackRevisaoN1: 'Aprovado. Necessidade clara.',
      feedbackRevisaoN2: null
    },
    {
      id: 9,
      cadastroId: 2,
      criancaNome: 'Ana Dlamini Mabunda',
      criancaFoto: '/img/children/maria_silva.png',
      pfTematico: 'sanc',
      dataVisitaPlanejada: '2024-03-19',
      dataSubmissao: '2024-03-19',
      status: 'aprovada_nivel1',
      diagnostico: {
        descricaoAvaliacao: 'Crianca apresenta desnutricao leve. Peso e altura abaixo do esperado para a idade.',
        dadosColectados: 'Peso: 16kg, Altura: 1.05m. Alimentacao baseada principalmente em xima.',
        recomendacoes: 'Diversificar alimentacao. Suplementacao proteica. Acompanhamento mensal.'
      },
      necessidades: [
        {
          id: 12,
          tipo: 'sanc',
          descricao: 'Programa de Nutricao',
          fundamentacao: 'Desnutricao leve requer intervencao preventiva.',
          custoEstimado: 1200,
          tempoResolver: '4 meses',
          prioridade: 'alta',
          impactoEsperado: 'Recuperacao do peso adequado'
        }
      ],
      evidencias: [
        { nome: 'medicao_antropometrica.pdf', tipo: 'documento', url: '#' }
      ],
      observacoesPF: 'Mae receptiva as orientacoes nutricionais.',
      feedbackRevisaoN1: 'Aprovado.',
      feedbackRevisaoN2: null
    },
    {
      id: 10,
      cadastroId: 2,
      criancaNome: 'Ana Dlamini Mabunda',
      criancaFoto: '/img/children/maria_silva.png',
      pfTematico: 'sasbe',
      dataVisitaPlanejada: '2024-03-20',
      dataSubmissao: null,
      status: 'em_andamento',
      diagnostico: {
        descricaoAvaliacao: '',
        dadosColectados: '',
        recomendacoes: ''
      },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 11,
      cadastroId: 2,
      criancaNome: 'Ana Dlamini Mabunda',
      criancaFoto: '/img/children/maria_silva.png',
      pfTematico: 'saad',
      dataVisitaPlanejada: '2024-03-21',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 12,
      cadastroId: 2,
      criancaNome: 'Ana Dlamini Mabunda',
      criancaFoto: '/img/children/maria_silva.png',
      pfTematico: 'saeie',
      dataVisitaPlanejada: '2024-03-22',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 13,
      cadastroId: 2,
      criancaNome: 'Ana Dlamini Mabunda',
      criancaFoto: '/img/children/maria_silva.png',
      pfTematico: 'saps',
      dataVisitaPlanejada: '2024-03-23',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 14,
      cadastroId: 2,
      criancaNome: 'Ana Dlamini Mabunda',
      criancaFoto: '/img/children/maria_silva.png',
      pfTematico: 'sape',
      dataVisitaPlanejada: '2024-03-24',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },

    // Fichas da Esperanca Mondlane (CAD-2024-003) - Todas pendentes
    {
      id: 15,
      cadastroId: 3,
      criancaNome: 'Esperanca Maria Mondlane',
      criancaFoto: '/img/children/maria_silva.png',
      pfTematico: 'sadd',
      dataVisitaPlanejada: '2024-03-25',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 16,
      cadastroId: 3,
      criancaNome: 'Esperanca Maria Mondlane',
      criancaFoto: '/img/children/ana_dlamini.png',
      pfTematico: 'sanc',
      dataVisitaPlanejada: '2024-03-26',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 17,
      cadastroId: 3,
      criancaNome: 'Esperanca Maria Mondlane',
      criancaFoto: '/img/children/ana_dlamini.png',
      pfTematico: 'sasbe',
      dataVisitaPlanejada: '2024-03-27',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 18,
      cadastroId: 3,
      criancaNome: 'Esperanca Maria Mondlane',
      criancaFoto: '/img/children/ana_dlamini.png',
      pfTematico: 'saad',
      dataVisitaPlanejada: '2024-03-28',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 19,
      cadastroId: 3,
      criancaNome: 'Esperanca Maria Mondlane',
      criancaFoto: '/img/children/ana_dlamini.png',
      pfTematico: 'saeie',
      dataVisitaPlanejada: '2024-03-29',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 20,
      cadastroId: 3,
      criancaNome: 'Esperanca Maria Mondlane',
      criancaFoto: '/img/children/ana_dlamini.png',
      pfTematico: 'saps',
      dataVisitaPlanejada: '2024-03-30',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    },
    {
      id: 21,
      cadastroId: 3,
      criancaNome: 'Esperanca Maria Mondlane',
      criancaFoto: '/img/children/ana_dlamini.png',
      pfTematico: 'sape',
      dataVisitaPlanejada: '2024-03-31',
      dataSubmissao: null,
      status: 'pendente',
      diagnostico: { descricaoAvaliacao: '', dadosColectados: '', recomendacoes: '' },
      necessidades: [],
      evidencias: [],
      observacoesPF: '',
      feedbackRevisaoN1: null,
      feedbackRevisaoN2: null
    }
  ]

  // Orcamentos consolidados por crianca
  const orcamentosConsolidados = ref([
    {
      cadastroId: 1,
      criancaNome: 'Carlos Alberto Sitoe',
      status: 'aprovado',
      orcamentos: {
        sadd: { total: 500, coberto: 500, percentagem: 100 },
        sanc: { total: 2300, coberto: 1000, percentagem: 43 },
        sasbe: { total: 900, coberto: 300, percentagem: 33 },
        saad: { total: 2400, coberto: 800, percentagem: 33 },
        saeie: { total: 2700, coberto: 1500, percentagem: 56 },
        saps: { total: 400, coberto: 0, percentagem: 0 },
        sape: { total: 3000, coberto: 1500, percentagem: 50 }
      },
      totalNecessario: 12200,
      totalCoberto: 5600,
      percentagemGeral: 46
    }
  ])

  // ==================== GETTERS ====================
  const fichasPendentes = computed(() =>
    fichasTecnicas.value.filter(f => f.status === 'pendente' && f.pfTematico === currentPFTematico.value)
  )

  const fichasEmAndamento = computed(() =>
    fichasTecnicas.value.filter(f => f.status === 'em_andamento' && f.pfTematico === currentPFTematico.value)
  )

  const fichasSubmetidas = computed(() =>
    fichasTecnicas.value.filter(f =>
      ['submetida', 'aprovada_nivel1', 'aprovada_nivel2'].includes(f.status) &&
      f.pfTematico === currentPFTematico.value
    )
  )

  const minhasFichas = computed(() =>
    fichasTecnicas.value.filter(f => f.pfTematico === currentPFTematico.value)
  )

  const fichasAguardandoRevisaoN1 = computed(() =>
    fichasTecnicas.value.filter(f => f.status === 'submetida')
  )

  const fichasAguardandoRevisaoN2 = computed(() =>
    fichasTecnicas.value.filter(f => f.status === 'aprovada_nivel1')
  )

  const getFichasByCadastro = (cadastroId) => {
    return fichasTecnicas.value.filter(f => f.cadastroId === parseInt(cadastroId))
  }

  const getFichaById = (id) => {
    return fichasTecnicas.value.find(f => f.id === parseInt(id))
  }

  const getOrcamentoByCadastro = (cadastroId) => {
    return orcamentosConsolidados.value.find(o => o.cadastroId === parseInt(cadastroId))
  }

  const getAllNecessidadesByCadastro = (cadastroId) => {
    const fichas = getFichasByCadastro(cadastroId)
    return fichas.flatMap(f => f.necessidades || [])
  }
  const childrenNeedingAssessment = computed(() => {
    // Retorna uma lista unia de criancas baseada nas fichas
    const uniqueChildren = []
    const map = new Map()

    fichasTecnicas.value.forEach(ficha => {
      if (!map.has(ficha.cadastroId)) {
        map.set(ficha.cadastroId, {
          id: ficha.cadastroId,
          nome: ficha.criancaNome,
          foto: ficha.criancaFoto,
          fichas: []
        })
        uniqueChildren.push(map.get(ficha.cadastroId))
      }
      map.get(ficha.cadastroId).fichas.push({
        id: ficha.id,
        tipo: ficha.pfTematico,
        status: ficha.status
      })
    })

    return uniqueChildren
  })

  // ==================== ACTIONS ====================
  const fetchFichasTecnicas = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      fichasTecnicas.value = fichasTecnicasMock
    } catch (error) {
      console.error('Erro ao carregar fichas tecnicas:', error)
    } finally {
      loading.value = false
    }
  }

  const setCurrentPFTematico = (pfId) => {
    currentPFTematico.value = pfId
  }

  const iniciarFicha = async (fichaId) => {
    const ficha = fichasTecnicas.value.find(f => f.id === fichaId)
    if (ficha) {
      ficha.status = 'em_andamento'
    }
  }

  const submeterFicha = async (fichaId, dados) => {
    const ficha = fichasTecnicas.value.find(f => f.id === fichaId)
    if (ficha) {
      ficha.diagnostico = dados.diagnostico
      ficha.especializada = dados.especializada
      ficha.necessidades = dados.necessidades
      ficha.evidencias = dados.evidencias
      ficha.observacoesPF = dados.observacoesPF
      ficha.dataSubmissao = new Date().toISOString().split('T')[0]
      ficha.status = 'submetida'
    }
  }

  const aprovarFichaN1 = async (fichaId, feedback) => {
    const ficha = fichasTecnicas.value.find(f => f.id === fichaId)
    if (ficha) {
      ficha.feedbackRevisaoN1 = feedback
      ficha.status = 'aprovada_nivel1'
    }
  }

  const pedirRevisaoN1 = async (fichaId, feedback) => {
    const ficha = fichasTecnicas.value.find(f => f.id === fichaId)
    if (ficha) {
      ficha.feedbackRevisaoN1 = feedback
      ficha.status = 'em_andamento'
    }
  }

  const aprovarFichaN2 = async (fichaId, feedback) => {
    const ficha = fichasTecnicas.value.find(f => f.id === fichaId)
    if (ficha) {
      ficha.feedbackRevisaoN2 = feedback
      ficha.status = 'aprovada_nivel2'
    }
  }

  const pedirRevisaoN2 = async (fichaId, feedback) => {
    const ficha = fichasTecnicas.value.find(f => f.id === fichaId)
    if (ficha) {
      ficha.feedbackRevisaoN2 = feedback
      ficha.status = 'submetida'
    }
  }

  const getDraft = (key) => drafts.value[key] || null

  const updateDraft = (key, data) => {
    drafts.value[key] = { ...data, updatedAt: new Date().toISOString() }
  }

  const clearDraft = (key) => {
    delete drafts.value[key]
  }

  const salvarOrcamento = async (cadastroId, orcamentos) => {
    const existente = orcamentosConsolidados.value.find(o => o.cadastroId === cadastroId)
    if (existente) {
      existente.orcamentos = orcamentos
      // Recalcular totais
      const valores = Object.values(orcamentos)
      existente.totalNecessario = valores.reduce((sum, v) => sum + v.total, 0)
      existente.totalCoberto = valores.reduce((sum, v) => sum + v.coberto, 0)
      existente.percentagemGeral = Math.round((existente.totalCoberto / existente.totalNecessario) * 100)
    } else {
      const valores = Object.values(orcamentos)
      orcamentosConsolidados.value.push({
        cadastroId,
        orcamentos,
        totalNecessario: valores.reduce((sum, v) => sum + v.total, 0),
        totalCoberto: valores.reduce((sum, v) => sum + v.coberto, 0),
        percentagemGeral: 0,
        status: 'pendente'
      })
    }
  }

  return {
    // State
    fichasTecnicas,
    loading,
    currentPFTematico,
    orcamentosConsolidados,

    // Getters
    fichasPendentes,
    fichasEmAndamento,
    fichasSubmetidas,
    minhasFichas,
    fichasAguardandoRevisaoN1,
    fichasAguardandoRevisaoN2,
    getFichasByCadastro,
    getFichaById,
    getOrcamentoByCadastro,
    getAllNecessidadesByCadastro,

    // Actions
    fetchFichasTecnicas,
    setCurrentPFTematico,
    iniciarFicha,
    submeterFicha,
    aprovarFichaN1,
    pedirRevisaoN1,
    aprovarFichaN2,
    pedirRevisaoN2,
    salvarOrcamento,
    getDraft,
    updateDraft,
    clearDraft,
    childrenNeedingAssessment
  }
})
