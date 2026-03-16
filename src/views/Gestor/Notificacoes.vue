<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Centro de Notificações</h1>
        <p class="text-gray-500 mt-1">Gerencie alertas e comunicações do sistema</p>
      </div>
      <button @click="marcarTodasComoLidas" class="btn-secondary">
        <CheckCheck class="w-4 h-4 mr-2" />
        Marcar Todas Lidas
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <Bell class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ notificacoes.filter(n => !n.lida).length }}</p>
            <p class="text-sm text-gray-500">Não Lidas</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <AlertTriangle class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ notificacoes.filter(n => n.prioridade === 'alta').length }}</p>
            <p class="text-sm text-gray-500">Alta Prioridade</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ notificacoes.filter(n => n.tipo === 'prazo').length }}</p>
            <p class="text-sm text-gray-500">Prazos</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ notificacoes.filter(n => n.lida).length }}</p>
            <p class="text-sm text-gray-500">Lidas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="flex items-center gap-4">
      <select v-model="filtroTipo" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todos os Tipos</option>
        <option value="sistema">Sistema</option>
        <option value="aprovacao">Aprovação</option>
        <option value="prazo">Prazos</option>
        <option value="comunicacao">Comunicação</option>
        <option value="alerta">Alertas</option>
      </select>

      <select v-model="filtroStatus" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todos os Status</option>
        <option value="nao-lida">Não Lidas</option>
        <option value="lida">Lidas</option>
      </select>

      <select v-model="filtroPrioridade" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todas Prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Média</option>
        <option value="baixa">Baixa</option>
      </select>
    </div>

    <!-- Lista de Notificações -->
    <div class="space-y-4">
      <div
        v-for="notificacao in notificacoesFiltradas"
        :key="notificacao.id"
        :class="[
          'bg-white rounded-xl border p-5 hover:shadow-md transition-all cursor-pointer',
          notificacao.lida ? 'border-gray-100' : 'border-l-4 border-l-primary shadow-sm'
        ]"
        @click="toggleLida(notificacao)"
      >
        <div class="flex items-start gap-4">
          <div :class="getIconBg(notificacao.tipo)" class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
            <component :is="getIcon(notificacao.tipo)" :class="getIconColor(notificacao.tipo)" class="w-5 h-5" />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-gray-900">{{ notificacao.titulo }}</h3>
              <span :class="getPrioridadeBadge(notificacao.prioridade)">
                {{ notificacao.prioridade }}
              </span>
              <span v-if="!notificacao.lida" class="w-2 h-2 bg-primary rounded-full"></span>
            </div>

            <p class="text-gray-600 text-sm mb-2">{{ notificacao.mensagem }}</p>

            <div class="flex items-center gap-4 text-xs text-gray-400">
              <span>{{ notificacao.data }}</span>
              <span>{{ notificacao.remetente }}</span>
              <span v-if="notificacao.acao" class="text-primary font-medium">{{ notificacao.acao }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <button
              v-if="notificacao.acao"
              @click.stop="executarAcao(notificacao)"
              class="px-3 py-1.5 text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {{ notificacao.acao }}
            </button>

            <button
              @click.stop="marcarComoLida(notificacao)"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              :title="notificacao.lida ? 'Marcar como não lida' : 'Marcar como lida'"
            >
              <component :is="notificacao.lida ? Mail : MailOpen" class="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="notificacoesFiltradas.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
        <Bell class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhuma notificação encontrada</p>
      </div>
    </div>

    <!-- Modal Detalhes -->
    <BaseModal v-model="showModalDetalhes" title="Detalhes da Notificação" size="md">
      <div v-if="notificacaoSelecionada" class="space-y-4">
        <div class="flex items-center gap-3">
          <div :class="getIconBg(notificacaoSelecionada.tipo)" class="w-12 h-12 rounded-lg flex items-center justify-center">
            <component :is="getIcon(notificacaoSelecionada.tipo)" :class="getIconColor(notificacaoSelecionada.tipo)" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ notificacaoSelecionada.titulo }}</h3>
            <p class="text-sm text-gray-500">{{ notificacaoSelecionada.data }} • {{ notificacaoSelecionada.remetente }}</p>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-gray-700">{{ notificacaoSelecionada.mensagem }}</p>
        </div>

        <div v-if="notificacaoSelecionada.detalhes" class="bg-blue-50 rounded-lg p-4">
          <h4 class="font-medium text-blue-900 mb-2">Detalhes Adicionais</h4>
          <p class="text-blue-800 text-sm">{{ notificacaoSelecionada.detalhes }}</p>
        </div>
      </div>

      <template #footer>
        <button @click="showModalDetalhes = false" class="btn-secondary">Fechar</button>
        <button v-if="notificacaoSelecionada && notificacaoSelecionada.acao" @click="executarAcao(notificacaoSelecionada)" class="btn-primary">
          {{ notificacaoSelecionada.acao }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Bell, AlertTriangle, Clock, CheckCircle, CheckCheck,
  Mail, MailOpen, Settings, Heart, FileText, UserCheck,
  MessageSquare, Calendar, DollarSign
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'

// State
const filtroTipo = ref('todos')
const filtroStatus = ref('todos')
const filtroPrioridade = ref('todos')
const showModalDetalhes = ref(false)
const notificacaoSelecionada = ref(null)

// Mock Data
const notificacoes = ref([
  {
    id: 1,
    titulo: 'Revisão N2 Pendente',
    mensagem: 'Existem 3 cadastros aguardando revisão final do gestor para publicação no catálogo.',
    detalhes: 'Crianças: Ana Maria Silva, João Pedro Santos, Teresa Cumba',
    tipo: 'aprovacao',
    prioridade: 'alta',
    lida: false,
    data: '15/03/2026 14:30',
    remetente: 'Sistema SACCO',
    acao: 'Revisar Agora'
  },
  {
    id: 2,
    titulo: 'Novo Pedido de Apadrinhamento',
    mensagem: 'Carlos Manuel solicitou apadrinhamento da criança Maria José.',
    detalhes: 'Orçamento mensal: 350.000 MZN • Prazo: 30 dias',
    tipo: 'comunicacao',
    prioridade: 'media',
    lida: false,
    data: '15/03/2026 11:15',
    remetente: 'Sistema de Apadrinhamento',
    acao: 'Ver Detalhes'
  },
  {
    id: 3,
    titulo: 'Prazo de Renovação Próximo',
    mensagem: 'O contrato de apadrinhamento de Teresa Cumba expira em 15 dias.',
    detalhes: 'Data de expiração: 30/03/2026 • Padrinho: Hans Mueller',
    tipo: 'prazo',
    prioridade: 'alta',
    lida: true,
    data: '14/03/2026 16:45',
    remetente: 'Sistema de Contratos',
    acao: 'Renovar'
  },
  {
    id: 4,
    titulo: 'Relatório Mensal Disponível',
    mensagem: 'O relatório de impacto do mês de fevereiro está disponível para consulta.',
    detalhes: 'Período: Fevereiro 2026 • 12 apadrinhamentos ativos',
    tipo: 'sistema',
    prioridade: 'baixa',
    lida: true,
    data: '01/03/2026 09:00',
    remetente: 'Sistema de Relatórios',
    acao: 'Ver Relatório'
  },
  {
    id: 5,
    titulo: 'Alerta de Segurança',
    mensagem: 'Detectada tentativa de acesso não autorizado ao sistema.',
    detalhes: 'IP: 192.168.1.100 • Data/Hora: 12/03/2026 23:45',
    tipo: 'alerta',
    prioridade: 'alta',
    lida: false,
    data: '12/03/2026 23:50',
    remetente: 'Sistema de Segurança',
    acao: 'Verificar'
  }
])

// Computed
const notificacoesFiltradas = computed(() => {
  return notificacoes.value.filter(notif => {
    const matchTipo = filtroTipo.value === 'todos' || notif.tipo === filtroTipo.value
    const matchStatus = filtroStatus.value === 'todos' ||
                       (filtroStatus.value === 'nao-lida' && !notif.lida) ||
                       (filtroStatus.value === 'lida' && notif.lida)
    const matchPrioridade = filtroPrioridade.value === 'todos' || notif.prioridade === filtroPrioridade.value
    return matchTipo && matchStatus && matchPrioridade
  })
})

// Methods
const getIcon = (tipo) => {
  const icons = {
    sistema: Settings,
    aprovacao: CheckCircle,
    prazo: Clock,
    comunicacao: MessageSquare,
    alerta: AlertTriangle
  }
  return icons[tipo] || Bell
}

const getIconBg = (tipo) => {
  const bgs = {
    sistema: 'bg-blue-100',
    aprovacao: 'bg-green-100',
    prazo: 'bg-amber-100',
    comunicacao: 'bg-purple-100',
    alerta: 'bg-red-100'
  }
  return bgs[tipo] || 'bg-gray-100'
}

const getIconColor = (tipo) => {
  const colors = {
    sistema: 'text-blue-600',
    aprovacao: 'text-green-600',
    prazo: 'text-amber-600',
    comunicacao: 'text-purple-600',
    alerta: 'text-red-600'
  }
  return colors[tipo] || 'text-gray-600'
}

const getPrioridadeBadge = (prioridade) => {
  const badges = {
    alta: 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700',
    media: 'px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700',
    baixa: 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700'
  }
  return badges[prioridade] || 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
}

const toggleLida = (notificacao) => {
  notificacao.lida = !notificacao.lida
}

const marcarComoLida = (notificacao) => {
  notificacao.lida = !notificacao.lida
}

const marcarTodasComoLidas = () => {
  notificacoes.value.forEach(notif => {
    notif.lida = true
  })
}

const executarAcao = (notificacao) => {
  // Simular navegação ou ação
  console.log(`Executando ação: ${notificacao.acao} para notificação ${notificacao.id}`)
  showModalDetalhes.value = false
}
</script>
