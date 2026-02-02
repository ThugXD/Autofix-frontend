import api from './api'

export default {
  /**
   * Listar todas as ordens (com paginação e filtros)
   */
  getAll(params = {}) {
    return api.get('/ordens-servico', { params })
  },

  /**
   * Buscar ordem por ID
   */
  getById(id) {
    return api.get(`/ordens-servico/${id}`)
  },

  /**
   * Criar nova ordem
   */
  create(data) {
    return api.post('/ordens-servico', data)
  },

  /**
   * Atualizar ordem existente
   */
  update(id, data) {
    return api.put(`/ordens-servico/${id}`, data)
  },

  /**
   * Atualizar apenas o status da ordem
   */
  updateStatus(id, status) {
    return api.patch(`/ordens-servico/${id}/status`, { status })
  },

  /**
   * Deletar ordem
   */
  delete(id) {
    return api.delete(`/ordens-servico/${id}`)
  },

  /**
   * Adicionar item (serviço ou peça) à ordem
   */
  addItem(ordemId, itemData) {
    return api.post(`/ordens-servico/${ordemId}/itens`, itemData)
  },

  /**
   * Remover item da ordem
   */
  removeItem(ordemId, itemId) {
    return api.delete(`/ordens-servico/${ordemId}/itens/${itemId}`)
  },

  /**
   * Registar pagamento para a ordem
   */
  addPayment(ordemId, data) {
    return api.post(`/ordens-servico/${ordemId}/pagamentos`, data)
  },

  /**
   * Buscar ordens de um cliente específico
   */
  getByCliente(clienteId) {
    return api.get('/ordens-servico', { params: { clienteId } })
  },

  /**
   * Buscar ordens de um veículo específico
   */
  getByVeiculo(veiculoId) {
    return api.get('/ordens-servico', { params: { veiculoId } })
  }
}