import api from './api'
import { mockOrdensServicoService } from './mockOrdensServicoService'

// Usar mock data enquanto backend não está pronto
const USE_MOCK = true

export const ordensServicoService = USE_MOCK ? mockOrdensServicoService : {
  // Listar todas as ordens (com paginação e filtros)
  getAll(params = {}) {
    return api.get('/ordens-servico', { params })
  },

  // Buscar ordem por ID
  getById(id) {
    return api.get(`/ordens-servico/${id}`)
  },

  // Criar nova ordem
  create(data) {
    return api.post('/ordens-servico', data)
  },

  // Atualizar ordem existente
  update(id, data) {
    return api.put(`/ordens-servico/${id}`, data)
  },

  // Atualizar apenas o status da ordem
  updateStatus(id, status) {
    return api.patch(`/ordens-servico/${id}/status`, { status })
  },

  // Deletar ordem
  delete(id) {
    return api.delete(`/ordens-servico/${id}`)
  },

  // Adicionar item (serviço ou peça) à ordem
  addItem(ordemId, itemData) {
    return api.post(`/ordens-servico/${ordemId}/itens`, itemData)
  },

  // Atualizar item da ordem
  updateItem(ordemId, itemId, itemData) {
    return api.put(`/ordens-servico/${ordemId}/itens/${itemId}`, itemData)
  },

  // Remover item da ordem
  removeItem(ordemId, itemId) {
    return api.delete(`/ordens-servico/${ordemId}/itens/${itemId}`)
  },

  // Adicionar pagamento à ordem
  addPayment(ordemId, paymentData) {
    return api.post(`/ordens-servico/${ordemId}/pagamentos`, paymentData)
  },

  // Buscar ordens de um cliente específico
  getByCliente(clienteId) {
    return api.get(`/ordens-servico/cliente/${clienteId}`)
  },

  // Buscar ordens de um veículo específico
  getByVeiculo(veiculoId) {
    return api.get(`/ordens-servico/veiculo/${veiculoId}`)
  },

  // Upload de fotos (antes/depois)
  uploadPhotos(id, type, photos) {
    const formData = new FormData()
    photos.forEach(photo => {
      formData.append('photos', photo)
    })
    return api.post(`/ordens-servico/${id}/photos/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Gerar PDF da ordem
  generatePDF(id) {
    return api.get(`/ordens-servico/${id}/pdf`, { responseType: 'blob' })
  },

  // Estatísticas de ordens
  getStats(params = {}) {
    return api.get('/ordens-servico/stats', { params })
  }
}