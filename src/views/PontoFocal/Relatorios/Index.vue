<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p class="text-gray-500 mt-1">Acompanhe o progresso e gere relatórios das suas atividades</p>
      </div>
      <BaseButton variant="primary" :icon="FileText">
        Gerar Relatório
      </BaseButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Visitas Realizadas</p>
            <p class="text-2xl font-bold text-gray-900">47</p>
            <p class="text-sm text-green-600 mt-1">+12% este mês</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <MapPin class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Crianças Acompanhadas</p>
            <p class="text-2xl font-bold text-gray-900">23</p>
            <p class="text-sm text-blue-600 mt-1">+3 novas</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Users class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Fichas Preenchidas</p>
            <p class="text-2xl font-bold text-gray-900">18</p>
            <p class="text-sm text-orange-600 mt-1">5 pendentes</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
            <FileText class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Taxa de Conclusão</p>
            <p class="text-2xl font-bold text-gray-900">78%</p>
            <p class="text-sm text-green-600 mt-1">+5% este mês</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
            <TrendingUp class="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FileText class="w-5 h-5 text-blue-600" />
        Relatórios Recentes
      </h3>

      <div class="space-y-3">
        <div v-for="report in recentReports" :key="report.id"
             class="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FileText class="w-6 h-6 text-blue-600" />
          </div>

          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{{ report.title }}</h4>
            <p class="text-sm text-gray-500">{{ report.description }}</p>
            <p class="text-xs text-gray-400">Gerado em {{ report.date }}</p>
          </div>

          <div class="text-right">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="report.statusClass">
              {{ report.status }}
            </span>
          </div>

          <div class="flex gap-2">
            <BaseButton variant="secondary" size="sm">
              Visualizar
            </BaseButton>
            <BaseButton variant="secondary" size="sm">
              Baixar
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Templates -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Template class="w-5 h-5 text-purple-600" />
        Modelos de Relatório
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="template in reportTemplates" :key="template.id"
             class="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText class="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 class="font-medium text-gray-900">{{ template.name }}</h4>
              <p class="text-sm text-gray-500">{{ template.description }}</p>
            </div>
          </div>
          <BaseButton variant="primary" size="sm" class="w-full">
            Usar Modelo
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileText, MapPin, Users, TrendingUp, Template } from 'lucide-vue-next'

const recentReports = ref([
  {
    id: 1,
    title: 'Relatório Mensal - Novembro 2026',
    description: 'Visitas realizadas, crianças acompanhadas e indicadores de progresso',
    date: '15 Dez 2026',
    status: 'Finalizado',
    statusClass: 'bg-green-100 text-green-800'
  },
  {
    id: 2,
    title: 'Avaliação de Vulnerabilidades - Bairro Centro',
    description: 'Análise detalhada das condições socioeconômicas',
    date: '12 Dez 2026',
    status: 'Em Revisão',
    statusClass: 'bg-orange-100 text-orange-800'
  },
  {
    id: 3,
    title: 'Relatório de Apadrinhamentos',
    description: 'Status dos programas de apadrinhamento ativo',
    date: '10 Dez 2026',
    status: 'Finalizado',
    statusClass: 'bg-green-100 text-green-800'
  },
  {
    id: 4,
    title: 'Indicadores de Desenvolvimento Infantil',
    description: 'Métricas de progresso educacional e nutricional',
    date: '08 Dez 2026',
    status: 'Rascunho',
    statusClass: 'bg-gray-100 text-gray-800'
  }
])

const reportTemplates = ref([
  {
    id: 1,
    name: 'Relatório Mensal',
    description: 'Relatório padrão mensal de atividades'
  },
  {
    id: 2,
    name: 'Avaliação de Caso',
    description: 'Análise detalhada de situação específica'
  },
  {
    id: 3,
    name: 'Relatório de Visita',
    description: 'Registro detalhado de visita domiciliar'
  },
  {
    id: 4,
    name: 'Indicadores de Progresso',
    description: 'Métricas e indicadores de desenvolvimento'
  },
  {
    id: 5,
    name: 'Relatório de Comunidade',
    description: 'Análise da situação comunitária'
  },
  {
    id: 6,
    name: 'Relatório Executivo',
    description: 'Resumo executivo para gestores'
  }
])
</script>
