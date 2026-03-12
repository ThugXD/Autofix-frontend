<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestao de Apadinhamentos</h1>
        <p class="text-gray-500 mt-1">Acompanhe e gere os processos de apadinhamento</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ solicitacoesPendentes.length }}</p>
            <p class="text-sm text-gray-500">Pendentes</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ apadinhamentosAtivos.length }}</p>
            <p class="text-sm text-gray-500">Ativos</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <RefreshCw class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ renovacoesPendentes.length }}</p>
            <p class="text-sm text-gray-500">Renovacoes</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <XCircle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ apadinhamentosCancelados.length }}</p>
            <p class="text-sm text-gray-500">Cancelados</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex gap-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ tab.label }}
          <span
            v-if="tab.count > 0"
            :class="[
              'ml-2 px-2 py-0.5 text-xs rounded-full',
              activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab: Solicitacoes Pendentes -->
    <div v-if="activeTab === 'pendentes'" class="space-y-4">
      <div v-if="solicitacoesPendentes.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <Heart class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhuma solicitacao pendente</p>
      </div>

      <div
        v-for="item in solicitacoesPendentes"
        :key="item.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <!-- Crianca -->
          <div class="flex items-center gap-3 flex-1">
            <img
              :src="item.crianca.foto"
              :alt="item.crianca.nome"
              class="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <p class="text-xs text-gray-400">Crianca</p>
              <h3 class="font-semibold text-gray-900">{{ item.crianca.nome }}</h3>
              <p class="text-sm text-gray-500">{{ item.crianca.localidade }}</p>
            </div>
          </div>

          <!-- Seta -->
          <div class="flex items-center">
            <ArrowRight class="w-5 h-5 text-gray-300" />
          </div>

          <!-- Padrinho -->
          <div class="flex items-center gap-3 flex-1">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <Heart class="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <p class="text-xs text-gray-400">Padrinho</p>
              <h3 class="font-semibold text-gray-900">{{ item.padrinho.nome }}</h3>
              <p class="text-sm text-gray-500">{{ item.padrinho.pais }}</p>
            </div>
          </div>

          <!-- Info -->
          <div class="text-right">
            <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
              Aguardando Aprovacao
            </span>
            <p class="text-xs text-gray-400 mt-2">{{ item.dataSolicitacao }}</p>
            <p class="text-sm font-medium text-primary mt-1">{{ formatCurrency(item.orcamentoAnual) }}/ano</p>
          </div>

          <!-- Acoes -->
          <div class="flex flex-col gap-2">
            <button
              @click="aprovarApadinhamento(item)"
              class="px-3 py-1.5 text-sm rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
            >
              <CheckCircle class="w-4 h-4 inline mr-1" />
              Aprovar
            </button>
            <button
              @click="rejeitarApadinhamento(item)"
              class="px-3 py-1.5 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
            >
              <XCircle class="w-4 h-4 inline mr-1" />
              Rejeitar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Ativos -->
    <div v-if="activeTab === 'ativos'" class="space-y-4">
      <div v-if="apadinhamentosAtivos.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <Heart class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum apadinhamento ativo</p>
      </div>

      <div
        v-for="item in apadinhamentosAtivos"
        :key="item.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <!-- Crianca -->
          <div class="flex items-center gap-3 flex-1">
            <img
              :src="item.crianca.foto"
              :alt="item.crianca.nome"
              class="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <p class="text-xs text-gray-400">Crianca</p>
              <h3 class="font-semibold text-gray-900">{{ item.crianca.nome }}</h3>
              <p class="text-sm text-gray-500">{{ item.crianca.codigo }}</p>
            </div>
          </div>

          <!-- Padrinho -->
          <div class="flex items-center gap-3 flex-1">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <Heart class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p class="text-xs text-gray-400">Padrinho</p>
              <h3 class="font-semibold text-gray-900">{{ item.padrinho.nome }}</h3>
              <p class="text-sm text-gray-500">{{ item.padrinho.email }}</p>
            </div>
          </div>

          <!-- Info Contrato -->
          <div class="text-right">
            <span class="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
              Ativo
            </span>
            <p class="text-xs text-gray-400 mt-2">Inicio: {{ item.dataInicio }}</p>
            <p class="text-xs text-gray-400">Fim: {{ item.dataFim }}</p>
            <p class="text-sm font-medium text-primary mt-1">{{ formatCurrency(item.orcamentoAnual) }}/ano</p>
          </div>

          <!-- Acoes -->
          <button
            @click="verDetalhes(item)"
            class="btn-secondary text-sm"
          >
            <Eye class="w-4 h-4 mr-1" />
            Detalhes
          </button>
        </div>

        <!-- Progresso -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-gray-500">Progresso do Contrato</span>
            <span class="font-medium text-gray-900">{{ item.progresso }}%</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div
              class="bg-primary rounded-full h-2 transition-all"
              :style="{ width: item.progresso + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Renovacoes -->
    <div v-if="activeTab === 'renovacoes'" class="space-y-4">
      <div v-if="renovacoesPendentes.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <RefreshCw class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhuma renovacao pendente</p>
      </div>

      <div
        v-for="item in renovacoesPendentes"
        :key="item.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <img
            :src="item.crianca.foto"
            :alt="item.crianca.nome"
            class="w-14 h-14 rounded-xl object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-gray-900">{{ item.crianca.nome }}</h3>
              <span class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                Renovacao
              </span>
            </div>
            <p class="text-sm text-gray-500">Padrinho: {{ item.padrinho.nome }}</p>
            <p class="text-xs text-gray-400 mt-1">Contrato expira em {{ item.diasRestantes }} dias</p>
          </div>
          <div class="flex gap-2">
            <button
              @click="notificarPadrinho(item)"
              class="px-3 py-1.5 text-sm rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              <Bell class="w-4 h-4 inline mr-1" />
              Notificar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Cancelados -->
    <div v-if="activeTab === 'cancelados'" class="space-y-4">
      <div v-if="apadinhamentosCancelados.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <XCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum apadinhamento cancelado</p>
      </div>

      <div
        v-for="item in apadinhamentosCancelados"
        :key="item.id"
        class="bg-white rounded-xl border border-gray-100 p-5 opacity-75"
      >
        <div class="flex items-start gap-4">
          <img
            :src="item.crianca.foto"
            :alt="item.crianca.nome"
            class="w-14 h-14 rounded-xl object-cover grayscale"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-gray-900">{{ item.crianca.nome }}</h3>
              <span class="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
                Cancelado
              </span>
            </div>
            <p class="text-sm text-gray-500">Ex-Padrinho: {{ item.padrinho.nome }}</p>
            <p class="text-xs text-gray-400 mt-1">Motivo: {{ item.motivoCancelamento }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-400">{{ item.dataCancelamento }}</p>
            <button
              @click="republicarCrianca(item)"
              class="mt-2 px-3 py-1.5 text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
            >
              Republicar Crianca
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div
      v-if="toast.show"
      :class="[
        'fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2',
        toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
      ]"
    >
      <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Clock, CheckCircle, RefreshCw, XCircle, Heart, 
  ArrowRight, Eye, Bell
} from 'lucide-vue-next'

