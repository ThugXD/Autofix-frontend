<template>
  <div>
    <!-- Header com Busca e Botão Adicionar -->
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Gerir Veículos</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ veiculosStore.totalVeiculos }} veículo(s) registrado(s)
          </p>
        </div>

        <BaseButton
          variant="primary"
          :icon="Plus"
          @click="openCreateModal"
        >
          Adicionar Veículo
        </BaseButton>
      </div>

      <!-- Barra de Busca e Filtros -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Procurar por marca, modelo, matrícula..."
            :icon-left="Search"
            clearable
            @update:model-value="handleSearch"
          />
        </div>

        <!-- Filtro por Marca -->
        <div>
          <select
            v-model="brandFilter"
            @change="handleBrandFilter"
            class="input"
          >
            <option value="">Todas as marcas</option>
            <option
              v-for="brand in veiculosStore.availableBrands"
              :key="brand"
              :value="brand"
            >
              {{ brand }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tabela de Veículos -->
    <div class="card">
      <VeiculosTable
        :veiculos="veiculosStore.veiculos"
        :loading="veiculosStore.loading"
        @view="openViewModal"
        @edit="openEditModal"
        @delete="openDeleteModal"
      />

      <!-- Paginação -->
      <div v-if="veiculosStore.hasVeiculos" class="mt-6 pt-6 border-t border-gray-200">
        <Pagination
          :current-page="veiculosStore.pagination.currentPage"
          :last-page="veiculosStore.pagination.lastPage"
          :total="veiculosStore.pagination.total"
          :per-page="veiculosStore.pagination.perPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Modal de Criação/Edição -->
    <VeiculoForm
      v-model="showForm"
      :veiculo="selectedVeiculo"
      :loading="formLoading"
      @submit="handleFormSubmit"
    />

    <!-- Modal de Visualização -->
    <VeiculoDetailsModal
      v-model="showDetailsModal"
      :veiculo="selectedVeiculo"
    />

    <!-- Modal de Confirmação de Exclusão -->
    <DeleteConfirmation
      v-model="showDeleteModal"
      title="Excluir Veículo"
      :message="`Deseja realmente excluir o veículo ${selectedVeiculo?.brand} ${selectedVeiculo?.model} (${selectedVeiculo?.plate})?`"
      :loading="deleteLoading"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useVeiculosStore } from '@/stores/veiculos'
import { Plus, Search } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import VeiculosTable from '@/components/veiculos/VeiculosTable.vue'
import VeiculoForm from '@/components/veiculos/VeiculoForm.vue'
import VeiculoDetailsModal from '@/components/veiculos/VeiculoDetailsModal.vue'
import DeleteConfirmation from '@/components/common/DeleteConfirmation.vue'
import Pagination from '@/components/common/Pagination.vue'

const veiculosStore = useVeiculosStore()

// State
const showForm = ref(false)
const showDetailsModal = ref(false)
const showDeleteModal = ref(false)
const selectedVeiculo = ref(null)
const formLoading = ref(false)
const deleteLoading = ref(false)
const searchQuery = ref('')
const brandFilter = ref('')
let searchTimeout = null

// Lifecycle
onMounted(() => {
  loadVeiculos()
})

// Methods
const loadVeiculos = () => {
  veiculosStore.fetchVeiculos()
}

const handleSearch = (value) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    veiculosStore.setFilters({ search: value })
  }, 500)
}

const handleBrandFilter = () => {
  veiculosStore.setFilters({ brand: brandFilter.value })
}

const handlePageChange = (page) => {
  veiculosStore.fetchVeiculos(page)
}

const openCreateModal = () => {
  selectedVeiculo.value = null
  showForm.value = true
}

const openEditModal = (veiculo) => {
  selectedVeiculo.value = veiculo
  showForm.value = true
}

const openViewModal = (veiculo) => {
  selectedVeiculo.value = veiculo
  showDetailsModal.value = true
}

const openDeleteModal = (veiculo) => {
  selectedVeiculo.value = veiculo
  showDeleteModal.value = true
}

const handleFormSubmit = async (data) => {
  formLoading.value = true

  let success = false
  if (selectedVeiculo.value) {
    success = await veiculosStore.updateVeiculo(selectedVeiculo.value.id, data)
  } else {
    success = await veiculosStore.createVeiculo(data)
  }

  formLoading.value = false

  if (success) {
    showForm.value = false
    selectedVeiculo.value = null
  }
}

const handleDeleteConfirm = async () => {
  if (!selectedVeiculo.value) return

  deleteLoading.value = true
  const success = await veiculosStore.deleteVeiculo(selectedVeiculo.value.id)
  deleteLoading.value = false

  if (success) {
    showDeleteModal.value = false
    selectedVeiculo.value = null
  }
}
</script>