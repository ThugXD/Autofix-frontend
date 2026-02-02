import api from './api'
import { mockVeiculosService } from './mockVeiculosService'

// Usar mock data enquanto backend não está pronto
const USE_MOCK = false


export const veiculosService = USE_MOCK ? mockVeiculosService : {
  // Listar todos os veículos (com paginação e filtros)
  getAll(params = {}) {
    return api.get('/veiculos', { params })
  },

  // Buscar veículo por ID
  getById(id) {
    return api.get(`/veiculos/${id}`)
  },

  // Buscar veículos de um cliente específico
  getByCliente(clienteId) {
    return api.get(`/veiculos/cliente/${clienteId}`)
  },

  // Criar novo veículo
  create(data) {
    return api.post('/veiculos', data)
  },

  // Atualizar veículo existente
  update(id, data) {
    return api.put(`/veiculos/${id}`, data)
  },

  // Deletar veículo
  delete(id) {
    return api.delete(`/veiculos/${id}`)
  },

  // Buscar veículos (autocomplete)
  search(query) {
    return api.get('/veiculos/search', { params: { q: query } })
  },

  // Upload de fotos do veículo
  uploadPhotos(id, photos) {
    const formData = new FormData()
    photos.forEach(photo => {
      formData.append('photos', photo)
    })
    return api.post(`/veiculos/${id}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Deletar foto específica
  deletePhoto(id, photoUrl) {
    return api.delete(`/veiculos/${id}/photos`, { data: { photo: photoUrl } })
  }
}