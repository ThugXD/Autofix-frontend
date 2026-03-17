<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-sm">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          <span class="hidden sm:inline">Voltar ao Catálogo</span>
          <span class="sm:hidden">Voltar</span>
        </RouterLink>

        <button
          v-if="!sponsorshipStatus"
          @click="abrirFormulario"
          class="btn btn-primary px-6 py-2.5 text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Expressar Interesse
        </button>
        <div v-else class="flex items-center gap-2">
           <span class="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" :class="statusClasses[sponsorshipStatus]">
             {{ statusLabels[sponsorshipStatus] }}
           </span>
        </div>
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
            v-if="!sponsorshipStatus"
            @click="abrirFormulario"
            class="w-full btn btn-primary py-3 text-base"
          >
            Expressar Interesse
          </button>
          
          <!-- Mensagem de Status para Padrinho -->
          <div v-else-if="sponsorshipStatus !== 'aprovado_gestor'" class="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div class="flex gap-3">
              <AlertCircle class="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p class="text-sm font-bold text-amber-900">Processo em curso</p>
                <p class="text-xs text-amber-700 mt-0.5">
                  A sua solicitação está em <strong>{{ statusLabels[sponsorshipStatus] }}</strong>. 
                  Poderá realizar pagamentos assim que for aprovada.
                </p>
              </div>
            </div>
          </div>

          <div class="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700">
            A sua ajuda pode transformar a vida desta criança.
          </div>
        </div>

        <!-- Coluna direita - Necessidades e Orçamento -->
        <div class="lg:col-span-2">
          <!-- <div class="mb-8">
            <h2 class="section-title">Necessidades</h2>
          </div> -->

          <!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
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
          </div> -->
          <!-- Orçamento Detalhado -->
          <div class="card space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="section-title mb-0">Orçamento Anual</h3>
              <div class="text-right">
                <p class="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Necessário</p>
                <p class="text-xl font-black text-green-400">{{ formatarMoeda(crianca.orcamentoAnual) }}</p>
              </div>
            </div>

            <!-- Progress Bar -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <p class="text-sm font-medium text-gray-700">Progresso de cobertura</p>
                <p class="text-sm font-bold text-gray-900">{{ getPercentualCoberto() }}% financiado</p>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                <div
                  :style="{ width: getPercentualCoberto() + '%' }"
                  class="h-full bg-green-300 transition-all duration-700 ease-out rounded-full shadow-inner"
                />
              </div>
            </div>

            <!-- Detailed Breakdown (Collapsible) -->
            <div v-if="crianca.orcamentoDetalhado && crianca.orcamentoDetalhado.length > 0" class="space-y-3">
              <div class="flex items-center justify-between pt-2">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Detalhes por Rubrica</h4>
                <button 
                  v-if="sponsorshipStatus === 'aprovado_gestor'"
                  @click="selecionarTudo"
                  class="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition uppercase tracking-wider"
                >
                  {{ todosSelecionados ? 'Desmarcar Tudo' : 'Selecionar Tudo' }}
                </button>
              </div>
              
              <div 
                v-for="area in crianca.orcamentoDetalhado" 
                :key="area.areaId"
                class="border border-gray-300 rounded-2xl overflow-hidden transition-all"
              >
                <!-- Area Header -->
                <button 
                  @click="toggleArea(area.areaId)"
                  class="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-200 transition-colors text-left"
                >
                  <div class="flex items-center gap-3">
                    <div 
                      class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                      :class="isAreaOpen(area.areaId) ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'"
                    >
                      <component :is="getAreaIcon(area.areaId)" class="w-5 h-5" />
                    </div>
                    <div>
                      <h5 class="font-bold text-gray-900 text-sm">{{ getAreaName(area.areaId) }}</h5>
                      <p class="text-[10px] text-gray-400 font-mono">{{ area.areaId.toUpperCase() }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="font-bold text-gray-900 mr-2">{{ formatarMoeda(area.items.reduce((sum, i) => sum + (i.value || 0), 0)) }}</span>
                    <ChevronDown 
                      class="w-4 h-4 text-gray-400 transition-transform duration-300"
                      :class="{ 'rotate-180 text-blue-500': isAreaOpen(area.areaId) }"
                    />
                  </div>
                </button>

                <!-- Area Items -->
                <transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="transform -translate-y-2 opacity-0"
                  enter-to-class="transform translate-y-0 opacity-100"
                >
                  <div v-if="isAreaOpen(area.areaId)" class="px-5 pb-5 pt-0 border-t border-gray-50 bg-gray-50/30">
                    <div class="space-y-3 pt-4">
                      <div v-for="(item, idx) in area.items" :key="idx" class="flex justify-between items-center text-sm py-2 border-b border-dashed border-gray-100 last:border-0 hover:bg-gray-100/50 transition-colors group/item rounded px-2">
                        <div class="flex items-center gap-3">
                          <label v-if="sponsorshipStatus === 'aprovado_gestor'" class="relative flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              :value="item"
                              v-model="itensSelecionados"
                              class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </label>
                          <span class="text-gray-600">{{ item.description }}</span>
                        </div>
                        <span class="font-bold text-gray-900">{{ formatarMoeda(item.value) }}</span>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Legend/Helper -->
            <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-3">
              <Info class="w-5 h-5 text-blue-500 shrink-0" />
              <p class="text-xs text-blue-800 leading-relaxed">
                Este plano detalhado garante a transparência total sobre como o seu apoio será investido para transformar a vida de <strong>{{ crianca.nome }}</strong>.
              </p>
            </div>
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
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  :style="{ width: getPercentualCoberto() + '%' }"
                  class="h-full bg-green-400 transition-all duration-300 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Payment Summary Bar -->
      <Transition name="slide-up">
        <div 
          v-if="itensSelecionados.length > 0"
          class="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]"
        >
          <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <ClipboardList class="w-6 h-6" />
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">{{ itensSelecionados.length }} itens selecionados</p>
                <p class="text-xl font-black text-green-600">{{ formatarMoeda(totalSelecionado) }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <button 
                @click="itensSelecionados = []"
                class="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition"
              >
                Cancelar
              </button>
              <BaseButton 
                variant="primary" 
                class="flex-1 sm:flex-none px-8 py-3 rounded-full shadow-lg"
                @click="abrirModalPagamento"
              >
                Pagar Agora
              </BaseButton>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Modal Comprovativo -->
      <BaseModal
        v-model="modalPagamento.aberto"
        title="Confirmar Pagamento"
        size="md"
      >
        <div class="space-y-6">
          <div class="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <p class="text-xs text-blue-600 uppercase font-black tracking-widest mb-1">Total a Pagar</p>
            <p class="text-2xl font-black text-blue-800">{{ formatarMoeda(totalSelecionado) }}</p>
            <p class="text-xs text-blue-500 mt-2">
              Referente a {{ itensSelecionados.length }} itens do orçamento de {{ crianca?.nome }}.
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Comprovativo de Pagamento</label>
              <div 
                class="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                @click="$refs.fileInput.click()"
              >
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg"
                  @change="handleFileUpload"
                />
                <div v-if="!arquivoComprovativo" class="flex flex-col items-center">
                  <Upload class="w-10 h-10 text-gray-300 group-hover:text-blue-500 mb-3" />
                  <p class="text-sm font-bold text-gray-600">Clique para carregar o comprovativo</p>
                  <p class="text-xs text-gray-400 mt-1">PDF, PNG ou JPG (Máx. 5MB)</p>
                </div>
                <div v-else class="flex flex-col items-center">
                  <FileText class="w-10 h-10 text-blue-600 mb-3" />
                  <p class="text-sm font-bold text-blue-900">{{ arquivoComprovativo.name }}</p>
                  <button @click.stop="arquivoComprovativo = null" class="text-xs text-red-500 font-bold mt-2 hover:underline">
                    Remover ficheiro
                  </button>
                </div>
              </div>
            </div>

            <BaseInput
              v-model="notaPagamento"
              label="Nota Adicional (Opcional)"
              placeholder="Ex: Pagamento referente ao semestre..."
            />
          </div>

          <div class="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
            <AlertCircle class="w-5 h-5 text-amber-500 shrink-0" />
            <p class="text-xs text-amber-800 leading-relaxed">
              <strong>Atenção:</strong> O orçamento só será atualizado após a confirmação do Tutor. O processo pode levar até 48h.
            </p>
          </div>
        </div>

        <template #footer>
          <BaseButton variant="secondary" @click="fecharModalPagamento" :disabled="carregandoPagamento">
            Voltar
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="submeterPagamento"
            :loading="carregandoPagamento"
            :disabled="!arquivoComprovativo"
          >
            Enviar Comprovativo
          </BaseButton>
        </template>
      </BaseModal>
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
    <BaseModal
      v-model="modalNecessidade.aberto"
      :title="modalNecessidade.dados?.nome"
      size="md"
    >
      <div v-if="modalNecessidade.dados" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tipo de Serviço</p>
            <span class="badge badge-info">{{ modalNecessidade.dados.tipo }}</span>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Prioridade</p>
            <span
              :class="['badge', getPrioridadeBadge(modalNecessidade.dados.prioridade)]"
            >
              {{ modalNecessidade.dados.prioridade }}
            </span>
          </div>
        </div>

        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descrição</p>
          <p class="text-gray-900 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">{{ modalNecessidade.dados.descricao }}</p>
        </div>

        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Detalhes</p>
          <p class="text-gray-700 text-sm leading-relaxed">{{ modalNecessidade.dados.detalhes }}</p>
        </div>

        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Impacto Esperado</p>
          <div class="p-3 bg-green-50 rounded-lg border border-green-100 flex gap-3">
            <component :is="getAreaIcon(modalNecessidade.dados.tipo)" class="w-5 h-5 text-green-500 shrink-0" />
            <p class="text-sm text-green-800 font-medium">{{ modalNecessidade.dados.impacto }}</p>
          </div>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="fecharModalNecessidade">
          Fechar
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Modal Formulário -->
    <BaseModal
      v-model="modalFormulario.aberto"
      title="Expressar Interesse"
      size="md"
    >
      <form @submit.prevent="submeterFormulario" class="space-y-4">
        <BaseInput
          v-model="formulario.nome"
          label="Nome Completo"
          placeholder="Seu nome"
          required
        />
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput
            v-model="formulario.email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            required
          />
          <BaseInput
            v-model="formulario.telefone"
            label="Telefone"
            type="tel"
            placeholder="+258 XX XXX XXXX"
            required
          />
        </div>

        <BaseInput
          v-model="formulario.regiao"
          label="Região/País"
          placeholder="Sua região"
          required
        />

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Por que quer ser padrinho? <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="formulario.mensagem"
            required
            rows="3"
            class="input resize-none"
            placeholder="Conte-nos sua motivação..."
          />
        </div>

        <label class="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
          <input
            v-model="formulario.concordo"
            type="checkbox"
            required
            class="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Concordo em ser padrinho/madrinha e manter uma relação de apoio consistente.</span>
        </label>
      </form>

      <template #footer>
        <BaseButton variant="secondary" @click="fecharFormulario" :disabled="carregando">
          Cancelar
        </BaseButton>
        <BaseButton
          variant="primary"
          @click="submeterFormulario"
          :loading="carregando"
        >
          Submeter
        </BaseButton>
      </template>
    </BaseModal>

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
import { useAuthStore } from '@/stores/auth'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { 
  Heart, Stethoscope, UtensilsCrossed, GraduationCap, 
  Shield, Brain, FileText, ChevronDown, Info,
  Upload, AlertCircle, ClipboardList
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const criancasStore = useCriancasStore()
const apadrinhamentosStore = useApadrinhamentosStore()
const authStore = useAuthStore()

const crianca = ref(null)
const loading = ref(true)
const carregando = ref(false)
const mostrarSucesso = ref(false)
const openAreas = ref([])
const itensSelecionados = ref([])
const notaPagamento = ref('')
const arquivoComprovativo = ref(null)
const carregandoPagamento = ref(false)

const modalNecessidade = ref({ aberto: false, dados: null })
const modalFormulario = ref({ aberto: false })
const modalPagamento = ref({ aberto: false })

const totalSelecionado = computed(() => {
  return itensSelecionados.value.reduce((sum, item) => sum + item.value, 0)
})

const todosSelecionados = computed(() => {
  if (!crianca.value?.orcamentoDetalhado) return false
  const todosItens = crianca.value.orcamentoDetalhado.flatMap(area => area.items)
  return todosItens.length > 0 && itensSelecionados.value.length === todosItens.length
})

const selecionarTudo = () => {
  if (todosSelecionados.value) {
    itensSelecionados.value = []
  } else {
    itensSelecionados.value = crianca.value.orcamentoDetalhado.flatMap(area => area.items)
  }
}

const sponsorshipStatus = computed(() => {
  if (!authStore.user || !crianca.value) return null
  return apadrinhamentosStore.getSponsorshipStatus(authStore.user.id, crianca.value.id)
})

const statusLabels = apadrinhamentosStore.STATUS_LABELS
const statusClasses = apadrinhamentosStore.STATUS_CLASSES

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
  if (!formulario.value.concordo) {
    toast.warning('É necessário concordar com os termos.')
    return
  }

  carregando.value = true
  try {
    // Simula envio para o store de apadrinhamentos
    await apadrinhamentosStore.expressarInteresse({
      criancaId: crianca.value.id,
      criancaNome: crianca.value.nome,
      criancaFoto: crianca.value.foto,
      criancaRegiao: crianca.value.regiao,
      tutorId: 6, // Mock tutor
      tutorNome: 'Rosa Tutora',
      padrinhoId: authStore.user?.id, // ID do padrinho logado
      padrinhoNome: formulario.value.nome,
      padrinhoEmail: formulario.value.email,
      padrinhoTelefone: formulario.value.telefone,
      padrinhoRegiao: formulario.value.regiao,
      mensagem: formulario.value.mensagem,
      criancaIdade: crianca.value.idade,
      orcamentoAnual: crianca.value.orcamentoAnual,
      orcamentoCoberto: crianca.value.orcamentoCoberto
    })

    toast.success('Solicitação enviada com sucesso!')
    
    // Feedback visual adicional
    mostrarSucesso.value = true
    setTimeout(() => {
      mostrarSucesso.value = false
    }, 3000)

    fecharFormulario()
  } catch (error) {
    console.error('Erro ao submeter interesse:', error)
    toast.error('Ocorreu um erro ao enviar a sua solicitação. Por favor tente novamente.')
  } finally {
    carregando.value = false
  }
}

const toggleArea = (areaId) => {
  const index = openAreas.value.indexOf(areaId)
  if (index === -1) {
    openAreas.value.push(areaId)
  } else {
    openAreas.value.splice(index, 1)
  }
}

const isAreaOpen = (areaId) => openAreas.value.includes(areaId)

const specialistAreas = [
  { id: 'sadd', nome: 'Direitos e Documentação', icon: FileText },
  { id: 'sanc', nome: 'Nutrição e Crescimento', icon: UtensilsCrossed },
  { id: 'sasbe', nome: 'Saúde e Bem-Estar', icon: Stethoscope },
  { id: 'saad', nome: 'Alimentação Diária', icon: Heart },
  { id: 'saeie', nome: 'Educação e Inclusão', icon: GraduationCap },
  { id: 'saps', nome: 'Proteção e Segurança', icon: Shield },
  { id: 'sape', nome: 'Apoio Psicosocial', icon: Brain }
]

const getAreaIcon = (id) => specialistAreas.find(a => a.id === id)?.icon || FileText
const getAreaName = (id) => specialistAreas.find(a => a.id === id)?.nome || id

const abrirModalPagamento = () => {
  modalPagamento.value.aberto = true
}

const fecharModalPagamento = () => {
  modalPagamento.value.aberto = false
  arquivoComprovativo.value = null
  notaPagamento.value = ''
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    arquivoComprovativo.value = file
  }
}

const submeterPagamento = async () => {
  if (!arquivoComprovativo.value) return

  carregandoPagamento.value = true
  try {
    await apadrinhamentosStore.submeterPagamento({
      padrinhoId: authStore.user?.id, // ID dinâmico
      criancaId: crianca.value.id,
      valor: totalSelecionado.value,
      itens: itensSelecionados.value.map(i => i.description),
      comprovativoUrl: URL.createObjectURL(arquivoComprovativo.value),
      nota: notaPagamento.value
    })

    toast.success('Comprovativo enviado! Aguarde a confirmação do Tutor.')
    fecharModalPagamento()
    itensSelecionados.value = []
  } catch (error) {
    toast.error('Erro ao enviar comprovativo.')
  } finally {
    carregandoPagamento.value = false
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
