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
              class="btn-primary text-sm bg-indigo-600 hover:bg-indigo-700"
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
              class="btn-primary text-sm bg-blue-600 hover:bg-blue-700"
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
              class="btn-primary text-sm bg-green-600 hover:bg-green-700"
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
              class="btn-secondary text-sm"
            >
              <Eye class="w-4 h-4 mr-2" />
              Ver Perfil
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Revisao N2 -->
    <BaseModal
      v-model="showModalN2"
      title="Revisao Final Nivel 2"
      size="xl"
    >
      <div v-if="cadastroSelecionado" class="space-y-8">
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
          <h4 class="font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">Sumário de Avaliações Técnicas</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="area in specialistAreas"
              :key="area.id"
              class="p-4 rounded-xl border bg-white flex flex-col gap-2"
              :class="getFichaStatusColor(area.id)"
            >
              <div class="flex items-center gap-2">
                <component :is="area.icon" class="w-4 h-4" />
                <span class="text-xs font-bold uppercase tracking-wider">{{ area.id }}</span>
              </div>
              <p class="text-sm font-bold text-gray-800">{{ area.nome }}</p>
              <p class="text-xs text-gray-500 italic mt-1">
                "{{ getSummaryForArea(area.id) }}"
              </p>
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

        <div class="overflow-x-auto rounded-2xl border border-gray-100 overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left p-4 text-xs font-bold text-gray-500 uppercase">Rubrica Técnica</th>
                <th class="text-right p-4 text-xs font-bold text-gray-500 uppercase">Necessidades</th>
                <th class="text-right p-4 text-xs font-bold text-gray-500 uppercase w-48">Orçamento Anual (MZN)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in budgetLines" :key="item.areaId">
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <component :is="getAreaIcon(item.areaId)" class="w-4 h-4 text-gray-400" />
                    <span class="text-sm font-bold text-gray-900">{{ getAreaName(item.areaId) }}</span>
                  </div>
                </td>
                <td class="p-4 text-right">
                  <span class="text-sm text-gray-600">{{ item.count || 2 }} itens</span>
                </td>
                <td class="p-4">
                  <input
                    type="number"
                    v-model="item.value"
                    class="input text-right text-sm py-1.5 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot class="bg-indigo-50">
              <tr>
                <td colspan="2" class="p-4 text-right">
                  <span class="text-indigo-900 font-bold">TOTAL ANUAL ESTIMADO</span>
                </td>
                <td class="p-4 text-right">
                  <span class="text-lg font-black text-indigo-900">{{ formatCurrency(totalBudget) }}</span>
                </td>
              </tr>
            </tfoot>
          </table>
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
  GraduationCap, Shield, Brain, Loader2, Save
} from 'lucide-vue-next'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
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
  return budgetLines.value.reduce((acc, line) => acc + (line.value || 0), 0)
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

const abrirOrcamento = (cadastro) => {
  cadastroSelecionado.value = cadastro
  budgetLines.value = specialistAreas.map(area => ({
    areaId: area.id,
    value: 0,
    count: 1
  }))
  showModalOrcamento.value = true
}

const handleSalvarOrcamento = async () => {
  if (totalBudget.value <= 0) {
    toast.warning('O orçamento total deve ser superior a zero.')
    return
  }
  processing.value = true
  try {
    await pfStore.definirOrcamento(cadastroSelecionado.value.id, totalBudget.value)
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
