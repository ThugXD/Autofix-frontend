<template>
  <div>
    <!-- Header com Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="card bg-yellow-50 border border-yellow-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-yellow-700 mb-1">Pendentes</p>
            <h3 class="text-2xl font-bold text-yellow-900">{{ ordensStore.stats.pendentes }}</h3>
          </div>
          <Clock class="w-10 h-10 text-yellow-500" />
        </div>
      </div>

      <div class="card bg-blue-50 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-700 mb-1">Em Andamento</p>
            <h3 class="text-2xl font-bold text-blue-900">{{ ordensStore.stats.em_andamento }}</h3>
          </div>
          <Wrench class="w-10 h-10 text-blue-500" />
        </div>
      </div>

      <div class="card bg-green-50 border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-700 mb-1">Concluídas</p>
            <h3 class="text-2xl font-bold text-green-900">{{ ordensStore.stats.concluidas }}</h3>
          </div>
          <CheckCircle class="w-10 h-10 text-green-500" />
        </div>
      </div>

      <div class="card bg-purple-50 border border-purple-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-purple-700 mb-1">Receita Total</p>
            <h3 class="text-lg font-bold text-purple-900">
              {{ formatCurrency(ordensStore.stats.receita_total) }}
            </h3>
          </div>
          <DollarSign class="w-10 h-10 text-purple-500" />
        </div>
      </div>
    </div>

    <!-- Header com Filtros e Botão -->
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Ordens de Serviço</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ ordensStore.totalOrdens }} ordem(ns) registrada(s)
          </p>
        </div>

        <BaseButton
          variant="primary"
          :icon="Plus"
          @click="openCreateModal"
        >
          Nova Ordem
        </BaseButton>
      </div>

      <!-- Filtros -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Procurar por nº ordem, cliente, veículo..."
            :icon-left="Search"
            clearable
            @update:model-value="handleSearch"
          />
        </div>

        <select
          v-model="statusFilter"
          @change="handleStatusFilter"
          class="input"
        >
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="aguardando_pecas">Aguardando Peças</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <select
          v-model="priorityFilter"
          @change="handlePriorityFilter"
          class="input"
        >
          <option value="">Todas as prioridades</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
          <option value="urgente">Urgente</option>
        </select>
      </div>
    </div>

    <!-- Tabela de Ordens -->
    <div class="card">
      <OrdensTable
        :ordens="ordensStore.ordens"
        :loading="ordensStore.loading"
        @view="viewOrdem"
        @edit="editOrdem"
        @updateStatus="openStatusModal"
        @delete="openDeleteModal"
      />

      <!-- Paginação -->
      <div v-if="ordensStore.hasOrdens" class="mt-6 pt-6 border-t border-gray-200">
        <Pagination
          :current-page="ordensStore.pagination.currentPage"
          :last-page="ordensStore.pagination.lastPage"
          :total="ordensStore.pagination.total"
          :per-page="ordensStore.pagination.perPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Modal de Criação -->
    <OrdemCreateModal
      v-model="showCreateModal"
      @created="handleOrdemCreated"
    />

    <!-- Modal de Atualização de Status -->
    <StatusUpdateModal
      v-model="showStatusModal"
      :ordem="selectedOrdem"
      @updated="handleStatusUpdated"
    />

    <!-- Modal de Confirmação de Exclusão -->
    <DeleteConfirmation
      v-model="showDeleteModal"
      title="Excluir Ordem de Serviço"
      :message="`Deseja realmente excluir a ordem ${selectedOrdem?.numero}?`"
      :loading="deleteLoading"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrdensServicoStore } from '@/stores/ordensServico'
import {
  Plus,
  Search,
  Clock,
  Wrench,
  CheckCircle,
  DollarSign
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import OrdensTable from '@/components/ordens/OrdensTable.vue'
import OrdemCreateModal from '@/components/ordens/OrdemCreateModal.vue'
import StatusUpdateModal from '@/components/ordens/StatusUpdateModal.vue'
import DeleteConfirmation from '@/components/common/DeleteConfirmation.vue'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()
const ordensStore = useOrdensServicoStore()

const showCreateModal = ref(false)
const showStatusModal = ref(false)
const showDeleteModal = ref(false)
const selectedOrdem = ref(null)
const deleteLoading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
let searchTimeout = null

onMounted(() => {
  loadOrdens()
  ordensStore.fetchStats()
})

const loadOrdens = () => {
  ordensStore.fetchOrdens()
}

const handleSearch = (value) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    ordensStore.setFilters({ search: value })
  }, 500)
}

const handleStatusFilter = () => {
  ordensStore.setFilters({ status: statusFilter.value })
}

const handlePriorityFilter = () => {
  ordensStore.setFilters({ priority: priorityFilter.value })
}

const handlePageChange = (page) => {
  ordensStore.fetchOrdens(page)
}

const openCreateModal = () => {
  showCreateModal.value = true
}

const viewOrdem = (ordem) => {
  router.push(`/ordem-servico/${ordem.id}`)
}

const editOrdem = (ordem) => {
  router.push(`/ordem-servico/${ordem.id}`)
}

const openStatusModal = (ordem) => {
  selectedOrdem.value = ordem
  showStatusModal.value = true
}

const openDeleteModal = (ordem) => {
  selectedOrdem.value = ordem
  showDeleteModal.value = true
}

const handleOrdemCreated = (ordem) => {
  showCreateModal.value = false
  if (ordem?.id) {
    router.push(`/ordem-servico/${ordem.id}`)
  }
}

const handleStatusUpdated = () => {
  showStatusModal.value = false
  loadOrdens()
  ordensStore.fetchStats()
}

const handleDeleteConfirm = async () => {
  if (!selectedOrdem.value) return

  deleteLoading.value = true
  const success = await ordensStore.deleteOrdem(selectedOrdem.value.id)
  deleteLoading.value = false

  if (success) {
    showDeleteModal.value = false
    selectedOrdem.value = null
    ordensStore.fetchStats()
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 0
  }).format(value)
}
</script>