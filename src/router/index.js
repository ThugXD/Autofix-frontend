import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Landing Page Pública - Catálogo de Crianças (para Padrinhos)
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('@/views/Catalogo/Index.vue'),
      meta: { title: 'Catálogo de Crianças' }
    },

    // Perfil da Criança - Página Pública
    {
      path: '/crianca/:id',
      name: 'crianca-perfil',
      component: () => import('@/views/Crianca/Perfil.vue'),
      meta: { title: 'Perfil da Criança' }
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
          meta: { title: 'Definições' }
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
        }
      ]
    },

    // Autenticação
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
      meta: { title: '404 - Página não encontrada' }
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  // Atualizar título da página
  document.title = to.meta.title
    ? `${to.meta.title} - SACCO`
    : 'SACCO - Sistema de Gestão'

  // Verificar autenticação
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.guest && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
