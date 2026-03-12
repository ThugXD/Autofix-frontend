<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="max-w-md w-full">
      <div class="card text-center">
        <!-- Icon -->
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldX class="w-10 h-10 text-red-500" />
        </div>

        <!-- Title -->
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Acesso Negado
        </h1>
        
        <p class="text-gray-600 mb-6">
          Voce nao tem permissao para acessar esta pagina.
        </p>

        <!-- Info Box -->
        <div class="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Seu perfil:</span>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="currentRoleBadgeClass"
              >
                {{ currentRoleLabel }}
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Perfil requerido:</span>
              <div class="flex flex-wrap gap-1 justify-end">
                <span
                  v-for="role in requiredRoles"
                  :key="role"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                >
                  {{ getRoleLabel(role) }}
                </span>
              </div>
            </div>

            <div v-if="fromPath" class="pt-2 border-t border-gray-200">
              <span class="text-sm text-gray-500">Rota solicitada:</span>
              <code class="block mt-1 text-xs bg-gray-200 px-2 py-1 rounded text-gray-700 break-all">
                {{ fromPath }}
              </code>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <BaseButton
            variant="secondary"
            @click="goBack"
            class="flex-1"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Voltar
          </BaseButton>
          
          <BaseButton
            variant="primary"
            @click="goHome"
            class="flex-1"
          >
            <Home class="w-4 h-4 mr-2" />
            Meu Painel
          </BaseButton>
        </div>

        <!-- Logout option -->
        <div class="mt-6 pt-4 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Entrar com outra conta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getRoleLabel, ROLES } from '@/config/roles'
import { ShieldX, ArrowLeft, Home } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const fromPath = computed(() => route.query.from || '')
const currentRole = computed(() => route.query.current || authStore.userRole || 'none')
const requiredRoles = computed(() => {
  const required = route.query.required
  if (!required) return []
  return required.split(',').filter(Boolean)
})

const currentRoleLabel = computed(() => {
  if (currentRole.value === 'none') return 'Nao autenticado'
  return getRoleLabel(currentRole.value)
})

const currentRoleBadgeClass = computed(() => {
  const classes = {
    [ROLES.PF_COMUNITARIO]: 'bg-green-100 text-green-700',
    [ROLES.PF_TEMATICO]: 'bg-purple-100 text-purple-700',
    [ROLES.GESTOR]: 'bg-blue-100 text-blue-700',
    [ROLES.TUTOR]: 'bg-orange-100 text-orange-700',
    [ROLES.PADRINHO]: 'bg-pink-100 text-pink-700',
    [ROLES.ADMIN]: 'bg-gray-800 text-white',
    'none': 'bg-gray-100 text-gray-700'
  }
  return classes[currentRole.value] || 'bg-gray-100 text-gray-700'
})

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    goHome()
  }
}

const goHome = () => {
  const homeRoute = authStore.userHomeRoute || '/app'
  router.push(homeRoute)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
