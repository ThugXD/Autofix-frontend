<template>
  <div>
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Catálogo de Serviços</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ servicosStore.totalServicos }} serviço(s) cadastrado(s)
          </p>
        </div>

        <BaseButton variant="primary" :icon="Plus" @click="openCreateModal">
          Adicionar Serviço
        </BaseButton>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Procurar serviços..."
            :icon-left="Search"
            clearable
            @update:model-value="handleSearch"
          />
        </div>

        <select v-model="categoryFilter" @change="handleCategoryFilter" class="input">
          <option value="">Todas as categorias</option>
          <option value="manutencao">Manutenção</option>
          <option value="reparo">Reparo</option>
          <option value="diagnostico">Diagnóstico</option>
          <option value="instalacao">Instalação</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço Padrão</th>
              <th>Tempo Estimado</th>
              <th>Status</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="servicosStore.loading">
              <td colspan="6" class="text-center py-8">
                <LoadingSpinner size="md" text="Carregando..." />
              </td>
            </tr>

            <tr v-else-if="!servicosStore.servicos.length">
              <td colspan="6" class="text-center py-8 text-gray-500">
                Nenhum serviço encontrado
              </td>
            </tr>

            <tr v-else v-for="servico in servicosStore.servicos" :key="servico.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wrench class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ servico.name }}</p>
                    <p class="text-xs text-gray-500">{{ servico.description }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span :class="['badge', categoryClasses[servico.category]]">
                  {{ categoryLabels[servico.category] }}
                </span>
              </td>
              <td class="font-semibold text-gray-900">
                {{ formatCurrency(servico.defaultPrice) }}
              </td>
              <td class="text-gray-600">
                {{ servico.estimatedTime }} min
              </td>
              <td>
                <span :class="['badge', servico.isActive ? 'badge-success' : 'badge-danger']">
                  {{ servico.isActive ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td>
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(servico)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="openDeleteModal(servico)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="servicosStore.hasServicos" class="mt-6 pt-6 border-t">
        <Pagination
          :current-page="servicosStore.pagination.currentPage"
          :last-page="servicosStore.pagination.lastPage"
          :total="servicosStore.pagination.total"
          :per-page="servicosStore.pagination.perPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <ServicoFormModal
      v-model="showForm"
      :servico="selectedServico"
      :loading="formLoading"
      @submit="handleFormSubmit"
    />

    <DeleteConfirmation
      v-model="showDeleteModal"
      title="Excluir Serviço"
      :message="`Deseja realmente excluir o serviço ${selectedServico?.name}?`"
      :loading="deleteLoading"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServicosStore } from '@/stores/servicos'
import { Plus, Search, Wrench, Edit, Trash2 } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ServicoFormModal from '@/components/servicos/ServicoFormModal.vue'
import DeleteConfirmation from '@/components/common/DeleteConfirmation.vue'
import Pagination from '@/components/common/Pagination.vue'

const servicosStore = useServicosStore()

const showForm = ref(false)
const showDeleteModal = ref(false)
const selectedServico = ref(null)
const formLoading = ref(false)
const deleteLoading = ref(false)
const searchQuery = ref('')
const categoryFilter = ref('')
let searchTimeout = null

const categoryLabels = {
  manutencao: 'Manutenção',
  reparo: 'Reparo',
  diagnostico: 'Diagnóstico',
  instalacao: 'Instalação'
}

const categoryClasses = {
  manutencao: 'badge-info',
  reparo: 'badge-warning',
  diagnostico: 'bg-purple-100 text-purple-700',
  instalacao: 'badge-success'
}

onMounted(() => {
  servicosStore.fetchServicos()
})

const handleSearch = (value) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    servicosStore.setFilters({ search: value })
  }, 500)
}

const handleCategoryFilter = () => {
  servicosStore.setFilters({ category: categoryFilter.value })
}

const handlePageChange = (page) => {
  servicosStore.fetchServicos(page)
}

const openCreateModal = () => {
  selectedServico.value = null
  showForm.value = true
}

const openEditModal = (servico) => {
  selectedServico.value = servico
  showForm.value = true
}

const openDeleteModal = (servico) => {
  selectedServico.value = servico
  showDeleteModal.value = true
}

const handleFormSubmit = async (data) => {
  formLoading.value = true

  let success = false
  if (selectedServico.value) {
    success = await servicosStore.updateServico(selectedServico.value.id, data)
  } else {
    success = await servicosStore.createServico(data)
  }

  formLoading.value = false

  if (success) {
    showForm.value = false
    selectedServico.value = null
  }
}

const handleDeleteConfirm = async () => {
  if (!selectedServico.value) return

  deleteLoading.value = true
  const success = await servicosStore.deleteServico(selectedServico.value.id)
  deleteLoading.value = false

  if (success) {
    showDeleteModal.value = false
    selectedServico.value = null
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-MZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value) + ' MT'
}
</script>