<template>
  <div>
    <!-- Cabecalho da pagina -->
    <div class="card mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="page-title">Cadastro de Criancas</h2>
          <p class="page-subtitle">Gestao de cadastros e fichas tecnicas (FICHA 00 SSFCC)</p>
        </div>
        <router-link :to="{ name: 'cadastro-novo' }">
          <BaseButton variant="primary" :icon="Plus">
            Novo Cadastro
          </BaseButton>
        </router-link>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosIniciados.length }}</p>
            <p class="text-sm text-gray-500">Iniciados</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Clock class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosEmAndamento.length }}</p>
            <p class="text-sm text-gray-500">Em Andamento</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <FileCheck class="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosAguardandoRevisao.length }}</p>
            <p class="text-sm text-gray-500">Aguardando Revisao</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosConcluidos.length }}</p>
            <p class="text-sm text-gray-500">Concluidos</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="card mb-6">
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filtroStatus" class="input">
            <option value="">Todos</option>
            <option value="iniciado">Iniciados</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="aguardando_revisao">Aguardando Revisao</option>
            <option value="concluido">Concluidos</option>
          </select>
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Pesquisar</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="pesquisa"
              type="text"
              placeholder="Nome da crianca..."
              class="input pl-10"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pontoFocalStore.loading" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando cadastros..." />
    </div>

    <!-- Lista de Cadastros -->
    <div v-else class="space-y-4">
      <div
        v-for="cadastro in cadastrosFiltrados"
        :key="cadastro.id"
        class="card hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start gap-6">
          <!-- Foto -->
          <img
            :src="cadastro.foto"
            :alt="cadastro.nomeCompleto"
            class="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />

          <!-- Info Principal -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xs font-mono text-gray-500">{{ cadastro.codigo }}</span>
              <span :class="['badge', statusClasses[cadastro.status]]">
                {{ statusLabels[cadastro.status] }}
              </span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
            <p class="text-sm text-gray-600">{{ cadastro.localResidencia }}</p>
            <p class="text-xs text-gray-500 mt-1">
              {{ cadastro.provincia }} | Nascimento: {{ formatDate(cadastro.dataNascimento) }}
            </p>
          </div>

          <!-- Progresso dos PFs -->
          <div class="w-48 flex-shrink-0">
            <p class="text-sm font-medium text-gray-700 mb-2">Progresso das Fichas</p>
            <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                class="h-3 rounded-full transition-all duration-300"
                :class="getProgressoClass(cadastro)"
                :style="{ width: `${getProgressoPercent(cadastro)}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 text-center">
              {{ getProgresso(cadastro).concluidos }}/{{ getProgresso(cadastro).total }} Pontos Focais
            </p>
          </div>

          <!-- Acoes -->
          <div class="flex flex-col gap-2">
            <router-link :to="{ name: 'cadastro-detalhes', params: { id: cadastro.id } }">
              <BaseButton variant="secondary" size="sm" :icon="Eye">
                Ver Detalhes
              </BaseButton>
            </router-link>
            <router-link
              v-if="cadastro.status === 'aguardando_revisao'"
              :to="{ name: 'revisao', query: { cadastroId: cadastro.id } }"
            >
              <BaseButton variant="primary" size="sm" :icon="FileCheck">
                Revisar
              </BaseButton>
            </router-link>
          </div>
        </div>

        <!-- Barra de PFs -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="pf in cadastro.pontosFocais"
              :key="pf.pfId"
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                pfStatusClasses[pf.status]
              ]"
              :title="getPFNome(pf.pfId)"
            >
              {{ pf.pfId.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="cadastrosFiltrados.length === 0"
        class="card flex flex-col items-center justify-center py-12"
      >
        <ClipboardList class="w-16 h-16 text-gray-300 mb-4" />
        <p class="text-gray-500 text-lg">Nenhum cadastro encontrado</p>
        <p class="text-gray-400 text-sm">Clique em "Novo Cadastro" para iniciar um cadastro</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { format } from 'date-fns'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import {
  Plus,
  Search,
  Eye,
  FileText,
  FileCheck,
  Clock,
  CheckCircle,
  ClipboardList
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const pontoFocalStore = usePontoFocalStore()

const filtroStatus = ref('')
const pesquisa = ref('')

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

const pfStatusClasses = {
  pendente: 'bg-gray-100 text-gray-600',
  em_andamento: 'bg-orange-100 text-orange-700',
  concluido: 'bg-green-100 text-green-700'
}

const cadastrosIniciados = computed(() =>
  pontoFocalStore.cadastros.filter(c => c.status === 'iniciado')
)

const cadastrosEmAndamento = computed(() =>
  pontoFocalStore.cadastros.filter(c => c.status === 'em_andamento')
)

const cadastrosAguardandoRevisao = computed(() =>
  pontoFocalStore.cadastros.filter(c => c.status === 'aguardando_revisao')
)

const cadastrosConcluidos = computed(() =>
  pontoFocalStore.cadastros.filter(c => c.status === 'concluido')
)

const cadastrosFiltrados = computed(() => {
  let resultado = pontoFocalStore.cadastros

  if (filtroStatus.value) {
    resultado = resultado.filter(c => c.status === filtroStatus.value)
  }

  if (pesquisa.value) {
    const termo = pesquisa.value.toLowerCase()
    resultado = resultado.filter(c =>
      c.nomeCompleto.toLowerCase().includes(termo)
    )
  }

  return resultado
})

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return date
  }
}

const getProgresso = (cadastro) => {
  return pontoFocalStore.getProgressoCadastro(cadastro)
}

const getProgressoPercent = (cadastro) => {
  const { concluidos, total } = getProgresso(cadastro)
  return (concluidos / total) * 100
}

const getProgressoClass = (cadastro) => {
  const percent = getProgressoPercent(cadastro)
  if (percent === 100) return 'bg-green-500'
  if (percent >= 50) return 'bg-blue-500'
  return 'bg-orange-500'
}

const getPFNome = (pfId) => {
  const pf = pontoFocalStore.pontosFocaisTematicos.find(p => p.id === pfId)
  return pf ? pf.nome : pfId
}

onMounted(() => {
  pontoFocalStore.fetchCadastros()
})
</script>
