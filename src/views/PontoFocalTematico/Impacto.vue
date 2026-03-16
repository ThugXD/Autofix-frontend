<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Resumo de Impacto & Necessidades</h1>
        <p class="text-gray-500 mt-1">
          Visão consolidada das intervenções necessárias e impacto orçamental
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card p-6 bg-gradient-to-br from-primary to-primary-dark text-white border-none">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Coins class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium opacity-80">Orçamento Estimado</p>
            <p class="text-3xl font-bold">{{ formatCurrency(totalEstimado) }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 border-amber-100 bg-amber-50/30">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <AlertCircle class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Urgência Alta</p>
            <p class="text-3xl font-bold text-amber-600">{{ altaPrioridadeCount }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 border-blue-100 bg-blue-50/30">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Target class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Crianças Impactadas</p>
            <p class="text-3xl font-bold text-blue-600">{{ totalImpactados }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Impact by Category -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6 space-y-6">
        <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
          <PieChart class="w-5 h-5 text-primary" />
          Distribuição por Área
        </h2>

        <div class="space-y-4">
          <div v-for="area in impactByArea" :key="area.name" class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium text-gray-700">{{ area.name }}</span>
              <span class="font-bold">{{ formatCurrency(area.total) }}</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary transition-all duration-1000"
                :style="{ width: `${area.percent}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-6 space-y-4">
        <h2 class="text-lg font-bold text-gray-900">Necessidades Críticas Recentes</h2>
        <div class="space-y-3">
          <div
            v-for="need in criticalNeeds"
            :key="need.id"
            class="p-4 rounded-xl border border-gray-100 hover:border-primary/20 transition-all bg-gray-50/30"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-bold text-gray-900">{{ need.descricao }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ need.crianca }} | {{ need.areaLabel }}</p>
              </div>
              <span class="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">ALTA</span>
            </div>
            <p class="text-xs text-gray-600 mt-2 line-clamp-2 italic">"{{ need.fundamentacao }}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import {
  Coins,
  AlertCircle,
  Target,
  PieChart,
  BarChart3,
  CheckCircle2
} from 'lucide-vue-next'

const store = usePontoFocalTematicoStore()

// Aggregated Data
const needsList = computed(() => {
  return store.fichasTecnicas.flatMap(f => {
    return (f.necessidades || []).map(n => ({
      ...n,
      crianca: f.criancaNome,
      area: f.pfTematico
    }))
  })
})

const totalEstimado = computed(() => {
  return needsList.value.reduce((sum, n) => sum + (n.custoEstimado || 0), 0)
})

const totalImpactados = computed(() => {
  return new Set(store.fichasTecnicas.map(f => f.cadastroId)).size
})

const altaPrioridadeCount = computed(() => {
  return needsList.value.filter(n => n.prioridade === 'alta').length
})

const criticalNeeds = computed(() => {
  return needsList.value
    .filter(n => n.prioridade === 'alta')
    .slice(0, 4)
    .map(n => ({
      ...n,
      areaLabel: getAreaLabel(n.area)
    }))
})

const impactByArea = computed(() => {
  const areas = {
    sadd: 'Documentação',
    sanc: 'Nutrição',
    sasbe: 'Saúde',
    saad: 'Alimentação',
    saeie: 'Educação',
    saps: 'Proteção',
    sape: 'Psicossocial'
  }

  const totals = {}
  Object.keys(areas).forEach(k => totals[k] = 0)

  needsList.value.forEach(n => {
    if (totals[n.area] !== undefined) {
      totals[n.area] += (n.custoEstimado || 0)
    }
  })

  const max = Math.max(...Object.values(totals), 1)

  return Object.entries(areas).map(([k, label]) => ({
    name: label,
    total: totals[k],
    percent: (totals[k] / max) * 100
  })).sort((a, b) => b.total - a.total)
})

const getAreaLabel = (id) => {
  const map = {
    sadd: 'Documentação',
    sanc: 'Nutrição',
    sasbe: 'Saúde',
    saad: 'Alimentação',
    saeie: 'Educação',
    saps: 'Proteção',
    sape: 'Psicossocial'
  }
  return map[id] || id
}

const formatCurrency = (val) => {
  // Formatação customizada para MZN: xxx.xxx.xxx,xx MZN
  return val.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' MZN'
}
</script>
