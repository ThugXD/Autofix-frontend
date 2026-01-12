<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
    <div class="absolute inset-0 overflow-hidden opacity-10">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-2xl">
          <Wrench class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl font-bold text-white mb-2">AutoFixApp</h1>
      </div>

      <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div v-if="!emailSent">
          <div class="mb-6">
            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <KeyRound class="w-6 h-6 text-blue-400" />
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">Esqueceu a senha?</h2>
            <p class="text-gray-400">Sem problemas! Digite seu email e enviaremos um link para redefinir.</p>
          </div>

          <form @submit.prevent="handleForgotPassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="seu@email.com"
                  class="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  :class="{ 'border-red-500': error }"
                  required
                />
              </div>
              <p v-if="error" class="mt-1 text-sm text-red-400">{{ error }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 shadow-lg"
            >
              <span v-if="!loading">Enviar Link de Recuperação</span>
              <span v-else class="flex items-center justify-center gap-2">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Enviando...
              </span>
            </button>
          </form>
        </div>

        <div v-else class="text-center py-6">
          <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="w-8 h-8 text-green-400" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Email Enviado!</h3>
          <p class="text-gray-400 mb-6">
            Verifique sua caixa de entrada. Enviamos um link para redefinir sua senha.
          </p>
          <router-link
            to="/login"
            class="inline-block px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
          >
            Voltar para Login
          </router-link>
        </div>

        <div class="mt-6 text-center">
          <router-link
            to="/login"
            class="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft class="w-4 h-4" />
            Voltar para Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Wrench, Mail, KeyRound, CheckCircle, ArrowLeft } from 'lucide-vue-next'
import { useToast } from 'vue-toastification'

const toast = useToast()

const email = ref('')
const error = ref('')
const loading = ref(false)
const emailSent = ref(false)

const handleForgotPassword = async () => {
  error.value = ''
  
  if (!email.value) {
    error.value = 'Email é obrigatório'
    return
  }

  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simular envio de email
    emailSent.value = true
    toast.success('Link enviado para seu email!')
  } catch (err) {
    error.value = 'Erro ao enviar email'
    toast.error('Erro ao enviar link. Tente novamente.')
  } finally {
    loading.value = false
  }
}
</script>