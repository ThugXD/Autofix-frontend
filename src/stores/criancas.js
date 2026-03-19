import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCriancasStore = defineStore('criancas', () => {
  const lista = ref([])
  const loading = ref(false)
  const filtros = ref({
    regiao: '',
    vulnerabilidade: ''
  })

  // =============================================
  // DADOS MOCK
  // =============================================
  const mockCriancas = [
    {
      id: '1',
      nome: 'Ana Dlamini',
      idade: 10,
      foto: '/img/children/ana_dlamini.png',
      regiao: 'Maputo',
      status: 'Disponível',
      dataRegistro: '2024-01-15',
      vulnerabilidades: ['Pobreza Extrema', 'Fora da Escola'],
      necessidades: [
        {
          id: 1,
          nome: 'Educação Primária',
          tipo: 'saeie',
          prioridade: 'Alto',
          descricao: 'Matrícula e material escolar para a 5ª classe.',
          detalhes: 'A Ana está fora da escola há 2 anos devido à falta de documentos e recursos.',
          impacto: 'Reintegração no sistema de ensino e desenvolvimento cognitivo.'
        },
        {
          id: 2,
          nome: 'Acompanhamento Nutricional',
          tipo: 'sanc',
          prioridade: 'Médio',
          descricao: 'Suplementação alimentar e monitoramento de peso.',
          detalhes: 'Apresenta sinais de desnutrição leve devido à dieta pouco variada.',
          impacto: 'Melhoria da saúde física e imunidade.'
        },
        {
          id: 10,
          nome: 'Registro Civil',
          tipo: 'sadd',
          prioridade: 'Alto',
          descricao: 'Obtenção de documentos de identidade.',
          detalhes: 'Processo legal para emissão de certidão de nascimento.',
          impacto: 'Acesso a direitos fundamentais e matrícula escolar.'
        },
        {
          id: 11,
          nome: 'Saúde Geral',
          tipo: 'sasbe',
          prioridade: 'Alto',
          descricao: 'Check-up pediátrico completo.',
          detalhes: 'Consultas de rotina e vacinação em dia.',
          impacto: 'Prevenção de doenças crônicas.'
        },
        {
          id: 12,
          nome: 'Alimentação Diária',
          tipo: 'saad',
          prioridade: 'Alto',
          descricao: 'Apoio à segurança alimentar familiar.',
          detalhes: 'Garantia de refeições nutritivas diárias.',
          impacto: 'Estabilidade física e foco nos estudos.'
        },
        {
          id: 13,
          nome: 'Kit de Proteção',
          tipo: 'saps',
          prioridade: 'Médio',
          descricao: 'Produtos de higiene e mosquiteiro.',
          detalhes: 'Prevenção contra malária e outras infecções.',
          impacto: 'Ambiente doméstico mais seguro.'
        },
        {
          id: 14,
          nome: 'Integração Social',
          tipo: 'sape',
          prioridade: 'Baixo',
          descricao: 'Atividades recreativas e psicossociais.',
          detalhes: 'Apoio no desenvolvimento de competências emocionais.',
          impacto: 'Aumento da autoestima e resiliência.'
        }
      ],
      orcamentoAnual: 64000,
      orcamentoCoberto: 0,
      orcamentoDetalhado: [
        {
          areaId: 'saeie',
          items: [
            { description: 'Matrícula e Mensalidades', value: 12000 },
            { description: 'Uniforme e Material', value: 3000 }
          ]
        },
        {
          areaId: 'sanc',
          items: [
            { description: 'Suplementos e Fortificantes', value: 5000 }
          ]
        },
        {
          areaId: 'sadd',
          items: [
            { description: 'Emolumentos e Certidões', value: 2500 }
          ]
        },
        {
          areaId: 'sasbe',
          items: [
            { description: 'Consultas e Exames', value: 7500 }
          ]
        },
        {
          areaId: 'saad',
          items: [
            { description: 'Reforço Alimentar Mensal', value: 24000 }
          ]
        },
        {
          areaId: 'saps',
          items: [
            { description: 'Produtos de Higiene', value: 2500 },
            { description: 'Rede Mosquiteira', value: 1500 }
          ]
        },
        {
          areaId: 'sape',
          items: [
            { description: 'Acompanhamento Especializado', value: 6000 }
          ]
        }
      ]
    },
    {
      id: '2',
      nome: 'Carlos Sitoe',
      idade: 12,
      foto: '/img/children/joao_nkomo.png',
      regiao: 'Gaza',
      status: 'Parcialmente Apoiada',
      dataRegistro: '2024-02-10',
      vulnerabilidades: ['Órfão de ambos os pais', 'Trabalho Infantil'],
      necessidades: [
        {
          id: 3,
          nome: 'Apoio Psicosocial',
          tipo: 'sape',
          prioridade: 'Alto',
          descricao: 'Sessões de terapia para processar o luto.',
          detalhes: 'Carlos perdeu os pais recentemente e demonstra sinais de trauma.',
          impacto: 'Estabilidade emocional e resiliência.'
        }
      ],
      orcamentoAnual: 45000,
      orcamentoCoberto: 22000,
      orcamentoDetalhado: [
        {
          areaId: 'sape',
          items: [
            { description: 'Sessões de Terapia', value: 25000 },
            { description: 'Atividades de Grupo', value: 10000 }
          ]
        },
        {
          areaId: 'sasbe',
          items: [
            { description: 'Check-up Geral', value: 5000 },
            { description: 'Medicamentos', value: 5000 }
          ]
        }
      ]
    },
    {
      id: '3',
      nome: 'Esperança Mondlane',
      idade: 8,
      foto: '/img/children/maria_silva.png',
      regiao: 'Sofala',
      status: 'Disponível',
      dataRegistro: '2024-03-05',
      vulnerabilidades: ['Deficiência Motora', 'Pobreza Extrema'],
      necessidades: [
        {
          id: 4,
          nome: 'Fisioterapia',
          tipo: 'sasbe',
          prioridade: 'Alto',
          descricao: 'Sessões semanais de fisioterapia.',
          detalhes: 'Necessário para melhorar a mobilidade e autonomia.',
          impacto: 'Maior independência física.'
        }
      ],
      orcamentoAnual: 60000,
      orcamentoCoberto: 0,
      orcamentoDetalhado: [
        {
          areaId: 'sasbe',
          items: [
            { description: 'Sessões de Fisioterapia', value: 40000 },
            { description: 'Equipamentos de Apoio', value: 20000 }
          ]
        }
      ]
    },
    {
      id: '4',
      nome: 'Lucas Tembe',
      idade: 7,
      foto: '/img/children/ana_dlamini.png',
      regiao: 'Inhambane',
      status: 'Disponível',
      dataRegistro: '2024-03-10',
      vulnerabilidades: ['Desnutrição Aguda'],
      necessidades: [
        {
          id: 5,
          nome: 'Cesta Básica Especial',
          tipo: 'sanc',
          prioridade: 'Alto',
          descricao: 'Alimentos terapêuticos prontos para uso.',
          detalhes: 'Lucas precisa de recuperação nutricional imediata.',
          impacto: 'Recuperação do peso ideal e saúde.'
        }
      ],
      orcamentoAnual: 25000,
      orcamentoCoberto: 0,
      orcamentoDetalhado: [
        {
          areaId: 'sanc',
          items: [
            { description: 'Alimentos Terapêuticos', value: 25000 }
          ]
        }
      ]
    },
    {
      id: '5',
      nome: 'Zuleika Macamo',
      idade: 11,
      foto: '/img/children/maria_silva.png',
      regiao: 'Nampula',
      status: 'Disponível',
      dataRegistro: '2024-03-12',
      vulnerabilidades: ['Órfã de Pai'],
      necessidades: [
        {
          id: 6,
          nome: 'Material Escolar',
          tipo: 'saeie',
          prioridade: 'Médio',
          descricao: 'Kit completo de livros e cadernos.',
          detalhes: 'Início do ano letivo sem recursos para material.',
          impacto: 'Continuidade dos estudos.'
        }
      ],
      orcamentoAnual: 12000,
      orcamentoCoberto: 0,
      orcamentoDetalhado: [
        {
          areaId: 'saeie',
          items: [
            { description: 'Kit Escolar', value: 12000 }
          ]
        }
      ]
    },
    {
      id: '6',
      nome: 'Mateus Chissano',
      idade: 9,
      foto: '/img/children/joao_nkomo.png',
      regiao: 'Niassa',
      status: 'Disponível',
      dataRegistro: '2024-03-14',
      vulnerabilidades: ['Pobreza Extrema'],
      necessidades: [
        {
          id: 7,
          nome: 'Vestuário',
          tipo: 'saps',
          prioridade: 'Baixo',
          descricao: 'Roupas de frio e calçado.',
          detalhes: 'Falta de agasalhos para o inverno.',
          impacto: 'Proteção contra doenças sazonais.'
        }
      ],
      orcamentoAnual: 8000,
      orcamentoCoberto: 0,
      orcamentoDetalhado: [
        {
          areaId: 'saps',
          items: [
            { description: 'Agasalhos e Calçado', value: 8000 }
          ]
        }
      ]
    },
    {
      id: '7',
      nome: 'Bia Langa',
      idade: 13,
      foto: '/img/children/ana_dlamini.png',
      regiao: 'Zambézia',
      status: 'Disponível',
      dataRegistro: '2024-03-15',
      vulnerabilidades: ['Fora da Escola'],
      necessidades: [
        {
          id: 8,
          nome: 'Curso Profissionalizante',
          tipo: 'saeie',
          prioridade: 'Médio',
          descricao: 'Iniciação em Corte e Costura.',
          detalhes: 'Bia quer aprender uma profissão para ajudar a família.',
          impacto: 'Empoderamento e renda futura.'
        }
      ],
      orcamentoAnual: 18000,
      orcamentoCoberto: 0,
      orcamentoDetalhado: [
        {
          areaId: 'saeie',
          items: [
            { description: 'Matrícula e Curso', value: 18000 }
          ]
        }
      ]
    },
    {
      id: '8',
      nome: 'Samuel Guebuza',
      idade: 6,
      foto: '/img/children/joao_nkomo.png',
      regiao: 'Tete',
      status: 'Disponível',
      dataRegistro: '2024-03-16',
      vulnerabilidades: ['Órfão de ambos os pais'],
      necessidades: [
        {
          id: 9,
          nome: 'Acompanhamento Psicológico',
          tipo: 'sape',
          prioridade: 'Alto',
          descricao: 'Apoio emocional contínuo.',
          detalhes: 'Lidando com a perda recente dos cuidadores.',
          impacto: 'Saúde mental preservada.'
        }
      ],
      orcamentoAnual: 30000,
      orcamentoCoberto: 0,
      orcamentoDetalhado: [
        {
          areaId: 'sape',
          items: [
            { description: 'Sessões Mensais', value: 30000 }
          ]
        }
      ]
    }
  ]

  // =============================================
  // GETTERS
  // =============================================
  const criancasFiltradas = computed(() => {
    return lista.value.filter(c => {
      const isDisponivel = c.status === 'Disponível'
      const matchRegiao = !filtros.value.regiao || c.regiao === filtros.value.regiao
      const matchVuln = !filtros.value.vulnerabilidade || c.vulnerabilidades.includes(filtros.value.vulnerabilidade)
      return isDisponivel && matchRegiao && matchVuln
    })
  })

  const regioes = computed(() => {
    const r = lista.value.map(c => c.regiao)
    return [...new Set(r)]
  })

  const vulnerabilidades = computed(() => {
    const v = lista.value.flatMap(c => c.vulnerabilidades)
    return [...new Set(v)]
  })

  // =============================================
  // ACTIONS
  // =============================================
  const fetchCriancas = async () => {
    if (lista.value.length > 0) return
    loading.value = true
    // Simulando delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    lista.value = [...mockCriancas]
    loading.value = false
  }

  const setFiltros = (novosFiltros) => {
    filtros.value = { ...filtros.value, ...novosFiltros }
  }

  const resetFiltros = () => {
    filtros.value = { regiao: '', vulnerabilidade: '' }
  }

  const getCriancaById = (id) => {
    return lista.value.find(c => c.id === id)
  }

  const atualizarOrcamentoCoberto = (criancaId, valorAdicional) => {
    const crianca = lista.value.find(c => c.id === criancaId)
    if (crianca) {
      crianca.orcamentoCoberto += valorAdicional
      
      // Atualizar status baseado na nova cobertura
      if (crianca.orcamentoCoberto >= crianca.orcamentoAnual) {
        crianca.status = 'Totalmente Apoiada'
      } else if (crianca.orcamentoCoberto > 0) {
        crianca.status = 'Parcialmente Apoiada'
      }
    }
  }

  return {
    lista,
    loading,
    filtros,
    criancasFiltradas,
    regioes,
    vulnerabilidades,
    fetchCriancas,
    setFiltros,
    resetFiltros,
    getCriancaById,
    atualizarOrcamentoCoberto
  }
})