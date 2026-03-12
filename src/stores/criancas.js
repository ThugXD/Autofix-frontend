import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCriancasStore = defineStore('criancas', () => {
  const criancas = ref([])
  const loading = ref(false)
  const filtros = ref({ regiao: '', vulnerabilidade: '' })

  const criancasMock = [
    {
      id: 1,
      nome: 'Maria Silva',
      idade: 8,
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
      regiao: 'Maputo',
      vulnerabilidades: ['Pobreza extrema', 'Acesso à educação'],
      necessidades: [
        {
          id: 'sadd-1',
          tipo: 'SADD',
          nome: 'Documentação',
          descricao: 'Certidão de nascença',
          detalhes: 'A criança necessita de documentação oficial para acesso a direitos básicos e inscrição escolar.',
          prioridade: 'Alto',
          impacto: 'Acesso a direitos básicos'
        },
        {
          id: 'sanc-1',
          tipo: 'SANC',
          nome: 'Nutrição',
          descricao: 'Programa de nutrição',
          detalhes: 'Desnutrição moderada. Necessita de acompanhamento nutricional e refeições diárias.',
          prioridade: 'Alto',
          impacto: 'Desenvolvimento saudável'
        },
        {
          id: 'saeie-1',
          tipo: 'SAEIE',
          nome: 'Educação',
          descricao: 'Volta à escola',
          detalhes: 'Fora do sistema escolar há 2 anos. Precisa de apoio escolar e material didático.',
          prioridade: 'Alto',
          impacto: 'Educação de qualidade'
        },
        {
          id: 'sape-1',
          tipo: 'SAPE',
          nome: 'Psico-social',
          descricao: 'Apoio emocional',
          detalhes: 'Trauma relacionado a perda. Necessita de acompanhamento psicológico.',
          prioridade: 'Médio',
          impacto: 'Bem-estar emocional'
        }
      ],
      orcamentoAnual: 5000,
      orcamentoCoberto: 1200,
      status: 'Disponível',
      dataRegistro: '2024-01-15'
    },
    {
      id: 2,
      nome: 'João Nkomo',
      idade: 12,
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      regiao: 'Gaza',
      vulnerabilidades: ['Órfão', 'Criança de rua'],
      necessidades: [
        {
          id: 'sadd-2',
          tipo: 'SADD',
          nome: 'Documentação',
          descricao: 'Sem documentação',
          detalhes: 'Sem qualquer documento de identificação. Prioridade máxima para registro legal.',
          prioridade: 'Alto',
          impacto: 'Identidade legal'
        },
        {
          id: 'saad-2',
          tipo: 'SAAD',
          nome: 'Alimentação',
          descricao: 'Refeições diárias',
          detalhes: 'Frequentemente sem refeições. Necessita de apoio alimentar consistente.',
          prioridade: 'Alto',
          impacto: 'Segurança alimentar'
        },
        {
          id: 'saps-2',
          tipo: 'SAPS',
          nome: 'Proteção',
          descricao: 'Acolhimento seguro',
          detalhes: 'Criança em situação de rua. Necessita de acolhimento e proteção.',
          prioridade: 'Alto',
          impacto: 'Proteção completa'
        }
      ],
      orcamentoAnual: 8000,
      orcamentoCoberto: 0,
      status: 'Disponível',
      dataRegistro: '2024-02-01'
    },
    {
      id: 3,
      nome: 'Ana Dlamini',
      idade: 6,
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
      regiao: 'Inhambane',
      vulnerabilidades: ['Deficiência visual', 'Pobreza'],
      necessidades: [
        {
          id: 'sasbe-3',
          tipo: 'SASBE',
          nome: 'Saúde',
          descricao: 'Reabilitação oftalmológica',
          detalhes: 'Cegueira congénita. Necessita de acompanhamento médico especializado e reabilitação.',
          prioridade: 'Alto',
          impacto: 'Qualidade de vida'
        },
        {
          id: 'saeie-3',
          tipo: 'SAEIE',
          nome: 'Educação Especial',
          descricao: 'Escola inclusiva',
          detalhes: 'Acesso a educação especializada para crianças com deficiência visual.',
          prioridade: 'Alto',
          impacto: 'Inclusão social'
        }
      ],
      orcamentoAnual: 6500,
      orcamentoCoberto: 2000,
      status: 'Parcialmente Apoiada',
      dataRegistro: '2024-01-20'
    },
    {
      id: 4,
      nome: 'Tomás Mussa',
      idade: 14,
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
      regiao: 'Sofala',
      vulnerabilidades: ['Trabalho infantil', 'Abandono escolar'],
      necessidades: [
        {
          id: 'saeie-4',
          tipo: 'SAEIE',
          nome: 'Educação',
          descricao: 'Retorno à escola',
          detalhes: 'Completar ensino primário. Atraso de 2 anos. Necessita de bolsa escolar.',
          prioridade: 'Alto',
          impacto: 'Futuro promissor'
        },
        {
          id: 'saps-4',
          tipo: 'SAPS',
          nome: 'Proteção',
          descricao: 'Eliminar trabalho infantil',
          detalhes: 'Trabalho infantil em agricultura. Precisa de proteção legal e apoio.',
          prioridade: 'Alto',
          impacto: 'Direitos da criança'
        }
      ],
      orcamentoAnual: 4500,
      orcamentoCoberto: 0,
      status: 'Disponível',
      dataRegistro: '2024-02-10'
    },
    {
      id: 5,
      nome: 'Zita Machava',
      idade: 10,
      foto: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=500&h=500&fit=crop',
      regiao: 'Maputo',
      vulnerabilidades: ['Abuso infantil', 'Trauma'],
      necessidades: [
        {
          id: 'sape-5',
          tipo: 'SAPE',
          nome: 'Psico-social',
          descricao: 'Acompanhamento psicológico',
          detalhes: 'Trauma por abuso. Necessita de psicoterapia e acompanhamento contínuo.',
          prioridade: 'Alto',
          impacto: 'Recuperação emocional'
        },
        {
          id: 'saps-5',
          tipo: 'SAPS',
          nome: 'Proteção',
          descricao: 'Proteção legal e acolhimento',
          detalhes: 'Proteção contra abuso. Acolhimento em ambiente seguro.',
          prioridade: 'Alto',
          impacto: 'Segurança garantida'
        }
      ],
      orcamentoAnual: 7000,
      orcamentoCoberto: 0,
      status: 'Disponível',
      dataRegistro: '2024-02-05'
    }
  ]

  const criancasFiltradas = computed(() => {
    let resultado = criancas.value
    if (filtros.value.regiao) {
      resultado = resultado.filter(c => c.regiao === filtros.value.regiao)
    }
    if (filtros.value.vulnerabilidade) {
      resultado = resultado.filter(c => c.vulnerabilidades.includes(filtros.value.vulnerabilidade))
    }
    return resultado
  })

  const regioes = computed(() => {
    return [...new Set(criancas.value.map(c => c.regiao))].sort()
  })

  const vulnerabilidades = computed(() => {
    const todas = new Set()
    criancas.value.forEach(c => {
      c.vulnerabilidades.forEach(v => todas.add(v))
    })
    return Array.from(todas).sort()
  })

  const fetchCriancas = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      criancas.value = criancasMock
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      loading.value = false
    }
  }

  const getCriancaById = (id) => {
    return criancas.value.find(c => c.id === parseInt(id))
  }

  const setFiltros = (novosFiltros) => {
    filtros.value = { ...filtros.value, ...novosFiltros }
  }

  const resetFiltros = () => {
    filtros.value = { regiao: '', vulnerabilidade: '' }
  }

  return {
    criancas,
    loading,
    filtros,
    criancasFiltradas,
    regioes,
    vulnerabilidades,
    fetchCriancas,
    getCriancaById,
    setFiltros,
    resetFiltros
  }
})
