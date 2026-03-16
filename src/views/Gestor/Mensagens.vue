<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Centro de Mensagens</h1>
        <p class="text-gray-500 mt-1">Comunique com outros utilizadores do sistema</p>
      </div>
      <button @click="showModalNova = true" class="btn-primary">
        <Plus class="w-4 h-4 mr-2" />
        Nova Mensagem
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Mail class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ mensagens.filter(m => !m.lida).length }}</p>
            <p class="text-sm text-gray-500">Não Lidas</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Send class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ mensagens.filter(m => m.direcao === 'enviada').length }}</p>
            <p class="text-sm text-gray-500">Enviadas</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Inbox class="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ mensagens.filter(m => m.direcao === 'recebida').length }}</p>
            <p class="text-sm text-gray-500">Recebidas</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Users class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ conversasUnicas }}</p>
            <p class="text-sm text-gray-500">Conversas</p>
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

    <!-- Tab: Caixa de Entrada -->
    <div v-if="activeTab === 'recebidas'" class="space-y-4">
      <div v-if="mensagensRecebidas.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <Inbox class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhuma mensagem recebida</p>
      </div>

      <div
        v-for="mensagem in mensagensRecebidas"
        :key="mensagem.id"
        :class="[
          'bg-white rounded-xl border p-5 hover:shadow-md transition-all cursor-pointer',
          !mensagem.lida ? 'border-l-4 border-l-primary shadow-sm' : 'border-gray-100'
        ]"
        @click="abrirMensagem(mensagem)"
      >
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0">
            <span class="text-sm font-semibold text-blue-600">{{ getInitials(mensagem.remetente) }}</span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-gray-900">{{ mensagem.remetente }}</h3>
              <span class="text-xs text-gray-400">{{ mensagem.data }}</span>
              <span v-if="!mensagem.lida" class="w-2 h-2 bg-primary rounded-full"></span>
            </div>

            <p class="text-gray-600 text-sm font-medium mb-1">{{ mensagem.assunto }}</p>
            <p class="text-gray-500 text-sm line-clamp-2">{{ mensagem.conteudo }}</p>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click.stop="responderMensagem(mensagem)"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Responder"
            >
              <Reply class="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Enviadas -->
    <div v-if="activeTab === 'enviadas'" class="space-y-4">
      <div v-if="mensagensEnviadas.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <Send class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhuma mensagem enviada</p>
      </div>

      <div
        v-for="mensagem in mensagensEnviadas"
        :key="mensagem.id"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center shrink-0">
            <span class="text-sm font-semibold text-green-600">{{ getInitials(mensagem.destinatario) }}</span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm text-gray-500">Para:</span>
              <h3 class="font-semibold text-gray-900">{{ mensagem.destinatario }}</h3>
              <span class="text-xs text-gray-400">{{ mensagem.data }}</span>
            </div>

            <p class="text-gray-600 text-sm font-medium mb-1">{{ mensagem.assunto }}</p>
            <p class="text-gray-500 text-sm line-clamp-2">{{ mensagem.conteudo }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nova Mensagem -->
    <BaseModal v-model="showModalNova" title="Nova Mensagem" size="lg">
      <form @submit.prevent="enviarMensagem" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Destinatário</label>
          <select v-model="formMensagem.destinatario" required class="input w-full">
            <option value="">Selecione um destinatário</option>
            <optgroup label="Ponto Focal Comunitário">
              <option value="João Silva (PF Comunitário)">João Silva (PF Comunitário)</option>
            </optgroup>
            <optgroup label="Ponto Focal Temático">
              <option value="Maria Santos (PF Temático)">Maria Santos (PF Temático)</option>
            </optgroup>
            <optgroup label="Tutores">
              <option value="Ana Tutor (Tutor)">Ana Tutor (Tutor)</option>
            </optgroup>
            <optgroup label="Padrinhos">
              <option value="Pedro Padrinho (Padrinho)">Pedro Padrinho (Padrinho)</option>
              <option value="Jean Pierre Dubois (Padrinho)">Jean Pierre Dubois (Padrinho)</option>
              <option value="Maria Garcia (Padrinho)">Maria Garcia (Padrinho)</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
          <input
            v-model="formMensagem.assunto"
            type="text"
            required
            class="input w-full"
            placeholder="Assunto da mensagem"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
          <textarea
            v-model="formMensagem.conteudo"
            rows="6"
            required
            class="input w-full"
            placeholder="Digite sua mensagem..."
          ></textarea>
        </div>
      </form>

      <template #footer>
        <button @click="showModalNova = false" class="btn-secondary">Cancelar</button>
        <button @click="enviarMensagem" class="btn-primary">
          <Send class="w-4 h-4 mr-2" />
          Enviar Mensagem
        </button>
      </template>
    </BaseModal>

    <!-- Modal Ver Mensagem -->
    <BaseModal v-model="showModalMensagem" title="Mensagem" size="lg">
      <div v-if="mensagemSelecionada" class="space-y-6">
        <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span class="text-lg font-semibold text-blue-600">{{ getInitials(mensagemSelecionada.remetente) }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">{{ mensagemSelecionada.remetente }}</h3>
              <span class="text-sm text-gray-500">{{ mensagemSelecionada.data }}</span>
            </div>
            <p class="text-gray-600 font-medium">{{ mensagemSelecionada.assunto }}</p>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-xl p-6">
          <p class="text-gray-700 whitespace-pre-line">{{ mensagemSelecionada.conteudo }}</p>
        </div>
      </div>

      <template #footer>
        <button @click="showModalMensagem = false" class="btn-secondary">Fechar</button>
        <button @click="responderMensagem(mensagemSelecionada)" class="btn-primary">
          <Reply class="w-4 h-4 mr-2" />
          Responder
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Mail, Send, Inbox, Plus, Reply, Users
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'

// State
const activeTab = ref('recebidas')
const showModalNova = ref(false)
const showModalMensagem = ref(false)
const mensagemSelecionada = ref(null)
const formMensagem = ref({
  destinatario: '',
  assunto: '',
  conteudo: ''
})

// Mock Data
const mensagens = ref([
  {
    id: 1,
    remetente: 'João Silva',
    destinatario: 'Carlos Gestor',
    assunto: 'Revisão de Cadastro Pendente',
    conteudo: 'Olá Carlos,\n\nGostaria de informar que finalizei a avaliação técnica da criança Ana Maria Silva. O cadastro está pronto para revisão N2.\n\nAtenciosamente,\nJoão Silva\nPF Comunitário',
    data: '15/03/2026 10:30',
    direcao: 'recebida',
    lida: false
  },
  {
    id: 2,
    remetente: 'Carlos Gestor',
    destinatario: 'Ana Tutor',
    assunto: 'Aprovação de Apadrinhamento',
    conteudo: 'Olá Ana,\n\nO pedido de apadrinhamento entre Jean Pierre Dubois e Teresa Cumba foi aprovado. Pode proceder com a formalização do contrato.\n\nAtenciosamente,\nCarlos Gestor',
    data: '14/03/2026 15:45',
    direcao: 'enviada',
    lida: true
  },
  {
    id: 3,
    remetente: 'Maria Santos',
    destinatario: 'Carlos Gestor',
    assunto: 'Ajustes Necessários no Cadastro',
    conteudo: 'Olá Carlos,\n\nApós análise, identifiquei algumas informações incompletas no cadastro de João Pedro Santos. Solicito que o PF Comunitário complete os dados de contacto da família.\n\nAtenciosamente,\nMaria Santos\nPF Temático - SADD',
    data: '13/03/2026 14:20',
    direcao: 'recebida',
    lida: true
  },
  {
    id: 4,
    remetente: 'Carlos Gestor',
    destinatario: 'João Silva',
    assunto: 'Re: Revisão de Cadastro Pendente',
    conteudo: 'Olá João,\n\nObrigado pela informação. Iniciarei a revisão N2 hoje mesmo.\n\nAtenciosamente,\nCarlos Gestor',
    data: '15/03/2026 11:00',
    direcao: 'enviada',
    lida: true
  }
])

// Computed
const mensagensRecebidas = computed(() => mensagens.value.filter(m => m.direcao === 'recebida'))
const mensagensEnviadas = computed(() => mensagens.value.filter(m => m.direcao === 'enviada'))
const conversasUnicas = computed(() => {
  const unique = new Set()
  mensagens.value.forEach(m => {
    unique.add(m.direcao === 'recebida' ? m.remetente : m.destinatario)
  })
  return unique.size
})

const tabs = computed(() => [
  { id: 'recebidas', label: 'Recebidas', count: mensagensRecebidas.value.filter(m => !m.lida).length },
  { id: 'enviadas', label: 'Enviadas', count: mensagensEnviadas.value.length }
])

// Methods
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const abrirMensagem = (mensagem) => {
  mensagemSelecionada.value = mensagem
  mensagem.lida = true
  showModalMensagem.value = true
}

const responderMensagem = (mensagem) => {
  formMensagem.value = {
    destinatario: mensagem.remetente,
    assunto: `Re: ${mensagem.assunto}`,
    conteudo: `\n\n--- Em ${mensagem.data}, ${mensagem.remetente} escreveu:\n${mensagem.conteudo}`
  }
  showModalNova.value = true
  showModalMensagem.value = false
}

const enviarMensagem = () => {
  const novaMensagem = {
    id: Date.now(),
    ...formMensagem.value,
    remetente: 'Carlos Gestor',
    data: new Date().toLocaleString('pt-MZ'),
    direcao: 'enviada',
    lida: true
  }

  mensagens.value.unshift(novaMensagem)

  showModalNova.value = false
  formMensagem.value = {
    destinatario: '',
    assunto: '',
    conteudo: ''
  }

  // Simular toast
  console.log('Mensagem enviada com sucesso!')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
