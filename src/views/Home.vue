<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Cabeçalho -->
    <section class="pt-12 pb-8 px-4 sm:px-8 max-w-6xl mx-auto">
      <div class="card mb-6">
        <h1 class="page-title">Mude uma vida</h1>
        <p class="page-subtitle max-w-2xl">
          Conheça crianças que precisam de apoio. Seja padrinho e transforme seu futuro.
        </p>
      </div>

      <!-- Filtros -->
      <div class="flex flex-col sm:flex-row gap-3 max-w-2xl mb-8">
        <select
          v-model="filtros.regiao"
          @change="atualizarFiltros"
          class="input flex-1"
        >
          <option value="">Todas as regiões</option>
          <option v-for="regiao in criancasStore.regioes" :key="regiao" :value="regiao">
            {{ regiao }}
          </option>
        </select>

        <select
          v-model="filtros.vulnerabilidade"
          @change="atualizarFiltros"
          class="input flex-1"
        >
          <option value="">Todas vulnerabilidades</option>
          <option
            v-for="vuln in criancasStore.vulnerabilidades"
            :key="vuln"
            :value="vuln"
          >
            {{ vuln }}
          </option>
        </select>

        <button
          v-if="temFiltros"
          @click="resetarFiltros"
          class="btn btn-secondary px-6 py-2.5"
        >
          Limpar
        </button>
      </div>
    </section>

    <!-- Loading -->
    <div v-if="criancasStore.loading" class="flex justify-center py-20">
      <div class="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>

    <!-- Grid de Crianças -->
    <section v-else class="px-4 sm:px-8 max-w-6xl mx-auto pb-32">
      <div
        v-if="criancasStore.criancasFiltradas.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <RouterLink
          v-for="crianca in criancasStore.criancasFiltradas"
          :key="crianca.id"
          :to="`/crianca/${crianca.id}`"
          class="card group cursor-pointer block hover:shadow-card-hover transition-shadow"
        >
          <div class="relative overflow-hidden -m-6 mb-4 rounded-t-xl">
            <img
              :src="crianca.foto"
              :alt="crianca.nome"
              class="w-full aspect-square object-cover group-hover:opacity-95 transition duration-200"
            />
            <span
              :class="['absolute top-3 right-3 badge text-white border-0', getStatusColor(crianca.status)]"
            >
              {{ crianca.status }}
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ crianca.nome }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ crianca.idade }} anos • {{ crianca.regiao }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="(vuln, idx) in crianca.vulnerabilidades.slice(0, 2)"
              :key="idx"
              class="badge badge-info"
            >
              {{ vuln }}
            </span>
          </div>
          <div class="flex justify-between items-center text-sm text-gray-600">
            <span class="font-medium">{{ formatarMoeda(crianca.orcamentoAnual) }}</span>
            <span>{{ getPercentualCoberto(crianca) }}% coberto</span>
          </div>
        </RouterLink>
      </div>

      <!-- Empty State -->
      <div v-else class="card text-center py-16">
        <p class="text-gray-600 mb-4">Nenhuma criança encontrada com esses critérios</p>
        <button
          @click="resetarFiltros"
          class="btn btn-primary"
        >
          Ver todas
        </button>
      </div>
    </section>

    <!-- Bottom Menu Flutuante -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div class="bg-white border border-gray-200 rounded-xl shadow-card px-6 py-3 flex gap-8">
        <RouterLink
          to="/"
          class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m0 0l-7-4-7 4m7 4v5" />
          </svg>
          <span class="text-xs">Catálogo</span>
        </RouterLink>

        <RouterLink
          to="/login"
          class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs">Login</span>
        </RouterLink>

        <a
          href="#sobre"
          class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs">Sobre</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCriancasStore } from '@/stores/criancas'

const criancasStore = useCriancasStore()
const filtros = ref({ regiao: '', vulnerabilidade: '' })

const temFiltros = computed(() => {
  return filtros.value.regiao || filtros.value.vulnerabilidade
})

const atualizarFiltros = () => {
  criancasStore.setFiltros(filtros.value)
}

const resetarFiltros = () => {
  filtros.value = { regiao: '', vulnerabilidade: '' }
  criancasStore.resetFiltros()
}

const getStatusColor = (status) => {
  if (status === 'Disponível') return 'bg-blue-600'
  if (status === 'Parcialmente Apoiada') return 'bg-amber-600'
  return 'bg-green-600'
}

const getPercentualCoberto = (crianca) => {
  return Math.round((crianca.orcamentoCoberto / crianca.orcamentoAnual) * 100)
}

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(valor)
}

onMounted(() => {
  criancasStore.fetchCriancas()
})
</script>
