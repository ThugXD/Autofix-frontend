<template>
  <div class="space-y-6">
    <!-- Header/Filters -->
    <div class="card">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Gestão de Stock</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ pecasStore.totalPecas }} item(ns) catalogado(s)
          </p>
        </div>

        <div class="flex gap-2">
          <BaseButton 
            v-if="!pecasStore.filters.lowStock"
            variant="secondary" 
            @click="pecasStore.setFilters({ lowStock: true })"
            class="text-red-700 bg-red-50 border-red-200 hover:bg-red-100"
          >
            Ver Alertas
          </BaseButton>
          <BaseButton 
            v-else
            variant="secondary" 
            @click="pecasStore.setFilters({ lowStock: false })"
          >
            Ver Todos
          </BaseButton>
          <BaseButton variant="primary" :icon="Plus" @click="openCreateModal">
            Nova Peça
          </BaseButton>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Procurar por nome ou código..."
            :icon-left="Search"
            clearable
            @update:model-value="handleSearch"
          />
        </div>

        <select v-model="categoryFilter" @change="handleCategoryFilter" class="input">
          <option value="">Todas as categorias</option>
          <option value="motor">Motor</option>
          <option value="suspensao">Suspensão</option>
          <option value="freio">Travões</option>
          <option value="eletrica">Elétrica</option>
          <option value="manutencao">Manutenção Geral</option>
        </select>

        <div class="flex items-center gap-2 bg-gray-50 px-3 rounded-lg border">
          <input 
            type="checkbox" 
            id="showInactive" 
            v-model="showInactive" 
            @change="handleInactiveFilter"
            class="w-4 h-4 text-blue-600 rounded"
          />
          <label for="showInactive" class="text-sm font-medium text-gray-700 cursor-pointer">
            Incluir Inativos
          </label>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="card">
      <PecasTable
        :pecas="pecasStore.pecas"
        :loading="pecasStore.loading"
        @edit="openEditModal"
        @delete="openDeleteModal"
        @movement="openMovementModal"
      />

      <!-- Pagination -->
      <div v-if="pecasStore.hasPecas" class="mt-6 pt-6 border-t font-semibold">
        <Pagination
          :current-page="pecasStore.pagination.currentPage"
          :last-page="pecasStore.pagination.lastPage"
          :total="pecasStore.pagination.total"
          :per-page="pecasStore.pagination.perPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Modals -->
    <PecaFormModal
      v-model="showForm"
      :peca="selectedPeca"
      :loading="formLoading"
      @submit="handleFormSubmit"
    />

    <StockMovementModal
      v-model="showMovement"
      :peca="selectedPeca"
      :loading="movementLoading"
      @submit="handleMovementSubmit"
    />

    <DeleteConfirmation
      v-model="showDeleteModal"
      title="Eliminar Peça"
      :message="`Deseja realmente eliminar a peça ${selectedPeca?.name}? Esta ação não pode ser desfeita.`"
      :loading="deleteLoading"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePecasStore } from '@/stores/pecas'
import { Plus, Search } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import PecasTable from '@/components/stock/PecasTable.vue'
import PecaFormModal from '@/components/stock/PecaFormModal.vue'
import StockMovementModal from '@/components/stock/StockMovementModal.vue'
import DeleteConfirmation from '@/components/common/DeleteConfirmation.vue'
import Pagination from '@/components/common/Pagination.vue'

const pecasStore = usePecasStore()

const showForm = ref(false)
const showMovement = ref(false)
const showDeleteModal = ref(false)
const selectedPeca = ref(null)
const formLoading = ref(false)
const movementLoading = ref(false)
const deleteLoading = ref(false)

const searchQuery = ref('')
const categoryFilter = ref('')
const showInactive = ref(false)
let searchTimeout = null

onMounted(() => {
  pecasStore.fetchPecas()
})

const handleSearch = (value) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pecasStore.setFilters({ search: value })
  }, 500)
}

const handleCategoryFilter = () => {
  pecasStore.setFilters({ category: categoryFilter.value })
}

const handleInactiveFilter = () => {
  pecasStore.setFilters({ isActive: !showInactive.value }) // Se "Incluir Inativos" está off, isActive é true
}

const handlePageChange = (page) => {
  pecasStore.fetchPecas(page)
}

// Modal actions
const openCreateModal = () => {
  selectedPeca.value = null
  showForm.value = true
}

const openEditModal = (peca) => {
  selectedPeca.value = peca
  showForm.value = true
}

const openMovementModal = (peca) => {
  selectedPeca.value = peca
  showMovement.value = true
}

const openDeleteModal = (peca) => {
  selectedPeca.value = peca
  showDeleteModal.value = true
}

// Submits
const handleFormSubmit = async (data) => {
  formLoading.value = true
  let success = false
  
  if (selectedPeca.value) {
    success = await pecasStore.updatePeca(selectedPeca.value.id, data)
  } else {
    success = await pecasStore.createPeca(data)
  }

  formLoading.value = false
  if (success) showForm.value = false
}

const handleMovementSubmit = async ({ id, data }) => {
  movementLoading.value = true
  const success = await pecasStore.registrarMovimento(id, data)
  movementLoading.value = false
  if (success) showMovement.value = false
}

const handleDeleteConfirm = async () => {
  if (!selectedPeca.value) return
  deleteLoading.value = true
  const success = await pecasStore.deletePeca(selectedPeca.value.id)
  deleteLoading.value = false
  if (success) showDeleteModal.value = false
}
</script>