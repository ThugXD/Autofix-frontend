<template>
  <div class="h-screen flex overflow-hidden">
    <!-- LEFT: FORMULÁRIO -->
    <div class="w-full lg:w-[35%] h-screen bg-gray-50 flex flex-col">

      <!-- CONTEÚDO COM SCROLL -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <div class="max-w-md mx-auto">

          <!-- HEADER -->
          <div class="mb-6 text-center">
            <h1 class="text-3xl font-bold text-gray-900">SACCO</h1>
            <p class="text-sm text-gray-600">Criar nova conta</p>
          </div>

          <!-- CARD -->
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <form @submit.prevent="handleRegister" class="space-y-3">

              <!-- Nome da Oficina -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Nome da Comunidade
                </label>
                <div class="relative">
                  <Building2 class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="form.oficina_name"
                    type="text"
                    placeholder="SACCO Maputo"
                    class="input"
                    :class="{ 'border-red-500': errors.oficina_name }"
                    required
                  />
                </div>
                <p v-if="errors.oficina_name" class="error">{{ errors.oficina_name }}</p>
              </div>

              <!-- Nome -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Seu Nome
                </label>
                <div class="relative">
                  <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Nome completo"
                    class="input"
                    :class="{ 'border-red-500': errors.name }"
                    required
                  />
                </div>
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="seu@email.com"
                    class="input"
                    :class="{ 'border-red-500': errors.email }"
                    required
                  />
                </div>
                <p v-if="errors.email" class="error">{{ errors.email }}</p>
              </div>

              <!-- Telefone -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <div class="relative">
                  <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="840000000"
                    class="input"
                    :class="{ 'border-red-500': errors.phone }"
                    required
                  />
                </div>
                <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
              </div>

              <!-- Senha -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div class="relative">
                  <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Mínimo 6 caracteres"
                    class="input pr-10"
                    :class="{ 'border-red-500': errors.password }"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="eye-btn"
                  >
                    <Eye v-if="!showPassword" class="w-4 h-4" />
                    <EyeOff v-else class="w-4 h-4" />
                  </button>
                </div>
                <p v-if="errors.password" class="error">{{ errors.password }}</p>
              </div>

              <!-- Confirmar Senha -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <div class="relative">
                  <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="form.password_confirmation"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    placeholder="Repita a senha"
                    class="input pr-10"
                    :class="{ 'border-red-500': errors.password_confirmation }"
                    required
                  />
                  <button
                    type="button"
                    @click="showPasswordConfirm = !showPasswordConfirm"
                    class="eye-btn"
                  >
                    <Eye v-if="!showPasswordConfirm" class="w-4 h-4" />
                    <EyeOff v-else class="w-4 h-4" />
                  </button>
                </div>
                <p v-if="errors.password_confirmation" class="error">
                  {{ errors.password_confirmation }}
                </p>
              </div>

              <!-- Termos -->
              <div class="flex items-start gap-2 pt-1">
                <input
                  v-model="form.terms"
                  type="checkbox"
                  class="mt-1"
                  required
                />
                <label class="text-xs text-gray-600">
                  Concordo com os
                  <a class="text-blue-600 hover:underline">Termos</a>
                </label>
              </div>

              <!-- Botão -->

              <BaseButton
                type="submit"
                variant="primary"
                full-width
                :loading="loading"
                loading-text="Criando..."
                >
                Registrar
              </BaseButton>
            </form>

            <div class="mt-6 text-center">
                <router-link
                to="/login"
                class="text-sm text-gray-600 hover:text-gray-900"
                >
                    Já tens uma uma conta?
                    <span class="font-bold text-gray-900">Efectuar o Login</span>
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: IMAGEM -->
    <div class="hidden lg:block w-[65%] h-screen">
      <img
        src="/car-fixing.png"
        alt="Oficina"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  Mail, Lock, Eye, EyeOff,
  User, Phone, Building2
} from 'lucide-vue-next'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
  oficina_name: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  terms: false
})

const errors = ref({})
const loading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const handleRegister = async () => {
  errors.value = {}

  if (!form.value.oficina_name) errors.value.oficina_name = 'Obrigatório'
  if (!form.value.name) errors.value.name = 'Obrigatório'
  if (!form.value.email) errors.value.email = 'Obrigatório'
  if (!form.value.phone) errors.value.phone = 'Obrigatório'
  if (!form.value.password || form.value.password.length < 6)
    errors.value.password = 'Mínimo 6 caracteres'
  if (form.value.password !== form.value.password_confirmation)
    errors.value.password_confirmation = 'Senhas não coincidem'

  if (!form.value.terms) {
    toast.error('Aceite os termos')
    return
  }

  if (Object.keys(errors.value).length) return

  loading.value = true
  try {
    await authStore.register(form.value)
    toast.success('Conta criada com sucesso')
    router.push('/')
  } catch {
    toast.error('Erro ao criar conta')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.input {
  @apply w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.eye-btn {
  @apply absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600;
}

.error {
  @apply text-xs text-red-500 mt-1;
}
</style>
