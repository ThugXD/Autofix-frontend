<template>
  <div>
    <!-- Cabecalho da pagina -->
    <div class="card mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="page-title">Dashboard</h2>
          <p class="page-subtitle">Ponto Focal Comunitario - Visao geral das criancas</p>
        </div>
        <BaseButton
          variant="secondary"
          :icon="RefreshCw"
          :loading="dashboardStore.loading"
          @click="refreshData"
        >
          Atualizar
        </BaseButton>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="dashboardStore.loading && !hasData" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando dashboard..." />
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Criancas Identificadas"
          :value="dashboardStore.stats.criancasIdentificadas"
          :icon="Baby"
          color="blue"
          :trend="dashboardStore.trends.identificadas"
        />
        <StatCard
          label="Em Cadastro"
          :value="dashboardStore.stats.emCadastro"
          :icon="ClipboardList"
          color="orange"
          :trend="dashboardStore.trends.emCadastro"
        />
        <StatCard
          label="Aguardando Revisao"
          :value="dashboardStore.stats.aguardandoRevisao"
          :icon="Clock"
          color="purple"
          :trend="dashboardStore.trends.aguardandoRevisao"
        />
        <StatCard
          label="Publicadas"
          :value="dashboardStore.stats.publicadas"
          :icon="CheckCircle"
          color="green"
          :trend="dashboardStore.trends.publicadas"
        />
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CadastrosChart :data="dashboardStore.cadastrosChart" />
        <VulnerabilidadesPorRegiao :data="dashboardStore.vulnerabilidadesPorRegiao" />
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentComunicacoes :comunicacoes="dashboardStore.recentComunicacoes" />
        <CadastrosEmAndamento :cadastros="dashboardStore.cadastrosEmAndamento" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import {
  Baby,
  ClipboardList,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import CadastrosChart from '@/components/dashboard/CadastrosChart.vue'
import RecentComunicacoes from '@/components/dashboard/RecentComunicacoes.vue'
import CadastrosEmAndamento from '@/components/dashboard/CadastrosEmAndamento.vue'
import VulnerabilidadesPorRegiao from '@/components/dashboard/VulnerabilidadesPorRegiao.vue'

const dashboardStore = useDashboardStore()

const hasData = computed(() => dashboardStore.stats.criancasIdentificadas > 0)

onMounted(() => {
  loadDashboard()
})

const loadDashboard = async () => {
  await dashboardStore.fetchDashboardData()
}

const refreshData = async () => {
  await dashboardStore.fetchDashboardData()
}
</script>
