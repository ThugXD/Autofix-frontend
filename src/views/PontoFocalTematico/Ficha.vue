<template>
  <div class="p-6 space-y-6">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-24">
      <Loader2 class="w-8 h-8 animate-spin text-primary" />
    </div>

    <template v-else-if="ficha">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft class="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Ficha Tecnica - {{ pfInfo?.codigo }}</h1>
            <p class="text-gray-500">{{ pfInfo?.nome }}</p>
          </div>
        </div>
        <span :class="getStatusClass(ficha.status)">
          {{ getStatusLabel(ficha.status) }}
        </span>
      </div>

      <!-- Child Info Card -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <img
            :src="ficha.criancaFoto"
            :alt="ficha.criancaNome"
            class="w-20 h-20 rounded-xl object-cover"
          />
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-gray-900">{{ ficha.criancaNome }}</h2>
            <p class="text-sm text-gray-500">Cadastro #{{ ficha.cadastroId }}</p>
            <p class="text-sm text-gray-500">
              Data de visita planejada: {{ formatDate(ficha.dataVisitaPlanejada) }}
            </p>
          </div>
          <div v-if="ficha.dataSubmissao" class="text-right">
            <p class="text-sm text-gray-500">Submetida em</p>
            <p class="font-medium text-gray-900">{{ formatDate(ficha.dataSubmissao) }}</p>
          </div>
        </div>
      </div>

      <!-- Feedback de Revisao (se existir) -->
      <div
        v-if="ficha.feedbackRevisaoN1 && ficha.status === 'em_andamento'"
        class="bg-amber-50 border border-amber-200 rounded-xl p-4"
      >
        <div class="flex items-start gap-3">
          <AlertCircle class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-medium text-amber-800">Pedido de Revisao</p>
            <p class="text-sm text-amber-700 mt-1">{{ ficha.feedbackRevisaoN1 }}</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="submeter" class="space-y-6">
        <!-- A. Diagnostico -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList class="w-5 h-5 text-primary" />
            A. Diagnostico
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descricao da Avaliacao *
              </label>
              <textarea
                v-model="form.diagnostico.descricaoAvaliacao"
                :disabled="isReadOnly"
                rows="4"
                class="input-field"
                placeholder="Descreva a avaliacao realizada..."
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Dados Colectados *
              </label>
              <textarea
                v-model="form.diagnostico.dadosColectados"
                :disabled="isReadOnly"
                rows="3"
                class="input-field"
                placeholder="Quais dados foram observados/colectados..."
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Recomendacoes *
              </label>
              <textarea
                v-model="form.diagnostico.recomendacoes"
                :disabled="isReadOnly"
                rows="3"
                class="input-field"
                placeholder="O que deve ser feito..."
                required
              ></textarea>
            </div>
          </div>
        </div>

        <!-- B. Especializada (Dinamica) -->
        <div v-if="pfInfo" class="space-y-6">
          <component 
            :is="specializedFormComponent" 
            v-model="form.especializada"
            :is-read-only="isReadOnly"
          />
        </div>

        <!-- C. Necessidades Especificas -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ListChecks class="w-5 h-5 text-primary" />
              B. Necessidades Especificas
            </h3>
            <button
              v-if="!isReadOnly"
              type="button"
              @click="addNecessidade"
              class="btn-secondary text-sm"
            >
              <Plus class="w-4 h-4 mr-1" />
              Adicionar
            </button>
          </div>

          <div v-if="form.necessidades.length === 0" class="text-center py-8 bg-gray-50 rounded-lg">
            <ListChecks class="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500 text-sm">Nenhuma necessidade adicionada</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(nec, index) in form.necessidades"
              :key="index"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-700">Necessidade {{ index + 1 }}</span>
                <button
                  v-if="!isReadOnly"
                  type="button"
                  @click="removeNecessidade(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm text-gray-600 mb-1">Descricao *</label>
                  <input
                    v-model="nec.descricao"
                    :disabled="isReadOnly"
                    type="text"
                    class="input-field"
                    placeholder="Ex: Certidao de Nascimento"
                    required
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm text-gray-600 mb-1">Fundamentacao Tecnica *</label>
                  <textarea
                    v-model="nec.fundamentacao"
                    :disabled="isReadOnly"
                    rows="2"
                    class="input-field"
                    placeholder="Por que e necessario..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-1">Custo Estimado (MZN) *</label>
                  <input
                    v-model.number="nec.custoEstimado"
                    :disabled="isReadOnly"
                    type="number"
                    min="0"
                    class="input-field"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-1">Tempo para Resolver *</label>
                  <input
                    v-model="nec.tempoResolver"
                    :disabled="isReadOnly"
                    type="text"
                    class="input-field"
                    placeholder="Ex: 30 dias, 3 meses"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-1">Prioridade *</label>
                  <select v-model="nec.prioridade" :disabled="isReadOnly" class="input-field" required>
                    <option value="">Selecione...</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-1">Impacto Esperado *</label>
                  <input
                    v-model="nec.impactoEsperado"
                    :disabled="isReadOnly"
                    type="text"
                    class="input-field"
                    placeholder="Ex: Crianca tera documento legal"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- C. Evidencias -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Upload class="w-5 h-5 text-primary" />
              C. Evidencias
            </h3>
          </div>

          <div v-if="!isReadOnly" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <Upload class="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p class="text-gray-600 mb-2">Arraste ficheiros ou clique para upload</p>
            <p class="text-xs text-gray-400">Fotos, documentos, relatorios (max 10MB)</p>
            <input
              type="file"
              multiple
              @change="handleFileUpload"
              class="hidden"
              id="file-upload"
            />
            <label for="file-upload" class="btn-secondary text-sm mt-3 inline-block cursor-pointer">
              Selecionar Ficheiros
            </label>
          </div>

          <div v-if="form.evidencias.length > 0" class="space-y-2">
            <div
              v-for="(ev, index) in form.evidencias"
              :key="index"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <FileText class="w-5 h-5 text-gray-500" />
                <span class="text-sm text-gray-700">{{ ev.nome }}</span>
                <span class="text-xs text-gray-400 capitalize">({{ ev.tipo }})</span>
              </div>
              <button
                v-if="!isReadOnly"
                type="button"
                @click="removeEvidencia(index)"
                class="text-red-500 hover:text-red-700"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- D. Observacoes do PF -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare class="w-5 h-5 text-primary" />
            D. Observacoes Finais
          </h3>

          <textarea
            v-model="form.observacoesPF"
            :disabled="isReadOnly"
            rows="3"
            class="input-field"
            placeholder="Observacoes adicionais..."
          ></textarea>
        </div>

        <!-- Assinatura Digital -->
        <div v-if="!isReadOnly" class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckSquare class="w-5 h-5 text-primary" />
            E. Assinatura Digital
          </h3>

          <div class="flex items-start gap-3">
            <input
              type="checkbox"
              v-model="confirmaVeracidade"
              id="confirma"
              class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label for="confirma" class="text-sm text-gray-700">
              Eu, <strong>{{ pfInfo?.codigo }} - Ponto Focal</strong>, confirmo que todos os dados
              apresentados nesta ficha tecnica sao verdadeiros e baseados em avaliacao presencial
              realizada em {{ formatDate(ficha.dataVisitaPlanejada) }}.
            </label>
          </div>
        </div>

        <!-- Feedback de Revisao (Leitura) -->
        <div v-if="ficha.feedbackRevisaoN1 && isReadOnly" class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Feedback Nivel 1</h3>
          <p class="text-gray-700">{{ ficha.feedbackRevisaoN1 }}</p>
        </div>

        <div v-if="ficha.feedbackRevisaoN2 && isReadOnly" class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Feedback Nivel 2</h3>
          <p class="text-gray-700">{{ ficha.feedbackRevisaoN2 }}</p>
        </div>

        <!-- Actions -->
        <div v-if="!isReadOnly" class="flex items-center justify-end gap-4">
          <button
            type="button"
            @click="$router.back()"
            class="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="salvarRascunho"
            class="px-6 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary/5"
          >
            Salvar Rascunho
          </button>
          <button
            type="submit"
            :disabled="!confirmaVeracidade || submitting"
            class="btn-primary"
          >
            <Loader2 v-if="submitting" class="w-4 h-4 animate-spin mr-2" />
            Submeter Ficha
          </button>
        </div>
      </form>
    </template>

    <!-- Not Found -->
    <div v-else class="text-center py-24">
      <AlertCircle class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p class="text-gray-500">Ficha nao encontrada</p>
      <router-link to="/ponto-focal-tematico" class="btn-primary mt-4 inline-block">
        Voltar ao Painel
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  ClipboardList,
  ListChecks,
  Upload,
  FileText,
  MessageSquare,
  CheckSquare,
  Plus,
  Trash2,
  X
} from 'lucide-vue-next'

