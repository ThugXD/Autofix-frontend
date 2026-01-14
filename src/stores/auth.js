import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const refreshToken = ref(localStorage.getItem('refreshToken') || null)
  const loading = ref(false)
  
  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  
  // Actions
  const login = async (credentials) => {
    try {
      loading.value = true
      const response = await api.post('/auth/login', credentials)

      const { user: userData, token: jwtToken, refreshToken } = response.data.data

      token.value = jwtToken
      user.value = userData

      localStorage.setItem('token', jwtToken)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('tenant_id', userData.tenantId)

      toast.success(`Bem-vindo, ${userData.name}!`)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    try {
      loading.value = true
      const response = await api.post('/auth/register', userData)
      
      // Ajuste: backend retorna { data: { user, token, refreshToken } }
      const { user: userDataResponse, token: jwtToken, refreshToken } = response.data.data

      token.value = jwtToken
      user.value = userDataResponse

      localStorage.setItem('token', jwtToken)
      localStorage.setItem('user', JSON.stringify(userDataResponse))
      localStorage.setItem('tenant_id', userDataResponse.tenantId) // ⚡ tenantId vem do backend

      toast.success('Conta criada com sucesso!')
      return true
    } catch (error) {
      console.error('Register error:', error)

      if (error.response?.data?.errors) {
        // Erros de validação do backend
        return { success: false, errors: error.response.data.errors }
      }

      return false
    } finally {
      loading.value = false
    }
  }
  
  const needsSetup = computed(() => {
    return user.value?.tenant?.setupCompleted === false
  })

  const logout = () => {
    token.value = null
    user.value = null
    refreshToken.value = null
    
    // localStorage.removeItem('token')
    // localStorage.removeItem('refreshToken')
    // localStorage.removeItem('user')
    // localStorage.removeItem('tenant_id')
    localStorage.clear()
    
    toast.info('Sessão encerrada, até breve.')

    window.location.hfref = '/login'
  }
  
  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')

      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
        return true
      }
    } catch (err) {
      console.warn('Erro ao restaurar sessão:', err)
    }
    return false
  }

  
  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  
  const completeSetup = async (setupData) => {
    await api.patch('/auth/setup-complete')

    user.value.tenant.setupCompleted = true
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    currentUser,
    needsSetup,
    completeSetup,
    login,
    register,
    logout,
    checkAuth,
    updateUser,
  }
})