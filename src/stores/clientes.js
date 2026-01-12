import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { clientesService } from '@/services/clientesService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useClientesStore = defineStore('clientes', () => {
  // State
  const clientes = ref([])
  const currentCliente = ref(null)
  const loading = ref(false)
  const pagination = ref({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1
  })
  const filters = ref({
    search: '',
    orderBy: 'name',
    orderDirection: 'asc'
  })

  // Getters
  const totalClientes = computed(() => pagination.value.total)
  const hasClientes = computed(() => clientes.value.length > 0)

  // Actions
  const fetchClientes = async (page = 1) => {
    try {
      loading.value = true
      const params = {
        page,
        per_page: pagination.value.perPage,
        search: filters.value.search,
        order_by: filters.value.orderBy,
        order_direction: filters.value.orderDirection
      }

      const response = await clientesService.getAll(params)
      
      clientes.value = response.data.data
      pagination.value = {
        currentPage: response.data.current_page,
        perPage: response.data.per_page,
        total: response.data.total,
        lastPage: response.data.last_page
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      toast.error('Erro ao carregar clientes')
    } finally {
      loading.value = false
    }
  }

  const fetchClienteById = async (id) => {
    try {
      loading.value = true
      const response = await clientesService.getById(id)
      currentCliente.value = response.data
      return response.data
    } catch (error) {
      console.error('Erro ao buscar cliente:', error)
      toast.error('Cliente não encontrado')
      return null
    } finally {
      loading.value = false
    }
  }

  const createCliente = async (data) => {
    try {
      loading.value = true
      const response = await clientesService.create(data)
      clientes.value.unshift(response.data)
      toast.success('Cliente cadastrado com sucesso!')
      await fetchClientes(pagination.value.currentPage)
      return true
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateCliente = async (id, data) => {
    try {
      loading.value = true
      const response = await clientesService.update(id, data)
      const index = clientes.value.findIndex(c => c.id === id)
      if (index !== -1) {
        clientes.value[index] = response.data
      }
      toast.success('Cliente atualizado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteCliente = async (id) => {
    try {
      loading.value = true
      await clientesService.delete(id)
      clientes.value = clientes.value.filter(c => c.id !== id)
      toast.success('Cliente removido com sucesso!')
      
      // Se a página ficar vazia, voltar para a página anterior
      if (clientes.value.length === 0 && pagination.value.currentPage > 1) {
        await fetchClientes(pagination.value.currentPage - 1)
      } else {
        await fetchClientes(pagination.value.currentPage)
      }
      return true
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
      toast.error('Erro ao remover cliente')
      return false
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchClientes(1) // Resetar para primeira página ao filtrar
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      orderBy: 'name',
      orderDirection: 'asc'
    }
    fetchClientes(1)
  }

  return {
    // State
    clientes,
    currentCliente,
    loading,
    pagination,
    filters,
    
    // Getters
    totalClientes,
    hasClientes,
    
    // Actions
    fetchClientes,
    fetchClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    setFilters,
    clearFilters
  }
})