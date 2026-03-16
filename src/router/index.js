import { createRouter, createWebHistory } from 'vue-router'
import { ROLES, hasRouteAccess, getRoleHome } from '@/config/roles'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // =============================================
    // ROTAS PUBLICAS
    // =============================================

    // Landing Page Publica - Catalogo (rota raiz)
    {
      path: '/',
      name: 'catalogo',
      component: () => import('@/views/Catalogo/Index.vue'),
      meta: { title: 'Catalogo de Criancas', public: true }
    },

    // Redirecionar /catalogo -> / para compatibilidade
    {
      path: '/catalogo',
      redirect: { name: 'catalogo' }
    },

    // Perfil da Crianca - Pagina Publica
    {
      path: '/crianca/:id',
      name: 'crianca-perfil',
      component: () => import('@/views/Crianca/Perfil.vue'),
      meta: { title: 'Perfil da Crianca', public: true }
    },

    // =============================================
    // AUTENTICACAO
    // =============================================

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/Login.vue'),
      meta: { title: 'Login', guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/Register.vue'),
      meta: { title: 'Registar', guest: true }
    },

    // =============================================
    // AREA AUTENTICADA - /app
    // =============================================

    {
      path: '/app',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        // Dashboard Geral (redireciona para home do role)
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: {
            title: 'Dashboard',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN]
          }
        },

        // Definicoes (todos)
        {
          path: 'definicoes',
          name: 'definicoes',
          component: () => import('@/views/Definicoes/Index.vue'),
          meta: {
            title: 'Definicoes',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN]
          }
        },

        // Info (todos)
        {
          path: 'info',
          name: 'info',
          component: () => import('@/views/Info/Index.vue'),
          meta: {
            title: 'Info',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.PF_TEMATICO, ROLES.GESTOR, ROLES.TUTOR, ROLES.PADRINHO, ROLES.ADMIN]
          }
        },

        // =============================================
        // PONTO FOCAL COMUNITARIO
        // =============================================

        {
          path: 'ponto-focal/comunicacao',
          name: 'comunicacao',
          component: () => import('@/views/PontoFocal/Comunicacao/Index.vue'),
          meta: {
            title: 'Comunicacao - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/cadastro',
          name: 'cadastro',
          component: () => import('@/views/PontoFocal/Cadastro/Index.vue'),
          meta: {
            title: 'Cadastro - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/cadastro/novo',
          name: 'cadastro-novo',
          component: () => import('@/views/PontoFocal/Cadastro/Novo.vue'),
          meta: {
            title: 'Novo Cadastro - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/cadastro/:id',
          name: 'cadastro-detalhes',
          component: () => import('@/views/PontoFocal/Cadastro/Detalhes.vue'),
          meta: {
            title: 'Detalhes do Cadastro - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/revisao',
          name: 'revisao',
          component: () => import('@/views/PontoFocal/Revisao/Index.vue'),
          meta: {
            title: 'Revisao - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },

        // Novas rotas para Ponto Focal Comunitário
        {
          path: 'ponto-focal/dashboard',
          name: 'pf-comunitario-dashboard',
          component: () => import('@/views/PontoFocal/Dashboard.vue'),
          meta: {
            title: 'Dashboard - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/agenda',
          name: 'pf-comunitario-agenda',
          component: () => import('@/views/PontoFocal/Agenda/Index.vue'),
          meta: {
            title: 'Agenda - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/relatorios',
          name: 'pf-comunitario-relatorios',
          component: () => import('@/views/PontoFocal/Relatorios/Index.vue'),
          meta: {
            title: 'Relatorios - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/comunidade',
          name: 'pf-comunitario-comunidade',
          component: () => import('@/views/PontoFocal/Comunidade/Index.vue'),
          meta: {
            title: 'Comunidade - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal/notificacoes',
          name: 'pf-comunitario-notificacoes',
          component: () => import('@/views/PontoFocal/Notificacoes/Index.vue'),
          meta: {
            title: 'Notificacoes - Ponto Focal',
            allowedRoles: [ROLES.PF_COMUNITARIO, ROLES.ADMIN]
          }
        },

        // =============================================
        // PONTO FOCAL TEMATICO
        // =============================================

        {
          path: 'ponto-focal-tematico',
          name: 'pf-tematico-dashboard',
          component: () => import('@/views/PontoFocalTematico/Dashboard.vue'),
          meta: {
            title: 'Dashboard - PF Tematico',
            allowedRoles: [ROLES.PF_TEMATICO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal-tematico/ficha/:id',
          name: 'pf-tematico-ficha',
          component: () => import('@/views/PontoFocalTematico/Ficha.vue'),
          meta: {
            title: 'Ficha Tecnica - PF Tematico',
            allowedRoles: [ROLES.PF_TEMATICO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal-tematico/cadastro',
          name: 'pf-tematico-cadastro',
          component: () => import('@/views/PontoFocalTematico/CadastroFicha.vue'),
          meta: {
            title: 'Novo Cadastro - PF Tematico',
            allowedRoles: [ROLES.PF_TEMATICO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal-tematico/visitas',
          name: 'visitas',
          component: () => import('@/views/PontoFocalTematico/Visitas.vue'),
          meta: {
            title: 'Agenda de Visitas - PF Tematico',
            allowedRoles: [ROLES.PF_TEMATICO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal-tematico/biblioteca',
          name: 'biblioteca',
          component: () => import('@/views/PontoFocalTematico/Biblioteca.vue'),
          meta: {
            title: 'Biblioteca Técnica - PF Tematico',
            allowedRoles: [ROLES.PF_TEMATICO, ROLES.ADMIN]
          }
        },
        {
          path: 'ponto-focal-tematico/impacto',
          name: 'impacto',
          component: () => import('@/views/PontoFocalTematico/Impacto.vue'),
          meta: {
            title: 'Resumo de Impacto - PF Tematico',
            allowedRoles: [ROLES.PF_TEMATICO, ROLES.ADMIN]
          }
        },

        // =============================================
        // GESTOR DA ASSOCIACAO
        // =============================================

        {
          path: 'gestor',
          name: 'gestor-dashboard',
          component: () => import('@/views/Gestor/Dashboard.vue'),
          meta: {
            title: 'Dashboard - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/revisao',
          name: 'gestor-revisao',
          component: () => import('@/views/Gestor/Revisao.vue'),
          meta: {
            title: 'Revisao Nivel 2 - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/apadinhamentos',
          name: 'gestor-apadinhamentos',
          component: () => import('@/views/Gestor/Apadinhamentos.vue'),
          meta: {
            title: 'Apadinhamentos - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/padrinhos',
          name: 'gestor-padrinhos',
          component: () => import('@/views/Gestor/Padrinhos.vue'),
          meta: {
            title: 'Padrinhos - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/relatorios',
          name: 'gestor-relatorios',
          component: () => import('@/views/Gestor/Relatorios.vue'),
          meta: {
            title: 'Relatorios - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/utilizadores',
          name: 'gestor-utilizadores',
          component: () => import('@/views/Gestor/Utilizadores.vue'),
          meta: {
            title: 'Utilizadores - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/notificacoes',
          name: 'gestor-notificacoes',
          component: () => import('@/views/Gestor/Notificacoes.vue'),
          meta: {
            title: 'Notificacoes - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/mensagens',
          name: 'gestor-mensagens',
          component: () => import('@/views/Gestor/Mensagens.vue'),
          meta: {
            title: 'Mensagens - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/logs',
          name: 'gestor-logs',
          component: () => import('@/views/Gestor/Logs.vue'),
          meta: {
            title: 'Logs Auditoria - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'gestor/configuracoes',
          name: 'gestor-configuracoes',
          component: () => import('@/views/Gestor/Configuracoes.vue'),
          meta: {
            title: 'Configuracoes - Gestor',
            allowedRoles: [ROLES.GESTOR, ROLES.ADMIN]
          }
        },

        // =============================================
        // TUTOR
        // =============================================

        {
          path: 'tutor',
          name: 'tutor-dashboard',
          component: () => import('@/views/Tutor/Dashboard.vue'),
          meta: {
            title: 'Dashboard - Tutor',
            allowedRoles: [ROLES.TUTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'tutor/interessados',
          name: 'tutor-interessados',
          component: () => import('@/views/Tutor/Interessados.vue'),
          meta: {
            title: 'Padrinhos Interessados - Tutor',
            allowedRoles: [ROLES.TUTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'tutor/padrinhos',
          name: 'tutor-padrinhos',
          component: () => import('@/views/Tutor/Padrinhos.vue'),
          meta: {
            title: 'Meus Padrinhos - Tutor',
            allowedRoles: [ROLES.TUTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'tutor/progresso',
          name: 'tutor-progresso',
          component: () => import('@/views/Tutor/Progresso.vue'),
          meta: {
            title: 'Progresso - Tutor',
            allowedRoles: [ROLES.TUTOR, ROLES.ADMIN]
          }
        },
        {
          path: 'tutor/mensagens',
          name: 'tutor-mensagens',
          component: () => import('@/views/Tutor/Mensagens.vue'),
          meta: {
            title: 'Mensagens - Tutor',
            allowedRoles: [ROLES.TUTOR, ROLES.ADMIN]
          }
        },

        // =============================================
        // PADRINHO
        // =============================================

        {
          path: 'padrinho',
          name: 'padrinho-dashboard',
          component: () => import('@/views/Padrinho/Dashboard.vue'),
          meta: {
            title: 'Meu Padrinhado',
            allowedRoles: [ROLES.PADRINHO, ROLES.ADMIN]
          }
        },
        {
          path: 'padrinho/mensagens',
          name: 'padrinho-mensagens',
          component: () => import('@/views/Padrinho/Mensagens.vue'),
          meta: {
            title: 'Mensagens - Padrinho',
            allowedRoles: [ROLES.PADRINHO, ROLES.ADMIN]
          }
        },

        // =============================================
        // ADMIN
        // =============================================

        {
          path: 'admin',
          name: 'admin-dashboard',
          component: () => import('@/views/Admin/Dashboard.vue'),
          meta: {
            title: 'Dashboard - Admin',
            allowedRoles: [ROLES.ADMIN]
          }
        },
        {
          path: 'admin/utilizadores',
          name: 'admin-utilizadores',
          component: () => import('@/views/Admin/Utilizadores.vue'),
          meta: {
            title: 'Utilizadores - Admin',
            allowedRoles: [ROLES.ADMIN]
          }
        },
        {
          path: 'admin/configuracoes',
          name: 'admin-configuracoes',
          component: () => import('@/views/Admin/Configuracoes.vue'),
          meta: {
            title: 'Configuracoes - Admin',
            allowedRoles: [ROLES.ADMIN]
          }
        },
        {
          path: 'admin/logs',
          name: 'admin-logs',
          component: () => import('@/views/Admin/Logs.vue'),
          meta: {
            title: 'Logs de Auditoria - Admin',
            allowedRoles: [ROLES.ADMIN]
          }
        },
        {
          path: 'admin/comunidades',
          name: 'admin-comunidades',
          component: () => import('@/views/Admin/Comunidades.vue'),
          meta: {
            title: 'Gestão de Comunidades - Admin',
            allowedRoles: [ROLES.ADMIN]
          }
        },

        {
          path: 'meu-padrinhado',
          redirect: { name: 'padrinho-dashboard' }
        }
      ]
    },

    // =============================================
    // ACESSO NEGADO
    // =============================================

    {
      path: '/acesso-negado',
      name: 'acesso-negado',
      component: () => import('@/views/AcessoNegado.vue'),
      meta: { title: 'Acesso Negado' }
    },

    // =============================================
    // 404
    // =============================================

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: '404 - Pagina nao encontrada' }
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  // Obter dados de autenticacao
  let token = sessionStorage.getItem('token') || localStorage.getItem('token')
  let userStr = sessionStorage.getItem('user') || localStorage.getItem('user')
  let user = null

  try {
    user = userStr ? JSON.parse(userStr) : null
  } catch (e) {
    user = null
  }

  const isAuthenticated = !!token && !!user

  // Atualizar titulo da pagina
  document.title = to.meta.title
    ? `${to.meta.title} - SACCO`
    : 'SACCO - Sistema de Gestao'

  // Rotas publicas - permitir acesso
  if (to.meta.public) {
    return next()
  }

  // Rotas para visitantes (login, register) - redirecionar se ja autenticado
  if (to.meta.guest && isAuthenticated) {
    const homeRoute = user?.role ? getRoleHome(user.role) : '/app'
    return next(homeRoute)
  }

  // Rotas que requerem autenticacao
  if (to.meta.requiresAuth || to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ name: 'login' })
    }

    // Verificar permissao de role
    const allowedRoles = to.meta.allowedRoles
    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = user?.role

      if (!userRole || !allowedRoles.includes(userRole)) {
        // Acesso negado - redirecionar com info
        return next({
          name: 'acesso-negado',
          query: {
            from: to.fullPath,
            required: allowedRoles.join(','),
            current: userRole || 'none'
          }
        })
      }
    }
  }

  next()
})

export default router