// State
const activeTab = ref('pendentes')
const toast = ref({ show: false, message: '', type: 'success' })

// Mock Data
const apadinhamentos = ref([
  {
    id: 1,
    status: 'pendente',
    dataSolicitacao: '05/03/2024',
    orcamentoAnual: 420000,
    crianca: {
      id: 1,
      nome: 'Ana Maria Silva',
      codigo: 'CR-2024-001',
      localidade: 'Bairro Esperanca',
      foto: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop'
    },
    padrinho: {
      id: 1,
      nome: 'Jean Pierre Dubois',
      email: 'jean.dubois@email.fr',
      pais: 'Franca'
    }
  },
  {
    id: 2,
    status: 'pendente',
    dataSolicitacao: '08/03/2024',
    orcamentoAnual: 380000,
    crianca: {
      id: 2,
      nome: 'Joao Pedro Santos',
      codigo: 'CR-2024-002',
      localidade: 'Viana',
      foto: 'https://images.unsplash.com/photo-1545171519-4ec7cdb9f0ef?w=200&h=200&fit=crop'
    },
    padrinho: {
      id: 2,
      nome: 'Maria Garcia',
      email: 'maria.garcia@email.es',
      pais: 'Espanha'
    }
  },
  {
    id: 3,
    status: 'ativo',
    dataInicio: '01/01/2024',
    dataFim: '31/12/2024',
    progresso: 25,
    orcamentoAnual: 450000,
    crianca: {
      id: 3,
      nome: 'Teresa Cumba',
      codigo: 'CR-2024-005',
      localidade: 'Talatona',
      foto: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&h=200&fit=crop'
    },
    padrinho: {
      id: 3,
      nome: 'Hans Mueller',
      email: 'hans.mueller@email.de',
      pais: 'Alemanha'
    }
  },
  {
    id: 4,
    status: 'ativo',
    dataInicio: '15/06/2023',
    dataFim: '14/06/2024',
    progresso: 85,
    orcamentoAnual: 400000,
    crianca: {
      id: 4,
      nome: 'Carlos Manuel',
      codigo: 'CR-2023-015',
      localidade: 'Cazenga',
      foto: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=200&h=200&fit=crop'
    },
    padrinho: {
      id: 4,
      nome: 'Sophie Martin',
      email: 'sophie.martin@email.fr',
      pais: 'Franca'
    }
  },
  {
    id: 5,
    status: 'renovacao',
    diasRestantes: 15,
    orcamentoAnual: 380000,
    crianca: {
      id: 5,
      nome: 'Maria Jose',
      codigo: 'CR-2023-008',
      localidade: 'Kilamba',
      foto: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200&h=200&fit=crop'
    },
    padrinho: {
      id: 5,
      nome: 'John Smith',
      email: 'john.smith@email.uk',
      pais: 'Reino Unido'
    }
  },
  {
    id: 6,
    status: 'cancelado',
    dataCancelamento: '20/02/2024',
    motivoCancelamento: 'Desistencia do padrinho',
    crianca: {
      id: 6,
      nome: 'Pedro Antonio',
      codigo: 'CR-2023-012',
      localidade: 'Maianga',
      foto: 'https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?w=200&h=200&fit=crop'
    },
    padrinho: {
      id: 6,
      nome: 'Antonio Costa',
      email: 'antonio.costa@email.pt',
      pais: 'Portugal'
    }
  }
])

