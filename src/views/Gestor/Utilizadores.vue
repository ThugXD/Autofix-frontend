<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestão de Utilizadores</h1>
        <p class="text-gray-500 mt-1">Gerencie utilizadores e suas permissões</p>
      </div>
      <button @click="showModalNovo = true" class="btn-primary">
        <UserPlus class="w-4 h-4 mr-2" />
        Novo Utilizador
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <Users class="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ utilizadores.length }}</p>
            <p class="text-sm text-gray-500">Total</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <UserCog class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ utilizadores.filter(u => u.role === 'gestor_associacao').length }}</p>
            <p class="text-sm text-gray-500">Gestores</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <MapPin class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ utilizadores.filter(u => u.role === 'pf_comunitario').length }}</p>
            <p class="text-sm text-gray-500">PF Comunitário</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <FileText class="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ utilizadores.filter(u => u.role === 'pf_tematico').length }}</p>
            <p class="text-sm text-gray-500">PF Temático</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
            <Heart class="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ utilizadores.filter(u => u.role === 'tutor').length }}</p>
            <p class="text-sm text-gray-500">Tutores</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="flex items-center gap-4">
      <select v-model="filtroRole" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todos os Roles</option>
        <option value="gestor_associacao">Gestor</option>
        <option value="pf_comunitario">PF Comunitário</option>
        <option value="pf_tematico">PF Temático</option>
        <option value="tutor">Tutor</option>
        <option value="padrinho">Padrinho</option>
        <option value="admin">Admin</option>
      </select>

      <select v-model="filtroStatus" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todos os Status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
    </div>

    <!-- Tabela de Utilizadores -->
    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-100">
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Utilizador</th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Role</th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Último Acesso</th>
            <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in utilizadoresFiltrados" :key="user.id" class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span class="text-sm font-semibold text-blue-600">{{ getInitials(user.name) }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ user.name }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <span :class="getRoleBadge(user.role)">
                {{ getRoleLabel(user.role) }}
              </span>
            </td>
            <td class="py-4 px-4">
              <span :class="user.status === 'ativo' ? 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700' : 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'">
                {{ user.status === 'ativo' ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="py-4 px-4 text-sm text-gray-600">
              {{ user.ultimoAcesso }}
            </td>
            <td class="py-4 px-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button @click="editarUtilizador(user)" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                  <Edit class="w-4 h-4 text-gray-500" />
                </button>
                <button @click="toggleStatus(user)" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" :title="user.status === 'ativo' ? 'Desativar' : 'Ativar'">
                  <component :is="user.status === 'ativo' ? UserX : UserCheck" class="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="utilizadoresFiltrados.length === 0" class="text-center py-12">
        <Users class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum utilizador encontrado</p>
      </div>
    </div>

    <!-- Modal Novo/Editar Utilizador -->
    <BaseModal v-model="showModalNovo" :title="editando ? 'Editar Utilizador' : 'Novo Utilizador'" size="md">
      <form @submit.prevent="salvarUtilizador" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <input
              v-model="formUser.name"
              type="text"
              required
              class="input w-full"
              placeholder="Nome completo"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="formUser.email"
              type="email"
              required
              class="input w-full"
              placeholder="email@exemplo.com"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select v-model="formUser.role" required class="input w-full">
            <option value="">Selecione um role</option>
            <option value="gestor_associacao">Gestor da Associação</option>
            <option value="pf_comunitario">Ponto Focal Comunitário</option>
            <option value="pf_tematico">Ponto Focal Temático</option>
            <option value="tutor">Tutor</option>
            <option value="padrinho">Padrinho</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div v-if="formUser.role === 'pf_tematico'">
          <label class="block text-sm font-medium text-gray-700 mb-2">Especialidade Técnica</label>
          <select v-model="formUser.pf_tipo" class="input w-full">
            <option value="">Selecione a especialidade</option>
            <option value="SADD">Serviços de Apoio aos Direitos e Documentação</option>
            <option value="SANC">Serviços de Apoio à Nutrição e Crescimento</option>
            <option value="SAAD">Serviços de Apoio à Alimentação Diária</option>
            <option value="SAEIE">Serviços de Apoio à Educação e Inclusão Escolar</option>
            <option value="SAPE">Serviços de Apoio Psico-Social e Emocional</option>
            <option value="SAPS">Serviços de Apoio à Proteção e Segurança</option>
            <option value="SASBE">Serviços de Apoio à Saúde e Bem-Estar</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <input v-model="formUser.status" type="checkbox" class="rounded" />
          <label class="text-sm text-gray-700">Utilizador ativo</label>
        </div>
      </form>

      <template #footer>
        <button @click="showModalNovo = false" class="btn-secondary">Cancelar</button>
        <button @click="salvarUtilizador" class="btn-primary">
          <Save class="w-4 h-4 mr-2" />
          {{ editando ? 'Atualizar' : 'Criar' }} Utilizador
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Users, UserPlus, UserCog, MapPin, FileText, Heart,
  Edit, UserX, UserCheck, Save
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'

// State
const filtroRole = ref('todos')
const filtroStatus = ref('todos')
const showModalNovo = ref(false)
const editando = ref(false)
const formUser = ref({
  id: null,
  name: '',
  email: '',
  role: '',
  pf_tipo: '',
  status: true
})

// Mock Data
const utilizadores = ref([
  {
    id: 1,
    name: 'Carlos Gestor',
    email: 'carlos@sacco.org',
    role: 'gestor_associacao',
    status: 'ativo',
    ultimoAcesso: '15/03/2026 14:30',
    pf_tipo: null
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'joao@sacco.org',
    role: 'pf_comunitario',
    status: 'ativo',
    ultimoAcesso: '15/03/2026 09:15',
    pf_tipo: null
  },
  {
    id: 3,
    name: 'Maria Santos',
    email: 'maria@sacco.org',
    role: 'pf_tematico',
    status: 'ativo',
    ultimoAcesso: '14/03/2026 16:45',
    pf_tipo: 'SADD'
  },
  {
    id: 4,
    name: 'Ana Tutor',
    email: 'ana@sacco.org',
    role: 'tutor',
    status: 'ativo',
    ultimoAcesso: '15/03/2026 11:20',
    pf_tipo: null
  },
  {
    id: 5,
    name: 'Pedro Padrinho',
    email: 'pedro@sacco.org',
    role: 'padrinho',
    status: 'ativo',
    ultimoAcesso: '13/03/2026 08:30',
    pf_tipo: null
  },
  {
    id: 6,
    name: 'Admin Sistema',
    email: 'admin@sacco.org',
    role: 'admin',
    status: 'ativo',
    ultimoAcesso: '15/03/2026 15:00',
    pf_tipo: null
  }
])

// Computed
const utilizadoresFiltrados = computed(() => {
  return utilizadores.value.filter(user => {
    const matchRole = filtroRole.value === 'todos' || user.role === filtroRole.value
    const matchStatus = filtroStatus.value === 'todos' || user.status === filtroStatus.value
    return matchRole && matchStatus
  })
})

// Methods
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const getRoleBadge = (role) => {
  const badges = {
    gestor_associacao: 'px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700',
    pf_comunitario: 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700',
    pf_tematico: 'px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700',
    tutor: 'px-2 py-0.5 text-xs rounded-full bg-pink-100 text-pink-700',
    padrinho: 'px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-700',
    admin: 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700'
  }
  return badges[role] || 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
}

const getRoleLabel = (role) => {
  const labels = {
    gestor_associacao: 'Gestor',
    pf_comunitario: 'PF Comunitário',
    pf_tematico: 'PF Temático',
    tutor: 'Tutor',
    padrinho: 'Padrinho',
    admin: 'Admin'
  }
  return labels[role] || role
}

const editarUtilizador = (user) => {
  formUser.value = { ...user }
  editando.value = true
  showModalNovo.value = true
}

const toggleStatus = (user) => {
  user.status = user.status === 'ativo' ? 'inativo' : 'ativo'
  // Simular toast
  console.log(`Utilizador ${user.status === 'ativo' ? 'ativado' : 'desativado'}`)
}

const salvarUtilizador = () => {
  if (editando.value) {
    const index = utilizadores.value.findIndex(u => u.id === formUser.value.id)
    if (index !== -1) {
      utilizadores.value[index] = { ...formUser.value }
    }
  } else {
    const newUser = {
      ...formUser.value,
      id: Date.now(),
      ultimoAcesso: 'Nunca'
    }
    utilizadores.value.push(newUser)
  }

  showModalNovo.value = false
  editando.value = false
  formUser.value = {
    id: null,
    name: '',
    email: '',
    role: '',
    pf_tipo: '',
    status: true
  }
}
</script>
