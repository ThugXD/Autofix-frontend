<template>
  <div class="min-h-screen flex bg-gray-100 overflow-hidden">

    <!-- LEFT: FORM (35%) -->
    <div class="w-full lg:w-[35%] flex items-center justify-center p-6">
      <div class="w-full max-w-md animate-form-enter">

        <!-- Logo -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">
            Sistema de SACCO
          </h1>
        </div>

        <!-- Login Card -->
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Entrar
          </h2>

          <form @submit.prevent="handleLogin">
            <BaseInput
              v-model="form.email"
              type="email"
              label="Email"
              placeholder="seu@email.com"
              :icon-left="Mail"
              required
              :error="errors.email"
              class="mb-4"
            />

            <BaseInput
              v-model="form.password"
              type="password"
              label="Senha"
              placeholder="••••••••"
              :icon-left="Lock"
              required
              :error="errors.password"
              class="mb-6"
            />

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

          <div class="mt-6 text-center">
            <router-link
              to="/register"
              class="text-sm text-gray-600 hover:text-gray-900"
            >
              Não tem conta?
              <span class="font-medium">Registar-se</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: 3D BACKGROUND (65%) -->
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
        <!-- CAMADA QUE VIBRA -->
        <div
          class="absolute inset-0 bg-[url('/car-racing.png')] bg-cover bg-center animate-bg-vibration"
        ></div>
      </div>

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/60"></div>

      <!-- Conteúdo (NÃO SE MOVE) -->
      <div class="relative z-10 flex flex-col justify-center px-16">
        <h2 class="text-4xl font-extrabold mb-4 leading-tight">
          Prepare sua oficina<br />
          <span class="text-red-500">para alta performance</span>
        </h2>

        <p class="text-gray-300 text-lg mb-8 max-w-md">
          Gerencie ordens de serviço, clientes e veículos
          com a precisão de um carro de corrida.
        </p>

        <div class="flex gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
              <Wrench class="w-5 h-5 text-red-500" />
            </div>
            <span class="text-sm text-gray-300">
              Controle Total
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
              <Lock class="w-5 h-5 text-red-500" />
            </div>
            <span class="text-sm text-gray-300">
              Seguro & Rápido
            </span>
          </div>
        </div>

        <div class="mt-12 h-1 w-40 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Wrench, Mail, Lock } from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const bg3d = ref(null)

const form = ref({
  email: '',
  password: ''
})

const errors = ref({})
const loading = ref(false)

const handleLogin = async () => {
  errors.value = {}
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    authStore.user = {
      id: 1,
      name: 'Valter Zandamela',
      email: form.value.email,
      tenant_id: 1
    }

    authStore.token = 'mock-jwt-token'

    localStorage.setItem('token', authStore.token)
    localStorage.setItem('user', JSON.stringify(authStore.user))
    localStorage.setItem('tenant_id', '1')

    router.push('/')
  } catch (error) {
    errors.value.email = 'Credenciais inválidas'
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

  const rotateY = ((x - centerX) / centerX) * 10
  const rotateX = -((y - centerY) / centerY) * 10

  bg3d.value.style.transform = `
    scale(1.1)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `
}

const reset3D = () => {
  if (!bg3d.value) return
  bg3d.value.style.transform = 'scale(1.1) rotateX(0deg) rotateY(0deg)'
}
</script>

<style scoped>
/* Entrada do formulário */
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

/* Vibração agressiva do background */
@keyframes background-aggressive-vibration {
  0%   { transform: scale(1.04) translate(0, 0) rotate(0deg); }
  10%  { transform: scale(1.06) translate(-4px, 3px) rotate(-0.3deg); }
  20%  { transform: scale(1.05) translate(5px, -2px) rotate(0.3deg); }
  30%  { transform: scale(1.07) translate(-6px, 4px) rotate(-0.4deg); }
  40%  { transform: scale(1.06) translate(4px, -5px) rotate(0.4deg); }
  50%  { transform: scale(1.08) translate(-5px, 3px) rotate(-0.5deg); }
  60%  { transform: scale(1.07) translate(6px, -4px) rotate(0.5deg); }
  70%  { transform: scale(1.08) translate(-4px, 5px) rotate(-0.4deg); }
  80%  { transform: scale(1.06) translate(5px, -3px) rotate(0.4deg); }
  90%  { transform: scale(1.07) translate(-3px, 4px) rotate(-0.3deg); }
  100% { transform: scale(1.04) translate(0, 0) rotate(0deg); }
}

.animate-bg-vibration {
  animation: background-aggressive-vibration 1.5s linear infinite;
  will-change: transform;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
