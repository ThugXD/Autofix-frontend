<template>
  <div>
    <!-- Header com Busca e Botão Adicionar -->
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Gerir Clientes</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ clientesStore.totalClientes }} cliente(s) registrado(s)
          </p>
        </div>

        <BaseButton
          variant="primary"
          :icon="Plus"
          @click="openCreateModal"
        >
          Adicionar Cliente
        </BaseButton>
      </div>

      <!-- Barra de Busca -->
      <div class="mt-6">
        <BaseInput
          v-model="searchQuery"
          placeholder="Procurar clientes..."
          :icon-left="Search"
          clearable
          @update:model-value="handleSearch"
        />
      </div>
    </div>

    <!-- Tabela de Clientes -->
    <div class="card">
      <ClientesTable
        :clientes="clientesStore.clientes"
        :loading="clientesStore.loading"
        @edit="openEditModal"
        @delete="openDeleteModal"
      />

      <!-- Paginação -->
      <div v-if="clientesStore.hasClientes" class="mt-6 pt-6 border-t border-gray-200">
        <Pagination
          :current-page="clientesStore.pagination.currentPage"
          :last-page="clientesStore.pagination.lastPage"
          :total="clientesStore.pagination.total"
          :per-page="clientesStore.pagination.perPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Modal de Criação/Edição -->
    <ClienteForm
      v-model="showForm"
      :cliente="selectedCliente"
      :loading="formLoading"
      @submit="handleFormSubmit"
    />

    <!-- Modal de Confirmação de Exclusão -->
    <DeleteConfirmation
      v-model="showDeleteModal"
      title="Excluir Cliente"
      :message="`Deseja realmente excluir o cliente ${selectedCliente?.name}?`"
      :loading="deleteLoading"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClientesStore } from '@/stores/clientes'
import { Plus, Search } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import ClientesTable from '@/components/clientes/ClientesTable.vue'
import ClienteForm from '@/components/clientes/ClienteForm.vue'
import DeleteConfirmation from '@/components/common/DeleteConfirmation.vue'
import Pagination from '@/components/common/Pagination.vue'

const clientesStore = useClientesStore()

// State
const showForm = ref(false)
const showDeleteModal = ref(false)
const selectedCliente = ref(null)
const formLoading = ref(false)
const deleteLoading = ref(false)
const searchQuery = ref('')
let searchTimeout = null

// Lifecycle
onMounted(() => {
  loadClientes()
})

// Methods
const loadClientes = () => {
  clientesStore.fetchClientes()
}

const handleSearch = (value) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    clientesStore.setFilters({ search: value })
  }, 500)
}

const handlePageChange = (page) => {
  clientesStore.fetchClientes(page)
}

const openCreateModal = () => {
  selectedCliente.value = null
  showForm.value = true
}

const openEditModal = (cliente) => {
  selectedCliente.value = cliente
  showForm.value = true
}

const openDeleteModal = (cliente) => {
  selectedCliente.value = cliente
  showDeleteModal.value = true
}

const handleFormSubmit = async (data) => {
  formLoading.value = true

  let success = false
  if (selectedCliente.value) {
    // Editar
    success = await clientesStore.updateCliente(selectedCliente.value.id, data)
  } else {
    // Criar
    success = await clientesStore.createCliente(data)
  }

  formLoading.value = false

  if (success) {
    showForm.value = false
    selectedCliente.value = null
  }
}

const handleDeleteConfirm = async () => {
  if (!selectedCliente.value) return

  deleteLoading.value = true
  const success = await clientesStore.deleteCliente(selectedCliente.value.id)
  deleteLoading.value = false

  if (success) {
    showDeleteModal.value = false
    selectedCliente.value = null
  }
}
</script>