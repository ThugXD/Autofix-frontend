import api from './api'
import { mockClientesService } from './mockClientesService'

// Usar mock data enquanto backend não está pronto
const USE_MOCK = true

export const clientesService = USE_MOCK ? mockClientesService : {
  // Listar todos os clientes (com paginação e filtros)
  getAll(params = {}) {
    return api.get('/clientes', { params })
  },

  // Buscar cliente por ID
  getById(id) {
    return api.get(`/clientes/${id}`)
  },

  // Criar novo cliente
  create(data) {
    return api.post('/clientes', data)
  },

  // Atualizar cliente existente
  update(id, data) {
    return api.put(`/clientes/${id}`, data)
  },

  // Deletar cliente
  delete(id) {
    return api.delete(`/clientes/${id}`)
  },

  // Buscar clientes (autocomplete)
  search(query) {
    return api.get('/clientes/search', { params: { q: query } })
  }
}