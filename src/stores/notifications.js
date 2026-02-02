import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { notificationsService } from '@/services/notificationsService'

export const useNotificationsStore = defineStore('notifications', () => {
    // State
    const notifications = ref([])
    const loading = ref(false)
    const pagination = ref({
        currentPage: 1,
        perPage: 20,
        total: 0,
        lastPage: 1
    })
    const unreadCount = computed(() => {
        return notifications.value.filter(n => !n.read).length
    })

    // Polling state
    let pollingInterval = null

    // Actions
    const fetchNotifications = async (page = 1) => {
        try {
            loading.value = true
            const { data } = await notificationsService.getNotifications({
                page,
                perPage: pagination.value.perPage
            })

            const { data: items, meta } = data

            if (page === 1) {
                notifications.value = items
            } else {
                notifications.value = [...notifications.value, ...items]
            }

            pagination.value = {
                currentPage: meta.current_page,
                perPage: meta.per_page,
                total: meta.total,
                lastPage: meta.total_pages
            }
        } catch (error) {
            console.error('Erro ao buscar notificações:', error)
        } finally {
            loading.value = false
        }
    }

    const markAsRead = async (id) => {
        try {
            // Otimistic update
            const index = notifications.value.findIndex(n => n.id === id)
            if (index !== -1) {
                notifications.value[index].read = true
            }

            await notificationsService.markAsRead(id)
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error)
        }
    }

    const markAllAsRead = async () => {
        try {
            // Otimistic update
            notifications.value.forEach(n => n.read = true)

            await notificationsService.markAllAsRead()
        } catch (error) {
            console.error('Erro ao marcar todas notificações:', error)
        }
    }

    const startPolling = (intervalMs = 60000) => {
        if (pollingInterval) return

        // Fetch immediately
        fetchNotifications(1)

        pollingInterval = setInterval(() => {
            // Silent fetch (don't set loading true to avoid UI flicker)
            notificationsService.getNotifications({ page: 1, perPage: 20 })
                .then(({ data }) => {
                    notifications.value = data.data
                    pagination.value.total = data.meta.total
                })
                .catch(err => console.error('Polling error:', err))
        }, intervalMs)
    }

    const stopPolling = () => {
        if (pollingInterval) {
            clearInterval(pollingInterval)
            pollingInterval = null
        }
    }

    return {
        notifications,
        loading,
        pagination,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        startPolling,
        stopPolling
    }
})
