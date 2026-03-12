<template>
  <aside
    :class="[
      'bg-white text-gray-800 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col',
      isOpen ? 'w-64' : 'w-20'
    ]"
  >
    <!-- Logo/Brand -->
    <div class="border-b border-gray-200 px-3 py-4">
      <div class="flex items-center gap-3">
        <img
          :src="logo"
          alt="SACCO"
          class="w-10 h-10 rounded-xl object-cover flex-shrink-0"
        />
        <transition name="fade">
          <div v-if="isOpen">
            <p class="text-sm font-bold text-gray-900 leading-tight">SACCO</p>
            <p class="text-[10px] text-gray-500 leading-tight">Poupe uma Crianca</p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <!-- Menu Dinamico por Role -->
      <template v-for="(section, sIndex) in menuSections" :key="sIndex">
        <!-- Separador com Titulo -->
        <div v-if="sIndex > 0 || section.title" class="my-4">
          <div v-if="sIndex > 0" class="border-t border-gray-200 mx-2"></div>
          <p 
            v-if="isOpen && section.title" 
            class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2 px-2"
          >
            {{ section.title }}
          </p>
        </div>

        <!-- Items do Menu -->
        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.name">
            <router-link
              :to="item.path"
              class="sidebar-item"
              :class="{ 'active': isActive(item.path) }"
            >
              <component :is="getIcon(item.icon)" class="w-5 h-5 flex-shrink-0" />
              <transition name="fade">
                <span v-if="isOpen" class="whitespace-nowrap">{{ item.label }}</span>
              </transition>
            </router-link>
          </li>
        </ul>
      </template>

      <!-- Menu Admin - Acesso Rapido a Outros Paineis -->
      <template v-if="isAdmin">
        <div class="my-4">
          <div class="border-t border-gray-200 mx-2"></div>
          <p 
            v-if="isOpen" 
            class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2 px-2"
          >
            Explorar Paineis
          </p>
        </div>

        <ul class="space-y-1">
          <li v-for="panel in adminPanels" :key="panel.name">
            <router-link
              :to="panel.path"
              class="sidebar-item"
              :class="{ 'active': isActive(panel.path) }"
            >
              <component :is="getIcon(panel.icon)" class="w-5 h-5 flex-shrink-0" />
              <transition name="fade">
                <span v-if="isOpen" class="whitespace-nowrap">{{ panel.label }}</span>
              </transition>
            </router-link>
          </li>
        </ul>
      </template>
    </nav>

    <!-- User Section -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-3">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          :class="roleBadgeClass"
        >
          <component :is="getRoleIcon(userRole)" class="w-5 h-5" />
        </div>
        <transition name="fade">
          <div v-if="isOpen" class="flex-1 overflow-hidden">
            <p class="text-sm font-medium truncate">{{ user?.name || 'Utilizador' }}</p>
            <p class="text-xs text-gray-500 truncate">{{ userRoleLabel }}</p>
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
import { ROLES, MENU_BY_ROLE, getRoleLabel } from '@/config/roles'
import logo from '@/assets/sacco_logo.png'

import {
  LayoutDashboard,
  UserCog,
  Settings,
  Info,
  User,
  MessageSquarePlus,
  ClipboardList,
  FileCheck,
  BookOpen,
  FileText,
  Heart,
  Users,
  BarChart3,
  UserPlus,
  TrendingUp,
  MessageCircle,
  Baby,
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
const userRole = computed(() => authStore.userRole)
const userRoleLabel = computed(() => authStore.userRoleLabel)
const isAdmin = computed(() => authStore.isAdmin)

// Icones disponiveis
const icons = {
  LayoutDashboard,
  UserCog,
  Settings,
  Info,
  User,
  MessageSquarePlus,
  ClipboardList,
  FileCheck,
  BookOpen,
  FileText,
  Heart,
  Users,
  BarChart3,
  UserPlus,
  TrendingUp,
  MessageCircle,
  Baby,
  Shield
}

const getIcon = (iconName) => {
  return icons[iconName] || LayoutDashboard
}

// Menu dinamico baseado no role
const menuSections = computed(() => {
  const roleMenu = MENU_BY_ROLE[userRole.value]
  if (!roleMenu) return []

  // Agrupar items por section
  return roleMenu.sections.map(section => ({
    title: section.title,
    items: section.items.map(itemName => 
      roleMenu.main.find(item => item.name === itemName)
    ).filter(Boolean)
  }))
})

// Paineis extras para Admin explorar
const adminPanels = [
  { name: 'pf-com', label: 'PF Comunitario', path: '/app/ponto-focal/comunicacao', icon: 'ClipboardList' },
  { name: 'pf-tem', label: 'PF Tematico', path: '/app/ponto-focal-tematico', icon: 'FileText' },
  { name: 'gestor', label: 'Gestor', path: '/app/gestor', icon: 'UserCog' },
  { name: 'tutor', label: 'Tutor', path: '/app/tutor', icon: 'Baby' },
  { name: 'padrinho', label: 'Padrinho', path: '/app/padrinho', icon: 'Heart' }
]

// Role icon
const getRoleIcon = (role) => {
  const roleIcons = {
    [ROLES.PF_COMUNITARIO]: ClipboardList,
    [ROLES.PF_TEMATICO]: FileText,
    [ROLES.GESTOR]: UserCog,
    [ROLES.TUTOR]: Baby,
    [ROLES.PADRINHO]: Heart,
    [ROLES.ADMIN]: Shield
  }
  return roleIcons[role] || User
}

// Role badge class
const roleBadgeClass = computed(() => {
  const classes = {
    [ROLES.PF_COMUNITARIO]: 'bg-green-100 text-green-700',
    [ROLES.PF_TEMATICO]: 'bg-purple-100 text-purple-700',
    [ROLES.GESTOR]: 'bg-blue-100 text-blue-700',
    [ROLES.TUTOR]: 'bg-orange-100 text-orange-700',
    [ROLES.PADRINHO]: 'bg-pink-100 text-pink-700',
    [ROLES.ADMIN]: 'bg-gray-900 text-white'
  }
  return classes[userRole.value] || 'bg-gray-300 text-gray-700'
})

const isActive = (path) => {
  // Exact match for root-level public pages
  if (path === '/') return route.path === '/'
  // Exact match for /app (dashboard root)
  if (path === '/app') return route.path === '/app'
  // Prefix match for all sub-routes
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
