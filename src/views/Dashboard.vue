<template>
  <div>
    <!-- Header com Refresh -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p class="text-sm text-gray-600 mt-1">
          Visão geral do desempenho da oficina
        </p>
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

    <!-- Loading State -->
    <div v-if="dashboardStore.loading && !hasData" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando dashboard..." />
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total de Clientes"
          :value="dashboardStore.stats.totalClientes"
          :icon="Users"
          color="blue"
          :trend="dashboardStore.trends.clientes"
        />
        <StatCard
          label="Total de Veículos"
          :value="dashboardStore.stats.totalVeiculos"
          :icon="Car"
          color="orange"
          :trend="dashboardStore.trends.veiculos"
        />
        <StatCard
          label="Serviços Concluídos"
          :value="dashboardStore.stats.servicosConcluidos"
          :icon="CheckCircle"
          color="green"
          :trend="dashboardStore.trends.servicos"
        />
        <StatCard
          label="Serviços Pendentes"
          :value="dashboardStore.stats.servicosPendentes"
          :icon="Clock"
          color="red"
          :trend="dashboardStore.trends.pendentes"
        />
        <StatCard
          label="Receita Mensal"
          :value="dashboardStore.stats.receitaMensal"
          :icon="DollarSign"
          color="green"
          format="currency"
          :trend="dashboardStore.trends.receita"
        />
        <StatCard
          label="Ticket Médio"
          :value="dashboardStore.stats.ticketMedio"
          :icon="TrendingUp"
          color="purple"
          format="currency"
          :trend="dashboardStore.trends.ticket"
        />
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ServicesChart :data="dashboardStore.servicesChart" />
        <RevenueChart :data="dashboardStore.revenueChart" />
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2">
          <RecentServices :services="dashboardStore.recentServices" />
        </div>
        <TopServices :services="dashboardStore.topServices" />
      </div>

      <!-- Vehicles by Brand -->
      <VehiclesByBrandChart :data="dashboardStore.vehiclesByBrand" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import {
  Users,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  RefreshCw
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import ServicesChart from '@/components/dashboard/ServicesChart.vue'
import RevenueChart from '@/components/dashboard/RevenueChart.vue'
import RecentServices from '@/components/dashboard/RecentServices.vue'
import TopServices from '@/components/dashboard/TopServices.vue'
import VehiclesByBrandChart from '@/components/dashboard/VehiclesByBrandChart.vue'

const dashboardStore = useDashboardStore()

const hasData = computed(() => dashboardStore.stats.totalClientes > 0)

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