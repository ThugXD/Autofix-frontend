import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pecasService } from '@/services/pecasService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const usePecasStore = defineStore('pecas', () => {
    // State
    const pecas = ref([])
    const currentPeca = ref(null)
    const loading = ref(false)
    const pagination = ref({
        currentPage: 1,
        perPage: 10,
        total: 0,
        lastPage: 1
    })
    const filters = ref({
        search: '',
        category: '',
        lowStock: false,
        isActive: true,
        orderBy: 'name',
        order: 'asc'
    })

    // Getters
    const totalPecas = computed(() => pagination.value.total)
    const hasPecas = computed(() => pecas.value.length > 0)

    // Actions
    const fetchPecas = async (page = 1, options = {}) => {
        try {
            loading.value = true
            const params = {
                page,
                perPage: options.perPage || pagination.value.perPage,
                search: filters.value.search,
                category: filters.value.category,
                lowStock: !!filters.value.lowStock,
                isActive: !!filters.value.isActive,
                orderBy: filters.value.orderBy,
                order: filters.value.order
            }

            const response = await pecasService.getAll(params)
            const { data, meta } = response.data

            pecas.value = data
            if (meta) {
                pagination.value = {
                    currentPage: meta.current_page,
                    perPage: meta.per_page,
                    total: meta.total,
                    lastPage: meta.total_pages
                }
            }
        } catch (error) {
            console.error('Erro ao buscar peças:', error)
            toast.error('Erro ao carregar peças')
        } finally {
            loading.value = false
        }
    }

    const fetchPecaById = async (id) => {
        try {
            loading.value = true
            const response = await pecasService.getById(id)
            const { data } = response.data
            currentPeca.value = data
            return data
        } catch (error) {
            console.error('Erro ao buscar peça:', error)
            toast.error('Peça não encontrada')
            return null
        } finally {
            loading.value = false
        }
    }

    const createPeca = async (data) => {
        try {
            loading.value = true
            const response = await pecasService.create(data)
            const newPeca = response.data.data
            pecas.value.unshift(newPeca)
            toast.success('Peça cadastrada com sucesso!')
            await fetchPecas(pagination.value.currentPage)
            return true
        } catch (error) {
            console.error('Erro ao criar peça:', error)
            const message = error.response?.data?.message || 'Erro ao criar peça'
            toast.error(message)
            return false
        } finally {
            loading.value = false
        }
    }

    const updatePeca = async (id, data) => {
        try {
            loading.value = true
            const response = await pecasService.update(id, data)
            const updatedPeca = response.data.data
            const index = pecas.value.findIndex(p => p.id === id)
            if (index !== -1) {
                pecas.value[index] = updatedPeca
            }
            toast.success('Peça atualizada com sucesso!')
            return true
        } catch (error) {
            console.error('Erro ao atualizar peça:', error)
            const message = error.response?.data?.message || 'Erro ao atualizar peça'
            toast.error(message)
            return false
        } finally {
            loading.value = false
        }
    }

    const deletePeca = async (id) => {
        try {
            loading.value = true
            await pecasService.delete(id)
            pecas.value = pecas.value.filter(p => p.id !== id)
            toast.success('Peça removida no sucesso!')

            if (pecas.value.length === 0 && pagination.value.currentPage > 1) {
                await fetchPecas(pagination.value.currentPage - 1)
            } else {
                await fetchPecas(pagination.value.currentPage)
            }
            return true
        } catch (error) {
            console.error('Erro ao deletar peça:', error)
            toast.error('Erro ao remover peça')
            return false
        } finally {
            loading.value = false
        }
    }

    const registrarMovimento = async (id, data) => {
        try {
            loading.value = true
            const response = await pecasService.addMovement(id, data)
            const updatedPeca = response.data.data
            const index = pecas.value.findIndex(p => p.id === id)
            if (index !== -1) {
                pecas.value[index] = updatedPeca
            }
            toast.success('Movimento registado com sucesso!')
            return true
        } catch (error) {
            console.error('Erro ao registar movimento:', error)
            const message = error.response?.data?.message || 'Erro ao registar movimento'
            toast.error(message)
            return false
        } finally {
            loading.value = false
        }
    }

    const setFilters = (newFilters) => {
        filters.value = { ...filters.value, ...newFilters }
        fetchPecas(1)
    }

    const clearFilters = () => {
        filters.value = {
            search: '',
            category: '',
            lowStock: false,
            isActive: true,
            orderBy: 'name',
            order: 'asc'
        }
        fetchPecas(1)
    }

    return {
        pecas,
        currentPeca,
        loading,
        pagination,
        filters,
        totalPecas,
        hasPecas,
        fetchPecas,
        fetchPecaById,
        createPeca,
        updatePeca,
        deletePeca,
        registrarMovimento,
        setFilters,
        clearFilters
    }
})