// Computed
const solicitacoesPendentes = computed(() => apadinhamentos.value.filter(a => a.status === 'pendente'))
const apadinhamentosAtivos = computed(() => apadinhamentos.value.filter(a => a.status === 'ativo'))
const renovacoesPendentes = computed(() => apadinhamentos.value.filter(a => a.status === 'renovacao'))
const apadinhamentosCancelados = computed(() => apadinhamentos.value.filter(a => a.status === 'cancelado'))

const tabs = computed(() => [
  { id: 'pendentes', label: 'Pendentes', count: solicitacoesPendentes.value.length },
  { id: 'ativos', label: 'Ativos', count: apadinhamentosAtivos.value.length },
  { id: 'renovacoes', label: 'Renovacoes', count: renovacoesPendentes.value.length },
  { id: 'cancelados', label: 'Cancelados', count: apadinhamentosCancelados.value.length },
])

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0
  }).format(value)
}

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

const aprovarApadinhamento = (item) => {
  item.status = 'ativo'
  item.dataInicio = new Date().toLocaleDateString('pt-AO')
  const dataFim = new Date()
  dataFim.setFullYear(dataFim.getFullYear() + 1)
  item.dataFim = dataFim.toLocaleDateString('pt-AO')
  item.progresso = 0
  showToast('Apadinhamento aprovado com sucesso')
}

const rejeitarApadinhamento = (item) => {
  item.status = 'cancelado'
  item.dataCancelamento = new Date().toLocaleDateString('pt-AO')
  item.motivoCancelamento = 'Solicitacao rejeitada'
  showToast('Solicitacao rejeitada', 'error')
}

const verDetalhes = () => {
  // Implementar navegacao para detalhes
}

const notificarPadrinho = () => {
  showToast('Notificacao enviada ao padrinho')
}

const republicarCrianca = () => {
  showToast('Crianca republicada no catalogo')
}
</script>
