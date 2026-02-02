import api from './api'

export default {
  /**
   * Listar clientes com paginação e busca
   */
  getAll(params = {}) {
    return api.get('/clientes', { params })
  },

  /**
   * Buscar cliente por ID
   */
  getById(id) {
    return api.get(`/clientes/${id}`)
  },

  /**
   * Criar novo cliente
   */
  create(data) {
    return api.post('/clientes', data)
  },

  /**
   * Atualizar cliente
   */
  update(id, data) {
    return api.put(`/clientes/${id}`, data)
  },

  /**
   * Deletar cliente
   */
  delete(id) {
    return api.delete(`/clientes/${id}`)
  },

  /**
   * Buscar estatísticas do cliente
   */
  getStats(id) {
    return api.get(`/clientes/${id}/stats`)
  }
}