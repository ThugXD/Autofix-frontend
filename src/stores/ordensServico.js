import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ordensServicoService } from '@/services/ordensServicoService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useOrdensServicoStore = defineStore('ordensServico', () => {
  // State
  const ordens = ref([])
  const currentOrdem = ref(null)
  const loading = ref(false)
  const pagination = ref({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1
  })
  const filters = ref({
    search: '',
    status: '',
    priority: '',
    cliente_id: null,
    orderBy: 'data_abertura',
    orderDirection: 'desc'
  })
  const stats = ref({
    total: 0,
    pendentes: 0,
    em_andamento: 0,
    concluidas: 0,
    receita_total: 0
  })

  // Getters
  const totalOrdens = computed(() => pagination.value.total)
  const hasOrdens = computed(() => ordens.value.length > 0)
  
  const ordensPorStatus = computed(() => {
    return {
      pendente: ordens.value.filter(o => o.status === 'pendente'),
      em_andamento: ordens.value.filter(o => o.status === 'em_andamento'),
      aguardando_pecas: ordens.value.filter(o => o.status === 'aguardando_pecas'),
      concluido: ordens.value.filter(o => o.status === 'concluido'),
      cancelado: ordens.value.filter(o => o.status === 'cancelado')
    }
  })

  // Actions
  const fetchOrdens = async (page = 1) => {
    try {
      loading.value = true
      const params = {
        page,
        per_page: pagination.value.perPage,
        search: filters.value.search,
        status: filters.value.status,
        priority: filters.value.priority,
        cliente_id: filters.value.cliente_id,
        order_by: filters.value.orderBy,
        order_direction: filters.value.orderDirection
      }

      const response = await ordensServicoService.getAll(params)
      
      ordens.value = response.data.data
      pagination.value = {
        currentPage: response.data.current_page,
        perPage: response.data.per_page,
        total: response.data.total,
        lastPage: response.data.last_page
      }
    } catch (error) {
      console.error('Erro ao buscar ordens:', error)
      toast.error('Erro ao carregar ordens de serviço')
    } finally {
      loading.value = false
    }
  }

  const fetchOrdemById = async (id) => {
    try {
      loading.value = true
      const response = await ordensServicoService.getById(id)
      currentOrdem.value = response.data
      return response.data
    } catch (error) {
      console.error('Erro ao buscar ordem:', error)
      toast.error('Ordem de serviço não encontrada')
      return null
    } finally {
      loading.value = false
    }
  }

  const createOrdem = async (data) => {
    try {
      loading.value = true
      const response = await ordensServicoService.create(data)
      ordens.value.unshift(response.data)
      toast.success('Ordem de serviço criada com sucesso!')
      await fetchOrdens(pagination.value.currentPage)
      return response.data
    } catch (error) {
      console.error('Erro ao criar ordem:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateOrdem = async (id, data) => {
    try {
      loading.value = true
      const response = await ordensServicoService.update(id, data)
      const index = ordens.value.findIndex(o => o.id === id)
      if (index !== -1) {
        ordens.value[index] = response.data
      }
      if (currentOrdem.value?.id === id) {
        currentOrdem.value = response.data
      }
      toast.success('Ordem atualizada com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateStatus = async (id, status) => {
    try {
      loading.value = true
      const response = await ordensServicoService.updateStatus(id, status)
      const index = ordens.value.findIndex(o => o.id === id)
      if (index !== -1) {
        ordens.value[index].status = status
        if (status === 'concluido') {
          ordens.value[index].data_conclusao = new Date().toISOString()
        }
      }
      if (currentOrdem.value?.id === id) {
        currentOrdem.value.status = status
        if (status === 'concluido') {
          currentOrdem.value.data_conclusao = new Date().toISOString()
        }
      }
      toast.success('Status atualizado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteOrdem = async (id) => {
    try {
      loading.value = true
      await ordensServicoService.delete(id)
      ordens.value = ordens.value.filter(o => o.id !== id)
      toast.success('Ordem removida com sucesso!')
      
      if (ordens.value.length === 0 && pagination.value.currentPage > 1) {
        await fetchOrdens(pagination.value.currentPage - 1)
      } else {
        await fetchOrdens(pagination.value.currentPage)
      }
      return true
    } catch (error) {
      console.error('Erro ao deletar ordem:', error)
      toast.error('Erro ao remover ordem')
      return false
    } finally {
      loading.value = false
    }
  }

  const addItem = async (ordemId, itemData) => {
    try {
      const response = await ordensServicoService.addItem(ordemId, itemData)
      if (currentOrdem.value?.id === ordemId) {
        currentOrdem.value.itens.push(response.data)
        await fetchOrdemById(ordemId) // Recarregar para atualizar totais
      }
      toast.success('Item adicionado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
      return false
    }
  }

  const removeItem = async (ordemId, itemId) => {
    try {
      await ordensServicoService.removeItem(ordemId, itemId)
      if (currentOrdem.value?.id === ordemId) {
        currentOrdem.value.itens = currentOrdem.value.itens.filter(i => i.id !== itemId)
        await fetchOrdemById(ordemId) // Recarregar para atualizar totais
      }
      toast.success('Item removido com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao remover item:', error)
      return false
    }
  }

  const addPayment = async (ordemId, paymentData) => {
    try {
      const response = await ordensServicoService.addPayment(ordemId, paymentData)
      if (currentOrdem.value?.id === ordemId) {
        currentOrdem.value.pagamentos.push(response.data)
      }
      toast.success('Pagamento registrado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao adicionar pagamento:', error)
      return false
    }
  }

  const fetchStats = async () => {
    try {
      const response = await ordensServicoService.getStats()
      stats.value = response.data
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchOrdens(1)
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      status: '',
      priority: '',
      cliente_id: null,
      orderBy: 'data_abertura',
      orderDirection: 'desc'
    }
    fetchOrdens(1)
  }

  return {
    // State
    ordens,
    currentOrdem,
    loading,
    pagination,
    filters,
    stats,
    
    // Getters
    totalOrdens,
    hasOrdens,
    ordensPorStatus,
    
    // Actions
    fetchOrdens,
    fetchOrdemById,
    createOrdem,
    updateOrdem,
    updateStatus,
    deleteOrdem,
    addItem,
    removeItem,
    addPayment,
    fetchStats,
    setFilters,
    clearFilters
  }
})
