import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import clientesApi from '@/services/clientesService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useClientesStore = defineStore('clientes', () => {
  // ========== STATE ==========
  const clientes = ref([])
  const loading = ref(false)
  const filters = ref({
    search: '',
    orderBy: 'createdAt',
    order: 'desc'
  })
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0
  })

  // ========== GETTERS ==========
  const hasClientes = computed(() => clientes.value.length > 0)
  const totalClientes = computed(() => pagination.value.total)

  // ========== ACTIONS ==========

  /**
   * Buscar clientes com paginação e filtros
   */
  const fetchClientes = async (page = 1) => {
    try {
      loading.value = true

      const params = {
        page,
        perPage: pagination.value.perPage,
        ...filters.value
      }

      const response = await clientesApi.getAll(params)
      const { data, meta } = response.data

      clientes.value = data

      // Atualizar paginação
      if (meta) {
        pagination.value = {
          currentPage: meta.current_page,
          lastPage: meta.total_pages,
          perPage: meta.per_page,
          total: meta.total
        }
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      toast.error('Erro ao carregar clientes')
    } finally {
      loading.value = false
    }
  }

  /**
   * Criar novo cliente
   */
  const createCliente = async (data) => {
    try {
      loading.value = true
      const response = await clientesApi.create(data)

      toast.success('Cliente cadastrado com sucesso!')
      
      // Recarregar lista
      await fetchClientes(pagination.value.currentPage)
      
      return true
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      
      // Erro específico do backend
      const message = error.response?.data?.message || 'Erro ao cadastrar cliente'
      toast.error(message)
      
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Atualizar cliente
   */
  const updateCliente = async (id, data) => {
    try {
      loading.value = true
      const response = await clientesApi.update(id, data)

      toast.success('Cliente atualizado com sucesso!')
      
      // Recarregar lista
      await fetchClientes(pagination.value.currentPage)
      
      return true
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      
      const message = error.response?.data?.message || 'Erro ao atualizar cliente'
      toast.error(message)
      
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Deletar cliente
   */
  const deleteCliente = async (id) => {
    try {
      loading.value = true
      await clientesApi.delete(id)

      toast.success('Cliente excluído com sucesso!')
      
      // Recarregar lista
      await fetchClientes(pagination.value.currentPage)
      
      return true
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
      
      const message = error.response?.data?.message || 'Erro ao excluir cliente'
      toast.error(message)
      
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Definir filtros de busca
   */
  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchClientes(1) // Volta para primeira página
  }

  /**
   * Limpar filtros
   */
  const clearFilters = () => {
    filters.value = {
      search: '',
      orderBy: 'createdAt',
      order: 'desc'
    }
    fetchClientes(1)
  }

  // ========== RETURN ==========
  return {
    // State
    clientes,
    loading,
    filters,
    pagination,
    // Getters
    hasClientes,
    totalClientes,
    // Actions
    fetchClientes,
    createCliente,
    updateCliente,
    deleteCliente,
    setFilters,
    clearFilters
  }
})