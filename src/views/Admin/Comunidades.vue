<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between card">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestão de Comunidades e Parceiros</h1>
        <p class="text-gray-500 mt-1">
          {{ communities.length }} comunidade(s) registradas no sistema
        </p>
      </div>
      <BaseButton variant="primary" :icon="Plus" @click="openCreateModal">
        Nova Comunidade
      </BaseButton>
    </div>

    <!-- Filters -->
    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Procurar comunidades ou responsáveis..."
            :icon-left="Search"
            clearable
            @update:modelValue="loadCommunities"
          />
        </div>
        <select v-model="statusFilter" @change="loadCommunities" class="input">
          <option value="">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Pendente">Pendente</option>
        </select>
      </div>
    </div>


    <!-- Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Comunidade / Instituição</th>
              <th>Localização</th>
              <th>Responsável</th>
              <th>Email</th>
              <th>Crianças</th>
              <th>Status</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="text-center py-8">
                <LoadingSpinner size="md" />
              </td>
            </tr>

            <tr v-else-if="!communities.length">
              <td colspan="7" class="text-center py-8 text-gray-500">
                Nenhuma comunidade encontrada
              </td>
            </tr>

            <tr v-else v-for="community in communities" :key="community.id">
              <td>
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold"
                  >
                    {{ community.name.charAt(0) }}
                  </div>
                  <span class="font-medium text-gray-900">{{ community.name }}</span>
                </div>
              </td>
              <td class="text-gray-600">{{ community.location }}</td>
              <td class="text-gray-600">{{ community.responsavel }}</td>
              <td class="text-gray-600">{{ community.email }}</td>
              <td class="text-center">
                <span class="font-bold text-blue-600">{{ community.criancas }}</span>
              </td>
              <td>
                <span :class="['badge', statusClasses[community.status]]">
                  {{ community.status }}
                </span>
              </td>
              <td>
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(community)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="openDeleteModal(community)"
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
    </div>


    <!-- Map View -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin class="w-5 h-5 text-green-600" />
        Mapa das Comunidades
      </h3>
      <div class="h-[400px]">
        <CommunityMap
          :resources="mapResources"
          :risks="riskAreas"
        />
      </div>
    </div>

    <!-- Modals -->
    <CommunityFormModal
      v-model="showForm"
      :community="selectedCommunity"
      @submit="handleFormSubmit"
    />

    <DeleteConfirmation
      v-model="showDeleteModal"
      title="Excluir Comunidade"
      :message="`Deseja realmente excluir a comunidade ${selectedCommunity?.name}?`"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { comunidadeService } from '@/services/comunidadeService'
import { Plus, Search, Edit, Trash2, MapPin } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import CommunityFormModal from '@/components/comunidade/CommunityFormModal.vue'
import DeleteConfirmation from '@/components/common/DeleteConfirmation.vue'
import CommunityMap from '@/components/common/CommunityMap.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const communities = ref([])
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const showForm = ref(false)
const showDeleteModal = ref(false)
const selectedCommunity = ref(null)

const statusClasses = {
  'Ativo': 'badge-success',
  'Inativo': 'badge-danger',
  'Pendente': 'badge-warning'
}

// Map data
const mapResources = computed(() =>
  communities.value.map((community, index) => ({
    id: community.id,
    name: community.name,
    type: 'Comunidade',
    lat: -25.9 + (index * 0.1), // Mock coordinates around Maputo
    lng: 32.5 + (index * 0.1),
    icon: MapPin
  }))
)

const riskAreas = ref([]) // Empty for now, can be populated later

onMounted(() => {
  loadCommunities()
})

const loadCommunities = async () => {
  loading.value = true
  try {
    const response = await comunidadeService.getAll({
      search: searchQuery.value,
      status: statusFilter.value
    })
    communities.value = response.data.data
  } catch (error) {
    toast.error('Erro ao carregar comunidades')
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  selectedCommunity.value = null
  showForm.value = true
}

const openEditModal = (community) => {
  selectedCommunity.value = community
  showForm.value = true
}

const openDeleteModal = (community) => {
  selectedCommunity.value = community
  showDeleteModal.value = true
}

const handleFormSubmit = async (data) => {
  try {
    if (selectedCommunity.value) {
      await comunidadeService.update(selectedCommunity.value.id, data)
      toast.success('Comunidade atualizada com sucesso!')
    } else {
      await comunidadeService.create(data)
      toast.success('Comunidade criada com sucesso!')
    }
    showForm.value = false
    loadCommunities()
  } catch (error) {
    toast.error('Erro ao salvar comunidade')
  }
}

const handleDeleteConfirm = async () => {
  try {
    await comunidadeService.delete(selectedCommunity.value.id)
    toast.success('Comunidade removida com sucesso!')
    showDeleteModal.value = false
    loadCommunities()
  } catch (error) {
    toast.error('Erro ao remover comunidade')
  }
}
</script>
