<template>
  <div>
    <!-- Cabecalho -->
    <div class="card mb-6">
      <div class="flex items-center gap-4">
        <router-link :to="{ name: 'cadastro' }">
          <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft class="w-5 h-5 text-gray-600" />
          </button>
        </router-link>
        <div class="flex-1">
          <h2 class="page-title">Detalhes do Cadastro</h2>
          <p class="page-subtitle">{{ cadastro?.codigo || 'Carregando...' }}</p>
        </div>
        <span v-if="cadastro" :class="['badge', statusClasses[cadastro.status]]">
          {{ statusLabels[cadastro.status] }}
        </span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando detalhes..." />
    </div>

    <!-- Cadastro nao encontrado -->
    <div v-else-if="!cadastro" class="card flex flex-col items-center justify-center py-12">
      <AlertTriangle class="w-16 h-16 text-gray-300 mb-4" />
      <p class="text-gray-500 text-lg">Cadastro nao encontrado</p>
      <router-link :to="{ name: 'cadastro' }" class="mt-4">
        <BaseButton variant="secondary">Voltar para lista</BaseButton>
      </router-link>
    </div>

    <!-- Conteudo -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Coluna Principal -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Identificacao -->
        <div class="card">
          <h3 class="section-title flex items-center gap-2">
            <User class="w-5 h-5" />
            A. Identificacao
          </h3>
          <div class="flex items-start gap-6">
            <img
              :src="cadastro.foto"
              :alt="cadastro.nomeCompleto"
              class="w-32 h-32 rounded-full object-cover"
            />
            <div class="flex-1 grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Nome Completo</p>
                <p class="font-medium text-gray-900">{{ cadastro.nomeCompleto }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Data de Nascimento</p>
                <p class="font-medium text-gray-900">{{ formatDate(cadastro.dataNascimento) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Sexo</p>
                <p class="font-medium text-gray-900">{{ cadastro.sexo === 'M' ? 'Masculino' : 'Feminino' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Local de Residencia</p>
                <p class="font-medium text-gray-900">{{ cadastro.localResidencia }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Provincia</p>
                <p class="font-medium text-gray-900">{{ cadastro.provincia }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Distrito</p>
                <p class="font-medium text-gray-900">{{ cadastro.distrito }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Situacao Familiar -->
        <div class="card">
          <h3 class="section-title flex items-center gap-2">
            <Users class="w-5 h-5" />
            B. Situacao Familiar
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Mae</p>
              <p class="font-medium text-gray-900">{{ cadastro.nomeMae || '-' }}</p>
              <span v-if="cadastro.situacaoMae" class="text-xs text-gray-500">
                ({{ situacaoLabels[cadastro.situacaoMae] }})
              </span>
            </div>
            <div>
              <p class="text-sm text-gray-500">Pai</p>
              <p class="font-medium text-gray-900">{{ cadastro.nomePai || '-' }}</p>
              <span v-if="cadastro.situacaoPai" class="text-xs text-gray-500">
                ({{ situacaoLabels[cadastro.situacaoPai] }})
              </span>
            </div>
            <div>
              <p class="text-sm text-gray-500">Tutor/Responsavel</p>
              <p class="font-medium text-gray-900">{{ cadastro.tutorNome }}</p>
              <span class="text-xs text-gray-500">{{ cadastro.tutorContacto }}</span>
            </div>
            <div>
              <p class="text-sm text-gray-500">Numero de Irmaos</p>
              <p class="font-medium text-gray-900">{{ cadastro.numeroIrmaos }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm text-gray-500">Situacao Economica</p>
              <p class="font-medium text-gray-900">{{ cadastro.situacaoEconomica || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- Vulnerabilidades -->
        <div class="card">
          <h3 class="section-title flex items-center gap-2">
            <AlertTriangle class="w-5 h-5" />
            C. Vulnerabilidades
          </h3>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="vuln in cadastro.vulnerabilidades"
              :key="vuln"
              class="badge badge-danger"
            >
              {{ getVulnerabilidadeLabel(vuln) }}
            </span>
          </div>
          <div v-if="cadastro.observacoes">
            <p class="text-sm text-gray-500">Observacoes</p>
            <p class="font-medium text-gray-900 mt-1">{{ cadastro.observacoes }}</p>
          </div>
        </div>
      </div>

      <!-- Coluna Lateral - Pontos Focais -->
      <div class="space-y-6">
        <!-- Progresso Geral -->
        <div class="card">
          <h3 class="section-title">Progresso das Fichas</h3>
          <div class="w-full bg-gray-200 rounded-full h-4 mb-3">
            <div
              class="h-4 rounded-full transition-all duration-300"
              :class="progressoClass"
              :style="{ width: `${progressoPercent}%` }"
            ></div>
          </div>
          <p class="text-center text-sm text-gray-600">
            {{ progresso.concluidos }}/{{ progresso.total }} Pontos Focais concluidos
          </p>
        </div>

        <!-- Lista de Pontos Focais -->
        <div class="card">
          <h3 class="section-title flex items-center gap-2">
            <ClipboardList class="w-5 h-5" />
            D. Pontos Focais
          </h3>
          <div class="space-y-3">
            <div
              v-for="pf in cadastro.pontosFocais"
              :key="pf.pfId"
              class="border border-gray-200 rounded-lg p-3"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-gray-900">{{ pf.pfId.toUpperCase() }}</span>
                <span :class="['badge', pfStatusClasses[pf.status]]">
                  {{ pfStatusLabels[pf.status] }}
                </span>
              </div>
              <p class="text-xs text-gray-500">{{ getPFNome(pf.pfId) }}</p>
              <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Calendar class="w-3 h-3" />
                {{ formatDate(pf.dataVisita) }}
              </div>
              <p v-if="pf.observacoes" class="text-xs text-gray-600 mt-1 italic">
                {{ pf.observacoes }}
              </p>
            </div>
          </div>
        </div>

        <!-- Accoes -->
        <div class="card">
          <h3 class="section-title">Accoes</h3>
          <div class="space-y-3">
            <router-link
              v-if="cadastro.status === 'aguardando_revisao'"
              :to="{ name: 'revisao', query: { cadastroId: cadastro.id } }"
              class="block"
            >
              <BaseButton variant="primary" fullWidth :icon="FileCheck">
                Iniciar Revisao
              </BaseButton>
            </router-link>
            <BaseButton variant="secondary" fullWidth :icon="Printer">
              Imprimir FICHA 00
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { format } from 'date-fns'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import {
  ArrowLeft,
  User,
  Users,
  AlertTriangle,
  ClipboardList,
  Calendar,
  FileCheck,
  Printer
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const pontoFocalStore = usePontoFocalStore()

const loading = ref(true)
const cadastro = ref(null)

const statusLabels = {
  iniciado: 'Iniciado',
  em_andamento: 'Em Andamento',
  aguardando_revisao: 'Aguardando Revisao',
  concluido: 'Concluido'
}

const statusClasses = {
  iniciado: 'badge-info',
  em_andamento: 'badge-warning',
  aguardando_revisao: 'bg-purple-100 text-purple-800',
  concluido: 'badge-success'
}

const situacaoLabels = {
  viva: 'Viva',
  vivo: 'Vivo',
  falecida: 'Falecida',
  falecido: 'Falecido',
  desaparecida: 'Desaparecida',
  desaparecido: 'Desaparecido'
}

const pfStatusLabels = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluido: 'Concluido'
}

const pfStatusClasses = {
  pendente: 'bg-gray-100 text-gray-600',
  em_andamento: 'badge-warning',
  concluido: 'badge-success'
}

const progresso = computed(() => {
  if (!cadastro.value) return { concluidos: 0, total: 7 }
  return pontoFocalStore.getProgressoCadastro(cadastro.value)
})

const progressoPercent = computed(() => {
  return (progresso.value.concluidos / progresso.value.total) * 100
})

const progressoClass = computed(() => {
  if (progressoPercent.value === 100) return 'bg-green-500'
  if (progressoPercent.value >= 50) return 'bg-blue-500'
  return 'bg-orange-500'
})

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return date
  }
}

const getVulnerabilidadeLabel = (id) => {
  const vuln = pontoFocalStore.vulnerabilidadesDisponiveis.find(v => v.id === id)
  return vuln ? vuln.label : id
}

const getPFNome = (pfId) => {
  const pf = pontoFocalStore.pontosFocaisTematicos.find(p => p.id === pfId)
  return pf ? pf.nome : pfId
}

onMounted(async () => {
  await pontoFocalStore.fetchCadastros()
  const id = route.params.id
  cadastro.value = pontoFocalStore.getCadastroById(id)
  loading.value = false
})
</script>
