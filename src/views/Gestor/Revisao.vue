<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Revisao Nivel 2</h1>
        <p class="text-gray-500 mt-1">Revisao final e aprovacao de cadastros para publicacao</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosPendentes.length }}</p>
            <p class="text-sm text-gray-500">Aguardando Revisao</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Calculator class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosOrcamento.length }}</p>
            <p class="text-sm text-gray-500">Definir Orcamento</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Globe class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosProntos.length }}</p>
            <p class="text-sm text-gray-500">Prontos Publicar</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosPublicados.length }}</p>
            <p class="text-sm text-gray-500">Publicados</p>
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

    <!-- Tab: Pendentes -->
    <div v-if="activeTab === 'pendentes'" class="space-y-4">
      <div v-if="cadastrosPendentes.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum cadastro aguardando revisao N2</p>
      </div>

      <div
        v-for="cadastro in cadastrosPendentes"
        :key="cadastro.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <img
            :src="cadastro.foto"
            :alt="cadastro.nome"
            class="w-16 h-16 rounded-xl object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
              <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                Aguardando N2
              </span>
            </div>
            <h3 class="font-semibold text-gray-900">{{ cadastro.nome }}</h3>
            <p class="text-sm text-gray-500">{{ cadastro.localidade }}</p>
            <p class="text-xs text-green-600 mt-2">7/7 fichas aprovadas em N1</p>
          </div>
          <button
            @click="abrirRevisaoN2(cadastro)"
            class="btn-primary text-sm"
          >
            <Shield class="w-4 h-4 mr-1" />
            Revisar
          </button>
        </div>
      </div>
    </div>

    <!-- Tab: Orcamento -->
    <div v-if="activeTab === 'orcamento'" class="space-y-4">
      <div v-if="cadastrosOrcamento.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <Calculator class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum cadastro aguardando definicao de orcamento</p>
      </div>

      <div
        v-for="cadastro in cadastrosOrcamento"
        :key="cadastro.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <img
            :src="cadastro.foto"
            :alt="cadastro.nome"
            class="w-16 h-16 rounded-xl object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
              <span class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                Definir Orcamento
              </span>
            </div>
            <h3 class="font-semibold text-gray-900">{{ cadastro.nome }}</h3>
            <p class="text-sm text-gray-500">{{ cadastro.localidade }}</p>
            <div class="mt-2 flex items-center gap-4 text-sm">
              <span class="text-gray-500">{{ cadastro.necessidades }} necessidades</span>
              <span class="text-gray-500">{{ formatCurrency(cadastro.custoEstimado) }} estimado</span>
            </div>
          </div>
          <button
            @click="abrirOrcamento(cadastro)"
            class="btn-primary text-sm"
          >
            <Calculator class="w-4 h-4 mr-1" />
            Definir
          </button>
        </div>
      </div>
    </div>

    <!-- Tab: Prontos -->
    <div v-if="activeTab === 'prontos'" class="space-y-4">
      <div v-if="cadastrosProntos.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <Globe class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum cadastro pronto para publicacao</p>
      </div>

      <div
        v-for="cadastro in cadastrosProntos"
        :key="cadastro.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <img
            :src="cadastro.foto"
            :alt="cadastro.nome"
            class="w-16 h-16 rounded-xl object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
              <span class="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                Pronto
              </span>
            </div>
            <h3 class="font-semibold text-gray-900">{{ cadastro.nome }}</h3>
            <p class="text-sm text-gray-500">{{ cadastro.localidade }}</p>
            <p class="text-sm text-green-600 mt-2 font-medium">
              {{ formatCurrency(cadastro.orcamentoAnual) }}/ano
            </p>
          </div>
          <button
            @click="publicarCadastro(cadastro)"
            class="btn-primary text-sm bg-green-600 hover:bg-green-700"
          >
            <Globe class="w-4 h-4 mr-1" />
            Publicar
          </button>
        </div>
      </div>
    </div>

    <!-- Tab: Publicados -->
    <div v-if="activeTab === 'publicados'" class="space-y-4">
      <div v-if="cadastrosPublicados.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum cadastro publicado ainda</p>
      </div>

      <div
        v-for="cadastro in cadastrosPublicados"
        :key="cadastro.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <img
            :src="cadastro.foto"
            :alt="cadastro.nome"
            class="w-16 h-16 rounded-xl object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
              <span class="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
                Publicado
              </span>
              <span v-if="cadastro.temPadrinho" class="px-2 py-0.5 text-xs rounded-full bg-pink-100 text-pink-700">
                Apadrinhado
              </span>
            </div>
            <h3 class="font-semibold text-gray-900">{{ cadastro.nome }}</h3>
            <p class="text-sm text-gray-500">{{ cadastro.localidade }}</p>
            <p class="text-xs text-gray-400 mt-2">Publicado em {{ cadastro.dataPublicacao }}</p>
          </div>
          <button
            @click="verDetalhes(cadastro)"
            class="btn-secondary text-sm"
          >
            <Eye class="w-4 h-4 mr-1" />
            Detalhes
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Revisao N2 -->
    <BaseModal
      v-model="showModalN2"
      title="Revisao Final - Nivel 2"
      size="lg"
    >
      <div v-if="cadastroSelecionado" class="space-y-6">
        <!-- Info da Crianca -->
        <div class="flex items-start gap-4 pb-4 border-b border-gray-100">
          <img
            :src="cadastroSelecionado.foto"
            :alt="cadastroSelecionado.nome"
            class="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ cadastroSelecionado.nome }}</h3>
            <p class="text-gray-500">{{ cadastroSelecionado.localidade }}</p>
            <p class="text-sm text-gray-400 mt-1">{{ cadastroSelecionado.codigo }}</p>
          </div>
        </div>

        <!-- Resumo -->
        <div class="bg-gray-50 rounded-xl p-4">
          <h4 class="font-medium text-gray-900 mb-3">Resumo do Cadastro</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p class="text-gray-500">Fichas</p>
              <p class="font-semibold">7/7 aprovadas</p>
            </div>
            <div>
              <p class="text-gray-500">Necessidades</p>
              <p class="font-semibold">{{ cadastroSelecionado.necessidades || 0 }}</p>
            </div>
            <div>
              <p class="text-gray-500">Custo Estimado</p>
              <p class="font-semibold">{{ formatCurrency(cadastroSelecionado.custoEstimado || 0) }}</p>
            </div>
            <div>
              <p class="text-gray-500">Idade</p>
              <p class="font-semibold">{{ cadastroSelecionado.idade }} anos</p>
            </div>
          </div>
        </div>

        <!-- Fichas Resumidas -->
        <div>
          <h4 class="font-medium text-gray-900 mb-3">Fichas Tecnicas</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div
              v-for="ficha in fichasResumo"
              :key="ficha.id"
              class="p-3 bg-green-50 rounded-lg border border-green-100"
            >
              <div class="flex items-center gap-2">
                <CheckCircle class="w-4 h-4 text-green-600" />
                <span class="text-sm font-medium text-green-700">{{ ficha.nome }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Observacoes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Observacoes da Revisao (opcional)
          </label>
          <textarea
            v-model="observacoesN2"
            rows="3"
            class="input-field"
            placeholder="Adicione observacoes sobre esta revisao..."
          ></textarea>
        </div>
      </div>

      <template #footer>
        <button @click="showModalN2 = false" class="btn-secondary">
          Cancelar
        </button>
        <button
          @click="solicitarAjustes"
          class="px-4 py-2.5 text-sm rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200"
        >
          Solicitar Ajustes
        </button>
        <button @click="aprovarParaOrcamento" class="btn-primary bg-green-600 hover:bg-green-700">
          Aprovar para Orcamento
        </button>
      </template>
    </BaseModal>

    <!-- Modal Orcamento -->
    <BaseModal
      v-model="showModalOrcamento"
      title="Definicao de Orcamento"
      size="xl"
    >
      <div v-if="cadastroSelecionado" class="space-y-6">
        <!-- Info da Crianca -->
        <div class="flex items-start gap-4 pb-4 border-b border-gray-100">
          <img
            :src="cadastroSelecionado.foto"
            :alt="cadastroSelecionado.nome"
            class="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h3 class="font-semibold text-gray-900">{{ cadastroSelecionado.nome }}</h3>
            <p class="text-sm text-gray-500">{{ cadastroSelecionado.codigo }}</p>
          </div>
        </div>

        <!-- Tabela de Orcamento -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Area</th>
                <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Necessidades</th>
                <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Estimado</th>
                <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Orcamento Anual</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="area in areasOrcamento" :key="area.id" class="border-b border-gray-100">
                <td class="py-3 px-4">
                  <span class="text-sm font-medium text-gray-900">{{ area.nome }}</span>
                </td>
                <td class="py-3 px-4 text-right text-sm text-gray-600">{{ area.necessidades }}</td>
                <td class="py-3 px-4 text-right text-sm text-gray-600">{{ formatCurrency(area.estimado) }}</td>
                <td class="py-3 px-4 text-right">
                  <input
                    v-model.number="area.orcamento"
                    type="number"
                    class="w-32 px-3 py-1.5 text-sm text-right border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-gray-50">
                <td class="py-3 px-4 font-semibold text-gray-900">Total</td>
                <td class="py-3 px-4 text-right font-semibold text-gray-900">{{ totalNecessidades }}</td>
                <td class="py-3 px-4 text-right font-semibold text-gray-900">{{ formatCurrency(totalEstimado) }}</td>
                <td class="py-3 px-4 text-right font-semibold text-primary">{{ formatCurrency(totalOrcamento) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <template #footer>
        <button @click="showModalOrcamento = false" class="btn-secondary">
          Cancelar
        </button>
        <button @click="salvarOrcamento" class="btn-primary">
          Salvar e Aprovar
        </button>
      </template>
    </BaseModal>

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
  Clock, Calculator, Globe, CheckCircle, Shield, Eye
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'

// State
const activeTab = ref('pendentes')
const showModalN2 = ref(false)
const showModalOrcamento = ref(false)
const cadastroSelecionado = ref(null)
const observacoesN2 = ref('')
const toast = ref({ show: false, message: '', type: 'success' })

// Mock Data
const cadastros = ref([
  {
    id: 1,
    codigo: 'CR-2024-001',
    nome: 'Ana Maria Silva',
    idade: 8,
    localidade: 'Bairro Esperanca, Luanda',
    foto: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop',
    status: 'pendente_n2',
    necessidades: 12,
    custoEstimado: 450000,
  },
  {
    id: 2,
    codigo: 'CR-2024-002',
    nome: 'Joao Pedro Santos',
    idade: 10,
    localidade: 'Viana, Luanda',
    foto: 'https://images.unsplash.com/photo-1545171519-4ec7cdb9f0ef?w=200&h=200&fit=crop',
    status: 'pendente_n2',
    necessidades: 8,
    custoEstimado: 320000,
  },
  {
    id: 3,
    codigo: 'CR-2024-003',
    nome: 'Maria Esperanca',
    idade: 6,
    localidade: 'Cazenga, Luanda',
    foto: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200&h=200&fit=crop',
    status: 'orcamento',
    necessidades: 15,
    custoEstimado: 580000,
  },
  {
    id: 4,
    codigo: 'CR-2024-004',
    nome: 'Pedro Antonio',
    idade: 9,
    localidade: 'Kilamba, Luanda',
    foto: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=200&h=200&fit=crop',
    status: 'pronto',
    necessidades: 10,
    custoEstimado: 400000,
    orcamentoAnual: 420000,
  },
  {
    id: 5,
    codigo: 'CR-2024-005',
    nome: 'Teresa Cumba',
    idade: 7,
    localidade: 'Talatona, Luanda',
    foto: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&h=200&fit=crop',
    status: 'publicado',
    dataPublicacao: '15/01/2024',
    temPadrinho: true,
    orcamentoAnual: 380000,
  },
  {
    id: 6,
    codigo: 'CR-2024-006',
    nome: 'Manuel Jose',
    idade: 11,
    localidade: 'Maianga, Luanda',
    foto: 'https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?w=200&h=200&fit=crop',
    status: 'publicado',
    dataPublicacao: '10/01/2024',
    temPadrinho: false,
    orcamentoAnual: 450000,
  }
])

const areasOrcamento = ref([
  { id: 'saude', nome: 'Saude', necessidades: 3, estimado: 120000, orcamento: 120000 },
  { id: 'alimentacao', nome: 'Alimentacao', necessidades: 2, estimado: 80000, orcamento: 80000 },
  { id: 'psicossocial', nome: 'Psico-Social', necessidades: 2, estimado: 60000, orcamento: 60000 },
  { id: 'nutricao', nome: 'Nutricao', necessidades: 2, estimado: 50000, orcamento: 50000 },
  { id: 'documentacao', nome: 'Documentacao', necessidades: 1, estimado: 30000, orcamento: 30000 },
  { id: 'protecao', nome: 'Protecao', necessidades: 2, estimado: 80000, orcamento: 80000 },
])

const fichasResumo = [
  { id: 'saude', nome: 'Saude' },
  { id: 'alimentacao', nome: 'Alimentacao' },
  { id: 'psicossocial', nome: 'Psico-Social' },
  { id: 'nutricao', nome: 'Nutricao' },
  { id: 'documentacao', nome: 'Documentacao' },
  { id: 'protecao', nome: 'Protecao' },
  { id: 'dados', nome: 'Dados Gerais' },
]

// Computed
const cadastrosPendentes = computed(() => cadastros.value.filter(c => c.status === 'pendente_n2'))
const cadastrosOrcamento = computed(() => cadastros.value.filter(c => c.status === 'orcamento'))
const cadastrosProntos = computed(() => cadastros.value.filter(c => c.status === 'pronto'))
const cadastrosPublicados = computed(() => cadastros.value.filter(c => c.status === 'publicado'))

const tabs = computed(() => [
  { id: 'pendentes', label: 'Aguardando N2', count: cadastrosPendentes.value.length },
  { id: 'orcamento', label: 'Definir Orcamento', count: cadastrosOrcamento.value.length },
  { id: 'prontos', label: 'Prontos Publicar', count: cadastrosProntos.value.length },
  { id: 'publicados', label: 'Publicados', count: cadastrosPublicados.value.length },
])

const totalNecessidades = computed(() => areasOrcamento.value.reduce((sum, a) => sum + a.necessidades, 0))
const totalEstimado = computed(() => areasOrcamento.value.reduce((sum, a) => sum + a.estimado, 0))
const totalOrcamento = computed(() => areasOrcamento.value.reduce((sum, a) => sum + a.orcamento, 0))

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

const abrirRevisaoN2 = (cadastro) => {
  cadastroSelecionado.value = cadastro
  observacoesN2.value = ''
  showModalN2.value = true
}

const abrirOrcamento = (cadastro) => {
  cadastroSelecionado.value = cadastro
  showModalOrcamento.value = true
}

const aprovarParaOrcamento = () => {
  if (cadastroSelecionado.value) {
    cadastroSelecionado.value.status = 'orcamento'
    showModalN2.value = false
    showToast('Cadastro aprovado para definicao de orcamento')
  }
}

const solicitarAjustes = () => {
  showModalN2.value = false
  showToast('Solicitacao de ajustes enviada', 'success')
}

const salvarOrcamento = () => {
  if (cadastroSelecionado.value) {
    cadastroSelecionado.value.status = 'pronto'
    cadastroSelecionado.value.orcamentoAnual = totalOrcamento.value
    showModalOrcamento.value = false
    showToast('Orcamento definido com sucesso')
  }
}

const publicarCadastro = (cadastro) => {
  cadastro.status = 'publicado'
  cadastro.dataPublicacao = new Date().toLocaleDateString('pt-AO')
  cadastro.temPadrinho = false
  showToast('Crianca publicada no catalogo')
}

const verDetalhes = (cadastro) => {
  cadastroSelecionado.value = cadastro
}
</script>
