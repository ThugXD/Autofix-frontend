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
            <p class="text-2xl font-bold text-gray-900">{{ pfStore.cadastrosAguardandoRevisao.length }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ pfStore.cadastrosOrcamento.length }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ pfStore.cadastrosProntos.length }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ pfStore.cadastrosPublicados.length }}</p>
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
            'py-3 btn text-sm font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-primary bg-gray-300 text-primary'
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

    <!-- Tab Content -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
      <Loader2 class="w-10 h-10 animate-spin text-primary mb-4" />
      <p class="text-gray-500 font-medium">A carregar cadastros...</p>
    </div>

    <div v-else class="space-y-4">
      <!-- Active Tab: Pendentes -->
      <div v-if="activeTab === 'pendentes'" class="space-y-4">
        <div v-if="pfStore.cadastrosAguardandoRevisao.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro aguardando revisao N2</p>
        </div>

        <div
          v-for="cadastro in pfStore.cadastrosAguardandoRevisao"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow group"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              class="w-16 h-16 rounded-xl object-cover ring-2 ring-gray-100"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                  Aguardando N2
                </span>
              </div>
              <h3 class="font-bold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>
              <p class="text-xs text-green-600 mt-2 font-bold">✓ 7/7 fichas técnicas concluídas</p>
            </div>
            <button
              @click="abrirRevisaoN2(cadastro)"
              class="btn btn-primary"
            >
              <ShieldCheck class="w-4 h-4 mr-2" />
              Revisar Agora
            </button>
          </div>
        </div>
      </div>

      <!-- Tab: Orcamento -->
      <div v-if="activeTab === 'orcamento'" class="space-y-4">
        <div v-if="pfStore.cadastrosOrcamento.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Calculator class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro aguardando definicao de orcamento</p>
        </div>

        <div
          v-for="cadastro in pfStore.cadastrosOrcamento"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              class="w-16 h-16 rounded-xl object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                  Definir Orcamento
                </span>
              </div>
              <h3 class="font-bold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>
            </div>
            <button
              @click="abrirOrcamento(cadastro)"
              class="btn btn-primary"
            >
              <Calculator class="w-4 h-4 mr-2" />
              Calcular Custos
            </button>
          </div>
        </div>
      </div>

      <!-- Tab: Prontos -->
      <div v-if="activeTab === 'prontos'" class="space-y-4">
        <div v-if="pfStore.cadastrosProntos.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Globe class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro pronto para publicacao</p>
        </div>

        <div
          v-for="cadastro in pfStore.cadastrosProntos"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              class="w-16 h-16 rounded-xl object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                  Pronto
                </span>
              </div>
              <h3 class="font-bold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>
              <p class="text-sm text-green-600 mt-2 font-bold">
                Orcamento: {{ formatCurrency(cadastro.orcamentoAnual) }} / ano
              </p>
            </div>
            <button
              @click="handlePublicar(cadastro)"
              class="btn btn-success"
            >
              <Globe class="w-4 h-4 mr-2" />
              Publicar no Catalogo
            </button>
          </div>
        </div>
      </div>

      <!-- Tab: Publicados -->
      <div v-if="activeTab === 'publicados'" class="space-y-4">
        <div v-if="pfStore.cadastrosPublicados.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro publicado ainda</p>
        </div>

        <div
          v-for="cadastro in pfStore.cadastrosPublicados"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              class="w-16 h-16 rounded-xl object-cover grayscale opacity-80"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700 font-bold">
                  Publicado
                </span>
                <span v-if="cadastro.padrinhoId" class="px-2 py-0.5 text-xs rounded-full bg-pink-100 text-pink-700 font-bold">
                  Apadrinhado
                </span>
              </div>
              <h3 class="font-bold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>
              <p class="text-xs text-gray-400 mt-2">Publicado em {{ cadastro.dataPublicacao }}</p>
            </div>
            <router-link
              :to="`/app/padrinho/detalhes/${cadastro.id}`"
              class="btn btn-primary text-sm"
            >
              <Eye class="w-4 h-4 mr-2" />
              Ver Perfil
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <BaseModal
      v-model="showModalN2"
      :title="selectedArea ? 'Detalhes da Avaliação Técnica' : 'Revisão Final Nível 2'"
      size="xl"
    >
      <div v-if="cadastroSelecionado" class="space-y-8">
        <!-- Drill-down View -->
        <div v-if="selectedArea">
          <TechnicalAssessmentViewer
            :type="selectedArea.id"
            :title="selectedArea.nome"
            :data="getFichaDataForArea(selectedArea.id)"
            :observations="getSummaryForArea(selectedArea.id)"
            @back="selectedArea = null"
          />
        </div>

        <!-- Summary View -->
        <div v-else class="space-y-8">
          <!-- Crianca Info -->
          <div class="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <img
              :src="cadastroSelecionado.foto"
              class="w-24 h-24 rounded-2xl object-cover shadow-sm ring-4 ring-white"
            />
            <div>
              <span class="text-xs font-mono text-gray-400">{{ cadastroSelecionado.codigo }}</span>
              <h3 class="text-xl font-bold text-gray-900">{{ cadastroSelecionado.nomeCompleto }}</h3>
              <p class="text-gray-600">{{ cadastroSelecionado.localResidencia }}</p>
            </div>
          </div>

          <!-- Summary of Technical Assessments -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">Sumário de Avaliações Técnicas</h4>
              <span class="text-xs text-gray-500 font-medium">Clique em uma área para ver detalhes</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="area in specialistAreas"
                :key="area.id"
                @click="selectedArea = area"
                class="p-4 rounded-xl border bg-white flex flex-col gap-2 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all group"
                :class="getFichaStatusColor(area.id)"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <component :is="area.icon" class="w-4 h-4 text-indigo-500" />
                    <span class="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-indigo-600">{{ area.id }}</span>
                  </div>
                  <Eye class="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p class="text-sm font-bold text-gray-800">{{ area.nome }}</p>
                <p class="text-xs text-gray-500 italic mt-1 line-clamp-2">
                  "{{ getSummaryForArea(area.id) }}"
                </p>
                <button class="text-xs font-bold text-indigo-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Ver Ficha Completa <ArrowRight class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <!-- Decision Box -->
          <div class="space-y-4 pt-4 border-t border-gray-100">
            <label class="block text-sm font-bold text-gray-700">Parecer Final do Gestor</label>
            <textarea
              v-model="gestorComment"
              rows="3"
              class="input p-4 bg-gray-50 border border-gray-200 rounded-2xl w-full"
              placeholder="Observações ou instruções para os pontos focais..."
            ></textarea>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between items-center w-full">
          <button @click="handleRejeitar" class="btn-secondary text-red-600 hover:bg-red-50">
            <XCircle class="w-4 h-4 mr-2" />
            Solicitar Ajustes
          </button>
          <div class="flex gap-3">
            <BaseButton variant="secondary" @click="showModalN2 = false">Fechar</BaseButton>
            <BaseButton variant="primary" :loading="processing" @click="handleAprovarN2">
              <CheckCircle class="w-4 h-4 mr-2" />
              Aprovar para Orçamento
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>

    <!-- Modal Orcamento -->
    <BaseModal
      v-model="showModalOrcamento"
      title="Definicao de Orcamento Anual"
      size="xl"
    >
      <div v-if="cadastroSelecionado" class="space-y-6">
        <div class="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
          <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
            <Calculator class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-blue-900">Plano de Custos: {{ cadastroSelecionado.nomeCompleto }}</h4>
            <p class="text-sm text-blue-700">Preencha os valores anuais estimados para cada rubrica de apoio.</p>
          </div>
        </div>

        <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div v-for="area in budgetLines" :key="area.areaId" class="rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all">
            <!-- Area Header (Clickable to Toggle) -->
            <div 
              @click="toggleArea(area.areaId)"
              class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              :class="{ 'bg-blue-50/30': isAreaOpen(area.areaId) }"
            >
              <div class="flex items-center gap-3">
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  :class="isAreaOpen(area.areaId) ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'"
                >
                  <component :is="getAreaIcon(area.areaId)" class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">{{ getAreaName(area.areaId) }}</h4>
                  <p class="text-xs text-gray-500 uppercase tracking-wider">{{ area.areaId }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <p class="text-xs text-gray-400 font-medium">Subtotal</p>
                  <p class="font-bold text-gray-900">{{ formatCurrency(area.items.reduce((sum, i) => sum + (i.value || 0), 0)) }}</p>
                </div>
                <ChevronDown 
                  class="w-5 h-5 text-gray-400 transition-transform duration-300"
                  :class="{ 'rotate-180 text-blue-500': isAreaOpen(area.areaId) }"
                />
              </div>
            </div>

            <!-- Area Content (Collapsible) -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-if="isAreaOpen(area.areaId)" class="p-5 pt-0 border-t border-gray-50 space-y-4 mt-4">
                <!-- Line Items -->
                <div class="space-y-3">
                  <div v-for="(item, index) in area.items" :key="index" class="flex gap-3 items-start">
                    <div class="flex-1">
                      <input
                        v-model="item.description"
                        type="text"
                        class="input text-sm py-2 px-3 focus:ring-blue-500 border-gray-200"
                        placeholder="Ex: Consultas mensais, Medicamentos, etc."
                      />
                    </div>
                    <div class="w-40">
                      <div class="relative">
                        <input
                          v-model.number="item.value"
                          type="number"
                          class="input text-sm py-2 pl-3 pr-10 text-right focus:ring-blue-500 border-gray-200"
                          placeholder="0.00"
                        />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">MZN</span>
                      </div>
                    </div>
                    <button 
                      @click.stop="area.items.splice(index, 1)"
                      class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover item"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Add Item Button -->
                <button 
                  @click.stop="area.items.push({ description: '', value: 0 })"
                  class="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors py-2"
                >
                  <Plus class="w-4 h-4" />
                  Adicionar Item para {{ getAreaName(area.areaId) }}
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Total Footer -->
        <div class="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 mt-6 flex justify-between items-center">
          <div>
            <p class="text-indigo-900 font-bold">TOTAL ANUAL ESTIMADO</p>
            <p class="text-xs text-indigo-700">Soma de todas as rubricas técnicas</p>
          </div>
          <span class="text-2xl font-black text-indigo-900">{{ formatCurrency(totalBudget) }}</span>
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3 justify-end w-full">
          <BaseButton variant="secondary" @click="showModalOrcamento = false">Cancelar</BaseButton>
          <BaseButton variant="primary" :loading="processing" @click="handleSalvarOrcamento">
            <Save class="w-4 h-4 mr-2" />
            Salvar e Definir como Pronto
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Clock, Calculator, Globe, CheckCircle, ShieldCheck, Eye,
  XCircle, FileText, Heart, Stethoscope, UtensilsCrossed,
  GraduationCap, Shield, Brain, Loader2, Save, Trash2, Plus,
  ChevronDown
} from 'lucide-vue-next'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import TechnicalAssessmentViewer from '@/components/gestor/TechnicalAssessmentViewer.vue'
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'
import { useToast } from 'vue-toastification'

