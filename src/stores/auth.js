import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

const DEFAULT_SETTINGS = {
  menu: {
    type: 'sidebar'
  }
}

const loadSettings = () => {
  try {
    const stored = localStorage.getItem('settings')
    if (!stored) {
      return { ...DEFAULT_SETTINGS }
    }
    const parsed = JSON.parse(stored)
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      menu: {
        ...DEFAULT_SETTINGS.menu,
        ...(parsed.menu || {})
      }
    }
  } catch (error) {
    console.error('Erro ao carregar settings:', error)
    return { ...DEFAULT_SETTINGS }
  }
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const settings = ref(loadSettings())
  
  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  
  // Actions
  const login = async (credentials) => {
    try {
      loading.value = true
      const response = await api.post('/auth/login', credentials)
      
      token.value = response.data.token
      user.value = response.data.user
      
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('tenant_id', user.value.tenant_id)
      
      toast.success(`Bem-vindo, ${user.value.name}!`)
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
      
      token.value = response.data.token
      user.value = response.data.user
      
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('tenant_id', user.value.tenant_id)
      
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
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('tenant_id')
    
    toast.info('Sessão encerrada.')
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

  const updateSettings = (newSettings) => {
    settings.value = {
      ...settings.value,
      ...newSettings,
      menu: {
        ...settings.value.menu,
        ...(newSettings.menu || {})
      }
    }
    localStorage.setItem('settings', JSON.stringify(settings.value))
  }

  const setMenuType = (type) => {
    updateSettings({
      menu: {
        ...(settings.value.menu || {}),
        type
      }
    })
    toast.success('Tipo de navegação atualizado.')
  }
  
  return {
    user,
    token,
    loading,
    settings,
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
    checkAuth,
    updateUser,
    updateSettings,
    setMenuType
  }
})