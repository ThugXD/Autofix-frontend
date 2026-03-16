<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p class="text-gray-500 mt-1">Gerencie parâmetros e configurações do SACCO</p>
      </div>
      <button @click="salvarConfiguracoes" class="btn-primary">
        <Save class="w-4 h-4 mr-2" />
        Salvar Alterações
      </button>
    </div>

    <!-- Abas de Configuração -->
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
          <component :is="tab.icon" class="w-4 h-4 inline mr-2" />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab: Gerais -->
    <div v-if="activeTab === 'gerais'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações do Sistema</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Associação</label>
              <input
                v-model="configuracoes.nomeAssociacao"
                type="text"
                class="input w-full"
                placeholder="Nome da associação"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
              <input
                v-model="configuracoes.emailContacto"
                type="email"
                class="input w-full"
                placeholder="email@associacao.org"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                v-model="configuracoes.telefone"
                type="tel"
                class="input w-full"
                placeholder="+258 XXX XXX XXX"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                v-model="configuracoes.website"
                type="url"
                class="input w-full"
                placeholder="https://www.associacao.org"
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Parâmetros Operacionais</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Moeda Padrão</label>
              <select v-model="configuracoes.moeda" class="input w-full">
                <option value="MZN">Metical (MZN)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dólar (USD)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prazo Máximo de Apadrinhamento (anos)</label>
              <input
                v-model.number="configuracoes.prazoMaxApadrinhamento"
                type="number"
                min="1"
                max="10"
                class="input w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Idade Máxima para Cadastro (anos)</label>
              <input
                v-model.number="configuracoes.idadeMaxCadastro"
                type="number"
                min="1"
                max="25"
                class="input w-full"
              />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.permiteAutoCadastro" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Permitir auto-cadastro de padrinhos</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Orçamentos -->
    <div v-if="activeTab === 'orcamentos'" class="space-y-6">
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Orçamentos Base por Área Técnica</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Área Técnica</th>
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Orçamento Anual (MZN)</th>
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Descrição</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="area in configuracoes.orcamentosBase" :key="area.id">
                <td class="py-3 px-4 text-sm font-medium text-gray-900">{{ area.nome }}</td>
                <td class="py-3 px-4">
                  <input
                    v-model.number="area.valor"
                    type="number"
                    min="0"
                    class="input text-sm w-32"
                    placeholder="0"
                  />
                </td>
                <td class="py-3 px-4 text-sm text-gray-600">{{ area.descricao }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tab: Notificações -->
    <div v-if="activeTab === 'notificacoes'" class="space-y-6">
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Configurações de Notificações</h3>
        <div class="space-y-6">
          <div v-for="notif in configuracoes.notificacoes" :key="notif.id" class="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div>
              <h4 class="font-medium text-gray-900">{{ notif.titulo }}</h4>
              <p class="text-sm text-gray-500">{{ notif.descricao }}</p>
            </div>
            <div class="flex items-center gap-4">
              <select v-model="notif.frequencia" class="px-3 py-1 text-sm border border-gray-200 rounded-lg">
                <option value="imediata">Imediata</option>
                <option value="diaria">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="desativada">Desativada</option>
              </select>
              <input v-model="notif.ativa" type="checkbox" class="rounded w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Segurança -->
    <div v-if="activeTab === 'seguranca'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Políticas de Senha</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Comprimento Mínimo</label>
              <input
                v-model.number="configuracoes.seguranca.tamanhoMinSenha"
                type="number"
                min="6"
                max="20"
                class="input w-full"
              />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.seguranca.exigirMaiuscula" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Exigir letra maiúscula</label>
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.seguranca.exigirMinuscula" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Exigir letra minúscula</label>
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.seguranca.exigirNumero" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Exigir número</label>
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.seguranca.exigirEspecial" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Exigir carácter especial</label>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Sessões e Acesso</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Timeout da Sessão (minutos)</label>
              <input
                v-model.number="configuracoes.seguranca.timeoutSessao"
                type="number"
                min="5"
                max="480"
                class="input w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tentativas Máximas de Login</label>
              <input
                v-model.number="configuracoes.seguranca.maxTentativasLogin"
                type="number"
                min="3"
                max="10"
                class="input w-full"
              />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.seguranca.bloqueioAutomatico" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Bloqueio automático após tentativas falhadas</label>
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.seguranca.logAuditoria" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Registar logs de auditoria</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Backup -->
    <div v-if="activeTab === 'backup'" class="space-y-6">
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Configurações de Backup</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Frequência de Backup</label>
              <select v-model="configuracoes.backup.frequencia" class="input w-full">
                <option value="diario">Diário</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Retenção (dias)</label>
              <input
                v-model.number="configuracoes.backup.retencaoDias"
                type="number"
                min="1"
                max="365"
                class="input w-full"
              />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="configuracoes.backup.backupAutomatico" type="checkbox" class="rounded" />
              <label class="text-sm text-gray-700">Backup automático</label>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Último Backup</label>
              <p class="text-sm text-gray-600">{{ configuracoes.backup.ultimoBackup }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Próximo Backup</label>
              <p class="text-sm text-gray-600">{{ configuracoes.backup.proximoBackup }}</p>
            </div>
            <button class="btn-secondary w-full">
              <Database class="w-4 h-4 mr-2" />
              Executar Backup Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Settings, DollarSign, Bell, Shield, Database, Save
} from 'lucide-vue-next'

// State
const activeTab = ref('gerais')

// Mock Data
const configuracoes = ref({
  nomeAssociacao: 'Associação Crianças de Moçambique',
  emailContacto: 'info@sacco.org.mz',
  telefone: '+258 845 456 789',
  website: 'https://www.sacco.org.mz',
  moeda: 'MZN',
  prazoMaxApadrinhamento: 3,
  idadeMaxCadastro: 18,
  permiteAutoCadastro: true,

  orcamentosBase: [
    { id: 'sadd', nome: 'Direitos e Documentação', valor: 450000, descricao: 'Documentação legal e direitos básicos' },
    { id: 'sanc', nome: 'Nutrição e Crescimento', valor: 380000, descricao: 'Alimentação e acompanhamento nutricional' },
    { id: 'saad', nome: 'Alimentação Diária', valor: 320000, descricao: 'Refeições diárias e suplementos' },
    { id: 'saeie', nome: 'Educação e Inclusão', valor: 280000, descricao: 'Material escolar e educação' },
    { id: 'sape', nome: 'Psico-Social Emocional', valor: 250000, descricao: 'Apoio psicológico e emocional' },
    { id: 'saps', nome: 'Proteção e Segurança', valor: 200000, descricao: 'Proteção contra abusos e violência' },
    { id: 'sasbe', nome: 'Saúde e Bem-Estar', valor: 350000, descricao: 'Cuidados médicos e saúde preventiva' }
  ],

  notificacoes: [
    { id: 1, titulo: 'Revisões Pendentes', descricao: 'Alertar quando há revisões N2 pendentes', ativa: true, frequencia: 'diaria' },
    { id: 2, titulo: 'Prazos de Renovação', descricao: 'Notificar sobre contratos próximos do fim', ativa: true, frequencia: 'semanal' },
    { id: 3, titulo: 'Novos Cadastros', descricao: 'Alertar sobre novos cadastros de crianças', ativa: true, frequencia: 'imediata' },
    { id: 4, titulo: 'Relatórios Mensais', descricao: 'Lembretes para geração de relatórios', ativa: false, frequencia: 'mensal' }
  ],

  seguranca: {
    tamanhoMinSenha: 8,
    exigirMaiuscula: true,
    exigirMinuscula: true,
    exigirNumero: true,
    exigirEspecial: false,
    timeoutSessao: 30,
    maxTentativasLogin: 5,
    bloqueioAutomatico: true,
    logAuditoria: true
  },

  backup: {
    frequencia: 'diario',
    retencaoDias: 30,
    backupAutomatico: true,
    ultimoBackup: '15/03/2026 02:00:00',
    proximoBackup: '16/03/2026 02:00:00'
  }
})

const tabs = [
  { id: 'gerais', label: 'Gerais', icon: Settings },
  { id: 'orcamentos', label: 'Orçamentos', icon: DollarSign },
  { id: 'notificacoes', label: 'Notificações', icon: Bell },
  { id: 'seguranca', label: 'Segurança', icon: Shield },
  { id: 'backup', label: 'Backup', icon: Database }
]

// Methods
const salvarConfiguracoes = () => {
  // Simular salvamento
  console.log('Configurações salvas:', configuracoes.value)
  // Mostrar toast de sucesso
}
</script>
