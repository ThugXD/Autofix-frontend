import api from './api'
import { mockUsersService } from './mockUsersService'

const USE_MOCK = false

export const usersService = USE_MOCK ? mockUsersService : {
  getAll(params = {}) {
    return api.get('/users', { params })
  },

  getById(id) {
    return api.get(`/users/${id}`)
  },

  create(data) {
    return api.post('/users', data)
  },

  update(id, data) {
    return api.put(`/users/${id}`, data)
  },

  delete(id) {
    return api.delete(`/users/${id}`)
  },

  updatePassword(id, data) {
    return api.put(`/users/${id}/password`, data)
  }
}