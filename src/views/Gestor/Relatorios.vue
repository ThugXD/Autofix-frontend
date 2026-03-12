<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Relatorios e Estatisticas</h1>
        <p class="text-gray-500 mt-1">Visao geral do programa de apadinhamento</p>
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="periodoSelecionado"
          class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="mes">Este Mes</option>
          <option value="trimestre">Este Trimestre</option>
          <option value="ano">Este Ano</option>
          <option value="total">Todo Periodo</option>
        </select>
        <button class="btn-secondary text-sm">
          <Download class="w-4 h-4 mr-1" />
          Exportar
        </button>
      </div>
    </div>

    <!-- Stats Cards Principais -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Criancas Cadastradas</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalCriancas }}</p>
            <p class="text-xs text-green-600 mt-2">
              <TrendingUp class="w-3 h-3 inline mr-1" />
              +{{ stats.novasCriancas }} este mes
            </p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users class="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Apadinhamentos Ativos</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.apadinhamentosAtivos }}</p>
            <p class="text-xs text-green-600 mt-2">
              <TrendingUp class="w-3 h-3 inline mr-1" />
              +{{ stats.novosApadinhamentos }} este mes
            </p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <Heart class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Padrinhos Registados</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalPadrinhos }}</p>
            <p class="text-xs text-green-600 mt-2">
              <TrendingUp class="w-3 h-3 inline mr-1" />
              +{{ stats.novosPadrinhos }} este mes
            </p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
            <UserHeart class="w-6 h-6 text-pink-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Contribuicoes Totais</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatCurrency(stats.contribuicoesTotais) }}</p>
            <p class="text-xs text-green-600 mt-2">
              <TrendingUp class="w-3 h-3 inline mr-1" />
              {{ formatCurrency(stats.contribuicoesMes) }} este mes
            </p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Wallet class="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Graficos/Tabelas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Cadastros por Status -->
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Cadastros por Status</h3>
        <div class="space-y-4">
          <div v-for="item in cadastrosPorStatus" :key="item.status" class="flex items-center gap-4">
            <div class="w-32 text-sm text-gray-600">{{ item.label }}</div>
            <div class="flex-1">
              <div class="w-full bg-gray-100 rounded-full h-3">
                <div
                  :class="item.color"
                  class="rounded-full h-3 transition-all"
                  :style="{ width: item.percentual + '%' }"
                ></div>
              </div>
            </div>
            <div class="w-16 text-right">
              <span class="font-semibold text-gray-900">{{ item.quantidade }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Apadinhamentos por Pais -->
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Padrinhos por Pais</h3>
        <div class="space-y-3">
          <div
            v-for="item in padrinhosPorPais"
            :key="item.pais"
            class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">{{ item.bandeira }}</span>
              <span class="text-sm font-medium text-gray-900">{{ item.pais }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500">{{ item.quantidade }} padrinhos</span>
              <span class="text-sm font-medium text-primary">{{ formatCurrency(item.contribuicao) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Necessidades por Area -->
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Distribuicao de Necessidades</h3>
        <div class="space-y-4">
          <div v-for="item in necessidadesPorArea" :key="item.area" class="flex items-center gap-4">
            <div :class="item.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
              <component :is="item.icon" :class="item.iconColor" class="w-5 h-5" />
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-900">{{ item.area }}</span>
                <span class="text-sm text-gray-500">{{ item.quantidade }}</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div
                  :class="item.barColor"
                  class="rounded-full h-2 transition-all"
                  :style="{ width: item.percentual + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ultimas Atividades -->
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Ultimas Atividades</h3>
        <div class="space-y-4">
          <div
            v-for="atividade in ultimasAtividades"
            :key="atividade.id"
            class="flex items-start gap-3"
          >
            <div :class="atividade.iconBg" class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
              <component :is="atividade.icon" :class="atividade.iconColor" class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900">{{ atividade.descricao }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ atividade.tempo }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resumo Financeiro -->
    <div class="bg-white rounded-xl border border-gray-100 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro por Area</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Area</th>
              <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Orcado</th>
              <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Executado</th>
              <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Saldo</th>
              <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Execucao</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in resumoFinanceiro" :key="item.area" class="border-b border-gray-50">
              <td class="py-3 px-4 text-sm font-medium text-gray-900">{{ item.area }}</td>
              <td class="py-3 px-4 text-sm text-right text-gray-600">{{ formatCurrency(item.orcado) }}</td>
              <td class="py-3 px-4 text-sm text-right text-gray-900 font-medium">{{ formatCurrency(item.executado) }}</td>
              <td class="py-3 px-4 text-sm text-right" :class="item.saldo >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatCurrency(item.saldo) }}
              </td>
              <td class="py-3 px-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <div class="w-20 bg-gray-100 rounded-full h-2">
                    <div
                      class="bg-primary rounded-full h-2"
                      :style="{ width: Math.min(item.execucao, 100) + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600 w-12 text-right">{{ item.execucao }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="bg-gray-50">
              <td class="py-3 px-4 font-semibold text-gray-900">Total</td>
              <td class="py-3 px-4 text-right font-semibold text-gray-900">{{ formatCurrency(totalOrcado) }}</td>
              <td class="py-3 px-4 text-right font-semibold text-gray-900">{{ formatCurrency(totalExecutado) }}</td>
              <td class="py-3 px-4 text-right font-semibold" :class="totalSaldo >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatCurrency(totalSaldo) }}
              </td>
              <td class="py-3 px-4 text-right font-semibold text-gray-900">{{ totalExecucao }}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue'
import { 
  Download, Users, Heart, Wallet, TrendingUp,
  Stethoscope, Apple, Brain, Salad, FileText, ShieldCheck,
  UserPlus, CheckCircle, Globe
} from 'lucide-vue-next'

// Icone custom para UserHeart
const UserHeart = shallowRef(Heart)

// State
const periodoSelecionado = ref('mes')

// Mock Data
const stats = ref({
  totalCriancas: 156,
  novasCriancas: 12,
  apadinhamentosAtivos: 98,
  novosApadinhamentos: 5,
  totalPadrinhos: 112,
  novosPadrinhos: 8,
  contribuicoesTotais: 18500000,
  contribuicoesMes: 1850000
})

const cadastrosPorStatus = [
  { status: 'publicado', label: 'Publicados', quantidade: 85, percentual: 55, color: 'bg-green-500' },
  { status: 'apadrinhado', label: 'Apadrinhados', quantidade: 98, percentual: 63, color: 'bg-pink-500' },
  { status: 'revisao', label: 'Em Revisao', quantidade: 23, percentual: 15, color: 'bg-amber-500' },
  { status: 'cadastro', label: 'Em Cadastro', quantidade: 18, percentual: 12, color: 'bg-blue-500' },
  { status: 'cancelado', label: 'Cancelados', quantidade: 12, percentual: 8, color: 'bg-gray-400' }
]

const padrinhosPorPais = [
  { pais: 'Franca', bandeira: '🇫🇷', quantidade: 32, contribuicao: 5200000 },
  { pais: 'Alemanha', bandeira: '🇩🇪', quantidade: 24, contribuicao: 4100000 },
  { pais: 'Portugal', bandeira: '🇵🇹', quantidade: 21, contribuicao: 3400000 },
  { pais: 'Espanha', bandeira: '🇪🇸', quantidade: 18, contribuicao: 2800000 },
  { pais: 'Reino Unido', bandeira: '🇬🇧', quantidade: 12, contribuicao: 2100000 },
  { pais: 'Estados Unidos', bandeira: '🇺🇸', quantidade: 5, contribuicao: 900000 }
]

const necessidadesPorArea = [
  { area: 'Saude', icon: Stethoscope, iconBg: 'bg-red-100', iconColor: 'text-red-600', barColor: 'bg-red-500', quantidade: 245, percentual: 28 },
  { area: 'Alimentacao', icon: Apple, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', barColor: 'bg-orange-500', quantidade: 189, percentual: 22 },
  { area: 'Psico-Social', icon: Brain, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', barColor: 'bg-purple-500', quantidade: 156, percentual: 18 },
  { area: 'Nutricao', icon: Salad, iconBg: 'bg-green-100', iconColor: 'text-green-600', barColor: 'bg-green-500', quantidade: 134, percentual: 15 },
  { area: 'Documentacao', icon: FileText, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', barColor: 'bg-blue-500', quantidade: 87, percentual: 10 },
  { area: 'Protecao', icon: ShieldCheck, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', barColor: 'bg-amber-500', quantidade: 62, percentual: 7 }
]

const ultimasAtividades = [
  { id: 1, descricao: 'Nova crianca cadastrada: Ana Maria Silva', tempo: 'Ha 2 horas', icon: UserPlus, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 2, descricao: 'Apadinhamento aprovado: Teresa Cumba', tempo: 'Ha 5 horas', icon: CheckCircle, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 3, descricao: 'Novo padrinho registado: Emma Wilson', tempo: 'Ha 1 dia', icon: Heart, iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
  { id: 4, descricao: 'Cadastro publicado: Joao Pedro Santos', tempo: 'Ha 1 dia', icon: Globe, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 5, descricao: 'Revisao N2 concluida: Maria Esperanca', tempo: 'Ha 2 dias', icon: CheckCircle, iconBg: 'bg-amber-100', iconColor: 'text-amber-600' }
]

const resumoFinanceiro = ref([
  { area: 'Saude', orcado: 4500000, executado: 3200000, saldo: 1300000, execucao: 71 },
  { area: 'Alimentacao', orcado: 3200000, executado: 2800000, saldo: 400000, execucao: 88 },
  { area: 'Psico-Social', orcado: 2100000, executado: 1650000, saldo: 450000, execucao: 79 },
  { area: 'Nutricao', orcado: 1800000, executado: 1200000, saldo: 600000, execucao: 67 },
  { area: 'Documentacao', orcado: 900000, executado: 720000, saldo: 180000, execucao: 80 },
  { area: 'Protecao', orcado: 1500000, executado: 980000, saldo: 520000, execucao: 65 }
])

// Computed
const totalOrcado = computed(() => resumoFinanceiro.value.reduce((sum, i) => sum + i.orcado, 0))
const totalExecutado = computed(() => resumoFinanceiro.value.reduce((sum, i) => sum + i.executado, 0))
const totalSaldo = computed(() => totalOrcado.value - totalExecutado.value)
const totalExecucao = computed(() => Math.round((totalExecutado.value / totalOrcado.value) * 100))

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0
  }).format(value)
}
</script>
