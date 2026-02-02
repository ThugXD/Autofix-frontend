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
    isActive: true,
    orderBy: 'name',
    order: 'asc'
  })

  const totalServicos = computed(() => pagination.value.total)
  const hasServicos = computed(() => servicos.value.length > 0)

  const fetchServicos = async (page = 1, options = {}) => {
    try {
      loading.value = true
      const params = {
        page,
        perPage: options.perPage || pagination.value.perPage,
        search: filters.value.search,
        category: filters.value.category,
        isActive: filters.value.isActive,
        orderBy: filters.value.orderBy,
        order: filters.value.order
      }

      const response = await servicosService.getAll(params)
      const { data, meta } = response.data

      servicos.value = data
      if (meta) {
        pagination.value = {
          currentPage: meta.current_page,
          perPage: meta.per_page,
          total: meta.total,
          lastPage: meta.total_pages
        }
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
      const { data } = response.data
      currentServico.value = data
      return data
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
      const newServico = response.data.data
      servicos.value.unshift(newServico)
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
      const updatedServico = response.data.data
      const index = servicos.value.findIndex(s => s.id === id)
      if (index !== -1) {
        servicos.value[index] = updatedServico
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
      isActive: true,
      orderBy: 'name',
      order: 'asc'
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