<template>
  <div>
    <!-- Cabecalho -->
    <div class="card mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="page-title">Revisao de Fichas</h2>
          <p class="page-subtitle">Revisao de Nivel 1 - Ponto Focal Comunitario</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pontoFocalStore.loading" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando cadastros..." />
    </div>

    <!-- Lista de Cadastros para Revisao -->
    <div v-else>
      <!-- Tabs -->
      <div class="card mb-6">
        <div class="flex gap-4 border-b border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
              activeTab === tab.id
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
            <span
              v-if="tab.count > 0"
              :class="[
                'ml-2 px-2 py-0.5 rounded-full text-xs',
                activeTab === tab.id ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
              ]"
            >
              {{ tab.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Cadastros Aguardando Revisao -->
      <div v-if="activeTab === 'aguardando'" class="space-y-4">
        <div
          v-for="cadastro in cadastrosAguardandoRevisao"
          :key="cadastro.id"
          class="card hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start gap-6">
            <img
              :src="cadastro.foto"
              :alt="cadastro.nomeCompleto"
              class="w-20 h-20 rounded-full object-cover flex-shrink-0"
            />
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-xs font-mono text-gray-500">{{ cadastro.codigo }}</span>
                <span class="badge bg-purple-100 text-purple-800">Aguardando Revisao</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-600">{{ cadastro.localResidencia }}, {{ cadastro.provincia }}</p>
              
              <div class="mt-4">
                <p class="text-sm font-medium text-gray-700 mb-2">Fichas Tecnicas (7/7 submetidas)</p>
                <div class="flex gap-2 flex-wrap">
                  <span
                    v-for="pf in cadastro.pontosFocais"
                    :key="pf.pfId"
                    class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                  >
                    {{ pf.pfId.toUpperCase() }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <BaseButton
                variant="primary"
                :icon="FileCheck"
                @click="iniciarRevisao(cadastro)"
              >
                Revisar Fichas
              </BaseButton>
              <router-link :to="{ name: 'cadastro-detalhes', params: { id: cadastro.id } }">
                <BaseButton variant="secondary" :icon="Eye" size="sm">
                  Ver FICHA 00
                </BaseButton>
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="cadastrosAguardandoRevisao.length === 0" class="card text-center py-12">
          <CheckCircle class="w-16 h-16 text-green-300 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">Nenhum cadastro aguardando revisao</p>
          <p class="text-gray-400 text-sm">Todos os cadastros foram revisados</p>
        </div>
      </div>

      <!-- Cadastros em Revisao -->
      <div v-if="activeTab === 'em_revisao'" class="space-y-4">
        <div class="card text-center py-12">
          <Clock class="w-16 h-16 text-orange-300 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">Nenhum cadastro em revisao no momento</p>
        </div>
      </div>

      <!-- Cadastros Revisados -->
      <div v-if="activeTab === 'revisados'" class="space-y-4">
        <div class="card text-center py-12">
          <FileCheck class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">Historico de revisoes aparecera aqui</p>
        </div>
      </div>
    </div>

    <!-- Modal de Revisao -->
    <div v-if="showRevisaoModal && cadastroSelecionado" class="modal-overlay" @click.self="showRevisaoModal = false">
      <div class="modal-content p-6 max-w-4xl">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Revisao de Fichas Tecnicas</h3>
            <p class="text-gray-600">{{ cadastroSelecionado.nomeCompleto }} - {{ cadastroSelecionado.codigo }}</p>
          </div>
          <button @click="showRevisaoModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Lista de Fichas para Revisao -->
        <div class="space-y-4 max-h-[60vh] overflow-y-auto">
          <div
            v-for="(pf, index) in cadastroSelecionado.pontosFocais"
            :key="pf.pfId"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ index + 1 }}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">{{ pf.pfId.toUpperCase() }}</h4>
                  <p class="text-sm text-gray-600">{{ getPFNome(pf.pfId) }}</p>
                  <p class="text-xs text-gray-500 mt-1">Visita: {{ formatDate(pf.dataVisita) }}</p>
                  <p v-if="pf.observacoes" class="text-xs text-gray-600 mt-1 italic">{{ pf.observacoes }}</p>
                </div>
              </div>
              
              <div class="flex gap-2">
                <button
                  @click="aprovarFicha(pf.pfId)"
                  :class="[
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    fichasRevisao[pf.pfId] === 'aprovada'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                  ]"
                >
                  <CheckCircle class="w-4 h-4 inline mr-1" />
                  Aprovar
                </button>
                <button
                  @click="pedirRevisaoFicha(pf.pfId)"
                  :class="[
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    fichasRevisao[pf.pfId] === 'revisao'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                  ]"
                >
                  <RotateCcw class="w-4 h-4 inline mr-1" />
                  Pedir Revisao
                </button>
              </div>
            </div>

            <!-- Feedback se pedir revisao -->
            <div v-if="fichasRevisao[pf.pfId] === 'revisao'" class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Feedback para o PF Tematico</label>
              <textarea
                v-model="feedbackFichas[pf.pfId]"
                rows="2"
                class="input"
                placeholder="Descreva o que precisa ser corrigido..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Accoes -->
        <div class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            {{ fichasAprovadas }}/7 fichas aprovadas
          </p>
          <div class="flex gap-3">
            <BaseButton variant="secondary" @click="showRevisaoModal = false">
              Cancelar
            </BaseButton>
            <BaseButton
              variant="success"
              :disabled="fichasAprovadas < 7"
              @click="submeterRevisao"
            >
              Submeter para Nivel 2
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { format } from 'date-fns'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { useToast } from 'vue-toastification'
import {
  FileCheck,
  Eye,
  CheckCircle,
  Clock,
  X,
  RotateCcw
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const toast = useToast()
const pontoFocalStore = usePontoFocalStore()

const activeTab = ref('aguardando')
const showRevisaoModal = ref(false)
const cadastroSelecionado = ref(null)
const fichasRevisao = reactive({})
const feedbackFichas = reactive({})

const tabs = computed(() => [
  { id: 'aguardando', label: 'Aguardando Revisao', count: cadastrosAguardandoRevisao.value.length },
  { id: 'em_revisao', label: 'Em Revisao', count: 0 },
  { id: 'revisados', label: 'Revisados', count: 0 }
])

const cadastrosAguardandoRevisao = computed(() =>
  pontoFocalStore.cadastros.filter(c => c.status === 'aguardando_revisao')
)

const fichasAprovadas = computed(() => {
  return Object.values(fichasRevisao).filter(v => v === 'aprovada').length
})

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return date
  }
}

const getPFNome = (pfId) => {
  const pf = pontoFocalStore.pontosFocaisTematicos.find(p => p.id === pfId)
  return pf ? pf.nome : pfId
}

const iniciarRevisao = (cadastro) => {
  cadastroSelecionado.value = cadastro
  // Reset estados
  cadastro.pontosFocais.forEach(pf => {
    fichasRevisao[pf.pfId] = ''
    feedbackFichas[pf.pfId] = ''
  })
  showRevisaoModal.value = true
}

const aprovarFicha = (pfId) => {
  fichasRevisao[pfId] = 'aprovada'
}

const pedirRevisaoFicha = (pfId) => {
  fichasRevisao[pfId] = 'revisao'
}

const submeterRevisao = () => {
  toast.success('Revisao submetida para Nivel 2!')
  showRevisaoModal.value = false
}

onMounted(() => {
  pontoFocalStore.fetchCadastros()
})
</script>
