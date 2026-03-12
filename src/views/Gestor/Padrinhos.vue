<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestao de Padrinhos</h1>
        <p class="text-gray-500 mt-1">Visualize e gere os padrinhos registados no sistema</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar padrinho..."
            class="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users class="w-5 h-5 text-primary" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ padrinhos.length }}</p>
            <p class="text-sm text-gray-500">Total Padrinhos</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Heart class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ padrinhoAtivos.length }}</p>
            <p class="text-sm text-gray-500">Com Apadinhamento</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ padrinhosPendentes.length }}</p>
            <p class="text-sm text-gray-500">Aguardando Match</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Globe class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ paisesUnicos }}</p>
            <p class="text-sm text-gray-500">Paises</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="flex items-center gap-4">
      <select
        v-model="filtroStatus"
        class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
      >
        <option value="todos">Todos os Status</option>
        <option value="ativo">Com Apadinhamento</option>
        <option value="pendente">Aguardando Match</option>
        <option value="inativo">Inativos</option>
      </select>

      <select
        v-model="filtroPais"
        class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
      >
        <option value="todos">Todos os Paises</option>
        <option v-for="pais in listaPaises" :key="pais" :value="pais">{{ pais }}</option>
      </select>
    </div>

    <!-- Lista de Padrinhos -->
    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-100">
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Padrinho</th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Pais</th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Crianca</th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Contribuicao</th>
            <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Acoes</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="padrinho in padrinhosFiltrados"
            :key="padrinho.id"
            class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
          >
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                  <span class="text-sm font-semibold text-pink-600">{{ getInitials(padrinho.nome) }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ padrinho.nome }}</p>
                  <p class="text-sm text-gray-500">{{ padrinho.email }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="flex items-center gap-2">
                <span class="text-lg">{{ padrinho.bandeira }}</span>
                <span class="text-sm text-gray-600">{{ padrinho.pais }}</span>
              </div>
            </td>
            <td class="py-4 px-4">
              <span :class="getStatusBadge(padrinho.status)">
                {{ getStatusLabel(padrinho.status) }}
              </span>
            </td>
            <td class="py-4 px-4">
              <div v-if="padrinho.crianca" class="flex items-center gap-2">
                <img
                  :src="padrinho.crianca.foto"
                  :alt="padrinho.crianca.nome"
                  class="w-8 h-8 rounded-lg object-cover"
                />
                <span class="text-sm text-gray-900">{{ padrinho.crianca.nome }}</span>
              </div>
              <span v-else class="text-sm text-gray-400">-</span>
            </td>
            <td class="py-4 px-4">
              <span v-if="padrinho.contribuicaoTotal" class="text-sm font-medium text-gray-900">
                {{ formatCurrency(padrinho.contribuicaoTotal) }}
              </span>
              <span v-else class="text-sm text-gray-400">-</span>
            </td>
            <td class="py-4 px-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="verPerfil(padrinho)"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Ver Perfil"
                >
                  <Eye class="w-4 h-4 text-gray-500" />
                </button>
                <button
                  @click="enviarMensagem(padrinho)"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Enviar Mensagem"
                >
                  <Mail class="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="padrinhosFiltrados.length === 0" class="text-center py-12">
        <Users class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum padrinho encontrado</p>
      </div>
    </div>

    <!-- Modal Perfil -->
    <BaseModal
      v-model="showModalPerfil"
      title="Perfil do Padrinho"
      size="md"
    >
      <div v-if="padrinhoSelecionado" class="space-y-6">
        <!-- Info Principal -->
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
            <span class="text-xl font-bold text-pink-600">{{ getInitials(padrinhoSelecionado.nome) }}</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ padrinhoSelecionado.nome }}</h3>
            <p class="text-gray-500">{{ padrinhoSelecionado.email }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-lg">{{ padrinhoSelecionado.bandeira }}</span>
              <span class="text-sm text-gray-600">{{ padrinhoSelecionado.pais }}</span>
            </div>
          </div>
        </div>

        <!-- Detalhes -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">Desde</p>
            <p class="font-medium text-gray-900">{{ padrinhoSelecionado.dataCadastro }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">Contribuicao Total</p>
            <p class="font-medium text-gray-900">{{ formatCurrency(padrinhoSelecionado.contribuicaoTotal || 0) }}</p>
          </div>
        </div>

        <!-- Crianca Apadinhada -->
        <div v-if="padrinhoSelecionado.crianca" class="border border-gray-100 rounded-xl p-4">
          <p class="text-sm text-gray-500 mb-3">Crianca Apadinhada</p>
          <div class="flex items-center gap-3">
            <img
              :src="padrinhoSelecionado.crianca.foto"
              :alt="padrinhoSelecionado.crianca.nome"
              class="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <p class="font-medium text-gray-900">{{ padrinhoSelecionado.crianca.nome }}</p>
              <p class="text-sm text-gray-500">{{ padrinhoSelecionado.crianca.codigo }}</p>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <button @click="showModalPerfil = false" class="btn-secondary">
          Fechar
        </button>
        <button @click="enviarMensagem(padrinhoSelecionado)" class="btn-primary">
          <Mail class="w-4 h-4 mr-1" />
          Enviar Mensagem
        </button>
      </template>
    </BaseModal>

    <!-- Toast -->
    <div
      v-if="toast.show"
      class="fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 bg-green-600 text-white"
    >
      <CheckCircle class="w-5 h-5" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Users, Heart, Clock, Globe, Search, Eye, Mail, CheckCircle
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'

// State
const searchQuery = ref('')
const filtroStatus = ref('todos')
const filtroPais = ref('todos')
const showModalPerfil = ref(false)
const padrinhoSelecionado = ref(null)
const toast = ref({ show: false, message: '' })

// Mock Data
const padrinhos = ref([
  {
    id: 1,
    nome: 'Jean Pierre Dubois',
    email: 'jean.dubois@email.fr',
    pais: 'Franca',
    bandeira: '🇫🇷',
    status: 'ativo',
    dataCadastro: '15/01/2024',
    contribuicaoTotal: 840000,
    crianca: {
      id: 1,
      nome: 'Ana Maria Silva',
      codigo: 'CR-2024-001',
      foto: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop'
    }
  },
  {
    id: 2,
    nome: 'Maria Garcia',
    email: 'maria.garcia@email.es',
    pais: 'Espanha',
    bandeira: '🇪🇸',
    status: 'pendente',
    dataCadastro: '20/02/2024',
    contribuicaoTotal: 0,
    crianca: null
  },
  {
    id: 3,
    nome: 'Hans Mueller',
    email: 'hans.mueller@email.de',
    pais: 'Alemanha',
    bandeira: '🇩🇪',
    status: 'ativo',
    dataCadastro: '01/12/2023',
    contribuicaoTotal: 1350000,
    crianca: {
      id: 3,
      nome: 'Teresa Cumba',
      codigo: 'CR-2024-005',
      foto: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&h=200&fit=crop'
    }
  },
  {
    id: 4,
    nome: 'Sophie Martin',
    email: 'sophie.martin@email.fr',
    pais: 'Franca',
    bandeira: '🇫🇷',
    status: 'ativo',
    dataCadastro: '10/06/2023',
    contribuicaoTotal: 1600000,
    crianca: {
      id: 4,
      nome: 'Carlos Manuel',
      codigo: 'CR-2023-015',
      foto: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=200&h=200&fit=crop'
    }
  },
  {
    id: 5,
    nome: 'John Smith',
    email: 'john.smith@email.uk',
    pais: 'Reino Unido',
    bandeira: '🇬🇧',
    status: 'ativo',
    dataCadastro: '05/03/2023',
    contribuicaoTotal: 1140000,
    crianca: {
      id: 5,
      nome: 'Maria Jose',
      codigo: 'CR-2023-008',
      foto: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200&h=200&fit=crop'
    }
  },
  {
    id: 6,
    nome: 'Antonio Costa',
    email: 'antonio.costa@email.pt',
    pais: 'Portugal',
    bandeira: '🇵🇹',
    status: 'inativo',
    dataCadastro: '20/08/2023',
    contribuicaoTotal: 380000,
    crianca: null
  },
  {
    id: 7,
    nome: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    pais: 'Estados Unidos',
    bandeira: '🇺🇸',
    status: 'pendente',
    dataCadastro: '01/03/2024',
    contribuicaoTotal: 0,
    crianca: null
  }
])

// Computed
const padrinhoAtivos = computed(() => padrinhos.value.filter(p => p.status === 'ativo'))
const padrinhosPendentes = computed(() => padrinhos.value.filter(p => p.status === 'pendente'))
const paisesUnicos = computed(() => new Set(padrinhos.value.map(p => p.pais)).size)
const listaPaises = computed(() => [...new Set(padrinhos.value.map(p => p.pais))].sort())

const padrinhosFiltrados = computed(() => {
  return padrinhos.value.filter(p => {
    const matchSearch = p.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       p.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = filtroStatus.value === 'todos' || p.status === filtroStatus.value
    const matchPais = filtroPais.value === 'todos' || p.pais === filtroPais.value
    return matchSearch && matchStatus && matchPais
  })
})

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0
  }).format(value)
}

const getInitials = (nome) => {
  return nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const getStatusBadge = (status) => {
  const badges = {
    ativo: 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700',
    pendente: 'px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700',
    inativo: 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
  }
  return badges[status] || badges.inativo
}

const getStatusLabel = (status) => {
  const labels = {
    ativo: 'Ativo',
    pendente: 'Aguardando',
    inativo: 'Inativo'
  }
  return labels[status] || status
}

const showToast = (message) => {
  toast.value = { show: true, message }
  setTimeout(() => { toast.value.show = false }, 3000)
}

const verPerfil = (padrinho) => {
  padrinhoSelecionado.value = padrinho
  showModalPerfil.value = true
}

const enviarMensagem = (padrinho) => {
  showModalPerfil.value = false
  showToast(`Mensagem enviada para ${padrinho.nome}`)
}
</script>
