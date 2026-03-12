import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Landing Page Publica - Catalogo de Criancas (para Padrinhos)
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('@/views/Catalogo/Index.vue'),
      meta: { title: 'Catalogo de Criancas' }
    },

    // Perfil da Crianca - Pagina Publica
    {
      path: '/crianca/:id',
      name: 'crianca-perfil',
      component: () => import('@/views/Crianca/Perfil.vue'),
      meta: { title: 'Perfil da Crianca' }
    },

    // Dashboard Principal (Autenticado)
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { title: 'Dashboard' }
        },
        {
          path: 'utilizadores',
          name: 'utilizadores',
          component: () => import('@/views/Utilizadores/Index.vue'),
          meta: { title: 'Utilizadores' }
        },
        {
          path: 'definicoes',
          name: 'definicoes',
          component: () => import('@/views/Definicoes/Index.vue'),
          meta: { title: 'Definicoes' }
        },
        {
          path: 'info',
          name: 'info',
          component: () => import('@/views/Info/Index.vue'),
          meta: { title: 'Info' }
        },
        // Meu Dashboard do Padrinho (Seu Canto)
        {
          path: 'meu-padrinhado',
          name: 'meu-padrinhado',
          component: () => import('@/views/MeuPadrinhado/Index.vue'),
          meta: { title: 'Meu Padrinhado' }
        },

        // =============================================
        // PONTO FOCAL COMUNITARIO - MODULOS 1, 2, 4
        // =============================================

        // MODULO 1: Comunicacao
        {
          path: 'ponto-focal/comunicacao',
          name: 'comunicacao',
          component: () => import('@/views/PontoFocal/Comunicacao/Index.vue'),
          meta: { title: 'Comunicacao - Ponto Focal' }
        },

        // MODULO 2: Cadastro
        {
          path: 'ponto-focal/cadastro',
          name: 'cadastro',
          component: () => import('@/views/PontoFocal/Cadastro/Index.vue'),
          meta: { title: 'Cadastro - Ponto Focal' }
        },
        {
          path: 'ponto-focal/cadastro/novo',
          name: 'cadastro-novo',
          component: () => import('@/views/PontoFocal/Cadastro/Novo.vue'),
          meta: { title: 'Novo Cadastro - Ponto Focal' }
        },
        {
          path: 'ponto-focal/cadastro/:id',
          name: 'cadastro-detalhes',
          component: () => import('@/views/PontoFocal/Cadastro/Detalhes.vue'),
          meta: { title: 'Detalhes do Cadastro - Ponto Focal' }
        },

        // MODULO 4: Revisao
        {
          path: 'ponto-focal/revisao',
          name: 'revisao',
          component: () => import('@/views/PontoFocal/Revisao/Index.vue'),
          meta: { title: 'Revisao - Ponto Focal' }
        }
      ]
    },

    // Autenticacao
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

    // 404
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
  const isAuthenticated = localStorage.getItem('token')

  // Atualizar titulo da pagina
  document.title = to.meta.title
    ? `${to.meta.title} - SACCO`
    : 'SACCO - Sistema de Gestao'

  // Verificar autenticacao
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.guest && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
