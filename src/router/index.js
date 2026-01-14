import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
          path: 'clientes',
          name: 'clientes',
          component: () => import('@/views/Clientes/Index.vue'),
          meta: { title: 'Gerir Clientes' }
        },
        {
          path: 'veiculos',
          name: 'veiculos',
          component: () => import('@/views/Veiculos/Index.vue'),
          meta: { title: 'Gerir Veículos' }
        },
        {
          path: 'atendimento',
          name: 'atendimento',
          component: () => import('@/views/Atendimento/Index.vue'),
          meta: { title: 'Atendimento' }
        },
        {
          path: 'ordem-servico',
          name: 'ordem-servico',
          component: () => import('@/views/OrdemServico/Index.vue'),
          meta: { title: 'Ordem de Serviço' }
        },
        {
          path: 'ordem-servico/:id',
          name: 'ordem-servico-detalhes',
          component: () => import('@/views/OrdemServico/Detalhes.vue'),
          meta: { title: 'Detalhes da Ordem' }
        },
        {
          path: 'servicos',
          name: 'servicos',
          component: () => import('@/views/Servicos/Index.vue'),
          meta: { title: 'Serviços' }
        },
        {
          path: 'stock-pecas',
          name: 'stock-pecas',
          component: () => import('@/views/StockPecas/Index.vue'),
          meta: { title: 'Stock de Peças' }
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
        }
      ]
    },
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
  const auth = useAuthStore()

  // Título
  document.title = to.meta.title
    ? `${to.meta.title} - Sistema de Gestão para Oficinas`
    : 'Sistema de Gestão para Oficinas'

  // Não autenticado
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'login' })
  }

  // Guest não entra se já estiver logado
  if (to.meta.guest && auth.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  // Setup obrigatório
  if (
    auth.isAuthenticated &&
    auth.needsSetup &&
    to.name !== 'definicoes'
  ) {
    return next({ name: 'definicoes' })
  }

  next()
})




export default router