<template>
  <aside
    :class="[
      'bg-white text-gray-800 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col',
      isOpen ? 'w-64' : 'w-20'
    ]"
  >
    <!-- Logo/Brand -->
    <div class="border-b m-2 border-gray-200">
        <div class="h-20 flex items-center justify-center flex-shrink-0">
          <img
            :src="logo"
            alt="FixAuto"
            class="w-full h-full object-contain"
          />
        </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <ul class="space-y-1">
        <li v-for="item in filteredMenuItems" :key="item.name">
          <router-link
            :to="item.path"
            class="sidebar-item"
            :class="{ 'active': isActive(item.path) }"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <transition name="fade">
              <span v-if="isOpen" class="whitespace-nowrap">{{ item.label }}</span>
            </transition>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- User Section -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User class="w-5 h-5 text-gray-700" />
        </div>
        <transition name="fade">
          <div v-if="isOpen" class="flex-1 overflow-hidden">
            <p class="text-sm font-medium truncate">{{ user?.name || 'Usuário' }}</p>
            <p class="text-xs text-gray-500 truncate">{{ user?.email || 'email@exemplo.com' }}</p>
          </div>
        </transition>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import logo from '@/assets/logo.png'

import {
  LayoutDashboard,
  Users,
  Car,
  ClipboardList,
  FileText,
  Wrench,
  Package,
  UserCog,
  Settings,
  Info,
  User,
  Building2,
  Shield
} from 'lucide-vue-next'

defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const menuItems = [
  {
    name: 'admin-dashboard',
    label: 'Dashboard Admin',
    path: '/admin',
    icon: LayoutDashboard,
    roles: ['super_admin']
  },
  {
    name: 'admin-tenants',
    label: 'Oficinas',
    path: '/admin/tenants',
    icon: Building2,
    roles: ['super_admin']
  },
  {
    name: 'admin-audit',
    label: 'Auditoria',
    path: '/admin/audit',
    icon: Shield,
    roles: ['super_admin']
  },
  {
    name: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'atendente', 'mecanico']
  },
  {
    name: 'clientes',
    label: 'Clientes',
    path: '/clientes',
    icon: Users,
    roles: ['admin', 'atendente', 'mecanico']
  },
  {
    name: 'veiculos',
    label: 'Veículos',
    path: '/veiculos',
    icon: Car,
    roles: ['admin', 'atendente', 'mecanico']
  },
  {
    name: 'atendimento',
    label: 'Atendimento',
    path: '/atendimento',
    icon: ClipboardList,
    roles: ['admin', 'atendente']
  },
  {
    name: 'ordem-servico',
    label: 'Ordem de Serviço',
    path: '/ordem-servico',
    icon: FileText,
    roles: ['admin', 'atendente', 'mecanico']
  },
  {
    name: 'servicos',
    label: 'Serviços',
    path: '/servicos',
    icon: Wrench,
    roles: ['admin', 'atendente', 'mecanico']
  },
  {
    name: 'stock-pecas',
    label: 'Stock de Peças',
    path: '/stock-pecas',
    icon: Package,
    roles: ['admin', 'atendente', 'mecanico']
  },
  {
    name: 'utilizadores',
    label: 'Utilizadores',
    path: '/utilizadores',
    icon: UserCog,
    roles: ['admin']
  },
  {
    name: 'definicoes',
    label: 'Definições',
    path: '/definicoes',
    icon: Settings,
    roles: ['admin']
  },
  {
    name: 'info',
    label: 'Info',
    path: '/info',
    icon: Info,
    roles: ['admin', 'atendente', 'mecanico', 'super_admin']
  }
]

const filteredMenuItems = computed(() => {
  if (!user.value) return []
  return menuItems.filter(item => {
    // Se o item tem roles definidos, verifica se a role do usuario esta inclusa
    if (item.roles && !item.roles.includes(user.value.role)) return false
    return true
  })
})

const isActive = (path) => {
  if (path === '/' || path === '/admin') {
    return route.path === path
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>