const toast = useToast()
const pfStore = usePontoFocalStore()
const tematicoStore = usePontoFocalTematicoStore()

const loading = ref(false)
const processing = ref(false)
const activeTab = ref('pendentes')
const showModalN2 = ref(false)
const showModalOrcamento = ref(false)
const cadastroSelecionado = ref(null)
const selectedArea = ref(null)
const openAreas = ref([]) // IDs das áreas abertas no orçamento
const gestorComment = ref('')

const budgetLines = ref([])

const specialistAreas = [
  { id: 'sadd', nome: 'Direitos e Documentação', icon: FileText },
  { id: 'sanc', nome: 'Nutrição e Crescimento', icon: Heart },
  { id: 'sasbe', nome: 'Saúde e Bem-Estar', icon: Stethoscope },
  { id: 'saad', nome: 'Alimentação Diária', icon: UtensilsCrossed },
  { id: 'saeie', nome: 'Educação e Inclusão', icon: GraduationCap },
  { id: 'saps', nome: 'Proteção e Segurança', icon: Shield },
  { id: 'sape', nome: 'Psicosocial Emocional', icon: Brain }
]

const tabs = computed(() => [
  { id: 'pendentes', label: 'Aguardando N2', count: pfStore.cadastrosAguardandoRevisao.length },
  { id: 'orcamento', label: 'Definir Orçamento', count: pfStore.cadastrosOrcamento.length },
  { id: 'prontos', label: 'Prontos Publicar', count: pfStore.cadastrosProntos.length },
  { id: 'publicados', label: 'Publicados', count: pfStore.cadastrosPublicados.length }
])

