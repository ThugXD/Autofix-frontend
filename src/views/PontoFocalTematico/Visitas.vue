<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Agenda de Visitas Técnicas</h1>
        <p class="text-gray-500 mt-1">
          Calendário de avaliações planejadas para a sua área de especialização
        </p>
      </div>
      <BaseButton variant="primary" @click="openScheduleModal">
        <Plus class="w-4 h-4 mr-2" />
        Novo Agendamento
      </BaseButton>
    </div>

    <!-- Filters -->
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
        <div class="flex items-center gap-2">
          <Calendar class="w-5 h-5 text-gray-400" />
          <select v-model="periodFilter" class="input">
            <option value="today">Hoje</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
            <option value="all">Todas as Visitas</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Visits List (Table Style) -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Data Planejada</th>
              <th>Criança</th>
              <th>Bairro / Localização</th>
              <th>Status</th>
              <th class="text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center py-8">
                <Loader2 class="w-8 h-8 animate-spin text-primary mx-auto" />
              </td>
            </tr>

            <tr v-else-if="!filteredVisits.length">
              <td colspan="5" class="text-center py-12">
                <div class="flex flex-col items-center gap-3 text-gray-400">
                  <Calendar class="w-12 h-12" />
                  <p>Nenhuma visita programada para este período</p>
                </div>
              </td>
            </tr>

            <tr v-else v-for="visit in filteredVisits" :key="visit.id">
              <td class="font-bold text-gray-900">
                {{ formatDateLong(visit.dataVisita) }}
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <img :src="visit.childFoto" class="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <span class="font-bold text-gray-900 block">{{ visit.childNome }}</span>
                    <span class="text-xs text-gray-500">Cadastro: #{{ visit.cadastroId }}</span>
                  </div>
                </div>
              </td>
              <td class="text-gray-600">{{ visit.local }}</td>
              <td>
                <span class="badge badge-warning">Agendada</span>
              </td>
              <td class="text-right">
                <router-link 
                  :to="`/app/ponto-focal-tematico/cadastro?search=${visit.childNome}`"
                  class="btn-primary btn-sm"
                >
                  Confirmar Visita
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Schedule Modal -->
    <BaseModal v-model="showScheduleModal" title="Agendar Visita Técnica" size="md">
      <div class="space-y-4">
        <div class="space-y-1.5">
          <label class="text-sm font-bold text-gray-700">Criança</label>
          <select v-model="scheduleForm.childId" class="input">
            <option value="">Selecione uma criança...</option>
            <option v-for="child in availableChildren" :key="child.id" :value="child.id">
              {{ child.nomeCompleto }} (#{{ child.codigo }})
            </option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-gray-700">Data da Visita</label>
          <input type="date" v-model="scheduleForm.date" class="input" />
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3 justify-end w-full">
          <BaseButton variant="secondary" @click="showScheduleModal = false">Cancelar</BaseButton>
          <BaseButton 
            variant="primary" 
            :loading="scheduling" 
            :disabled="!scheduleForm.childId || !scheduleForm.date"
            @click="handleSubmitSchedule"
          >
            Confirmar Agendamento
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import { Search, Loader2, Calendar, Plus } from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const pfStore = usePontoFocalStore()
const tematicoStore = usePontoFocalTematicoStore()

const loading = ref(false)
const scheduling = ref(false)
const searchQuery = ref('')
const periodFilter = ref('all')

const showScheduleModal = ref(false)
const scheduleForm = ref({
  childId: '',
  date: ''
})

const availableChildren = computed(() => {
  return pfStore.cadastros.filter(c => {
    const pfVisit = c.pontosFocais?.find(pf => pf.pfId === tematicoStore.currentPFTematico)
    return !pfVisit || pfVisit.status === 'pendente'
  })
})

const mockVisits = computed(() => {
  const visits = []
  pfStore.cadastros.forEach(c => {
    const pfVisit = c.pontosFocais?.find(pf => pf.pfId === tematicoStore.currentPFTematico)
    if (pfVisit && pfVisit.dataVisita && pfVisit.status !== 'concluido') {
      visits.push({
        id: `${c.id}_${pfVisit.pfId}`,
        childNome: c.nomeCompleto,
        childFoto: c.foto,
        cadastroId: c.codigo,
        dataVisita: pfVisit.dataVisita,
        local: c.localResidencia,
        area: pfVisit.pfId
      })
    }
  })
  return visits.sort((a, b) => new Date(a.dataVisita) - new Date(b.dataVisita))
})

const filteredVisits = computed(() => {
  let list = mockVisits.value
  if (searchQuery.value) {
    list = list.filter(v => v.childNome.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  return list
})

const openScheduleModal = () => {
  scheduleForm.value = { childId: '', date: '' }
  showScheduleModal.value = true
}

const handleSubmitSchedule = async () => {
  if (scheduling.value) return
  
  scheduling.value = true
  try {
    await pfStore.agendarVisitaTecnica(
      scheduleForm.value.childId,
      tematicoStore.currentPFTematico,
      scheduleForm.value.date
    )
    toast.success('Visita agendada com sucesso!')
    showScheduleModal.value = false
  } catch (error) {
    toast.error('Erro ao agendar visita')
  } finally {
    scheduling.value = false
  }
}

const formatDateLong = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-MZ', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(async () => {
  loading.value = true
  await Promise.all([
    pfStore.fetchCadastros(),
    tematicoStore.fetchFichasTecnicas()
  ])
  loading.value = false
})
</script>
