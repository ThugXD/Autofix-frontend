<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sticky top-0 z-30">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Voltar
        </RouterLink>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-48">
      <div class="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>

    <!-- Content Grid -->
    <div v-else-if="crianca" class="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Coluna esquerda - Info da criança -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Foto -->
          <div class="card p-0 overflow-hidden">
            <div class="aspect-square">
              <img
                :src="crianca.foto"
                :alt="crianca.nome"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Info -->
          <div class="card">
            <h1 class="page-title">{{ crianca.nome }}</h1>
            <p class="text-3xl font-bold text-gray-900 mb-4">{{ crianca.idade }} anos</p>
            <p class="text-gray-600 mb-6 flex items-center gap-2">{{ crianca.regiao }}</p>

            <div class="space-y-4 pb-6 border-b border-gray-200 mb-6">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</p>
                <span
                  :class="['badge', getStatusBadge(crianca.status)]"
                >
                  {{ crianca.status }}
                </span>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Registado</p>
                <p class="text-gray-900 font-medium">{{ formatarData(crianca.dataRegistro) }}</p>
              </div>
            </div>

            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Vulnerabilidades</p>
              <div class="space-y-2">
                <div
                  v-for="vuln in crianca.vulnerabilidades"
                  :key="vuln"
                  class="text-sm text-gray-700 font-medium bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                >
                  {{ vuln }}
                </div>
              </div>
            </div>
          </div>

          <button
            @click="abrirFormulario"
            class="w-full btn btn-primary py-3 text-base"
          >
            Expressar Interesse
          </button>

          <div class="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700">
            A sua ajuda pode transformar a vida desta criança.
          </div>
        </div>

        <!-- Coluna direita - Necessidades e Orçamento -->
        <div class="lg:col-span-2">
          <div class="mb-8">
            <h2 class="section-title">Necessidades</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <button
              v-for="necessidade in crianca.necessidades"
              :key="necessidade.id"
              @click="abrirModalNecessidade(necessidade)"
              class="card text-left hover:shadow-card-hover transition-shadow cursor-pointer border border-gray-200"
            >
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold text-gray-900 flex-1">{{ necessidade.nome }}</h3>
                <span
                  :class="['badge ml-2', getPrioridadeBadge(necessidade.prioridade)]"
                >
                  {{ necessidade.prioridade }}
                </span>
              </div>
              <p class="text-gray-600 text-sm">{{ necessidade.descricao }}</p>
              <p class="text-xs text-blue-600 font-medium mt-2">Ver detalhes →</p>
            </button>
          </div>

          <!-- Orçamento -->
          <div class="card">
            <h3 class="section-title">Orçamento Anual</h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div class="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Necessário</p>
                <p class="text-xl font-bold text-gray-900">{{ formatarMoeda(crianca.orcamentoAnual) }}</p>
              </div>
              <div class="bg-green-50 rounded-xl border border-green-200 p-5">
                <p class="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Coberto</p>
                <p class="text-xl font-bold text-green-800">{{ formatarMoeda(crianca.orcamentoCoberto) }}</p>
              </div>
              <div class="bg-amber-50 rounded-xl border border-amber-200 p-5">
                <p class="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Falta</p>
                <p class="text-xl font-bold text-amber-800">
                  {{ formatarMoeda(crianca.orcamentoAnual - crianca.orcamentoCoberto) }}
                </p>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <p class="text-sm font-medium text-gray-700">Progresso de cobertura</p>
                <p class="text-lg font-bold text-gray-900">{{ getPercentualCoberto() }}%</p>
              </div>
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  :style="{ width: getPercentualCoberto() + '%' }"
                  class="h-full bg-blue-600 transition-all duration-300 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Criança não encontrada -->
    <div v-else class="max-w-6xl mx-auto px-4 py-32 text-center">
      <div class="card max-w-md mx-auto">
        <p class="text-gray-600 mb-6">Criança não encontrada</p>
        <RouterLink to="/" class="btn btn-primary">
          Voltar ao Catálogo
        </RouterLink>
      </div>
    </div>

    <!-- Modal Necessidade -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="modalNecessidade.aberto"
          class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          @click="fecharModalNecessidade"
        >
          <div
            @click.stop
            class="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden"
          >
            <div class="bg-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 class="text-lg font-bold text-white">{{ modalNecessidade.dados?.nome }}</h3>
              <button
                @click="fecharModalNecessidade"
                class="text-white hover:opacity-80 transition text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div v-if="modalNecessidade.dados" class="p-6 space-y-5 max-h-96 overflow-y-auto">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tipo de Serviço</p>
                <span class="badge badge-info">{{ modalNecessidade.dados.tipo }}</span>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Descrição</p>
                <p class="text-gray-900 font-medium">{{ modalNecessidade.dados.descricao }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Detalhes</p>
                <p class="text-gray-700 text-sm">{{ modalNecessidade.dados.detalhes }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Prioridade</p>
                <span
                  :class="['badge', getPrioridadeBadge(modalNecessidade.dados.prioridade)]"
                >
                  {{ modalNecessidade.dados.prioridade }}
                </span>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Impacto Esperado</p>
                <p class="text-gray-900 font-medium">{{ modalNecessidade.dados.impacto }}</p>
              </div>
              <button
                @click="fecharModalNecessidade"
                class="w-full btn btn-secondary"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Modal Formulário -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="modalFormulario.aberto"
          class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          @click="fecharFormulario"
        >
          <div
            @click.stop
            class="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden"
          >
            <div class="bg-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 class="text-lg font-bold text-white">Expressar Interesse</h3>
              <button
                @click="fecharFormulario"
                class="text-white hover:opacity-80 transition text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <form @submit.prevent="submeterFormulario" class="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Nome Completo</label>
                <input
                  v-model="formulario.nome"
                  type="text"
                  required
                  class="input"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Email</label>
                <input
                  v-model="formulario.email"
                  type="email"
                  required
                  class="input"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Telefone</label>
                <input
                  v-model="formulario.telefone"
                  type="tel"
                  required
                  class="input"
                  placeholder="+258 XX XXX XXXX"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Região/País</label>
                <input
                  v-model="formulario.regiao"
                  type="text"
                  required
                  class="input"
                  placeholder="Sua região"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-1">Por que quer ser padrinho?</label>
                <textarea
                  v-model="formulario.mensagem"
                  required
                  rows="3"
                  class="input resize-none"
                  placeholder="Conte-nos sua motivação..."
                />
              </div>
              <label class="flex items-start gap-3 text-sm text-gray-700">
                <input
                  v-model="formulario.concordo"
                  type="checkbox"
                  required
                  class="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Concordo em ser padrinho/madrinha e manter uma relação de apoio consistente.</span>
              </label>
              <button
                :disabled="carregando"
                type="submit"
                class="w-full btn btn-primary py-3 disabled:opacity-50"
              >
                {{ carregando ? 'A enviar...' : 'Submeter' }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast Sucesso -->
    <Transition name="fade">
      <div
        v-if="mostrarSucesso"
        class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-medium text-sm"
      >
        Solicitação enviada com sucesso!
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCriancasStore } from '@/stores/criancas'
import { useApadrinhamentosStore } from '@/stores/apadrinhamentos'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const criancasStore = useCriancasStore()
const apadrinhamentosStore = useApadrinhamentosStore()

const crianca = ref(null)
const loading = ref(true)
const carregando = ref(false)
const mostrarSucesso = ref(false)

const modalNecessidade = ref({ aberto: false, dados: null })
const modalFormulario = ref({ aberto: false })

const formulario = ref({
  nome: '',
  email: '',
  telefone: '',
  regiao: '',
  mensagem: '',
  concordo: false
})

const getPercentualCoberto = () => {
  if (!crianca.value) return 0
  return Math.round((crianca.value.orcamentoCoberto / crianca.value.orcamentoAnual) * 100)
}

const getStatusBadge = (status) => {
  if (status === 'Disponível') return 'badge-info'
  if (status === 'Parcialmente Apoiada') return 'badge-warning'
  return 'badge-success'
}

const getPrioridadeBadge = (prioridade) => {
  if (prioridade === 'Alto') return 'badge-danger'
  if (prioridade === 'Médio') return 'badge-warning'
  return 'badge-success'
}

const formatarMoeda = (valor) => {
  // Formatação customizada para MZN: xxx.xxx.xxx,xx MZN
  return valor.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' MZN'
}

const formatarData = (data) => {
  return new Intl.DateTimeFormat('pt-MZ', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(data))
}

const abrirModalNecessidade = (necessidade) => {
  modalNecessidade.value = { aberto: true, dados: necessidade }
}

const fecharModalNecessidade = () => {
  modalNecessidade.value = { aberto: false, dados: null }
}

const abrirFormulario = () => {
  modalFormulario.value.aberto = true
}

const fecharFormulario = () => {
  modalFormulario.value.aberto = false
  formulario.value = { nome: '', email: '', telefone: '', regiao: '', mensagem: '', concordo: false }
}

const submeterFormulario = async () => {
  carregando.value = true
  try {
    await apadrinhamentosStore.expressarInteresse({
      criancaId: crianca.value.id,
      criancaNome: crianca.value.nome,
      criancaFoto: crianca.value.foto,
      criancaRegiao: crianca.value.regiao,
      tutorId: 6,
      tutorNome: 'Rosa Tutora',
      padrinhoId: 9,
      padrinhoNome: formulario.value.nome,
      padrinhoEmail: formulario.value.email,
      padrinhoTelefone: formulario.value.telefone,
      padrinhoRegiao: formulario.value.regiao,
      mensagem: formulario.value.mensagem,
      valorMensal: 2500,
      criancaIdade: crianca.value.idade,
      orcamentoAnual: crianca.value.orcamentoAnual,
      orcamentoCoberto: crianca.value.orcamentoCoberto
    })

    mostrarSucesso.value = true

    // Feedback e seguimento pós-submissão
    toast.success('Seu interesse foi registrado! Acesse o painel para acompanhar seus afilhados.')
    router.push({ name: 'padrinho-dashboard' })

    fecharFormulario()
    setTimeout(() => {
      mostrarSucesso.value = false
    }, 4000)
  } finally {
    carregando.value = false
  }
}

onMounted(async () => {
  await criancasStore.fetchCriancas()
  crianca.value = criancasStore.getCriancaById(route.params.id)
  loading.value = false
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
