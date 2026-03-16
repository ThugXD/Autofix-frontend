<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Logs de Auditoria</h1>
        <p class="text-gray-500 mt-1">Rastreamento de todas as ações no sistema</p>
      </div>
      <button @click="exportarLogs" class="btn-secondary">
        <Download class="w-4 h-4 mr-2" />
        Exportar
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileText class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ logs.length }}</p>
            <p class="text-sm text-gray-500">Total Logs</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ logs.filter(l => l.tipo === 'sucesso').length }}</p>
            <p class="text-sm text-gray-500">Sucessos</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <AlertTriangle class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ logs.filter(l => l.tipo === 'aviso').length }}</p>
            <p class="text-sm text-gray-500">Avisos</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <XCircle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ logs.filter(l => l.tipo === 'erro').length }}</p>
            <p class="text-sm text-gray-500">Erros</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="flex items-center gap-4 flex-wrap">
      <div class="flex items-center gap-2">
        <Calendar class="w-4 h-4 text-gray-500" />
        <input
          v-model="filtroData"
          type="date"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      <select v-model="filtroTipo" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todos os Tipos</option>
        <option value="login">Login</option>
        <option value="cadastro">Cadastro</option>
        <option value="aprovacao">Aprovação</option>
        <option value="rejeicao">Rejeição</option>
        <option value="edicao">Edição</option>
        <option value="exclusao">Exclusão</option>
        <option value="sistema">Sistema</option>
      </select>

      <select v-model="filtroUsuario" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todos os Usuários</option>
        <option v-for="user in usuariosUnicos" :key="user" :value="user">{{ user }}</option>
      </select>

      <select v-model="filtroSeveridade" class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary">
        <option value="todos">Todas Severidades</option>
        <option value="sucesso">Sucesso</option>
        <option value="aviso">Aviso</option>
        <option value="erro">Erro</option>
      </select>
    </div>

    <!-- Tabela de Logs -->
    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100">
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Data/Hora</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Usuário</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Ação</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Recurso</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Detalhes</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">IP</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="log in logsFiltrados"
              :key="log.id"
              class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
            >
              <td class="py-3 px-4 text-sm text-gray-600">{{ log.dataHora }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span class="text-xs font-semibold text-blue-600">{{ getInitials(log.usuario) }}</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ log.usuario }}</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <span :class="getTipoBadge(log.acao)">
                  {{ log.acao }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600">{{ log.recurso }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 max-w-xs truncate" :title="log.detalhes">
                {{ log.detalhes }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-500 font-mono">{{ log.ip }}</td>
              <td class="py-3 px-4">
                <span :class="getSeveridadeBadge(log.tipo)">
                  {{ getSeveridadeLabel(log.tipo) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="logsFiltrados.length === 0" class="text-center py-12">
        <FileText class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Nenhum log encontrado</p>
      </div>
    </div>

    <!-- Modal Detalhes do Log -->
    <BaseModal v-model="showModalDetalhes" title="Detalhes do Log" size="md">
      <div v-if="logSelecionado" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-xs text-gray-500">Data/Hora</p>
            <p class="font-medium text-gray-900">{{ logSelecionado.dataHora }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-xs text-gray-500">Usuário</p>
            <p class="font-medium text-gray-900">{{ logSelecionado.usuario }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-xs text-gray-500">Ação</p>
            <p class="font-medium text-gray-900">{{ logSelecionado.acao }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-xs text-gray-500">Recurso</p>
            <p class="font-medium text-gray-900">{{ logSelecionado.recurso }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-xs text-gray-500">IP</p>
            <p class="font-medium text-gray-900 font-mono">{{ logSelecionado.ip }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-xs text-gray-500">Status</p>
            <span :class="getSeveridadeBadge(logSelecionado.tipo)">
              {{ getSeveridadeLabel(logSelecionado.tipo) }}
            </span>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-lg p-4">
          <p class="text-xs text-gray-500 mb-2">Detalhes Completos</p>
          <p class="text-gray-700 text-sm whitespace-pre-line">{{ logSelecionado.detalhes }}</p>
        </div>

        <div v-if="logSelecionado.dadosAnteriores" class="bg-red-50 border border-red-100 rounded-lg p-4">
          <p class="text-xs text-red-700 mb-2">Dados Anteriores</p>
          <pre class="text-red-800 text-xs whitespace-pre-wrap">{{ JSON.stringify(logSelecionado.dadosAnteriores, null, 2) }}</pre>
        </div>

        <div v-if="logSelecionado.dadosNovos" class="bg-green-50 border border-green-100 rounded-lg p-4">
          <p class="text-xs text-green-700 mb-2">Dados Novos</p>
          <pre class="text-green-800 text-xs whitespace-pre-wrap">{{ JSON.stringify(logSelecionado.dadosNovos, null, 2) }}</pre>
        </div>
      </div>

      <template #footer>
        <button @click="showModalDetalhes = false" class="btn-secondary">Fechar</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  FileText, CheckCircle, AlertTriangle, XCircle, Download,
  Calendar
} from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'

// State
const filtroData = ref('')
const filtroTipo = ref('todos')
const filtroUsuario = ref('todos')
const filtroSeveridade = ref('todos')
const showModalDetalhes = ref(false)
const logSelecionado = ref(null)

// Mock Data
const logs = ref([
  {
    id: 1,
    dataHora: '15/03/2026 14:30:25',
    usuario: 'Carlos Gestor',
    acao: 'aprovacao',
    recurso: 'Apadrinhamento',
    detalhes: 'Aprovou apadrinhamento entre Jean Pierre Dubois e Teresa Cumba',
    ip: '192.168.1.100',
    tipo: 'sucesso',
    dadosAnteriores: { status: 'aguardando_aprovacao' },
    dadosNovos: { status: 'aprovado', dataAprovacao: '15/03/2026' }
  },
  {
    id: 2,
    dataHora: '15/03/2026 11:15:42',
    usuario: 'João Silva',
    acao: 'cadastro',
    recurso: 'Criança',
    detalhes: 'Criou novo cadastro para Ana Maria Silva',
    ip: '192.168.1.101',
    tipo: 'sucesso'
  },
  {
    id: 3,
    dataHora: '15/03/2026 10:45:18',
    usuario: 'Maria Santos',
    acao: 'edicao',
    recurso: 'Ficha Técnica',
    detalhes: 'Atualizou avaliação SADD para João Pedro Santos',
    ip: '192.168.1.102',
    tipo: 'sucesso'
  },
  {
    id: 4,
    dataHora: '14/03/2026 16:20:33',
    usuario: 'Ana Tutor',
    acao: 'login',
    recurso: 'Sistema',
    detalhes: 'Login bem-sucedido no sistema',
    ip: '192.168.1.103',
    tipo: 'sucesso'
  },
  {
    id: 5,
    dataHora: '14/03/2026 15:55:12',
    usuario: 'Sistema',
    acao: 'sistema',
    recurso: 'Backup',
    detalhes: 'Backup automático do banco de dados concluído',
    ip: '127.0.0.1',
    tipo: 'sucesso'
  },
  {
    id: 6,
    dataHora: '14/03/2026 14:10:05',
    usuario: 'Carlos Gestor',
    acao: 'rejeicao',
    recurso: 'Revisão N2',
    detalhes: 'Rejeitou cadastro de Maria José - documentação incompleta',
    ip: '192.168.1.100',
    tipo: 'aviso',
    dadosAnteriores: { status: 'aguardando_revisao_n2' },
    dadosNovos: { status: 'rejeitado', motivo: 'documentação incompleta' }
  },
  {
    id: 7,
    dataHora: '13/03/2026 22:45:30',
    usuario: 'Sistema',
    acao: 'sistema',
    recurso: 'Segurança',
    detalhes: 'Tentativa de acesso não autorizado detectada',
    ip: '203.0.113.1',
    tipo: 'erro'
  }
])

// Computed
const usuariosUnicos = computed(() => [...new Set(logs.value.map(log => log.usuario))])

const logsFiltrados = computed(() => {
  return logs.value.filter(log => {
    const matchData = !filtroData.value || log.dataHora.startsWith(filtroData.value.split('-').reverse().join('/'))
    const matchTipo = filtroTipo.value === 'todos' || log.acao === filtroTipo.value
    const matchUsuario = filtroUsuario.value === 'todos' || log.usuario === filtroUsuario.value
    const matchSeveridade = filtroSeveridade.value === 'todos' || log.tipo === filtroSeveridade.value
    return matchData && matchTipo && matchUsuario && matchSeveridade
  })
})

// Methods
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const getTipoBadge = (acao) => {
  const badges = {
    login: 'px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700',
    cadastro: 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700',
    aprovacao: 'px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700',
    rejeicao: 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700',
    edicao: 'px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700',
    exclusao: 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700',
    sistema: 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700'
  }
  return badges[acao] || 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
}

const getSeveridadeBadge = (tipo) => {
  const badges = {
    sucesso: 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700',
    aviso: 'px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700',
    erro: 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700'
  }
  return badges[tipo] || 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
}

const getSeveridadeLabel = (tipo) => {
  const labels = {
    sucesso: 'Sucesso',
    aviso: 'Aviso',
    erro: 'Erro'
  }
  return labels[tipo] || tipo
}

const exportarLogs = () => {
  // Simular export
  console.log('Exportando logs...')
}
</script>
