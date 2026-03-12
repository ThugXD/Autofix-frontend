<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <!-- Menu Toggle Button -->
        <button
          @click="$emit('toggleSidebar')"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu class="w-5 h-5 text-gray-600" />
        </button>

        <!-- Page Title -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ pageTitle }}</h2>
          <p class="text-sm text-gray-500">{{ pageSubtitle }}</p>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-3">
        <!-- Role Badge -->
        <span
          class="hidden md:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium"
          :class="roleBadgeClass"
        >
          <component :is="getRoleIcon(userRole)" class="w-3.5 h-3.5 mr-1.5" />
          {{ userRoleLabel }}
        </span>

        <!-- Notifications -->
        <div class="relative">
          <button
            @click.stop="toggleNotifications"
            class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell class="w-5 h-5 text-gray-600" />
            <span
              v-if="notificationCount > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
            >
              {{ notificationCount }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <transition name="dropdown">
            <div
              v-if="showNotifications"
              v-click-outside="closeNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            >
              <div class="p-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold text-gray-900">Notificacoes</h3>
                  <button
                    v-if="notificationCount > 0"
                    @click="clearAllNotifications"
                    class="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Limpar tudo
                  </button>
                </div>
              </div>

              <div class="max-h-96 overflow-y-auto">
                <div v-if="notifications.length === 0" class="p-8 text-center">
                  <Bell class="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p class="text-sm text-gray-500">Nenhuma notificacao</p>
                </div>

                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="handleNotificationClick(notification)"
                >
                  <div class="flex items-start gap-3">
                    <div
                      :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        notification.type === 'success' ? 'bg-green-100' : '',
                        notification.type === 'warning' ? 'bg-yellow-100' : '',
                        notification.type === 'info' ? 'bg-blue-100' : ''
                      ]"
                    >
                      <component
                        :is="getNotificationIcon(notification.type)"
                        :class="[
                          'w-4 h-4',
                          notification.type === 'success' ? 'text-green-600' : '',
                          notification.type === 'warning' ? 'text-yellow-600' : '',
                          notification.type === 'info' ? 'text-blue-600' : ''
                        ]"
                      />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-xs text-gray-600 mt-1">{{ notification.message }}</p>
                      <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
                    </div>
                    <button
                      @click.stop="removeNotification(notification.id)"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Settings -->
        <button
          @click="goToSettings"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Configuracoes"
        >
          <Settings class="w-5 h-5 text-gray-600" />
        </button>

        <!-- User Menu -->
        <div class="relative">
          <button
            @click.stop="toggleUserMenu"
            class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="userAvatarClass"
            >
              <span class="text-sm font-medium">{{ userInitials }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-600" />
          </button>

          <!-- User Dropdown Menu -->
          <transition name="dropdown">
            <div
              v-if="showUserMenu"
              v-click-outside="closeUserMenu"
              class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <div class="px-4 py-3 border-b border-gray-200">
                <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mt-2"
                  :class="roleBadgeClass"
                >
                  {{ userRoleLabel }}
                </span>
              </div>

              <router-link
                to="/app/definicoes"
                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                @click="closeUserMenu"
              >
                <User class="w-4 h-4" />
                Meu Perfil
              </router-link>

              <router-link
                to="/app/definicoes"
                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                @click="closeUserMenu"
              >
                <Settings class="w-4 h-4" />
                Configuracoes
              </router-link>

              <!-- Admin: Link para painel admin -->
              <router-link
                v-if="isAdmin"
                to="/app/admin"
                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                @click="closeUserMenu"
              >
                <Shield class="w-4 h-4" />
                Painel Admin
              </router-link>

              <div class="border-t border-gray-200 my-2"></div>

              <button
                @click="handleLogout"
                class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut class="w-4 h-4" />
                Sair
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { ROLES } from '@/config/roles'
import {
  Menu,
  Bell,
  Settings,
  ChevronDown,
  User,
  LogOut,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
  ClipboardList,
  FileText,
  UserCog,
  Baby,
  Heart
} from 'lucide-vue-next'

defineEmits(['toggleSidebar'])

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const showUserMenu = ref(false)
const showNotifications = ref(false)

// Mock notifications - substituir por dados reais do backend
const notifications = ref([
  {
    id: 1,
    type: 'success',
    title: 'Novo Padrinho Registado',
    message: 'Joao Silva completou o registo e apadrinhou uma crianca',
    time: 'Ha 5 minutos',
    read: false
  },
  {
    id: 2,
    type: 'warning',
    title: 'Contribuicao Pendente',
    message: 'A crianca Ana M. ainda nao tem padrinho atribuido este mes',
    time: 'Ha 1 hora',
    read: false
  },
  {
    id: 3,
    type: 'info',
    title: 'Relatorio Disponivel',
    message: 'O relatorio mensal de apadrinhamentos de Marco esta pronto',
    time: 'Ha 2 horas',
    read: false
  }
])

const notificationCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const user = computed(() => authStore.user)
const userRole = computed(() => authStore.userRole)
const userRoleLabel = computed(() => authStore.userRoleLabel)
const isAdmin = computed(() => authStore.isAdmin)

const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  const names = user.value.name.split(' ')
  if (names.length >= 2) {
    return names[0][0] + names[1][0]
  }
  return names[0][0]
})

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
  return classes[userRole.value] || 'bg-gray-100 text-gray-700'
})

// User avatar class
const userAvatarClass = computed(() => {
  const classes = {
    [ROLES.PF_COMUNITARIO]: 'bg-green-500 text-white',
    [ROLES.PF_TEMATICO]: 'bg-purple-500 text-white',
    [ROLES.GESTOR]: 'bg-blue-500 text-white',
    [ROLES.TUTOR]: 'bg-orange-500 text-white',
    [ROLES.PADRINHO]: 'bg-pink-500 text-white',
    [ROLES.ADMIN]: 'bg-gray-900 text-white'
  }
  return classes[userRole.value] || 'bg-gray-500 text-white'
})

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

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})

const pageSubtitle = computed(() => {
  const now = new Date()
  const hour = now.getHours()
  let greeting = 'Bom dia'
  if (hour >= 12 && hour < 18) greeting = 'Boa tarde'
  if (hour >= 18) greeting = 'Boa noite'
  
  return `${greeting}, ${user.value?.name?.split(' ')[0] || 'Utilizador'}!`
})

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showUserMenu.value) showUserMenu.value = false
}

const closeNotifications = () => {
  showNotifications.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showNotifications.value) showNotifications.value = false
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const goToSettings = () => {
  router.push('/app/definicoes')
}

const handleNotificationClick = (notification) => {
  notification.read = true
  toast.info(`Abrindo: ${notification.title}`)
  showNotifications.value = false
}

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index !== -1) {
    notifications.value.splice(index, 1)
    toast.success('Notificacao removida')
  }
}

const clearAllNotifications = () => {
  notifications.value = []
  toast.success('Todas as notificacoes foram limpas')
}

const getNotificationIcon = (type) => {
  const icons = {
    success: CheckCircle,
    warning: AlertCircle,
    info: Info
  }
  return icons[type] || Info
}

const handleLogout = () => {
  showUserMenu.value = false
  authStore.logout()
  router.push('/login')
  toast.success('Ate logo!')
}

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
