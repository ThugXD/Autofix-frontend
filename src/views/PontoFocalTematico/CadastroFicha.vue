<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Cadastro de Fichas Técnicas</h1>
        <p class="text-gray-500 mt-1">
          {{ filteredChildren.length }} crianças aguardando avaliação técnica
        </p>
      </div>
    </div>

    <!-- Filters (Utilizadores Style) -->
    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <BaseInput
            v-model="searchQuery"
            placeholder="Pesquisar por nome da criança..."
            :icon-left="Search"
            clearable
          />
        </div>
        <select v-model="statusFilter" class="input">
          <option value="">Todos os status</option>
          <option value="concluido">Concluído (7/7)</option>
          <option value="em_andamento">Em andamento</option>
          <option value="pendente">Pendente</option>
        </select>
      </div>
    </div>

    <!-- Child Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Criança</th>
              <th>Cód. Cadastro</th>
              <th>Bairro / Local</th>
              <th>Progresso</th>
              <th class="text-center">Ações por Área</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center py-8">
                <Loader2 class="w-8 h-8 animate-spin text-primary mx-auto" />
              </td>
            </tr>

            <tr v-else-if="!filteredChildren.length">
              <td colspan="5" class="text-center py-8 text-gray-500">
                Nenhuma criança encontrada para avaliação
              </td>
            </tr>

            <tr v-else v-for="child in filteredChildren" :key="child.id" class="group">
              <td>
                <div class="flex items-center gap-3">
                  <img 
                    :src="child.foto" 
                    :alt="child.nomeCompleto" 
                    class="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-50 group-hover:ring-primary/20 transition-all"
                  />
                  <div>
                    <span class="font-bold text-gray-900 block">{{ child.nomeCompleto }}</span>
                    <span class="text-xs text-gray-500">{{ child.sexo === 'M' ? 'Masculino' : 'Feminino' }}, {{ calculateAge(child.dataNascimento) }} anos</span>
                  </div>
                </div>
              </td>
              <td class="text-gray-600 font-mono text-xs">{{ child.codigo }}</td>
              <td class="text-gray-600">{{ child.localResidencia.split(',')[0] }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-primary transition-all duration-500"
                      :style="{ width: `${(getProgresso(child).concluidos / 7) * 100}%` }"
                    ></div>
                  </div>
                  <span class="text-xs font-bold text-gray-700">
                    {{ getProgresso(child).concluidos }}/7
                  </span>
                </div>
              </td>
              <td>
                <div class="flex items-center justify-center gap-1.5">
                  <!-- Scheduling Shortcut -->
                  <button 
                    @click="openScheduleModal(child)"
                    title="Agendar Visita"
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-primary/5 text-primary hover:bg-primary hover:text-white border border-primary/10 mr-2"
                  >
                    <Calendar class="w-4 h-4" />
                  </button>

                  <button 
                    v-for="area in specialistAreas" 
                    :key="area.id"
                    @click="openFichaModal(child, area)"
                    :title="area.nome"
                    :class="[
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all relative group/btn',
                      getFichaStatusClass(child, area.id)
                    ]"
                  >
                    <component :is="area.icon" class="w-4 h-4" />
                    <!-- Tooltip basic -->
                    <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {{ area.id.toUpperCase() }}
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent Fichas (Submetidas) -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-900">Minhas Submissões Recentes</h2>
        <FileText class="w-5 h-5 text-gray-400" />
      </div>
      
      <div class="overflow-x-auto">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Criança</th>
              <th>Área Técnica</th>
              <th>Data</th>
              <th>Status</th>
              <th class="text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ficha in tematicoStore.minhasFichas.slice(0, 5)" :key="ficha.id">
              <td class="font-medium text-gray-900">{{ ficha.criancaNome }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <component :is="getAreaIcon(ficha.pfTematico)" class="w-3.5 h-3.5" />
                  </div>
                  <span class="text-xs">{{ getAreaName(ficha.pfTematico) }}</span>
                </div>
              </td>
              <td class="text-gray-500 text-xs">{{ formatDate(ficha.dataSubmissao || ficha.dataVisitaPlanejada) }}</td>
              <td>
                <span :class="['badge badge-sm', getStatusBadgeClass(ficha.status)]">
                  {{ getStatusLabel(ficha.status) }}
                </span>
              </td>
              <td class="text-right">
                <router-link 
                  :to="`/ponto-focal-tematico/ficha/${ficha.id}`"
                  class="text-primary hover:underline text-xs font-bold"
                >
                  Visualizar
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Schedule Modal -->
    <BaseModal v-model="scheduleModalOpen" title="Agendar Visita Técnica" size="md">
      <div v-if="selectedChild" class="space-y-4">
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <img :src="selectedChild.foto" class="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p class="font-bold text-gray-900">{{ selectedChild.nomeCompleto }}</p>
            <p class="text-xs text-gray-500">Agendando para: {{ getAreaName(tematicoStore.currentPFTematico) }}</p>
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-gray-700">Data da Visita</label>
          <input type="date" v-model="scheduleDate" class="input" />
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3 justify-end w-full">
          <BaseButton variant="secondary" @click="scheduleModalOpen = false">Cancelar</BaseButton>
          <BaseButton 
            variant="primary" 
            :loading="scheduling" 
            :disabled="!scheduleDate"
            @click="handleSubmitSchedule"
          >
            Confirmar Agendamento
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Ficha Modal -->
    <BaseModal 
      v-model="modalOpen" 
      :title="modalTitle"
      size="xl"
    >
      <div v-if="selectedChild && selectedArea" class="space-y-6">
        <!-- Child Header in Modal -->
        <div class="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <img :src="selectedChild.foto" class="w-14 h-14 rounded-xl object-cover ring-2 ring-white" />
          <div>
            <p class="text-lg font-bold text-gray-900">{{ selectedChild.nomeCompleto }}</p>
            <div class="flex items-center gap-2 mt-1">
              <div class="w-6 h-6 rounded bg-white flex items-center justify-center text-primary shadow-sm">
                <component :is="selectedArea.icon" class="w-3.5 h-3.5" />
              </div>
              <p class="text-sm font-medium text-primary">{{ selectedArea.nome }}</p>
            </div>
          </div>
        </div>

        <!-- Dynamic Specialized Form -->
        <div class="min-h-[400px]">
          <component 
            :is="selectedArea.component" 
            v-model="formData"
            :isReadOnly="false"
          />
        </div>

        <!-- Shared Observations -->
        <div class="space-y-2 pt-4 border-t border-gray-100">
          <label class="block text-sm font-bold text-gray-700">Observações Gerais do Avaliador</label>
          <textarea 
            v-model="formData.observacoesPF" 
            rows="3" 
            class="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
            placeholder="Descreva observações importantes que não foram capturadas nos campos específicos..."
          ></textarea>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2 text-primary">
            <Loader2 v-if="saving" class="w-4 h-4 animate-spin" />
            <p class="text-xs italic font-medium">
              {{ saving ? 'A salvar rascunho...' : '✓ Rascunho guardado automaticamente' }}
            </p>
          </div>
          <div class="flex gap-3">
            <BaseButton variant="secondary" @click="closeModal">Sair sem Salvar</BaseButton>
            <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
              <span v-if="!loading">Finalizar e Submeter</span>
              <span v-else>A processar...</span>
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import { 
  Search, 
  Loader2, 
  FileText, 
  Heart, 
  Stethoscope, 
  UtensilsCrossed, 
  GraduationCap, 
  Shield, 
  Brain,
  Plus,
  Calendar
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useToast } from 'vue-toastification'

// Forms
import SADDForm from '@/components/pontoFocalTematico/specialized/SADDForm.vue'
import SANCForm from '@/components/pontoFocalTematico/specialized/SANCForm.vue'
import SASBEForm from '@/components/pontoFocalTematico/specialized/SASBEForm.vue'
import SAADForm from '@/components/pontoFocalTematico/specialized/SAADForm.vue'
import SAEIEForm from '@/components/pontoFocalTematico/specialized/SAEIEForm.vue'
import SAPSForm from '@/components/pontoFocalTematico/specialized/SAPSForm.vue'
import SAPEForm from '@/components/pontoFocalTematico/specialized/SAPEForm.vue'

const toast = useToast()
const pfStore = usePontoFocalStore()
const tematicoStore = usePontoFocalTematicoStore()

const loading = ref(false)
const saving = ref(false)
const scheduling = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')

// Scheduling State
const scheduleModalOpen = ref(false)
const scheduleDate = ref('')

const specialistAreas = [
  { id: 'sadd', nome: 'Direitos e Documentação', icon: FileText, component: SADDForm },
  { id: 'sanc', nome: 'Nutrição e Crescimento', icon: Heart, component: SANCForm },
  { id: 'sasbe', nome: 'Saúde e Bem-Estar', icon: Stethoscope, component: SASBEForm },
  { id: 'saad', nome: 'Alimentação Diária', icon: UtensilsCrossed, component: SAADForm },
  { id: 'saeie', nome: 'Educação e Inclusão', icon: GraduationCap, component: SAEIEForm },
  { id: 'saps', nome: 'Proteção e Segurança', icon: Shield, component: SAPSForm },
  { id: 'sape', nome: 'Psicosocial Emocional', icon: Brain, component: SAPEForm }
]

const modalOpen = ref(false)
const selectedChild = ref(null)
const selectedArea = ref(null)
const formData = ref({
  diagnostico: {},
  especializada: {},
  necessidades: [],
  evidencias: [],
  observacoesPF: ''
})

const filteredChildren = computed(() => {
  let list = pfStore.cadastros
  
  if (searchQuery.value) {
    list = list.filter(c => 
      c.nomeCompleto.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.codigo.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    list = list.filter(c => {
      const progresso = getProgresso(c)
      if (statusFilter.value === 'concluido') return progresso.concluidos === 7
      if (statusFilter.value === 'em_andamento') return progresso.concluidos > 0 && progresso.concluidos < 7
      if (statusFilter.value === 'pendente') return progresso.concluidos === 0
      return true
    })
  }
  
  return list
})

const modalTitle = computed(() => {
  if (!selectedArea.value) return 'Avaliação Técnica'
  return `Ficha Técnica: ${selectedArea.value.id.toUpperCase()}`
})

// Methods
const calculateAge = (dateString) => {
  const birthday = new Date(dateString)
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const getProgresso = (child) => {
  if (!child.pontosFocais) return { concluidos: 0 }
  const concluidos = child.pontosFocais.filter(f => f.status === 'concluido').length
  return { concluidos }
}

const getFichaStatusClass = (child, areaId) => {
  // Check if there's a submitted ficha in tematicoStore
  const submitted = tematicoStore.fichasTecnicas.find(f => f.cadastroId === child.id && f.pfTematico === areaId)
  if (submitted && ['submetida', 'aprovada_nivel1', 'aprovada_nivel2'].includes(submitted.status)) {
    return 'bg-green-100 text-green-600 border border-green-200'
  }

  // Check draft
  const draftKey = `draft_${child.id}_${areaId}`
  if (tematicoStore.getDraft(draftKey)) {
    return 'bg-amber-100 text-amber-600 border border-amber-200'
  }

  return 'bg-gray-100 text-gray-400 border border-gray-100 group-hover:bg-primary/5 group-hover:text-primary'
}

const openFichaModal = (child, area) => {
  selectedChild.value = child
  selectedArea.value = area
  
  const draftKey = `draft_${child.id}_${area.id}`
  const existingDraft = tematicoStore.getDraft(draftKey)
  
  if (existingDraft) {
    formData.value = JSON.parse(JSON.stringify(existingDraft))
  } else {
    formData.value = {
      diagnostico: {},
      especializada: {},
      necessidades: [],
      evidencias: [],
      observacoesPF: ''
    }
  }
  
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const openScheduleModal = (child) => {
  selectedChild.value = child
  scheduleDate.value = ''
  scheduleModalOpen.value = true
}

const handleSubmitSchedule = async () => {
  if (scheduling.value) return
  
  scheduling.value = true
  try {
    await pfStore.agendarVisitaTecnica(
      selectedChild.value.id,
      tematicoStore.currentPFTematico,
      scheduleDate.value
    )
    toast.success('Visita agendada com sucesso!')
    scheduleModalOpen.value = false
  } catch (error) {
    toast.error('Erro ao agendar visita')
  } finally {
    scheduling.value = false
  }
}

const handleSubmit = async () => {
  if (loading.value) return
  
  loading.value = true
  try {
    // Simular submissão
    await new Promise(r => setTimeout(r, 1500))
    
    const draftKey = `draft_${selectedChild.value.id}_${selectedArea.value.id}`
    tematicoStore.clearDraft(draftKey)
    
    toast.success('Ficha submetida com sucesso!')
    modalOpen.value = false
  } catch (error) {
    toast.error('Erro ao submeter ficha')
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-MZ')
}

const getAreaIcon = (id) => specialistAreas.find(a => a.id === id)?.icon || FileText
const getAreaName = (id) => specialistAreas.find(a => a.id === id)?.nome || id

const getStatusBadgeClass = (status) => {
  const map = {
    submetida: 'badge-info',
    aprovada_nivel1: 'badge-warning',
    aprovada_nivel2: 'badge-success',
    em_andamento: 'badge-warning'
  }
  return map[status] || 'badge-gray'
}

const getStatusLabel = (status) => {
  const map = {
    submetida: 'Submetida',
    aprovada_nivel1: 'Nível 1',
    aprovada_nivel2: 'Concluída',
    em_andamento: 'Rascunho'
  }
  return map[status] || status
}

// Auto-save watch
watch(formData, (newVal) => {
  if (modalOpen.value && selectedChild.value && selectedArea.value) {
    saving.value = true
    const draftKey = `draft_${selectedChild.value.id}_${selectedArea.value.id}`
    tematicoStore.updateDraft(draftKey, newVal)
    setTimeout(() => { saving.value = false }, 500)
  }
}, { deep: true })

onMounted(async () => {
  loading.value = true
  await Promise.all([
    pfStore.fetchCadastros(),
    tematicoStore.fetchFichasTecnicas()
  ])
  loading.value = false
})
</script>

<style scoped>
.table-sm th, .table-sm td {
  padding: 0.75rem 1rem;
}
.badge-sm {
  padding: 0.2rem 0.6rem;
  font-size: 0.7rem;
}
</style>
