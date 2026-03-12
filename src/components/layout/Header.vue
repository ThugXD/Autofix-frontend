<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors">
    <div class="flex items-center justify-between">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <!-- Menu Toggle Button -->
        <button
          @click="$emit('toggleSidebar')"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu class="w-5 h-5 text-gray-600 dark:text-white" />
        </button>

        <!-- Page Title -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ pageTitle }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ pageSubtitle }}</p>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-3">
        <!-- Notifications -->
        <div class="relative">
          <button
            @click.stop="toggleNotifications"
            class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Bell class="w-5 h-5 text-gray-600 dark:text-white" />
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
              class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold text-gray-900 dark:text-white">Notificações</h3>
                  <button
                    v-if="notificationCount > 0"
                    @click="clearAllNotifications"
                    class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Limpar tudo
                  </button>
                </div>
              </div>

              <div class="max-h-96 overflow-y-auto">
                <div v-if="notifications.length === 0" class="p-8 text-center">
                  <Bell class="w-12 h-12 text-gray-300 dark:text-gray-500 mx-auto mb-2" />
                  <p class="text-sm text-gray-500 dark:text-gray-400">Nenhuma notificação</p>
                </div>

                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  @click="handleNotificationClick(notification)"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      :class="{
                        'bg-blue-100 text-blue-600': notification.type === 'info',
                        'bg-green-100 text-green-600': notification.type === 'success',
                        'bg-orange-100 text-orange-600': notification.type === 'warning',
                        'bg-red-100 text-red-600': notification.type === 'error'
                      }"
                    >
                      <component
                        :is="getNotificationIcon(notification.type)"
                        class="w-5 h-5"
                      />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ notification.message }}</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ notification.time }}</p>
                    </div>
                    <button
                      @click.stop="removeNotification(notification.id)"
                      class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme($event)"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
          :title="isDark ? 'Modo Claro' : 'Modo Escuro'"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-300" />
          <Moon v-else class="w-5 h-5 text-gray-600 group-hover:-rotate-12 transition-transform duration-300" />
        </button>

        <!-- Settings -->
        <button
          @click="goToSettings"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Configurações"
        >
          <Settings class="w-5 h-5 text-gray-600 dark:text-white" />
        </button>

        <!-- User Menu -->
        <div class="relative">
          <button
            @click.stop="toggleUserMenu"
            class="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div class="w-8 h-8 bg-gray-900 dark:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
              <span class="text-white text-sm font-medium">{{ userInitials }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-600 dark:text-white" />
          </button>

          <!-- User Dropdown Menu -->
          <transition name="dropdown">
            <div
              v-if="showUserMenu"
              v-click-outside="closeUserMenu"
              class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user?.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user?.email }}</p>
              </div>

              <router-link
                to="/perfil"
                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                @click="closeUserMenu"
              >
                <User class="w-4 h-4 dark:text-white" />
                Meu Perfil
              </router-link>

              <router-link
                to="/definicoes"
                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                @click="closeUserMenu"
              >
                <Settings class="w-4 h-4 dark:text-white" />
                Configurações
              </router-link>

              <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              <button
                @click="handleLogout"
                class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut class="w-4 h-4 dark:text-red-400" />
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { useTheme } from '@/composables/useTheme'
import { useToast } from 'vue-toastification'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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
  Sun,
  Moon
} from 'lucide-vue-next'

defineEmits(['toggleSidebar'])

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const toast = useToast()
const { isDark, toggleTheme, initTheme } = useTheme()

const showUserMenu = ref(false)
const showNotifications = ref(false)

// Lifecycle
onMounted(() => {
  initTheme()
  notificationsStore.startPolling()
})

onUnmounted(() => {
  notificationsStore.stopPolling()
})

// Computed
const user = computed(() => authStore.user)
const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  const names = user.value.name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }
  return user.value.name.substring(0, 2).toUpperCase()
})

const pageTitle = computed(() => {
  const titleMap = {
    '/': 'Dashboard',
    '/clientes': 'Clientes',
    '/veiculos': 'Veículos',
    '/atendimento': 'Atendimento',
    '/ordem-servico': 'Ordens de Serviço',
    '/servicos': 'Serviços',
    '/stock-pecas': 'Stock de Peças',
    '/utilizadores': 'Utilizadores',
    '/definicoes': 'Definições',
    '/perfil': 'Meu Perfil',
    '/info': 'Informações',
    '/admin': 'Dashboard Admin',
    '/admin/tenants': 'Gestão de Oficinas',
    '/admin/audit': 'Auditoria'
  }
  return titleMap[route.path] || 'FixAuto'
})

const pageSubtitle = computed(() => {
  const subtitleMap = {
    '/': 'Visão geral do sistema',
    '/clientes': 'Gestão de clientes',
    '/veiculos': 'Gestão de veículos',
    '/atendimento': 'Novo atendimento',
    '/ordem-servico': 'Gestão de ordens de serviço',
    '/servicos': 'Catálogo de serviços',
    '/stock-pecas': 'Inventário de peças',
    '/utilizadores': 'Gestão de utilizadores',
    '/definicoes': 'Configurações do sistema',
    '/perfil': 'Informações pessoais',
    '/info': 'Sobre o sistema',
    '/admin': 'Painel de administração',
    '/admin/tenants': 'Gestão de oficinas cadastradas',
    '/admin/audit': 'Registro de atividades do sistema'
  }
  return subtitleMap[route.path] || ''
})

const notifications = computed(() => notificationsStore.notifications)
const notificationCount = computed(() => notificationsStore.unreadCount)

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    showNotifications.value = false
  }
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    showUserMenu.value = false
  }
}

const closeNotifications = () => {
  showNotifications.value = false
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    toast.success('Sessão encerrada com sucesso')
    router.push('/login')
  } catch (error) {
    toast.error('Erro ao encerrar sessão')
  }
}

const goToSettings = () => {
  router.push('/definicoes')
}

const handleNotificationClick = (notification) => {
  notificationsStore.markAsRead(notification.id)
  if (notification.link) {
    router.push(notification.link)
  }
  closeNotifications()
}

const removeNotification = (id) => {
  notificationsStore.removeNotification(id)
}

const clearAllNotifications = () => {
  notificationsStore.clearAll()
  toast.success('Todas as notificações foram removidas')
}

const getNotificationIcon = (type) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info
  }
  return icons[type] || Info
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

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>