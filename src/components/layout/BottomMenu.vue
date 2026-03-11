<template>
  <nav class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[min(90vw,800px)] bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl transition-all duration-300 ease-in-out">
    <div class="flex flex-col">
      <div class="p-4 border-b border-gray-100/50">
        <ul class="flex justify-center flex-wrap gap-2">
          <li v-for="item in menuItems" :key="item.name" class="flex-1 min-w-[120px]">
            <router-link
              :to="item.path"
              class="flex flex-col items-center gap-2 p-3 rounded-lg text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
              :class="{ 'bg-blue-50 text-blue-700 font-medium': isActive(item.path) }"
              @click="handleItemClick(item)"
            >
              <component :is="item.icon" class="w-6 h-6" />
              <span class="text-sm font-medium text-center">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- User Section -->
      <div class="p-4 bg-gray-50/50">
        <div class="flex items-center gap-3 bg-white/60 rounded-lg border border-gray-100/50 p-3 transition-all duration-200 hover:scale-105">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User class="w-5 h-5 text-gray-600" />
          </div>
          <div class="flex-1 overflow-hidden">
            <p class="text-sm font-medium text-gray-900 truncate">{{ user?.name || 'Usuário' }}</p>
            <p class="text-xs text-gray-500 truncate">{{ user?.email || 'email@exemplo.com' }}</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

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
  User
} from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle'])

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
    name: 'utilizadores',
    label: 'Utilizadores',
    path: '/utilizadores',
    icon: UserCog
  },
  {
    name: 'definicoes',
    label: 'Definições',
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

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const handleItemClick = (item) => {
  // Close menu on mobile when clicking an item
  if (window.innerWidth < 768) {
    emit('toggle')
  }
}
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .w-\[min\(90vw\2c 800px\)\] {
    width: 95vw;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .min-w-\[120px\] {
    min-width: 100px;
  }

  .text-sm {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .w-\[min\(90vw\2c 800px\)\] {
    width: 98vw;
  }

  .min-w-\[120px\] {
    min-width: 80px;
  }

  .text-center {
    text-align: left;
  }

  .p-3 {
    padding: 0.5rem;
  }

  .w-6 {
    width: 20px;
    height: 20px;
  }
}
</style>
