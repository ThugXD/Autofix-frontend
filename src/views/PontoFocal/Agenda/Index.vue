<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Agenda de Visitas</h1>
        <p class="text-gray-500 mt-1">Gerencie suas visitas domiciliares e acompanhamentos</p>
      </div>
      <BaseButton variant="primary" :icon="Plus">
        Nova Visita
      </BaseButton>
    </div>

    <!-- Calendar View -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Calendário de Visitas</h3>
        <div class="flex gap-2">
          <select v-model="currentMonth" class="input">
            <option value="11">Novembro 2026</option>
            <option value="12">Dezembro 2026</option>
          </select>
          <BaseButton variant="secondary" size="sm">
            Hoje
          </BaseButton>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-1 mb-4">
        <div v-for="day in ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']" :key="day"
             class="p-2 text-center text-sm font-medium text-gray-500">
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1">
        <div v-for="day in calendarDays" :key="day.date"
             class="min-h-[100px] p-2 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
             :class="{ 'bg-blue-50 border-blue-200': day.isToday, 'bg-gray-50': day.isCurrentMonth }">
          <div class="text-sm font-medium mb-1" :class="{ 'text-blue-600': day.isToday }">
            {{ day.day }}
          </div>
          <div class="space-y-1">
            <div v-for="visit in day.visits" :key="visit.id"
                 class="text-xs p-1 rounded bg-purple-100 text-purple-800 truncate">
              {{ visit.time }} - {{ visit.child }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Visits List -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Calendar class="w-5 h-5 text-purple-600" />
        Próximas Visitas
      </h3>

      <div class="space-y-3">
        <div v-for="visit in upcomingVisits" :key="visit.id"
             class="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <MapPin class="w-6 h-6 text-purple-600" />
          </div>

          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{{ visit.child }}</h4>
            <p class="text-sm text-gray-500">{{ visit.location }}</p>
            <p class="text-xs text-gray-400">{{ visit.purpose }}</p>
          </div>

          <div class="text-right">
            <p class="font-medium text-gray-900">{{ visit.date }}</p>
            <p class="text-sm text-gray-500">{{ visit.time }}</p>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="visit.statusClass">
              {{ visit.status }}
            </span>
          </div>

          <div class="flex gap-2">
            <BaseButton variant="secondary" size="sm">
              Editar
            </BaseButton>
            <BaseButton variant="primary" size="sm">
              Iniciar
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Calendar, MapPin, Plus } from 'lucide-vue-next'

const currentMonth = ref('11')

// Mock data for calendar
const calendarDays = computed(() => {
  const days = []
  const today = new Date()

  for (let i = 1; i <= 30; i++) {
    const date = new Date(2026, 10, i) // November 2026
    const isToday = date.toDateString() === today.toDateString()

    days.push({
      date: date,
      day: i,
      isCurrentMonth: true,
      isToday,
      visits: i % 3 === 0 ? [{
        id: i,
        time: '14:00',
        child: `Criança ${i}`
      }] : []
    })
  }

  return days
})

const upcomingVisits = ref([
  {
    id: 1,
    child: 'Maria Silva',
    location: 'Rua das Flores, 123 - Centro',
    purpose: 'Acompanhamento nutricional e escolar',
    date: 'Hoje, 15 Dez',
    time: '14:00 - 15:30',
    status: 'Agendada',
    statusClass: 'bg-green-100 text-green-800'
  },
  {
    id: 2,
    child: 'João Santos',
    location: 'Av. Central, 456 - Bairro Novo',
    purpose: 'Avaliação de vulnerabilidades',
    date: 'Amanhã, 16 Dez',
    time: '10:00 - 11:30',
    status: 'Confirmada',
    statusClass: 'bg-blue-100 text-blue-800'
  },
  {
    id: 3,
    child: 'Ana Costa',
    location: 'Travessa da Paz, 789 - Vila Esperança',
    purpose: 'Seguimento de apadrinhamento',
    date: 'Seg, 17 Dez',
    time: '15:30 - 17:00',
    status: 'Pendente',
    statusClass: 'bg-orange-100 text-orange-800'
  },
  {
    id: 4,
    child: 'Pedro Lima',
    location: 'Rua do Comércio, 321 - Centro Histórico',
    purpose: 'Visita inicial de identificação',
    date: 'Ter, 18 Dez',
    time: '09:00 - 10:30',
    status: 'Agendada',
    statusClass: 'bg-green-100 text-green-800'
  }
])
</script>
