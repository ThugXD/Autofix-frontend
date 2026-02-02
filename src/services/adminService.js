import api from './api'

export default {
    // Dashboard
    getStats() {
        return api.get('/admin/dashboard/stats')
    },

    // Tenants (Oficinas)
    getAllTenants(params) {
        return api.get('/admin/tenants', { params })
    },

    getTenantById(id) {
        return api.get(`/admin/tenants/${id}`)
    },

    createTenant(data) {
        return api.post('/admin/tenants', data)
    },

    updateTenant(id, data) {
        return api.put(`/admin/tenants/${id}`, data)
    },

    deleteTenant(id) {
        return api.delete(`/admin/tenants/${id}`)
    },

    // Audit Logs
    getAuditLogs(params) {
        return api.get('/admin/audit-logs', { params })
    }
}
