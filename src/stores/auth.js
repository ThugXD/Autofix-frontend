import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { 
  ROLES, 
  TEST_USERS, 
  getRoleLabel, 
  getRoleHome, 
  getMenuByRole,
  hasRouteAccess 
} from '@/config/roles'

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
  const userRole = computed(() => user.value?.role || null)
  const userRoleLabel = computed(() => user.value?.role ? getRoleLabel(user.value.role) : '')
  const userHomeRoute = computed(() => user.value?.role ? getRoleHome(user.value.role) : '/app')
  const userMenu = computed(() => user.value?.role ? getMenuByRole(user.value.role) : null)
  
  // Actions
  
  /**
   * Login com utilizador de teste (DEMO)
   * @param {string} userId - ID do utilizador de teste
   */
  const loginWithTestUser = async (userId) => {
    loading.value = true
    
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Encontrar utilizador de teste
      const testUser = TEST_USERS.find(u => u.id === parseInt(userId))
      
      if (!testUser) {
        toast.error('Utilizador nao encontrado')
        return false
      }
      
      // Definir utilizador e token
      user.value = { ...testUser }
      token.value = `mock-jwt-token-${testUser.role}-${Date.now()}`
      
      // Persistir em sessionStorage (sessao actual)
      sessionStorage.setItem('token', token.value)
      sessionStorage.setItem('user', JSON.stringify(user.value))
      sessionStorage.setItem('tenant_id', String(user.value.tenant_id))
      
      toast.success(`Bem-vindo, ${user.value.name}!`)
      return true
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Erro ao fazer login')
      return false
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Login tradicional (para futuro backend)
   */
  const login = async (credentials) => {
    loading.value = true
    
    try {
      // Para demo, buscar utilizador por email
      const testUser = TEST_USERS.find(u => u.email === credentials.email)
      
      if (testUser) {
        return await loginWithTestUser(testUser.id)
      }
      
      toast.error('Credenciais invalidas')
      return false
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Erro ao fazer login')
      return false
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
    token.value = null
    
    // Limpar sessionStorage
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('tenant_id')
    
    // Limpar localStorage tambem (caso exista)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('tenant_id')
    
    toast.info('Sessao encerrada.')
  }
  
  const checkAuth = () => {
    // Primeiro verificar sessionStorage
    let storedToken = sessionStorage.getItem('token')
    let storedUser = sessionStorage.getItem('user')
    
    // Fallback para localStorage (compatibilidade)
    if (!storedToken || !storedUser) {
      storedToken = localStorage.getItem('token')
      storedUser = localStorage.getItem('user')
    }
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      return true
    }
    return false
  }
  
  /**
   * Verificar se utilizador tem acesso a rota
   */
  const canAccess = (path) => {
    if (!user.value?.role) return false
    return hasRouteAccess(user.value.role, path)
  }
  
  /**
   * Verificar se utilizador tem role especifico
   */
  const hasRole = (roles) => {
    if (!user.value?.role) return false
    if (Array.isArray(roles)) {
      return roles.includes(user.value.role)
    }
    return user.value.role === roles
  }
  
  /**
   * Verificar se e admin
   */
  const isAdmin = computed(() => user.value?.role === ROLES.ADMIN)
  
  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    sessionStorage.setItem('user', JSON.stringify(user.value))
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
    toast.success('Tipo de navegacao atualizado.')
  }
  
  return {
    // State
    user,
    token,
    loading,
    settings,
    
    // Getters
    isAuthenticated,
    currentUser,
    userRole,
    userRoleLabel,
    userHomeRoute,
    userMenu,
    isAdmin,
    
    // Actions
    login,
    loginWithTestUser,
    logout,
    checkAuth,
    canAccess,
    hasRole,
    updateUser,
    updateSettings,
    setMenuType
  }
})

// Exportar ROLES para uso direto
export { ROLES }
