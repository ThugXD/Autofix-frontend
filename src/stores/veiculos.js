import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { veiculosService } from '@/services/veiculosService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useVeiculosStore = defineStore('veiculos', () => {
  // State
  const veiculos = ref([])
  const currentVeiculo = ref(null)
  const loading = ref(false)
  const pagination = ref({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1
  })
  const filters = ref({
    search: '',
    cliente_id: null,
    brand: '',
    year: null,
    orderBy: 'created_at',
    orderDirection: 'desc'
  })

  // Getters
  const totalVeiculos = computed(() => pagination.value.total)
  const hasVeiculos = computed(() => veiculos.value.length > 0)

  // Lista única de marcas para filtro
  const availableBrands = computed(() => {
    const brands = [...new Set(veiculos.value.map(v => v.brand))]
    return brands.sort()
  })

  // Actions
  const fetchVeiculos = async (page = 1) => {
    try {
      loading.value = true
      const params = {
        page,
        per_page: pagination.value.perPage,
        search: filters.value.search,
        cliente_id: filters.value.cliente_id,
        brand: filters.value.brand,
        year: filters.value.year,
        order_by: filters.value.orderBy,
        order_direction: filters.value.orderDirection
      }

      const response = await veiculosService.getAll(params)
      
      veiculos.value = response.data.data
      pagination.value = {
        currentPage: response.data.current_page,
        perPage: response.data.per_page,
        total: response.data.total,
        lastPage: response.data.last_page
      }
    } catch (error) {
      console.error('Erro ao buscar veículos:', error)
      toast.error('Erro ao carregar veículos')
    } finally {
      loading.value = false
    }
  }

  const fetchVeiculoById = async (id) => {
    try {
      loading.value = true
      const response = await veiculosService.getById(id)
      currentVeiculo.value = response.data
      return response.data
    } catch (error) {
      console.error('Erro ao buscar veículo:', error)
      toast.error('Veículo não encontrado')
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchVeiculosByCliente = async (clienteId) => {
    try {
      loading.value = true
      const response = await veiculosService.getByCliente(clienteId)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar veículos do cliente:', error)
      toast.error('Erro ao carregar veículos do cliente')
      return []
    } finally {
      loading.value = false
    }
  }

  const createVeiculo = async (data) => {
    try {
      loading.value = true
      const response = await veiculosService.create(data)
      veiculos.value.unshift(response.data)
      toast.success('Veículo cadastrado com sucesso!')
      await fetchVeiculos(pagination.value.currentPage)
      return true
    } catch (error) {
      console.error('Erro ao criar veículo:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateVeiculo = async (id, data) => {
    try {
      loading.value = true
      const response = await veiculosService.update(id, data)
      const index = veiculos.value.findIndex(v => v.id === id)
      if (index !== -1) {
        veiculos.value[index] = response.data
      }
      toast.success('Veículo atualizado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteVeiculo = async (id) => {
    try {
      loading.value = true
      await veiculosService.delete(id)
      veiculos.value = veiculos.value.filter(v => v.id !== id)
      toast.success('Veículo removido com sucesso!')
      
      if (veiculos.value.length === 0 && pagination.value.currentPage > 1) {
        await fetchVeiculos(pagination.value.currentPage - 1)
      } else {
        await fetchVeiculos(pagination.value.currentPage)
      }
      return true
    } catch (error) {
      console.error('Erro ao deletar veículo:', error)
      toast.error('Erro ao remover veículo')
      return false
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchVeiculos(1)
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      cliente_id: null,
      brand: '',
      year: null,
      orderBy: 'created_at',
      orderDirection: 'desc'
    }
    fetchVeiculos(1)
  }

  return {
    // State
    veiculos,
    currentVeiculo,
    loading,
    pagination,
    filters,
    
    // Getters
    totalVeiculos,
    hasVeiculos,
    availableBrands,
    
    // Actions
    fetchVeiculos,
    fetchVeiculoById,
    fetchVeiculosByCliente,
    createVeiculo,
    updateVeiculo,
    deleteVeiculo,
    setFilters,
    clearFilters
  }
})