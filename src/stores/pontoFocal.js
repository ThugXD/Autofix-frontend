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
      foto: '/img/children/maria_silva.png',
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
      foto: '/img/children/joao_nkomo.png',
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
      foto: '/img/children/ana_dlamini.png',
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
      foto: '/img/children/tomas_mussa.png',
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
    // === AGUARDANDO REVISÃO N2 ===
    {
      id: 1,
      comunicacaoId: 2,
      codigo: 'CAD-2024-001',
      nomeCompleto: 'Carlos Alberto Sitoe',
      foto: '/img/children/joao_nkomo.png',
      dataNascimento: '2012-05-15',
      sexo: 'M',
      localResidencia: 'Chamanculo C, Rua 25',
      provincia: 'Maputo Cidade',
      distrito: 'KaMpfumo',
      nomeMae: 'Rosa Sitoe',
      situacaoMae: 'falecida',
      nomePai: 'Alberto Sitoe',
      situacaoPai: 'falecido',
      tutorNome: 'Manuel Sitoe (Tio)',
      tutorContacto: '82 987 6543',
      numeroIrmaos: 2,
      situacaoEconomica: 'Familia em situacao de pobreza extrema. O tio trabalha como vendedor ambulante.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_ambos', 'fora_escola'],
      observacoes: 'Carlos e uma crianca inteligente e resiliente. Todas as avaliacoes tecnicas foram concluidas.',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-15', observacoes: 'Documentacao completa', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-16', observacoes: 'Avaliacao nutricional concluida', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-17', observacoes: 'Check-up geral realizado', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-18', observacoes: 'Plano alimentar definido', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-19', observacoes: 'Inscricao escolar garantida', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-20', observacoes: 'Avaliacao de protecao concluida', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-21', observacoes: 'Apoio psicologico iniciado', status: 'concluido' }
      ],
      status: 'aguardando_revisao',
      dataCriacao: '2024-03-10',
      criadoPor: 'João Silva'
    },
    {
      id: 2,
      comunicacaoId: 3,
      codigo: 'CAD-2024-002',
      nomeCompleto: 'Ana Dlamini Mabunda',
      foto: '/img/children/ana_dlamini.png',
      dataNascimento: '2018-08-22',
      sexo: 'F',
      localResidencia: 'Polana Caniço A, Av. Julius Nyerere',
      provincia: 'Maputo Cidade',
      distrito: 'KaMpfumo',
      nomeMae: 'Teresa Mabunda',
      situacaoMae: 'viva',
      nomePai: 'Desconhecido',
      situacaoPai: 'desaparecido',
      tutorNome: 'Teresa Mabunda (Mãe)',
      tutorContacto: '86 555 1234',
      numeroIrmaos: 3,
      situacaoEconomica: 'Mãe solteira sem emprego fixo.',
      vulnerabilidades: ['pobreza_extrema', 'fora_escola', 'malnutricao'],
      observacoes: 'Todas as fichas técnicas foram concluídas pelos especialistas.',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-18', observacoes: 'Documentação verificada', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-19', observacoes: 'Plano nutricional definido', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-20', observacoes: 'Acompanhamento médico iniciado', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-21', observacoes: 'Programa alimentar implementado', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-22', observacoes: 'Matrícula escolar realizada', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-23', observacoes: 'Medidas de proteção aplicadas', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-24', observacoes: 'Apoio psicológico em curso', status: 'concluido' }
      ],
      status: 'aguardando_revisao',
      dataCriacao: '2024-03-12',
      criadoPor: 'Maria Santos'
    },
    {
      id: 3,
      comunicacaoId: 1,
      codigo: 'CAD-2024-003',
      nomeCompleto: 'Esperança Maria Mondlane',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2016-02-10',
      sexo: 'F',
      localResidencia: 'Maxaquene A, Bloco 5',
      provincia: 'Maputo Cidade',
      distrito: 'KaMaxaqueni',
      nomeMae: 'Lúcia Mondlane',
      situacaoMae: 'falecida',
      nomePai: 'José Mondlane',
      situacaoPai: 'desaparecido',
      tutorNome: 'Marta Mondlane (Avó)',
      tutorContacto: '84 123 4567',
      numeroIrmaos: 1,
      situacaoEconomica: 'Vive com a avó idosa em situação de extrema pobreza.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_um', 'negligencia'],
      observacoes: 'Avaliações técnicas concluídas. Aguardando revisão final.',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-25', observacoes: 'Documentação legal completa', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-26', observacoes: 'Suplementação nutricional necessária', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-27', observacoes: 'Acompanhamento médico regular', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-28', observacoes: 'Refeições escolares garantidas', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-29', observacoes: 'Reintegração escolar bem-sucedida', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-30', observacoes: 'Proteção social assegurada', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-31', observacoes: 'Apoio psicológico contínuo', status: 'concluido' }
      ],
      status: 'aguardando_revisao',
      dataCriacao: '2024-03-14',
      criadoPor: 'Pedro Nkomo'
    },

    // === DEFINIR ORÇAMENTO ===
    {
      id: 4,
      codigo: 'CAD-2024-004',
      nomeCompleto: 'João Pedro Santos',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2014-11-08',
      sexo: 'M',
      localResidencia: 'Mafalala, Rua Principal',
      provincia: 'Maputo Cidade',
      distrito: 'Nlhamankulu',
      nomeMae: 'Catarina Santos',
      situacaoMae: 'viva',
      nomePai: 'Pedro Santos',
      situacaoPai: 'viva',
      tutorNome: 'Catarina Santos (Mãe)',
      tutorContacto: '87 444 7777',
      numeroIrmaos: 4,
      situacaoEconomica: 'Família numerosa em situação de vulnerabilidade econômica.',
      vulnerabilidades: ['pobreza_extrema', 'malnutricao'],
      observacoes: 'Aprovado na revisão N2. Aguardando definição de orçamento.',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-10', observacoes: 'Documentação em dia', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-11', observacoes: 'Crescimento adequado', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-12', observacoes: 'Saúde estável', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-13', observacoes: 'Alimentação básica assegurada', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-14', observacoes: 'Frequenta escola regularmente', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-15', observacoes: 'Ambiente familiar seguro', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-16', observacoes: 'Bem-estar emocional adequado', status: 'concluido' }
      ],
      status: 'orcamento',
      dataCriacao: '2024-03-08',
      criadoPor: 'Ana Costa'
    },
    {
      id: 5,
      codigo: 'CAD-2024-005',
      nomeCompleto: 'Teresa Cumbane',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2017-01-30',
      sexo: 'F',
      localResidencia: 'Hulene B, Sector 3',
      provincia: 'Maputo Cidade',
      distrito: 'KaMavota',
      nomeMae: 'Júlia Cumbane',
      situacaoMae: 'viva',
      nomePai: 'Manuel Cumbane',
      situacaoPai: 'falecido',
      tutorNome: 'Júlia Cumbane (Mãe)',
      tutorContacto: '83 222 8888',
      numeroIrmaos: 2,
      situacaoEconomica: 'Mãe viúva com dificuldades econômicas.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_um'],
      observacoes: 'Revisão N2 aprovada. Orçamento pendente.',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-12', observacoes: 'Certidão de nascimento obtida', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-13', observacoes: 'Peso adequado para idade', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-14', observacoes: 'Vacinas em dia', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-15', observacoes: 'Refeições escolares', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-16', observacoes: 'Material escolar fornecido', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-17', observacoes: 'Acompanhamento social', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-18', observacoes: 'Apoio emocional necessário', status: 'concluido' }
      ],
      status: 'orcamento',
      dataCriacao: '2024-03-10',
      criadoPor: 'Carlos Mendes'
    },

    // === PRONTOS PARA PUBLICAÇÃO ===
    {
      id: 6,
      codigo: 'CAD-2024-006',
      nomeCompleto: 'Manuel António',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2013-07-12',
      sexo: 'M',
      localResidencia: 'Zimpeto, Bairro Central',
      provincia: 'Maputo Cidade',
      distrito: 'KaMubukwana',
      nomeMae: 'Antónia Manuel',
      situacaoMae: 'viva',
      nomePai: 'José António',
      situacaoPai: 'falecido',
      tutorNome: 'Antónia Manuel (Mãe)',
      tutorContacto: '85 777 3333',
      numeroIrmaos: 3,
      situacaoEconomica: 'Família monoparental com rendimentos instáveis.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_um'],
      observacoes: 'Orçamento definido. Pronto para publicação no catálogo.',
      orcamentoAnual: 420000,
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-05', observacoes: 'Documentação completa', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-06', observacoes: 'Suplementação alimentar', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-07', observacoes: 'Consulta pediátrica', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-08', observacoes: 'Programa de merenda escolar', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-09', observacoes: 'Uniforme e material escolar', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-10', observacoes: 'Acompanhamento familiar', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-11', observacoes: 'Atividades recreativas', status: 'concluido' }
      ],
      status: 'pronto',
      dataCriacao: '2024-03-01',
      criadoPor: 'Sofia Rodrigues'
    },
    {
      id: 7,
      codigo: 'CAD-2024-007',
      nomeCompleto: 'Lúcia Fernandes',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2015-12-03',
      sexo: 'F',
      localResidencia: 'Aeroporto, Sector 4',
      provincia: 'Maputo Cidade',
      distrito: 'KaMavota',
      nomeMae: 'Maria Fernandes',
      situacaoMae: 'viva',
      nomePai: 'Carlos Fernandes',
      situacaoPai: 'viva',
      tutorNome: 'Maria Fernandes (Mãe)',
      tutorContacto: '89 111 9999',
      numeroIrmaos: 1,
      situacaoEconomica: 'Família com dificuldades econômicas.',
      vulnerabilidades: ['pobreza_extrema'],
      observacoes: 'Orçamento anual definido. Aguardando publicação.',
      orcamentoAnual: 380000,
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-03-08', observacoes: 'Registro civil atualizado', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-03-09', observacoes: 'Crescimento normal', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-03-10', observacoes: 'Saúde preventiva', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-03-11', observacoes: 'Alimentação balanceada', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-03-12', observacoes: 'Desempenho escolar bom', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-03-13', observacoes: 'Ambiente familiar estável', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-03-14', observacoes: 'Desenvolvimento emocional adequado', status: 'concluido' }
      ],
      status: 'pronto',
      dataCriacao: '2024-03-05',
      criadoPor: 'Miguel António'
    },

    // === PUBLICADOS ===
    {
      id: 8,
      codigo: 'CAD-2024-008',
      nomeCompleto: 'Pedro Miguel',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2011-09-18',
      sexo: 'M',
      localResidencia: 'Sommerschield, Rua 10',
      provincia: 'Maputo Cidade',
      distrito: 'KaMpfumo',
      nomeMae: 'Isabel Miguel',
      situacaoMae: 'viva',
      nomePai: 'João Miguel',
      situacaoPai: 'falecido',
      tutorNome: 'Isabel Miguel (Mãe)',
      tutorContacto: '81 666 4444',
      numeroIrmaos: 2,
      situacaoEconomica: 'Viúva com três filhos. Trabalha como empregada doméstica.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_um'],
      observacoes: 'Publicado no catálogo em janeiro de 2024.',
      orcamentoAnual: 450000,
      padrinhoId: 1,
      dataPublicacao: '15/01/2024',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-01-10', observacoes: 'Documentação completa', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-01-11', observacoes: 'Avaliação nutricional', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-01-12', observacoes: 'Exame médico geral', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-01-13', observacoes: 'Programa alimentar', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-01-14', observacoes: 'Material escolar', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-01-15', observacoes: 'Acompanhamento social', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-01-16', observacoes: 'Apoio psicológico', status: 'concluido' }
      ],
      status: 'publicado',
      dataCriacao: '2024-01-05',
      criadoPor: 'Ana Silva'
    },
    {
      id: 9,
      codigo: 'CAD-2024-009',
      nomeCompleto: 'Sofia Cristina',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2016-04-25',
      sexo: 'F',
      localResidencia: 'Costa do Sol, Rua 15',
      provincia: 'Maputo Cidade',
      distrito: 'KaMpfumo',
      nomeMae: 'Cristina Sofia',
      situacaoMae: 'viva',
      nomePai: 'Manuel Sofia',
      situacaoPai: 'desaparecido',
      tutorNome: 'Cristina Sofia (Mãe)',
      tutorContacto: '88 333 7777',
      numeroIrmaos: 1,
      situacaoEconomica: 'Mãe solteira com dificuldades econômicas.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_um'],
      observacoes: 'Publicada no catálogo em fevereiro de 2024.',
      orcamentoAnual: 400000,
      padrinhoId: 2,
      dataPublicacao: '20/02/2024',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2024-02-05', observacoes: 'Certidão de nascimento', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2024-02-06', observacoes: 'Controle de crescimento', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2024-02-07', observacoes: 'Vacinação completa', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2024-02-08', observacoes: 'Refeições escolares', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2024-02-09', observacoes: 'Inscrição escolar', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2024-02-10', observacoes: 'Proteção infantil', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2024-02-11', observacoes: 'Apoio emocional', status: 'concluido' }
      ],
      status: 'publicado',
      dataCriacao: '2024-02-01',
      criadoPor: 'João Pereira'
    },
    {
      id: 10,
      codigo: 'CAD-2024-010',
      nomeCompleto: 'Ricardo João',
      foto: '/img/children/maria_silva.png',
      dataNascimento: '2012-11-14',
      sexo: 'M',
      localResidencia: 'Bairro Triunfo, Rua 8',
      provincia: 'Maputo Cidade',
      distrito: 'Nlhamankulu',
      nomeMae: 'Joana Ricardo',
      situacaoMae: 'viva',
      nomePai: 'António Ricardo',
      situacaoPai: 'falecido',
      tutorNome: 'Joana Ricardo (Mãe)',
      tutorContacto: '84 999 2222',
      numeroIrmaos: 2,
      situacaoEconomica: 'Família em situação de pobreza.',
      vulnerabilidades: ['pobreza_extrema', 'orfao_um'],
      observacoes: 'Publicado no catálogo em dezembro de 2023.',
      orcamentoAnual: 380000,
      padrinhoId: null,
      dataPublicacao: '10/12/2023',
      pontosFocais: [
        { pfId: 'sadd', dataVisita: '2023-12-01', observacoes: 'Documentação legal', status: 'concluido' },
        { pfId: 'sanc', dataVisita: '2023-12-02', observacoes: 'Avaliação nutricional', status: 'concluido' },
        { pfId: 'sasbe', dataVisita: '2023-12-03', observacoes: 'Saúde geral', status: 'concluido' },
        { pfId: 'saad', dataVisita: '2023-12-04', observacoes: 'Alimentação diária', status: 'concluido' },
        { pfId: 'saeie', dataVisita: '2023-12-05', observacoes: 'Educação formal', status: 'concluido' },
        { pfId: 'saps', dataVisita: '2023-12-06', observacoes: 'Proteção social', status: 'concluido' },
        { pfId: 'sape', dataVisita: '2023-12-07', observacoes: 'Saúde mental', status: 'concluido' }
      ],
      status: 'publicado',
      dataCriacao: '2023-11-25',
      criadoPor: 'Maria José'
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
    cadastros.value.filter(c => c.status === 'aguardando_revisao' || c.status === 'pendente_n2')
  )

  const cadastrosOrcamento = computed(() =>
    cadastros.value.filter(c => c.status === 'orcamento')
  )

  const cadastrosProntos = computed(() =>
    cadastros.value.filter(c => c.status === 'pronto')
  )

  const cadastrosPublicados = computed(() =>
    cadastros.value.filter(c => c.status === 'publicado')
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

  const aprovarNivel2 = async (cadastroId) => {
    const cadastro = cadastros.value.find(c => c.id === parseInt(cadastroId))
    if (cadastro) {
      cadastro.status = 'orcamento'
    }
  }

  const rejeitarNivel2 = async (cadastroId, observacoes) => {
    const cadastro = cadastros.value.find(c => c.id === parseInt(cadastroId))
    if (cadastro) {
      cadastro.status = 'ajustes_solicitados'
      cadastro.observacoesGestor = observacoes
    }
  }

  const definirOrcamento = async (cadastroId, totalAnual, orcamentoDetalhado = []) => {
    const cadastro = cadastros.value.find(c => c.id === parseInt(cadastroId))
    if (cadastro) {
      cadastro.orcamentoAnual = totalAnual
      cadastro.orcamentoDetalhado = orcamentoDetalhado
      cadastro.status = 'pronto'
    }
  }

  const publicarNoCatalogo = async (cadastroId) => {
    const cadastro = cadastros.value.find(c => c.id === parseInt(cadastroId))
    if (cadastro) {
      cadastro.status = 'publicado'
      cadastro.dataPublicacao = new Date().toLocaleDateString('pt-AO')
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
    cadastrosOrcamento,
    cadastrosProntos,
    cadastrosPublicados,
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
    agendarVisitaTecnica,
    aprovarNivel2,
    rejeitarNivel2,
    definirOrcamento,
    publicarNoCatalogo
  }
})
