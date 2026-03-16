<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Notificações</h1>
        <p class="text-gray-500 mt-1">Mantenha-se informado sobre atividades e alertas importantes</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="secondary">
          Marcar Todas como Lidas
        </BaseButton>
        <BaseButton variant="primary" :icon="Settings">
          Configurações
        </BaseButton>
      </div>
    </div>

    <!-- Notification Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Não Lidas</p>
            <p class="text-2xl font-bold text-gray-900">12</p>
            <p class="text-sm text-red-600 mt-1">3 urgentes</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
            <Bell class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Hoje</p>
            <p class="text-2xl font-bold text-gray-900">8</p>
            <p class="text-sm text-blue-600 mt-1">+2 novas</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Calendar class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Esta Semana</p>
            <p class="text-2xl font-bold text-gray-900">34</p>
            <p class="text-sm text-green-600 mt-1">+15%</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendingUp class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Alertas Críticos</p>
            <p class="text-2xl font-bold text-gray-900">3</p>
            <p class="text-sm text-orange-600 mt-1">Requer ação</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
            <AlertTriangle class="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Filters -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div class="flex items-center gap-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Todas as Notificações</h3>
        <div class="flex gap-2">
          <button class="px-3 py-1 text-sm rounded-full transition-colors"
                  :class="filter === 'all' ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-100'"
                  @click="filter = 'all'">
            Todas
          </button>
          <button class="px-3 py-1 text-sm rounded-full transition-colors"
                  :class="filter === 'unread' ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-100'"
                  @click="filter = 'unread'">
            Não Lidas
          </button>
          <button class="px-3 py-1 text-sm rounded-full transition-colors"
                  :class="filter === 'urgent' ? 'bg-red-100 text-red-800' : 'text-gray-500 hover:bg-gray-100'"
                  @click="filter = 'urgent'">
            Urgentes
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="space-y-3">
        <div v-for="notification in filteredNotifications" :key="notification.id"
             class="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
             :class="{ 'bg-blue-50 border-blue-200': !notification.read }">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
               :class="notification.iconBg">
            <component :is="notification.icon" class="w-5 h-5" :class="notification.iconColor" />
          </div>

          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h4 class="font-medium text-gray-900">{{ notification.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
                <p class="text-xs text-gray-400 mt-2">{{ notification.time }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="notification.priority === 'urgent'"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Urgente
                </span>
                <button v-if="!notification.read"
                        class="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></button>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <BaseButton variant="secondary" size="sm">
              Ver Detalhes
            </BaseButton>
            <BaseButton v-if="!notification.read" variant="primary" size="sm" @click="markAsRead(notification.id)">
              Marcar como Lida
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bell, Calendar, TrendingUp, AlertTriangle, Settings, User, FileText, MapPin, Clock } from 'lucide-vue-next'

const filter = ref('all')

const notifications = ref([
  {
    id: 1,
    title: 'Nova criança identificada',
    message: 'Maria Silva foi cadastrada no sistema. Família localizada no Bairro Centro.',
    time: 'Há 2 horas',
    read: false,
    priority: 'normal',
    icon: User,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Visita agendada para hoje',
    message: 'Lembrete: Visita domiciliar com João Santos às 14:00.',
    time: 'Há 4 horas',
    read: false,
    priority: 'normal',
    icon: Calendar,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 3,
    title: 'Alerta crítico: Violência doméstica',
    message: 'Denúncia recebida no Bairro Novo. Intervenção imediata necessária.',
    time: 'Há 6 horas',
    read: false,
    priority: 'urgent',
    icon: AlertTriangle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 4,
    title: 'Relatório mensal pendente',
    message: 'O relatório de novembro deve ser enviado até sexta-feira.',
    time: 'Ontem, 16:30',
    read: true,
    priority: 'normal',
    icon: FileText,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 5,
    title: 'Atualização de endereço',
    message: 'Família Costa mudou-se para Rua das Flores, 123.',
    time: 'Ontem, 14:20',
    read: true,
    priority: 'normal',
    icon: MapPin,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    id: 6,
    title: 'Reunião de equipe amanhã',
    message: 'Reunião semanal às 09:00 no Centro Comunitário.',
    time: '2 dias atrás',
    read: true,
    priority: 'normal',
    icon: Clock,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 7,
    title: 'Novo recurso disponível',
    message: 'Programa de alimentação escolar iniciado no Bairro Industrial.',
    time: '3 dias atrás',
    read: true,
    priority: 'normal',
    icon: Bell,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 8,
    title: 'Alerta: Área de risco elevada',
    message: 'Aumento de casos de desnutrição na Vila Esperança.',
    time: '4 dias atrás',
    read: false,
    priority: 'urgent',
    icon: AlertTriangle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  }
])

const filteredNotifications = computed(() => {
  if (filter.value === 'all') return notifications.value
  if (filter.value === 'unread') return notifications.value.filter(n => !n.read)
  if (filter.value === 'urgent') return notifications.value.filter(n => n.priority === 'urgent')
  return notifications.value
})

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}
</script>