// Specialist Forms
import SADDForm from '@/components/pontoFocalTematico/specialized/SADDForm.vue'
import SANCForm from '@/components/pontoFocalTematico/specialized/SANCForm.vue'
import SASBEForm from '@/components/pontoFocalTematico/specialized/SASBEForm.vue'
import SAADForm from '@/components/pontoFocalTematico/specialized/SAADForm.vue'
import SAEIEForm from '@/components/pontoFocalTematico/specialized/SAEIEForm.vue'
import SAPSForm from '@/components/pontoFocalTematico/specialized/SAPSForm.vue'
import SAPEForm from '@/components/pontoFocalTematico/specialized/SAPEForm.vue'

const route = useRoute()
const router = useRouter()
const pfStore = usePontoFocalStore()
const pfTematicoStore = usePontoFocalTematicoStore()

const loading = ref(true)
const submitting = ref(false)
const confirmaVeracidade = ref(false)

const form = ref({
  diagnostico: {
    descricaoAvaliacao: '',
    dadosColectados: '',
    recomendacoes: ''
  },
  especializada: {},
  necessidades: [],
  evidencias: [],
  observacoesPF: ''
})

const specializedComponents = {
  sadd: SADDForm,
  sanc: SANCForm,
  sasbe: SASBEForm,
  saad: SAADForm,
  saeie: SAEIEForm,
  saps: SAPSForm,
  sape: SAPEForm
}

