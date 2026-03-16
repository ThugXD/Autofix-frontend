<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between bg-white rounded-xl p-5 border border-gray-100">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard Ponto Focal</h1>
        <p class="text-gray-500 mt-1">Visão geral das atividades e métricas do seu trabalho comunitário</p>
      </div>
      <div class="text-right">
        <p class="text-sm text-gray-500">Última atualização</p>
        <p class="text-lg font-semibold text-gray-900">{{ new Date().toLocaleDateString('pt-PT') }}</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <MessageSquarePlus class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stats.comunicacoes }}</p>
            <p class="text-sm text-gray-500">Comunicações</p>
            <p class="text-xs text-green-600 font-medium">+12% este mês</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
            <ClipboardList class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stats.cadastros }}</p>
            <p class="text-sm text-gray-500">Cadastros</p>
            <p class="text-xs text-green-600 font-medium">+8% este mês</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
            <FileCheck class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stats.revisoes }}</p>
            <p class="text-sm text-gray-500">Revisões</p>
            <p class="text-xs text-orange-600 font-medium">5 pendentes</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Calendar class="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stats.visitas }}</p>
            <p class="text-sm text-gray-500">Visitas Agendadas</p>
            <p class="text-xs text-blue-600 font-medium">3 hoje</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Atividades Recentes -->
      <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity class="w-5 h-5 text-blue-600" />
          Atividades Recentes
        </h3>
        <div class="space-y-3">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" :class="activity.iconBg">
              <component :is="getActivityIcon(activity.icon)" class="w-4 h-4" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-500">{{ activity.description }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Próximas Visitas -->
      <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar class="w-5 h-5 text-purple-600" />
          Próximas Visitas
        </h3>
        <div class="space-y-3">
          <div v-for="visit in upcomingVisits" :key="visit.id" class="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <MapPin class="w-5 h-5 text-purple-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ visit.child }}</p>
              <p class="text-xs text-gray-500">{{ visit.location }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ visit.date }}</p>
              <p class="text-xs text-gray-500">{{ visit.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link
          to="/app/ponto-focal/comunicacao"
          class="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <MessageSquarePlus class="w-6 h-6 text-blue-600" />
          <span class="text-sm font-medium text-gray-700">Nova Comunicação</span>
        </router-link>

        <router-link
          to="/app/ponto-focal/cadastro"
          class="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <ClipboardList class="w-6 h-6 text-green-600" />
          <span class="text-sm font-medium text-gray-700">Novo Cadastro</span>
        </router-link>

        <router-link
          to="/app/ponto-focal/agenda"
          class="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <Calendar class="w-6 h-6 text-purple-600" />
          <span class="text-sm font-medium text-gray-700">Agendar Visita</span>
        </router-link>

        <router-link
          to="/app/ponto-focal/relatorios"
          class="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
        >
          <BarChart3 class="w-6 h-6 text-orange-600" />
          <span class="text-sm font-medium text-gray-700">Ver Relatórios</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  MessageSquarePlus,
  ClipboardList,
  FileCheck,
  Calendar,
  Activity,
  MapPin,
  BarChart3,
  Plus,
  User,
  CheckCircle,
  Clock
} from 'lucide-vue-next'

// Dados mockados para demo
const stats = ref({
  comunicacoes: 24,
  cadastros: 18,
  revisoes: 7,
  visitas: 12
})

const recentActivities = ref([
  {
    id: 1,
    title: 'Nova comunicação registrada',
    description: 'Criança Maria Silva identificada no bairro Central',
    time: '2 horas atrás',
    icon: 'MessageSquarePlus',
    iconBg: 'bg-blue-100'
  },
  {
    id: 2,
    title: 'Cadastro aprovado',
    description: 'Ficha de João Santos aprovada na revisão N1',
    time: '4 horas atrás',
    icon: 'CheckCircle',
    iconBg: 'bg-green-100'
  },
  {
    id: 3,
    title: 'Visita agendada',
    description: 'Visita domiciliar para Ana Costa - amanhã 14:00',
    time: '6 horas atrás',
    icon: 'Calendar',
    iconBg: 'bg-purple-100'
  },
  {
    id: 4,
    title: 'Revisão pendente',
    description: 'Cadastro de Pedro Lima aguardando sua análise',
    time: '1 dia atrás',
    icon: 'Clock',
    iconBg: 'bg-orange-100'
  }
])

const upcomingVisits = ref([
  {
    id: 1,
    child: 'Maria Silva',
    location: 'Rua das Flores, 123',
    date: 'Hoje',
    time: '14:00'
  },
  {
    id: 2,
    child: 'João Santos',
    location: 'Av. Central, 456',
    date: 'Amanhã',
    time: '10:00'
  },
  {
    id: 3,
    child: 'Ana Costa',
    location: 'Bairro Novo, 789',
    date: '15 Dez',
    time: '15:30'
  }
])

const activityIcons = {
  MessageSquarePlus,
  CheckCircle,
  Calendar,
  Clock
}

const getActivityIcon = (iconName) => {
  return activityIcons[iconName] || MessageSquarePlus
}

onMounted(() => {
  // Aqui seria carregado dados reais da API
})
</script>
