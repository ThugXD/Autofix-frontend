import api from './api'
import { mockPecasService } from './mockPecasService'

const USE_MOCK = true

export const pecasService = USE_MOCK ? mockPecasService : {
  getAll(params = {}) {
    return api.get('/pecas', { params })
  },

  getById(id) {
    return api.get(`/pecas/${id}`)
  },

  create(data) {
    return api.post('/pecas', data)
  },

  update(id, data) {
    return api.put(`/pecas/${id}`, data)
  },

  delete(id) {
    return api.delete(`/pecas/${id}`)
  },

  addMovement(id, data) {
    return api.post(`/pecas/${id}/movimento`, data)
  },

  getLowStock() {
    return api.get('/pecas/low-stock')
  }
}