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
  
  // Tutor
  '/app/tutor': [ROLES.TUTOR, ROLES.ADMIN],
  
  // Padrinho
  '/app/padrinho': [ROLES.PADRINHO, ROLES.ADMIN],
  
  // Admin
  '/app/admin': [ROLES.ADMIN],
  
  // Dashboard geral - todos autenticados
  '/app': [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN],
  '/app/definicoes': [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN],
  '/app/info': [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN]
}

// Menu items por role
export const MENU_BY_ROLE = {
  [ROLES.PF_COMUNITARIO]: {
    main: [
      { name: 'comunicacao', label: 'Comunicacao', path: '/app/ponto-focal/comunicacao', icon: 'MessageSquarePlus' },
      { name: 'cadastro', label: 'Cadastro', path: '/app/ponto-focal/cadastro', icon: 'ClipboardList' },
      { name: 'revisao', label: 'Revisao Nivel 1', path: '/app/ponto-focal/revisao', icon: 'FileCheck' }
    ],
    sections: [
      { title: 'Ponto Focal', items: ['comunicacao', 'cadastro', 'revisao'] }
    ]
  },
  
  [ROLES.PF_TEMATICO]: {
    main: [
      { name: 'pf-tematico', label: 'Minhas Fichas', path: '/app/ponto-focal-tematico', icon: 'FileText' }
    ],
    sections: [
      { title: 'PF Tematico', items: ['pf-tematico'] }
    ]
  },
  
  [ROLES.GESTOR]: {
    main: [
      { name: 'gestor-dashboard', label: 'Dashboard', path: '/app/gestor', icon: 'LayoutDashboard' },
      { name: 'revisao-l2', label: 'Revisao Nivel 2', path: '/app/gestor/revisao', icon: 'FileCheck' },
      { name: 'apadinhamentos', label: 'Apadinhamentos', path: '/app/gestor/apadinhamentos', icon: 'Heart' },
      { name: 'padrinhos', label: 'Padrinhos', path: '/app/gestor/padrinhos', icon: 'Users' },
      { name: 'relatorios', label: 'Relatorios', path: '/app/gestor/relatorios', icon: 'BarChart3' }
    ],
    sections: [
      { title: 'Gestao', items: ['gestor-dashboard', 'revisao-l2', 'apadinhamentos', 'padrinhos', 'relatorios'] }
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
      { name: 'mensagens', label: 'Mensagens', path: '/app/padrinho/mensagens', icon: 'MessageCircle' }
    ],
    sections: [
      { title: 'Padrinho', items: ['catalogo', 'meu-padrinhado', 'mensagens'] }
    ]
  },
  
  [ROLES.ADMIN]: {
    main: [
      { name: 'admin-dashboard', label: 'Dashboard', path: '/app/admin', icon: 'LayoutDashboard' },
      { name: 'utilizadores', label: 'Utilizadores', path: '/app/admin/utilizadores', icon: 'UserCog' },
      { name: 'configuracoes', label: 'Configuracoes', path: '/app/admin/configuracoes', icon: 'Settings' },
      { name: 'logs', label: 'Logs de Auditoria', path: '/app/admin/logs', icon: 'FileText' }
    ],
    sections: [
      { title: 'Administracao', items: ['admin-dashboard', 'utilizadores', 'configuracoes', 'logs'] }
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
