/**
 * SACCO - Sistema de Controle de Acesso
 * Configuracao de Roles e Permissoes
 */

// Roles do Sistema
export const ROLES = {
  PF_COMUNITARIO: 'pf_comunitario',
  PF_TEMATICO: 'pf_tematico',
  GESTOR: 'gestor_associacao',
  TUTOR: 'tutor',
  PADRINHO: 'padrinho',
  ADMIN: 'admin'
}

// Labels dos Roles (para exibicao)
export const ROLE_LABELS = {
  [ROLES.PF_COMUNITARIO]: 'Ponto Focal Comunitario',
  [ROLES.PF_TEMATICO]: 'Ponto Focal Tematico',
  [ROLES.GESTOR]: 'Gestor da Associacao',
  [ROLES.TUTOR]: 'Tutor',
  [ROLES.PADRINHO]: 'Padrinho',
  [ROLES.ADMIN]: 'Administrador'
}

// Instituições / Parceiros (para demo)
export const INSTITUICOES = [
  'Associação Vida Plena',
  'Fundação Esperança',
  'ONG Criança Feliz',
  'Governo Local'
]

// Utilizadores de Teste (para demo)
export const TEST_USERS = [
  {
    id: 1,
    name: 'Joao Silva',
    email: 'joao@sacco.org',
    role: ROLES.PF_COMUNITARIO,
    tenant_id: 1
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@sacco.org',
    role: ROLES.PF_TEMATICO,
    pf_tipo: 'SADD', // Servico de Apoio aos Direitos e Documentacao
    tenant_id: 1
  },
  {
    id: 3,
    name: 'Carlos Gestor',
    email: 'carlos@sacco.org',
    role: ROLES.GESTOR,
    tenant_id: 1
  },
  {
    id: 4,
    name: 'Ana Tutor',
    email: 'ana@sacco.org',
    role: ROLES.TUTOR,
    tenant_id: 1
  },
  {
    id: 5,
    name: 'Pedro Padrinho',
    email: 'pedro@sacco.org',
    role: ROLES.PADRINHO,
    tenant_id: 1
  },
  {
    id: 6,
    name: 'Admin Sistema',
    email: 'admin@sacco.org',
    role: ROLES.ADMIN,
    tenant_id: 1
  }
]

// Redirect apos login (por role)
export const ROLE_HOME_ROUTES = {
  [ROLES.PF_COMUNITARIO]: '/app/ponto-focal/comunicacao',
  [ROLES.PF_TEMATICO]: '/app/ponto-focal-tematico',
  [ROLES.GESTOR]: '/app/gestor',
  [ROLES.TUTOR]: '/app/tutor',
  [ROLES.PADRINHO]: '/app/padrinho',
  [ROLES.ADMIN]: '/app/admin'
}

// Permissoes de rotas por role
export const ROUTE_PERMISSIONS = {
  // Ponto Focal Comunitario
  '/app/ponto-focal': [ROLES.PF_COMUNITARIO, ROLES.ADMIN],
  '/app/ponto-focal/comunicacao': [ROLES.PF_COMUNITARIO, ROLES.ADMIN],
  '/app/ponto-focal/cadastro': [ROLES.PF_COMUNITARIO, ROLES.ADMIN],
  '/app/ponto-focal/revisao': [ROLES.PF_COMUNITARIO, ROLES.ADMIN],

  // Ponto Focal Tematico
  '/app/ponto-focal-tematico': [ROLES.PF_TEMATICO, ROLES.ADMIN],

  // Gestor
  '/app/gestor': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/revisao': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/apadinhamentos': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/padrinhos': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/relatorios': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/utilizadores': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/notificacoes': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/mensagens': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/logs': [ROLES.GESTOR, ROLES.ADMIN],
  '/app/gestor/configuracoes': [ROLES.GESTOR, ROLES.ADMIN],

  // Tutor
  '/app/tutor': [ROLES.TUTOR, ROLES.ADMIN],

  // Padrinho
  '/app/padrinho': [ROLES.PADRINHO, ROLES.ADMIN],

  // Admin
  '/app/admin': [ROLES.ADMIN],
  '/app/admin/comunidades': [ROLES.ADMIN],

  // Dashboard geral - todos autenticados
  '/app': [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN],
  '/app/definicoes': [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN],
  '/app/info': [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN]
}

