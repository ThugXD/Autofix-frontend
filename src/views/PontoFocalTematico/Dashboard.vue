<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between bg-white rounded-xl p-5 border border-gray-100">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Painel do Ponto Focal Tematico</h1>
        <p class="text-gray-500 mt-1">Gerencie suas fichas tecnicas e avaliacoes</p>
      </div>

      <!-- Selector de PF Tematico (para demo) -->
      <div class="flex items-center gap-3">
        <label class="text-sm text-gray-600">Simular como:</label>
        <select
          v-model="selectedPF"
          @change="changePF"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option v-for="pf in pontosFocais" :key="pf.id" :value="pf.id">
            {{ pf.codigo }} - {{ pf.nome.split(' ').slice(3).join(' ') }}
          </option>
        </select>
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
            <p class="text-2xl font-bold text-gray-900">{{ fichasPendentes.length }}</p>
            <p class="text-sm text-gray-500">Pendentes</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Edit3 class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ fichasEmAndamento.length }}</p>
            <p class="text-sm text-gray-500">Em Andamento</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ fichasSubmetidas.length }}</p>
            <p class="text-sm text-gray-500">Submetidas</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <FileText class="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ minhasFichas.length }}</p>
            <p class="text-sm text-gray-500">Total</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Current PF Info -->
    <div class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 bg-white border border-primary/20">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <component :is="getPFIcon(currentPFInfo?.id)" class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">{{ currentPFInfo?.codigo }}</h3>
          <p class="text-sm text-gray-600">{{ currentPFInfo?.nome }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ currentPFInfo?.descricao }}</p>
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

    <!-- Content -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else>
      <!-- Fichas Pendentes -->
      <div v-if="activeTab === 'pendentes'" class="space-y-4">
        <div v-if="fichasPendentes.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Clock class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhuma ficha pendente</p>
        </div>

        <div
          v-for="ficha in fichasPendentes"
          :key="ficha.id"
          class="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <img
                :src="ficha.criancaFoto"
                :alt="ficha.criancaNome"
                class="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h3 class="font-semibold text-gray-900">{{ ficha.criancaNome }}</h3>
                <p class="text-sm text-gray-500">
                  Visita planejada: {{ formatDate(ficha.dataVisitaPlanejada) }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                Pendente
              </span>
              <router-link
                :to="`/ponto-focal-tematico/ficha/${ficha.id}`"
                class="btn-primary text-sm border border-primary hover:bg-primary/10 rounded-full px-2 py-2"
              >
                Iniciar Avaliacao
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Fichas Em Andamento -->
      <div v-if="activeTab === 'andamento'" class="space-y-4">
        <div v-if="fichasEmAndamento.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Edit3 class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhuma ficha em andamento</p>
        </div>

        <div
          v-for="ficha in fichasEmAndamento"
          :key="ficha.id"
          class="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <img
                :src="ficha.criancaFoto"
                :alt="ficha.criancaNome"
                class="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h3 class="font-semibold text-gray-900">{{ ficha.criancaNome }}</h3>
                <p class="text-sm text-gray-500">Em preenchimento</p>
                <p v-if="ficha.feedbackRevisaoN1" class="text-xs text-amber-600 mt-1">
                  Feedback: {{ ficha.feedbackRevisaoN1 }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                Em Andamento
              </span>
              <router-link
                :to="`/ponto-focal-tematico/ficha/${ficha.id}`"
                class="btn-primary text-sm border border-primary hover:bg-primary/10 rounded-full px-2 py-2"
              >
                Continuar
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Fichas Submetidas -->
      <div v-if="activeTab === 'submetidas'" class="space-y-4">
        <div v-if="fichasSubmetidas.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhuma ficha submetida</p>
        </div>

        <div
          v-for="ficha in fichasSubmetidas"
          :key="ficha.id"
          class="bg-white rounded-xl border border-gray-100 p-5"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <img
                :src="ficha.criancaFoto"
                :alt="ficha.criancaNome"
                class="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h3 class="font-semibold text-gray-900">{{ ficha.criancaNome }}</h3>
                <p class="text-sm text-gray-500">
                  Submetida em: {{ formatDate(ficha.dataSubmissao) }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span :class="getStatusClass(ficha.status)">
                {{ getStatusLabel(ficha.status) }}
              </span>
              <router-link
                :to="`/ponto-focal-tematico/ficha/${ficha.id}`"
                class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Ver Detalhes
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import {
  Clock,
  Edit3,
  CheckCircle,
  FileText,
  Loader2,
  FileCheck,
  Heart,
  Stethoscope,
  UtensilsCrossed,
  GraduationCap,
  Shield,
  Brain
} from 'lucide-vue-next'

const pfStore = usePontoFocalStore()
const pfTematicoStore = usePontoFocalTematicoStore()

const loading = ref(false)
const activeTab = ref('pendentes')
const selectedPF = ref('sadd')

const pontosFocais = computed(() => pfStore.pontosFocaisTematicos)
const fichasPendentes = computed(() => pfTematicoStore.fichasPendentes)
const fichasEmAndamento = computed(() => pfTematicoStore.fichasEmAndamento)
const fichasSubmetidas = computed(() => pfTematicoStore.fichasSubmetidas)
const minhasFichas = computed(() => pfTematicoStore.minhasFichas)

const currentPFInfo = computed(() =>
  pontosFocais.value.find(pf => pf.id === pfTematicoStore.currentPFTematico)
)

const tabs = computed(() => [
  { id: 'pendentes', label: 'Pendentes', count: fichasPendentes.value.length },
  { id: 'andamento', label: 'Em Andamento', count: fichasEmAndamento.value.length },
  { id: 'submetidas', label: 'Submetidas', count: fichasSubmetidas.value.length }
])

const changePF = () => {
  pfTematicoStore.setCurrentPFTematico(selectedPF.value)
}

const getPFIcon = (pfId) => {
  const icons = {
    sadd: FileCheck,
    sanc: Heart,
    sasbe: Stethoscope,
    saad: UtensilsCrossed,
    saeie: GraduationCap,
    saps: Shield,
    sape: Brain
  }
  return icons[pfId] || FileText
}

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
    submetida: 'px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700',
    aprovada_nivel1: 'px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700',
    aprovada_nivel2: 'px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700'
  }
  return classes[status] || 'px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  const labels = {
    submetida: 'Aguardando Revisao',
    aprovada_nivel1: 'Aprovada Nivel 1',
    aprovada_nivel2: 'Aprovada Nivel 2'
  }
  return labels[status] || status
}

onMounted(async () => {
  loading.value = true
  await pfStore.fetchComunicacoes()
  await pfTematicoStore.fetchFichasTecnicas()
  selectedPF.value = pfTematicoStore.currentPFTematico
  loading.value = false
})
</script>
