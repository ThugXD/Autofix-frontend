import api from './api'

export const notificationsService = {
    // Listar notificações do usuário
    getNotifications(params) {
        return api.get('/notifications', { params })
    },

    // Marcar como lida
    markAsRead(id) {
        return api.put(`/notifications/${id}/read`)
    },

    // Marcar todas como lidas
    markAllAsRead() {
        return api.put('/notifications/read-all')
    }
}
