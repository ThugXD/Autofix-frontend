import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Criar instância do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // ✅ Aumentado para 30s
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de Request - Adiciona token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Multi-tenant: adicionar tenant_id se existir
    const tenantId = localStorage.getItem('tenant_id')
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId
    }
    
    return config
  },
  error => Promise.reject(error)
)

// Interceptor de Response - Trata erros + REFRESH AUTOMÁTICO
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // ✅ REFRESH AUTOMÁTICO em 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) throw new Error('No refresh token')

        // Tentar renovar token (SEM usar a instância api para evitar loop)
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
          { refreshToken }
        )

        const newToken = data.data.token
        const newRefreshToken = data.data.refreshToken

        // Salvar novos tokens
        localStorage.setItem('token', newToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        // Retentar requisição original com novo token
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh falhou → Logout forçado
        toast.error('Sessão expirada. Faça login novamente.')
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // ✅ OUTROS ERROS
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Já tratado acima (refresh)
          break
          
        case 403:
          toast.error('Você não tem permissão para acessar este recurso.')
          break
          
        case 404:
          toast.error('Recurso não encontrado.')
          break
          
        case 422:
        case 400:
          // Erros de validação - NÃO mostrar toast (deixar componente tratar)
          break
          
        case 500:
          toast.error('Erro interno do servidor. Tente novamente mais tarde.')
          break
          
        default:
          toast.error(data.message || 'Ocorreu um erro inesperado.')
      }
    } else if (error.request) {
      toast.error('Não foi possível conectar ao servidor. Verifique sua conexão.')
    } else {
      toast.error('Erro ao processar a requisição.')
    }
    
    return Promise.reject(error)
  }
)

export default api