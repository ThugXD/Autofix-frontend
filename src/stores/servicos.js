import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { servicosService } from '@/services/servicosService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useServicosStore = defineStore('servicos', () => {
  const servicos = ref([])
  const currentServico = ref(null)
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
    is_active: true,
    orderBy: 'name',
    orderDirection: 'asc'
  })

  const totalServicos = computed(() => pagination.value.total)
  const hasServicos = computed(() => servicos.value.length > 0)

  const fetchServicos = async (page = 1) => {
    try {
      loading.value = true
      const params = {
        page,
        per_page: pagination.value.perPage,
        search: filters.value.search,
        category: filters.value.category,
        is_active: filters.value.is_active,
        order_by: filters.value.orderBy,
        order_direction: filters.value.orderDirection
      }

      const response = await servicosService.getAll(params)
      
      servicos.value = response.data.data
      pagination.value = {
        currentPage: response.data.current_page,
        perPage: response.data.per_page,
        total: response.data.total,
        lastPage: response.data.last_page
      }
    } catch (error) {
      console.error('Erro ao buscar serviços:', error)
      toast.error('Erro ao carregar serviços')
    } finally {
      loading.value = false
    }
  }

  const fetchServicoById = async (id) => {
    try {
      loading.value = true
      const response = await servicosService.getById(id)
      currentServico.value = response.data
      return response.data
    } catch (error) {
      console.error('Erro ao buscar serviço:', error)
      toast.error('Serviço não encontrado')
      return null
    } finally {
      loading.value = false
    }
  }

  const createServico = async (data) => {
    try {
      loading.value = true
      const response = await servicosService.create(data)
      servicos.value.unshift(response.data)
      toast.success('Serviço cadastrado com sucesso!')
      await fetchServicos(pagination.value.currentPage)
      return true
    } catch (error) {
      console.error('Erro ao criar serviço:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateServico = async (id, data) => {
    try {
      loading.value = true
      const response = await servicosService.update(id, data)
      const index = servicos.value.findIndex(s => s.id === id)
      if (index !== -1) {
        servicos.value[index] = response.data
      }
      toast.success('Serviço atualizado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteServico = async (id) => {
    try {
      loading.value = true
      await servicosService.delete(id)
      servicos.value = servicos.value.filter(s => s.id !== id)
      toast.success('Serviço removido com sucesso!')
      
      if (servicos.value.length === 0 && pagination.value.currentPage > 1) {
        await fetchServicos(pagination.value.currentPage - 1)
      } else {
        await fetchServicos(pagination.value.currentPage)
      }
      return true
    } catch (error) {
      console.error('Erro ao deletar serviço:', error)
      toast.error('Erro ao remover serviço')
      return false
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchServicos(1)
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      category: '',
      is_active: true,
      orderBy: 'name',
      orderDirection: 'asc'
    }
    fetchServicos(1)
  }

  return {
    servicos,
    currentServico,
    loading,
    pagination,
    filters,
    totalServicos,
    hasServicos,
    fetchServicos,
    fetchServicoById,
    createServico,
    updateServico,
    deleteServico,
    setFilters,
    clearFilters
  }
})