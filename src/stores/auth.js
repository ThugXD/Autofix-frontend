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
  const login = async ({ email, password }) => {
    try {
      loading.value = true
      const response = await api.post('/auth/login', { email, password })
      const {user: userData, token: authToken, refreshToken: refresh} = response.data

      token.value = authToken
      user.value = userData
      refreshToken.value = refresh
      
      localStorage.setItem('token', authToken)
      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('tenant_id', userData.tenant_id)
      
      toast.success(`Bem-vindo, ${userData.name}!`)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }
  
  const register = async (payload) => {
    try {
      loading.value = true
      const response = await api.post('/auth/register', payload)
      const { user: userData, token: authToken, refreshToken: refresh } = response.data.data

      token.value = authToken
      user.value = userData
      refreshToken.value = refresh

      localStorage.setItem('token', authToken)
      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('tenant_id', userData.tenant_id)

      toast.success('Conta criada com sucesso!')
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    } finally {
      loading.value = false
    }
  }
  
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
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      return true
    }
    return false
  }
  
  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  
  return {
    user,
    token,
    loading,
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
    checkAuth,
    updateUser
  }
})