<template>
  <div>
    <!-- Cabecalho da pagina -->
    <div class="card mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="page-title">Comunicacao de Identificacao</h2>
          <p class="page-subtitle">Registe criancas vulneraveis identificadas na comunidade</p>
        </div>
        <BaseButton
          variant="primary"
          :icon="Plus"
          @click="showModal = true"
        >
          Nova Comunicacao
        </BaseButton>
      </div>
    </div>

    <!-- Filtros -->
    <div class="card mb-6">
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filtroStatus" class="input">
            <option value="">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovada">Aprovadas</option>
            <option value="em_cadastro">Em Cadastro</option>
            <option value="rejeitada">Rejeitadas</option>
          </select>
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Pesquisar</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="pesquisa"
              type="text"
              placeholder="Nome ou bairro..."
              class="input pl-10"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pontoFocalStore.loading" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando comunicacoes..." />
    </div>

    <!-- Lista de Comunicacoes -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="comunicacao in comunicacoesFiltradas"
        :key="comunicacao.id"
        class="card hover:shadow-lg transition-shadow cursor-pointer"
        @click="verDetalhes(comunicacao)"
      >
        <div class="flex items-start gap-4">
          <img
            :src="comunicacao.foto"
            :alt="comunicacao.nome"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono text-gray-500">{{ comunicacao.codigo }}</span>
              <span :class="['badge', statusClasses[comunicacao.status]]">
                {{ statusLabels[comunicacao.status] }}
              </span>
            </div>
            <h3 class="text-base font-semibold text-gray-900 truncate">{{ comunicacao.nome }}</h3>
            <p class="text-sm text-gray-600">{{ comunicacao.bairro }}</p>
            <p class="text-xs text-gray-500 mt-1">Idade aprox: {{ comunicacao.idadeAproximada }} anos</p>
          </div>
        </div>

        <p class="text-sm text-gray-600 mt-4 line-clamp-2">{{ comunicacao.descricao }}</p>

        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span class="text-xs text-gray-500">{{ formatDate(comunicacao.dataCriacao) }}</span>
          <div class="flex gap-2">
            <button
              v-if="comunicacao.status === 'pendente'"
              @click.stop="aprovar(comunicacao.id)"
              class="text-green-600 hover:text-green-700 p-1"
              title="Aprovar"
            >
              <CheckCircle class="w-5 h-5" />
            </button>
            <button
              v-if="comunicacao.status === 'aprovada'"
              @click.stop="iniciarCadastro(comunicacao)"
              class="text-blue-600 hover:text-blue-700 p-1"
              title="Iniciar Cadastro"
            >
              <ClipboardList class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="comunicacoesFiltradas.length === 0"
        class="col-span-full flex flex-col items-center justify-center py-12"
      >
        <MessageSquarePlus class="w-16 h-16 text-gray-300 mb-4" />
        <p class="text-gray-500 text-lg">Nenhuma comunicacao encontrada</p>
        <p class="text-gray-400 text-sm">Clique em "Nova Comunicacao" para registar uma crianca</p>
      </div>
    </div>

    <!-- Modal Nova Comunicacao -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Nova Comunicacao</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="submeterComunicacao">
          <div class="space-y-4">
            <!-- Nome -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nome da Crianca <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.nome"
                type="text"
                class="input"
                placeholder="Nome completo ou como e conhecida"
                required
              />
            </div>

            <!-- Foto URL -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                URL da Foto <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.foto"
                type="url"
                class="input"
                placeholder="https://exemplo.com/foto.jpg"
                required
              />
              <p class="text-xs text-gray-500 mt-1">Para demo, use uma URL de imagem valida</p>
            </div>

            <!-- Idade e Bairro -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Idade Aproximada <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.idadeAproximada"
                  type="number"
                  min="0"
                  max="18"
                  class="input"
                  placeholder="Ex: 8"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Bairro/Localizacao <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.bairro"
                  type="text"
                  class="input"
                  placeholder="Ex: Maxaquene A"
                  required
                />
              </div>
            </div>

            <!-- Descricao -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Descricao da Situacao <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="form.descricao"
                rows="3"
                class="input"
                placeholder="Descreva brevemente a situacao da crianca..."
                required
              ></textarea>
            </div>

            <!-- Contacto Tutor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Contacto do Tutor
              </label>
              <input
                v-model="form.contactoTutor"
                type="tel"
                class="input"
                placeholder="Ex: 84 123 4567"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <BaseButton
              variant="secondary"
              @click="showModal = false"
            >
              Cancelar
            </BaseButton>
            <BaseButton
              variant="primary"
              type="submit"
              :loading="pontoFocalStore.loading"
            >
              Submeter Comunicacao
            </BaseButton>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Detalhes -->
    <div v-if="showDetalhes && comunicacaoSelecionada" class="modal-overlay" @click.self="showDetalhes = false">
      <div class="modal-content p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Detalhes da Comunicacao</h3>
          <button @click="showDetalhes = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="flex items-start gap-6 mb-6">
          <img
            :src="comunicacaoSelecionada.foto"
            :alt="comunicacaoSelecionada.nome"
            class="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <span :class="['badge mb-2', statusClasses[comunicacaoSelecionada.status]]">
              {{ statusLabels[comunicacaoSelecionada.status] }}
            </span>
            <h4 class="text-xl font-bold text-gray-900">{{ comunicacaoSelecionada.nome }}</h4>
            <p class="text-gray-600">{{ comunicacaoSelecionada.bairro }}</p>
            <p class="text-sm text-gray-500">Idade aproximada: {{ comunicacaoSelecionada.idadeAproximada }} anos</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h5 class="text-sm font-semibold text-gray-700">Descricao</h5>
            <p class="text-gray-600 mt-1">{{ comunicacaoSelecionada.descricao }}</p>
          </div>
          <div v-if="comunicacaoSelecionada.contactoTutor">
            <h5 class="text-sm font-semibold text-gray-700">Contacto do Tutor</h5>
            <p class="text-gray-600 mt-1">{{ comunicacaoSelecionada.contactoTutor }}</p>
          </div>
          <div class="flex gap-8 text-sm">
            <div>
              <span class="text-gray-500">Codigo:</span>
              <span class="font-mono ml-2">{{ comunicacaoSelecionada.codigo }}</span>
            </div>
            <div>
              <span class="text-gray-500">Data:</span>
              <span class="ml-2">{{ formatDate(comunicacaoSelecionada.dataCriacao) }}</span>
            </div>
            <div>
              <span class="text-gray-500">Por:</span>
              <span class="ml-2">{{ comunicacaoSelecionada.criadoPor }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <BaseButton
            v-if="comunicacaoSelecionada.status === 'pendente'"
            variant="danger"
            @click="rejeitar(comunicacaoSelecionada.id)"
          >
            Rejeitar
          </BaseButton>
          <BaseButton
            v-if="comunicacaoSelecionada.status === 'pendente'"
            variant="success"
            @click="aprovar(comunicacaoSelecionada.id)"
          >
            Aprovar
          </BaseButton>
          <BaseButton
            v-if="comunicacaoSelecionada.status === 'aprovada'"
            variant="primary"
            @click="iniciarCadastro(comunicacaoSelecionada)"
          >
            Iniciar Cadastro
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { useToast } from 'vue-toastification'
import {
  Plus,
  Search,
  X,
  CheckCircle,
  ClipboardList,
  MessageSquarePlus
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const router = useRouter()
const toast = useToast()
const pontoFocalStore = usePontoFocalStore()

const showModal = ref(false)
const showDetalhes = ref(false)
const comunicacaoSelecionada = ref(null)
const filtroStatus = ref('')
const pesquisa = ref('')

const form = ref({
  nome: '',
  foto: '',
  idadeAproximada: null,
  bairro: '',
  descricao: '',
  contactoTutor: ''
})

const statusLabels = {
  pendente: 'Pendente',
  aprovada: 'Aprovada',
  em_cadastro: 'Em Cadastro',
  rejeitada: 'Rejeitada'
}

const statusClasses = {
  pendente: 'badge-warning',
  aprovada: 'badge-success',
  em_cadastro: 'badge-info',
  rejeitada: 'badge-danger'
}

const comunicacoesFiltradas = computed(() => {
  let resultado = pontoFocalStore.comunicacoes

  if (filtroStatus.value) {
    resultado = resultado.filter(c => c.status === filtroStatus.value)
  }

  if (pesquisa.value) {
    const termo = pesquisa.value.toLowerCase()
    resultado = resultado.filter(c =>
      c.nome.toLowerCase().includes(termo) ||
      c.bairro.toLowerCase().includes(termo)
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

const verDetalhes = (comunicacao) => {
  comunicacaoSelecionada.value = comunicacao
  showDetalhes.value = true
}

const submeterComunicacao = async () => {
  try {
    await pontoFocalStore.addComunicacao(form.value)
    toast.success('Comunicacao registada com sucesso!')
    showModal.value = false
    resetForm()
  } catch (error) {
    toast.error('Erro ao registar comunicacao')
  }
}

const aprovar = async (id) => {
  await pontoFocalStore.aprovarComunicacao(id)
  toast.success('Comunicacao aprovada!')
  showDetalhes.value = false
}

const rejeitar = async (id) => {
  await pontoFocalStore.rejeitarComunicacao(id)
  toast.info('Comunicacao rejeitada')
  showDetalhes.value = false
}

const iniciarCadastro = (comunicacao) => {
  router.push({
    name: 'cadastro-novo',
    query: { comunicacaoId: comunicacao.id }
  })
}

const resetForm = () => {
  form.value = {
    nome: '',
    foto: '',
    idadeAproximada: null,
    bairro: '',
    descricao: '',
    contactoTutor: ''
  }
}

onMounted(() => {
  pontoFocalStore.fetchComunicacoes()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
