<template>
  <div class="min-h-screen flex bg-gray-100 overflow-hidden">

    <!-- LEFT: FORM (35%) -->
    <div class="w-full lg:w-[35%] flex items-center justify-center p-6">
      <div class="w-full max-w-md animate-form-enter">

        <!-- Logo -->
        <div class="text-center mb-8">
          <img
            :src="logo"
            alt="SACCO"
            class="w-full h-full mx-auto mb-4 rounded-2xl object-cover"
          />
          <h1 class="text-xl font-bold text-gray-900">
            Sistema de Avaliação de Continuada a Criancas Orfãos
          </h1>
        </div>

        <!-- Login Card -->
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Entrar
          </h2>
          <p class="text-sm text-gray-500 mb-6">
            Selecione um utilizador de teste para aceder ao sistema
          </p>

          <form @submit.prevent="handleLogin">
            <!-- Dropdown de Utilizadores de Teste -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Utilizador de Teste
                <span class="text-red-500 ml-1">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="selectedUserId"
                  class="input w-full appearance-none pr-10 cursor-pointer"
                  required
                >
                  <option value="" disabled>Selecione um utilizador...</option>
                  <option
                    v-for="user in testUsers"
                    :key="user.id"
                    :value="user.id"
                  >
                    {{ user.name }} ({{ getRoleLabel(user.role) }})
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <!-- Preview do Utilizador Selecionado -->
            <div
              v-if="selectedUser"
              class="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span class="text-white text-lg font-medium">{{ getUserInitials(selectedUser.name) }}</span>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ selectedUser.name }}</p>
                  <p class="text-sm text-gray-500">{{ selectedUser.email }}</p>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-gray-200">
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="getRoleBadgeClass(selectedUser.role)"
                  >
                    <component :is="getRoleIcon(selectedUser.role)" class="w-3.5 h-3.5 mr-1.5" />
                    {{ getRoleLabel(selectedUser.role) }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  Redireciona para: <code class="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700">{{ getRoleHome(selectedUser.role) }}</code>
                </p>
              </div>
            </div>

            <!-- Separador -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">ou entre manualmente</span>
              </div>
            </div>

            <!-- Login Manual (colapsado) -->
            <div class="space-y-4 mb-6">
              <BaseInput
                v-model="form.email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                :icon-left="Mail"
                :error="errors.email"
              />

              <BaseInput
                v-model="form.password"
                type="password"
                label="Senha"
                placeholder="********"
                :icon-left="Lock"
                :error="errors.password"
              />
            </div>

            <BaseButton
              type="submit"
              variant="primary"
              full-width
              :loading="loading"
              loading-text="Entrando..."
            >
              Entrar
            </BaseButton>
          </form>

          <!-- Info Demo -->
          <div class="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p class="text-xs text-blue-700">
              <strong>Modo Demo:</strong> Selecione um utilizador de teste acima para explorar o sistema com diferentes permissoes.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: BACKGROUND (65%) -->
    <div
      class="hidden lg:flex w-[65%] relative overflow-hidden text-white"
      style="perspective: 1200px"
      @mousemove="handleMouseMove"
      @mouseleave="reset3D"
    >

      <!-- CAMADA DE CONTROLE 3D -->
      <div
        ref="bg3d"
        class="absolute inset-0 transition-transform duration-75 will-change-transform"
      >
        <!-- CAMADA DE FUNDO -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        ></div>
        <!-- Pattern overlay -->
        <div
          class="absolute inset-0 opacity-10"
          style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
        ></div>
      </div>

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Conteudo -->
      <div class="relative z-10 flex flex-col justify-center px-16">
        <h2 class="text-4xl font-extrabold mb-4 leading-tight">
          Sistema de Assistencia<br />
          <span class="text-blue-400">Contínua a Criancas Orfãs</span>
        </h2>

        <p class="text-gray-300 text-lg mb-8 max-w-md">
          Gerencie o apadrinhamento de criancas vulneraveis com
          transparencia e eficiencia.
        </p>

        <div class="flex gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Users class="w-5 h-5 text-blue-400" />
            </div>
            <span class="text-sm text-gray-300">
              6 Perfis de Acesso
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Shield class="w-5 h-5 text-blue-400" />
            </div>
            <span class="text-sm text-gray-300">
              Controle de Permissoes
            </span>
          </div>
        </div>

        <div class="mt-12 h-1 w-40 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { TEST_USERS, getRoleLabel, getRoleHome, ROLES } from '@/config/roles'
import {
  Mail,
  Lock,
  ChevronDown,
  Users,
  Shield,
  UserCog,
  ClipboardList,
  Heart,
  Baby,
  Settings,
  FileText
} from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import logo from '@/assets/sacco_logo.png'

const router = useRouter()
const authStore = useAuthStore()

const bg3d = ref(null)
const selectedUserId = ref('')
const testUsers = TEST_USERS

const form = ref({
  email: '',
  password: ''
})

const errors = ref({})
const loading = ref(false)

const selectedUser = computed(() => {
  if (!selectedUserId.value) return null
  return testUsers.find(u => u.id === parseInt(selectedUserId.value))
})

const getUserInitials = (name) => {
  if (!name) return 'U'
  const names = name.split(' ')
  if (names.length >= 2) {
    return names[0][0] + names[1][0]
  }
  return names[0][0]
}

const getRoleIcon = (role) => {
  const icons = {
    [ROLES.PF_COMUNITARIO]: ClipboardList,
    [ROLES.PF_TEMATICO]: FileText,
    [ROLES.GESTOR]: UserCog,
    [ROLES.TUTOR]: Baby,
    [ROLES.PADRINHO]: Heart,
    [ROLES.ADMIN]: Settings
  }
  return icons[role] || Users
}

const getRoleBadgeClass = (role) => {
  const classes = {
    [ROLES.PF_COMUNITARIO]: 'bg-green-100 text-green-700',
    [ROLES.PF_TEMATICO]: 'bg-purple-100 text-purple-700',
    [ROLES.GESTOR]: 'bg-blue-100 text-blue-700',
    [ROLES.TUTOR]: 'bg-orange-100 text-orange-700',
    [ROLES.PADRINHO]: 'bg-pink-100 text-pink-700',
    [ROLES.ADMIN]: 'bg-gray-800 text-white'
  }
  return classes[role] || 'bg-gray-100 text-gray-700'
}

const handleLogin = async () => {
  errors.value = {}
  loading.value = true

  try {
    let success = false

    // Se selecionou utilizador de teste
    if (selectedUserId.value) {
      success = await authStore.loginWithTestUser(selectedUserId.value)
    }
    // Login manual por email
    else if (form.value.email) {
      success = await authStore.login(form.value)
    } else {
      errors.value.email = 'Selecione um utilizador ou insira email'
      loading.value = false
      return
    }

    if (success) {
      // Redirecionar para home do role
      const homeRoute = authStore.userHomeRoute
      router.push(homeRoute)
    }
  } catch (error) {
    errors.value.email = 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}

/* ===== 3D CAMERA CONTROL ===== */
const handleMouseMove = (e) => {
  if (!bg3d.value) return

  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateY = ((x - centerX) / centerX) * 8
  const rotateX = -((y - centerY) / centerY) * 8

  bg3d.value.style.transform = `
    scale(1.05)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `
}

const reset3D = () => {
  if (!bg3d.value) return
  bg3d.value.style.transform = 'scale(1.05) rotateX(0deg) rotateY(0deg)'
}
</script>

<style scoped>
/* Entrada do formulario */
@keyframes form-enter {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-form-enter {
  animation: form-enter 0.8s ease-out forwards;
}
</style>
