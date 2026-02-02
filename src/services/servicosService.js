import api from './api'
import { mockServicosService } from './mockServicosService'

const USE_MOCK = false

export const servicosService = USE_MOCK ? mockServicosService : {
  getAll(params = {}) {
    return api.get('/servicos', { params })
  },

  getById(id) {
    return api.get(`/servicos/${id}`)
  },

  create(data) {
    return api.post('/servicos', data)
  },

  update(id, data) {
    return api.put(`/servicos/${id}`, data)
  },

  delete(id) {
    return api.delete(`/servicos/${id}`)
  },

  getActive() {
    return api.get('/servicos', { params: { isActive: true } })
  }
}