// Menu items por role
export const MENU_BY_ROLE = {
  [ROLES.PF_COMUNITARIO]: {
    main: [
      { name: 'dashboard', label: 'Dashboard', path: '/app/ponto-focal/dashboard', icon: 'LayoutDashboard' },
      { name: 'comunicacao', label: 'Comunicacao', path: '/app/ponto-focal/comunicacao', icon: 'MessageSquarePlus' },
      { name: 'cadastro', label: 'Cadastro', path: '/app/ponto-focal/cadastro', icon: 'ClipboardList' },
      { name: 'revisao', label: 'Revisao Nivel 1', path: '/app/ponto-focal/revisao', icon: 'FileCheck' },
      { name: 'agenda', label: 'Agenda de Visitas', path: '/app/ponto-focal/agenda', icon: 'Calendar' },
      { name: 'relatorios', label: 'Relatorios', path: '/app/ponto-focal/relatorios', icon: 'BarChart3' },
      { name: 'comunidade', label: 'Perfil da Comunidade', path: '/app/ponto-focal/comunidade', icon: 'MapPin' },
      { name: 'notificacoes', label: 'Notificacoes', path: '/app/ponto-focal/notificacoes', icon: 'Bell' }
    ],
    sections: [
      { title: 'Operacional', items: ['dashboard', 'comunicacao', 'cadastro', 'revisao'] },
      { title: 'Gestao', items: ['agenda', 'relatorios', 'comunidade', 'notificacoes'] }
    ]
  },

  [ROLES.PF_TEMATICO]: {
    main: [
      { name: 'pf-tematico', label: 'Minhas Fichas', path: '/app/ponto-focal-tematico', icon: 'FileText' },
      { name: 'cadastro-ficha', label: 'Cadastro Ficha', path: '/app/ponto-focal-tematico/cadastro', icon: 'PlusSquare' },
      { name: 'visitas', label: 'Agenda de Visitas', path: '/app/ponto-focal-tematico/visitas', icon: 'Calendar' },
      { name: 'biblioteca', label: 'Biblioteca Técnica', path: '/app/ponto-focal-tematico/biblioteca', icon: 'BookOpen' },
      { name: 'impacto', label: 'Resumo de Impacto', path: '/app/ponto-focal-tematico/impacto', icon: 'BarChart' }
    ],
    sections: [
      { title: 'PF Tematico', items: ['pf-tematico', 'cadastro-ficha', 'visitas', 'biblioteca', 'impacto'] }
    ]
  },

  [ROLES.GESTOR]: {
    main: [
      { name: 'gestor-dashboard', label: 'Dashboard', path: '/app/gestor', icon: 'LayoutDashboard' },
      { name: 'revisao-l2', label: 'Revisao Nivel 2', path: '/app/gestor/revisao', icon: 'FileCheck' },
      { name: 'apadinhamentos', label: 'Apadinhamentos', path: '/app/gestor/apadinhamentos', icon: 'Heart' },
      { name: 'padrinhos', label: 'Padrinhos', path: '/app/gestor/padrinhos', icon: 'Users' },
      { name: 'relatorios', label: 'Relatorios', path: '/app/gestor/relatorios', icon: 'BarChart3' },
      { name: 'utilizadores', label: 'Utilizadores', path: '/app/gestor/utilizadores', icon: 'UserCog' },
      { name: 'notificacoes', label: 'Notificacoes', path: '/app/gestor/notificacoes', icon: 'Bell' },
      { name: 'mensagens', label: 'Mensagens', path: '/app/gestor/mensagens', icon: 'MessageSquare' },
      { name: 'logs', label: 'Logs Auditoria', path: '/app/gestor/logs', icon: 'FileText' },
      { name: 'configuracoes', label: 'Configuracoes', path: '/app/gestor/configuracoes', icon: 'Settings' }
    ],
    sections: [
      { title: 'Operacional', items: ['gestor-dashboard', 'revisao-l2', 'apadinhamentos', 'padrinhos'] },
      { title: 'Administracao', items: ['relatorios', 'utilizadores', 'notificacoes', 'mensagens', 'logs', 'configuracoes'] }
    ]
  },

  [ROLES.TUTOR]: {
    main: [
      { name: 'tutor-dashboard', label: 'Dashboard', path: '/app/tutor', icon: 'LayoutDashboard' },
      { name: 'interessados', label: 'Padrinhos Interessados', path: '/app/tutor/interessados', icon: 'UserPlus' },
      { name: 'meus-padrinhos', label: 'Meus Padrinhos', path: '/app/tutor/padrinhos', icon: 'Users' },
      { name: 'progresso', label: 'Progresso', path: '/app/tutor/progresso', icon: 'TrendingUp' },
      { name: 'mensagens', label: 'Mensagens', path: '/app/tutor/mensagens', icon: 'MessageCircle' }
    ],
    sections: [
      { title: 'Tutor', items: ['tutor-dashboard', 'interessados', 'meus-padrinhos', 'progresso', 'mensagens'] }
    ]
  },

  [ROLES.PADRINHO]: {
    main: [
      { name: 'catalogo', label: 'Catalogo', path: '/', icon: 'BookOpen' },
      { name: 'meu-padrinhado', label: 'Meu Padrinhado', path: '/app/padrinho', icon: 'Heart' },
      { name: 'mensagens', label: 'Mensagens', path: '/app/padrinho/mensagens', icon: 'MessageCircle' },
      { name: 'definicoes', label: 'Definicoes', path: '/app/definicoes', icon: 'Settings' }
    ],
    sections: [
      { title: 'Padrinho', items: ['catalogo', 'meu-padrinhado', 'mensagens', 'definicoes'] }
    ]
  },

  [ROLES.ADMIN]: {
    main: [
      { name: 'admin-dashboard', label: 'Dashboard', path: '/app/admin', icon: 'LayoutDashboard' },
      { name: 'utilizadores', label: 'Utilizadores', path: '/app/admin/utilizadores', icon: 'UserCog' },
      { name: 'comunidades', label: 'Comunidades', path: '/app/admin/comunidades', icon: 'MapPin' },
      { name: 'configuracoes', label: 'Configuracoes', path: '/app/admin/configuracoes', icon: 'Settings' },
      { name: 'logs', label: 'Logs de Auditoria', path: '/app/admin/logs', icon: 'FileText' }
    ],
    sections: [
      { title: 'Administracao', items: ['admin-dashboard', 'utilizadores', 'comunidades', 'configuracoes', 'logs'] }
    ]
  }
}

// Helper: Verificar se role tem acesso a rota
export function hasRouteAccess(role, path) {
  // Admin tem acesso a tudo
  if (role === ROLES.ADMIN) return true

  // Verificar permissao especifica
  for (const [routePattern, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (path === routePattern || path.startsWith(routePattern + '/')) {
      return allowedRoles.includes(role)
    }
  }

  // Rotas publicas ou sem restricao
  return true
}

// Helper: Obter role label
export function getRoleLabel(role) {
  return ROLE_LABELS[role] || role
}

// Helper: Obter rota home do role
export function getRoleHome(role) {
  return ROLE_HOME_ROUTES[role] || '/app'
}

// Helper: Obter menu do role
export function getMenuByRole(role) {
  return MENU_BY_ROLE[role] || MENU_BY_ROLE[ROLES.PADRINHO]
}
