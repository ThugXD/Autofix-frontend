import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', () => {
  // ========== STATE ==========
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const refreshToken = ref(localStorage.getItem('refreshToken') || null)
  const loading = ref(false)

  // ========== GETTERS ==========
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // ✅ CORRIGIDO: needsSetup como computed
  const needsSetup = computed(() => {
    return user.value?.tenant?.setupCompleted === false
  })

  // ========== ACTIONS ==========

  const login = async (credentials) => {
    try {
      loading.value = true
      const response = await api.post('/auth/login', credentials)

      const { user: userData, token: jwtToken, refreshToken: refresh } = response.data.data

      token.value = jwtToken
      refreshToken.value = refresh
      user.value = userData

      localStorage.setItem('token', jwtToken)
      localStorage.setItem('refreshToken', refresh)
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

      const { user: userDataResponse, token: jwtToken, refreshToken: refresh } = response.data.data

      token.value = jwtToken
      refreshToken.value = refresh
      user.value = userDataResponse

      localStorage.setItem('token', jwtToken)
      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('user', JSON.stringify(userDataResponse))
      localStorage.setItem('tenant_id', userDataResponse.tenantId)

      toast.success('Conta criada com sucesso!')
      return true
    } catch (error) {
      console.error('Register error:', error)

      if (error.response?.data?.errors) {
        return { success: false, errors: error.response.data.errors }
      }

      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    refreshToken.value = null

    localStorage.clear()

    toast.info('Sessão encerrada, até breve.')

    // ✅ CORRIGIDO: era "hfref"
    window.location.href = '/login'
  }

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')

      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser)
        token.value = storedToken

        // Buscar dados atualizados
        const response = await api.get('/auth/me')
        user.value = response.data.data
        localStorage.setItem('user', JSON.stringify(user.value))

        return true
      }
    } catch (err) {
      console.warn('Erro ao restaurar sessão:', err)
      logout()
    }
    return false
  }

  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const completeSetup = async (payload) => {
    try {
      loading.value = true
      const { data } = await api.patch('/auth/setup-complete', payload)

      user.value.tenant = data.data.tenant
      localStorage.setItem('user', JSON.stringify(user.value))

      toast.success('Configuração concluída!')
      return true
    } catch (error) {
      console.error('Setup error:', error)
      toast.error('Erro ao salvar configurações')
      return false
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (data) => {
    try {
      loading.value = true;
      const response = await api.put('/auth/profile', data);

      // Update local user state
      user.value = { ...user.value, ...response.data.data };
      localStorage.setItem('user', JSON.stringify(user.value));

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  const changePassword = async (data) => {
    try {
      loading.value = true;
      await api.put('/auth/password', data);
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    token,
    refreshToken,
    loading,
    isAuthenticated,
    currentUser,
    needsSetup, // ✅ Agora funciona!
    login,
    register,
    logout,
    checkAuth,
    updateUser,
    completeSetup,
    updateProfile,
    changePassword,
  }
})