const specializedFormComponent = computed(() => {
  return specializedComponents[pfInfo.value?.id] || null
})

const ficha = computed(() => pfTematicoStore.getFichaById(route.params.id))

const pfInfo = computed(() => {
  if (!ficha.value) return null
  return pfStore.pontosFocaisTematicos.find(pf => pf.id === ficha.value.pfTematico)
})

const isReadOnly = computed(() => {
  if (!ficha.value) return true
  return ['submetida', 'aprovada_nivel1', 'aprovada_nivel2'].includes(ficha.value.status)
})

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-MZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    pendente: 'px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700',
    em_andamento: 'px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700',
    submetida: 'px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700',
    aprovada_nivel1: 'px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700',
    aprovada_nivel2: 'px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700'
  }
  return classes[status] || 'px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  const labels = {
    pendente: 'Pendente',
    em_andamento: 'Em Andamento',
    submetida: 'Submetida',
    aprovada_nivel1: 'Aprovada Nivel 1',
    aprovada_nivel2: 'Aprovada Nivel 2'
  }
  return labels[status] || status
}

const addNecessidade = () => {
  form.value.necessidades.push({
    tipo: pfInfo.value?.id || '',
    descricao: '',
    fundamentacao: '',
    custoEstimado: 0,
    tempoResolver: '',
    prioridade: '',
    impactoEsperado: ''
  })
}

const removeNecessidade = (index) => {
  form.value.necessidades.splice(index, 1)
}

const handleFileUpload = (event) => {
  const files = event.target.files
  for (const file of files) {
    form.value.evidencias.push({
      nome: file.name,
      tipo: file.type.startsWith('image/') ? 'imagem' : 'documento',
      url: '#'
    })
  }
}

const removeEvidencia = (index) => {
  form.value.evidencias.splice(index, 1)
}

const salvarRascunho = async () => {
  // Para demo, apenas mostra feedback
  alert('Rascunho salvo com sucesso!')
}

const submeter = async () => {
  if (!confirmaVeracidade.value) return

  submitting.value = true
  try {
    await pfTematicoStore.submeterFicha(ficha.value.id, {
      diagnostico: form.value.diagnostico,
      especializada: form.value.especializada,
      necessidades: form.value.necessidades,
      evidencias: form.value.evidencias,
      observacoesPF: form.value.observacoesPF
    })
    router.push('/ponto-focal-tematico')
  } catch (error) {
    console.error('Erro ao submeter ficha:', error)
  } finally {
    submitting.value = false
  }
}

const loadFichaData = () => {
  if (ficha.value) {
    form.value.diagnostico = { ...ficha.value.diagnostico }
    form.value.especializada = { ...(ficha.value.especializada || {}) }
    form.value.necessidades = [...(ficha.value.necessidades || [])]
    form.value.evidencias = [...(ficha.value.evidencias || [])]
    form.value.observacoesPF = ficha.value.observacoesPF || ''

    // Se for pendente, iniciar automaticamente
    if (ficha.value.status === 'pendente') {
      pfTematicoStore.iniciarFicha(ficha.value.id)
    }
  }
}

watch(ficha, loadFichaData, { immediate: true })

onMounted(async () => {
  loading.value = true
  await pfStore.fetchComunicacoes()
  await pfTematicoStore.fetchFichasTecnicas()
  loadFichaData()
  loading.value = false
})
</script>
