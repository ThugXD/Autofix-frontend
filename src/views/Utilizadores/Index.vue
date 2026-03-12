<template>
  <div>
    <div class="card mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="page-title">Utilizadores</h2>
          <p class="page-subtitle">{{ users.length }} utilizador(es) registrado(s)</p>
        </div>
        <BaseButton variant="primary" :icon="Plus" @click="openCreateModal">
          Novo Utilizador
        </BaseButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Procurar utilizadores..."
            :icon-left="Search"
            clearable
          />
        </div>
        <select v-model="roleFilter" @change="loadUsers" class="input">
          <option value="">Todas as funções</option>
          <option value="admin">Administrador</option>
          <option value="gestor">Gestor da Associação</option>
          <option value="ponto_focal">Ponto Focal Comunitário</option>
          <option value="ponto_focal_tematico">Ponto Focal Temático</option>
          <option value="tutor">Tutor</option>
          <option value="padrinho">Padrinho</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Utilizador</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Função</th>
              <th>Último Acesso</th>
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

            <tr v-else-if="!users.length">
              <td colspan="7" class="text-center py-8 text-gray-500">
                Nenhum utilizador encontrado
              </td>
            </tr>

            <tr v-else v-for="user in users" :key="user.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ user.name.charAt(0) }}
                  </div>
                  <span class="font-medium text-gray-900">{{ user.name }}</span>
                </div>
              </td>
              <td class="text-gray-600">{{ user.email }}</td>
              <td class="text-gray-600">{{ user.phone }}</td>
              <td>
                <span :class="['badge', roleClasses[user.role]]">
                  {{ roleLabels[user.role] }}
                </span>
              </td>
              <td class="text-sm text-gray-600">
                {{ user.last_login ? formatDate(user.last_login) : 'Nunca' }}
              </td>
              <td>
                <span :class="['badge', user.is_active ? 'badge-success' : 'badge-danger']">
                  {{ user.is_active ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td>
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(user)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="openDeleteModal(user)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    :disabled="user.role === 'admin'"
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

    <UserFormModal
      v-model="showForm"
      :user="selectedUser"
      @submit="handleFormSubmit"
    />

    <DeleteConfirmation
      v-model="showDeleteModal"
      title="Excluir Utilizador"
      :message="`Deseja realmente excluir o utilizador ${selectedUser?.name}?`"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usersService } from '@/services/usersService'
import { format } from 'date-fns'
import { Plus, Search, Edit, Trash2 } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import UserFormModal from '@/components/users/UserFormModal.vue'
import DeleteConfirmation from '@/components/common/DeleteConfirmation.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const users = ref([])
const loading = ref(false)
const searchQuery = ref('')
const roleFilter = ref('')
const showForm = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref(null)

const roleLabels = {
  admin: 'Administrador',
  gestor: 'Gestor da Associação',
  ponto_focal: 'Ponto Focal Comunitário',
  ponto_focal_tematico: 'Ponto Focal Temático',
  tutor: 'Tutor',
  padrinho: 'Padrinho'
}

const roleClasses = {
  admin: 'bg-purple-100 text-purple-700',
  gestor: 'bg-blue-100 text-blue-700',
  ponto_focal: 'bg-green-100 text-green-700',
  ponto_focal_tematico: 'bg-teal-100 text-teal-700',
  tutor: 'bg-amber-100 text-amber-700',
  padrinho: 'bg-pink-100 text-pink-700'
}

onMounted(() => {
  loadUsers()
})

const loadUsers = async () => {
  loading.value = true
  const response = await usersService.getAll({
    search: searchQuery.value,
    role: roleFilter.value
  })
  users.value = response.data.data
  loading.value = false
}

const openCreateModal = () => {
  selectedUser.value = null
  showForm.value = true
}

const openEditModal = (user) => {
  selectedUser.value = user
  showForm.value = true
}

const openDeleteModal = (user) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const handleFormSubmit = async (data) => {
  try {
    if (selectedUser.value) {
      await usersService.update(selectedUser.value.id, data)
      toast.success('Utilizador atualizado com sucesso!')
    } else {
      await usersService.create(data)
      toast.success('Utilizador criado com sucesso!')
    }
    showForm.value = false
    loadUsers()
  } catch (error) {
    toast.error('Erro ao salvar utilizador')
  }
}

const handleDeleteConfirm = async () => {
  try {
    await usersService.delete(selectedUser.value.id)
    toast.success('Utilizador removido com sucesso!')
    showDeleteModal.value = false
    loadUsers()
  } catch (error) {
    toast.error('Erro ao remover utilizador')
  }
}

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm')
  } catch {
    return '-'
  }
}
</script>