const totalBudget = computed(() => {
  return budgetLines.value.reduce((total, area) => {
    return total + area.items.reduce((sum, item) => sum + (item.value || 0), 0)
  }, 0)
})

// Methods
const fetchAll = async () => {
  loading.value = true
  await Promise.all([
    pfStore.fetchCadastros(),
    tematicoStore.fetchFichasTecnicas()
  ])
  loading.value = false
}

const abrirRevisaoN2 = (cadastro) => {
  cadastroSelecionado.value = cadastro
  gestorComment.value = ''
  selectedArea.value = null
  showModalN2.value = true
}

const handleAprovarN2 = async () => {
  processing.value = true
  try {
    await pfStore.aprovarNivel2(cadastroSelecionado.value.id)
    toast.success('Cadastro aprovado para definição de orçamento!')
    showModalN2.value = false
    activeTab.value = 'orcamento'
  } catch (e) {
    toast.error('Erro ao aprovar cadastro')
  } finally {
    processing.value = false
  }
}

const handleRejeitar = async () => {
  if (!gestorComment.value) {
    toast.warning('Por favor, descreva os ajustes necessários.')
    return
  }
  processing.value = true
  try {
    await pfStore.rejeitarNivel2(cadastroSelecionado.value.id, gestorComment.value)
    toast.success('Solicitação de ajustes enviada com sucesso.')
    showModalN2.value = false
  } catch (e) {
    toast.error('Erro ao enviar solicitação')
  } finally {
    processing.value = false
  }
}

