import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ordensApi from '@/services/ordensServicoService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useOrdensServicoStore = defineStore('ordensServico', () => {
  // ========== STATE ==========
  const ordens = ref([])
  const currentOrdem = ref(null)
  const loading = ref(false)
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0
  })
  const filters = ref({
    search: '',
    status: '',
    priority: '',
    clienteId: null,
    veiculoId: null,
    responsavelId: null,
    dateFrom: '',
    dateTo: '',
    orderBy: 'dataAbertura',
    order: 'desc'
  })
  const stats = ref({
    total: 0,
    pendentes: 0,
    em_andamento: 0,
    concluidas: 0,
    receita_total: 0
  })

  // ========== GETTERS ==========
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

  // ========== ACTIONS ==========

  /**
   * Buscar ordens com filtros
   */
  const fetchOrdens = async (page = 1) => {
    try {
      loading.value = true

      const params = {
        page,
        perPage: pagination.value.perPage,
        search: filters.value.search,
        status: filters.value.status,
        priority: filters.value.priority,
        clienteId: filters.value.clienteId,
        veiculoId: filters.value.veiculoId,
        responsavelId: filters.value.responsavelId,
        dateFrom: filters.value.dateFrom,
        dateTo: filters.value.dateTo,
        orderBy: filters.value.orderBy,
        order: filters.value.order
      }

      // Filter out empty/null parameters to avoid 400 errors
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
      )

      const response = await ordensApi.getAll(filteredParams)
      const { data, meta } = response.data

      ordens.value = data

      // Atualizar paginação
      if (meta) {
        pagination.value = {
          currentPage: meta.current_page,
          lastPage: meta.total_pages,
          perPage: meta.per_page,
          total: meta.total
        }
      }

      // Calcular stats
      calculateStats()
    } catch (error) {
      console.error('Erro ao buscar ordens:', error)
      toast.error('Erro ao carregar ordens de serviço')
    } finally {
      loading.value = false
    }
  }

  /**
   * Buscar ordem por ID
   */
  const fetchOrdemById = async (id) => {
    try {
      loading.value = true
      const response = await ordensApi.getById(id)
      currentOrdem.value = response.data.data
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar ordem:', error)
      toast.error('Ordem de serviço não encontrada')
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Criar nova ordem
   */
  const createOrdem = async (data) => {
    try {
      loading.value = true
      const response = await ordensApi.create(data)

      toast.success('Ordem de serviço criada com sucesso!')
      await fetchOrdens(pagination.value.currentPage)

      return response.data.data
    } catch (error) {
      console.error('Erro ao criar ordem:', error)

      const message = error.response?.data?.message || 'Erro ao criar ordem'
      toast.error(message)

      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Atualizar ordem
   */
  const updateOrdem = async (id, data) => {
    try {
      loading.value = true
      const response = await ordensApi.update(id, data)

      // Atualizar na lista
      const index = ordens.value.findIndex(o => o.id === id)
      if (index !== -1) {
        ordens.value[index] = response.data.data
      }

      // Atualizar currentOrdem se for a mesma
      if (currentOrdem.value?.id === id) {
        currentOrdem.value = response.data.data
      }

      toast.success('Ordem atualizada com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error)

      const message = error.response?.data?.message || 'Erro ao atualizar ordem'
      toast.error(message)

      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Atualizar status da ordem
   */
  const updateStatus = async (id, status) => {
    try {
      loading.value = true
      await ordensApi.updateStatus(id, status)

      // Atualizar na lista
      const index = ordens.value.findIndex(o => o.id === id)
      if (index !== -1) {
        ordens.value[index].status = status
        if (status === 'concluido') {
          ordens.value[index].dataConclusao = new Date().toISOString()
        }
      }

      // Atualizar currentOrdem se for a mesma
      if (currentOrdem.value?.id === id) {
        currentOrdem.value.status = status
        if (status === 'concluido') {
          currentOrdem.value.dataConclusao = new Date().toISOString()
        }
      }

      toast.success('Status atualizado com sucesso!')
      calculateStats()
      return true
    } catch (error) {
      console.error('Erro ao atualizar status:', error)

      const message = error.response?.data?.message || 'Erro ao atualizar status'
      toast.error(message)

      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Deletar ordem
   */
  const deleteOrdem = async (id) => {
    try {
      loading.value = true
      await ordensApi.delete(id)

      ordens.value = ordens.value.filter(o => o.id !== id)
      toast.success('Ordem removida com sucesso!')

      // Se a lista ficou vazia e não está na primeira página, volta uma página
      if (ordens.value.length === 0 && pagination.value.currentPage > 1) {
        await fetchOrdens(pagination.value.currentPage - 1)
      } else {
        await fetchOrdens(pagination.value.currentPage)
      }

      return true
    } catch (error) {
      console.error('Erro ao deletar ordem:', error)

      const message = error.response?.data?.message || 'Erro ao remover ordem'
      toast.error(message)

      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Adicionar item à ordem
   */
  const addItem = async (ordemId, itemData) => {
    try {
      await ordensApi.addItem(ordemId, itemData)

      // Recarregar ordem para atualizar totais
      if (currentOrdem.value?.id === ordemId) {
        await fetchOrdemById(ordemId)
      }

      toast.success('Item adicionado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao adicionar item:', error)

      const message = error.response?.data?.message || 'Erro ao adicionar item'
      toast.error(message)

      return false
    }
  }

  /**
   * Remover item da ordem
   */
  const removeItem = async (ordemId, itemId) => {
    try {
      await ordensApi.removeItem(ordemId, itemId)

      // Recarregar ordem para atualizar totais
      if (currentOrdem.value?.id === ordemId) {
        await fetchOrdemById(ordemId)
      }

      toast.success('Item removido com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao remover item:', error)

      const message = error.response?.data?.message || 'Erro ao remover item'
      toast.error(message)

      return false
    }
  }

  /**
   * Registar pagamento na ordem
   */
  const addPayment = async (ordemId, paymentData) => {
    try {
      loading.value = true
      const response = await ordensApi.addPayment(ordemId, paymentData)

      // A resposta do backend já traz a ordem completa atualizada
      currentOrdem.value = response.data.data

      toast.success('Pagamento registado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao registar pagamento:', error)
      const message = error.response?.data?.message || 'Erro ao registar pagamento'
      toast.error(message)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Calcular estatísticas
   */
  const calculateStats = () => {
    stats.value = {
      total: ordens.value.length,
      pendentes: ordens.value.filter(o => o.status === 'pendente').length,
      em_andamento: ordens.value.filter(o => o.status === 'em_andamento').length,
      concluidas: ordens.value.filter(o => o.status === 'concluido').length,
      receita_total: ordens.value
        .filter(o => o.status === 'concluido')
        .reduce((sum, o) => sum + parseFloat(o.total || 0), 0)
    }
  }

  /**
   * Definir filtros
   */
  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchOrdens(1) // Volta para primeira página
  }

  /**
   * Limpar filtros
   */
  const clearFilters = () => {
    filters.value = {
      search: '',
      status: '',
      priority: '',
      clienteId: null,
      veiculoId: null,
      responsavelId: null,
      dateFrom: '',
      dateTo: '',
      orderBy: 'dataAbertura',
      order: 'desc'
    }
    fetchOrdens(1)
  }

  /**
   * Buscar estatísticas das ordens
   */
  const fetchStats = async () => {
    try {
      loading.value = true

      // Calcular stats baseado nas ordens atuais
      // Ou fazer uma chamada específica ao backend se existir endpoint
      calculateStats()

      return stats.value
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      return stats.value
    } finally {
      loading.value = false
    }
  }

  // ========== RETURN ==========
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
    setFilters,
    clearFilters,
    fetchStats
  }
})