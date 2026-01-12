import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Criar instância do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
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
  error => {
    return Promise.reject(error)
  }
)

// Interceptor de Response - Trata erros globalmente
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          toast.error('Sessão expirada. Faça login novamente.')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
          break
          
        case 403:
          toast.error('Você não tem permissão para acessar este recurso.')
          break
          
        case 404:
          toast.error('Recurso não encontrado.')
          break
          
        case 422:
          // Erros de validação
          if (data.errors) {
            Object.values(data.errors).forEach(errorArray => {
              errorArray.forEach(msg => toast.error(msg))
            })
          } else {
            toast.error(data.message || 'Erro de validação.')
          }
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