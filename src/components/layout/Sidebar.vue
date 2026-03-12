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
            <p class="text-[10px] text-gray-500 leading-tight">Poupe uma Criança</p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <!-- Menu Principal -->
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.name">
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

      <!-- Separador -->
      <div v-if="isOpen" class="my-4 px-4">
        <div class="border-t border-gray-200"></div>
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Ponto Focal</p>
      </div>
      <div v-else class="my-4 border-t border-gray-200 mx-2"></div>

      <!-- Menu Ponto Focal -->
      <ul class="space-y-1">
        <li v-for="item in pontoFocalItems" :key="item.name">
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

      <!-- Separador PF Tematico -->
      <div v-if="isOpen" class="my-4 px-4">
        <div class="border-t border-gray-200"></div>
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">PF Tematico</p>
      </div>
      <div v-else class="my-4 border-t border-gray-200 mx-2"></div>

      <!-- Menu PF Tematico -->
      <ul class="space-y-1">
        <li v-for="item in pontoFocalTematicoItems" :key="item.name">
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
            <p class="text-sm font-medium truncate">{{ user?.name || 'Ponto Focal' }}</p>
            <p class="text-xs text-gray-500 truncate">{{ user?.email || 'pf@sacco.org' }}</p>
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
  BookOpen
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
    name: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard
  },
  {
    name: 'catalogo',
    label: 'Catalogo',
    path: '/catalogo',
    icon: BookOpen
  },
  {
    name: 'utilizadores',
    label: 'Utilizadores',
    path: '/utilizadores',
    icon: UserCog
  },
  {
    name: 'definicoes',
    label: 'Definicoes',
    path: '/definicoes',
    icon: Settings
  },
  {
    name: 'info',
    label: 'Info',
    path: '/info',
    icon: Info
  }
]

const pontoFocalItems = [
  {
    name: 'comunicacao',
    label: 'Comunicacao',
    path: '/ponto-focal/comunicacao',
    icon: MessageSquarePlus
  },
  {
    name: 'cadastro',
    label: 'Cadastro',
    path: '/ponto-focal/cadastro',
    icon: ClipboardList
  },
  {
    name: 'revisao',
    label: 'Revisao',
    path: '/ponto-focal/revisao',
    icon: FileCheck
  }
]

const pontoFocalTematicoItems = [
  {
    name: 'pf-tematico-dashboard',
    label: 'Painel PF Tematico',
    path: '/ponto-focal-tematico',
    icon: FileCheck
  }
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
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