const defaultNeeds = {
  sadd: ['Registo Civil / Certidão', 'Documentação do Tutor', 'Emissão de NUIT'],
  sanc: ['Suplemento Multivitamínico', 'Acompanhamento Nutricional', 'Cesta Nutricional Especial'],
  sasbe: ['Check-up Geral Trimestral', 'Esquema Vacinal', 'Medicamentos de Base'],
  saad: ['Cesta Básica Mensal', 'Reforço Alimentar Escolar', 'Kit de Higiene'],
  saeie: ['Kit Escolar Anual', 'Uniforme e Calçado', 'Apoio em Propinas / Matrícula'],
  saps: ['Visitas de Monitoria Local', 'Melhoria de Condições de Dormida', 'Proteção / Fardamento Familiar'],
  sape: ['Sessões de Aconselhamento', 'Atividades de Integração Social', 'Apoio Psicossocial à Família']
}

const abrirOrcamento = (cadastro) => {
  cadastroSelecionado.value = cadastro
  openAreas.value = [] // Resetar áreas abertas
  
  // Buscar todas as necessidades identificadas pelos especialistas
  const assessmentNecessities = tematicoStore.getAllNecessidadesByCadastro(cadastro.id)
  
  // Agrupar necessidades por área especialista para inicializar as linhas do orçamento
  budgetLines.value = specialistAreas.map(area => {
    const areaNecessities = assessmentNecessities.filter(n => n.tipo === area.id)
    
    // Itens vindos da avaliação técnica
    const assessmentItems = areaNecessities.map(n => ({
      description: n.descricao,
      value: n.custoEstimado || 0
    }))
    
    // Itens padrão sugeridos para esta área
    const defaults = (defaultNeeds[area.id] || []).map(desc => ({
      description: desc,
      value: 0
    }))

    // Combinar: itens da avaliação primeiro, depois completamos com os padrões até ter pelo menos 3
    let combinedItems = [...assessmentItems]
    for (const def of defaults) {
      if (combinedItems.length >= 3) break
      // Evitar duplicar descrições idênticas
      if (!combinedItems.some(i => i.description.toLowerCase() === def.description.toLowerCase())) {
        combinedItems.push(def)
      }
    }
    
    // Se ainda assim tiver menos de 3 (caso a lista padrão seja curta), adicionamos vazios
    while (combinedItems.length < 3) {
      combinedItems.push({ description: '', value: 0 })
    }

    return {
      areaId: area.id,
      items: combinedItems
    }
  })

  // Manter todas as áreas colapsadas por padrão para um layout mais limpo
  openAreas.value = []

  showModalOrcamento.value = true
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

const handleSalvarOrcamento = async () => {
  if (totalBudget.value <= 0) {
    toast.warning('O orçamento total deve ser superior a zero.')
    return
  }
  processing.value = true
  try {
    await pfStore.definirOrcamento(cadastroSelecionado.value.id, totalBudget.value, budgetLines.value)
    toast.success('Orçamento definido! O cadastro está pronto para publicação.')
    showModalOrcamento.value = false
    activeTab.value = 'prontos'
  } catch (e) {
    toast.error('Erro ao salvar orçamento')
  } finally {
    processing.value = false
  }
}

const handlePublicar = async (cadastro) => {
  if (!confirm(`Confirmar publicação de ${cadastro.nomeCompleto} no catálogo?`)) return

  try {
    await pfStore.publicarNoCatalogo(cadastro.id)
    toast.success('Criança publicada no catálogo com sucesso!')
    activeTab.value = 'publicados'
  } catch (e) {
    toast.error('Erro ao publicar cadastro')
  }
}

const getFichaStatusColor = (areaId) => {
  return 'border-green-100 bg-green-50 shadow-sm'
}

const getSummaryForArea = (areaId) => {
  const ficha = tematicoStore.fichasTecnicas.find(
    f => f.cadastroId === cadastroSelecionado.value.id && f.pfTematico === areaId
  )
  if (ficha) return ficha.observacoesPF || 'Necessidades identificadas e validadas pelo especialista.'
  return 'Avaliação concluída com sucesso.'
}

const getFichaDataForArea = (areaId) => {
  const ficha = tematicoStore.fichasTecnicas.find(
    f => f.cadastroId === cadastroSelecionado.value.id && f.pfTematico === areaId
  )
  return ficha?.especializada || {}
}

const getAreaIcon = (id) => specialistAreas.find(a => a.id === id)?.icon || FileText
const getAreaName = (id) => specialistAreas.find(a => a.id === id)?.nome || id

const formatCurrency = (value) => {
  // Formatação customizada para MZN: xxx.xxx.xxx,xx MZN
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' MZN'
}

onMounted(fetchAll)
</script>

<style scoped>
.input {
  outline: none;
  transition: all 0.2s;
}
.input:focus {
  border-color: #4f46e5;
  background-color: white;
}
</style>
