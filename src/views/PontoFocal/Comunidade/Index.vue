<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Comunidade</h1>
        <p class="text-gray-500 mt-1">Gerencie informações e recursos da sua comunidade</p>
      </div>
      <BaseButton variant="primary" :icon="Plus">
        Novo Recurso
      </BaseButton>
    </div>

    <!-- Community Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Famílias Cadastradas</p>
            <p class="text-2xl font-bold text-gray-900">156</p>
            <p class="text-sm text-green-600 mt-1">+8 este mês</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Home class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Crianças Identificadas</p>
            <p class="text-2xl font-bold text-gray-900">89</p>
            <p class="text-sm text-blue-600 mt-1">+12 novas</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Users class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Recursos Disponíveis</p>
            <p class="text-2xl font-bold text-gray-900">23</p>
            <p class="text-sm text-orange-600 mt-1">5 em manutenção</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
            <Package class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Áreas de Risco</p>
            <p class="text-2xl font-bold text-gray-900">7</p>
            <p class="text-sm text-red-600 mt-1">2 críticas</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertTriangle class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Community Map -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin class="w-5 h-5 text-green-600" />
        Mapa da Comunidade
      </h3>

      <div class="h-[400px]">
        <CommunityMap 
          :resources="communityResources" 
          :risks="riskAreas"
        />
      </div>
    </div>

    <!-- Community Resources -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Package class="w-5 h-5 text-blue-600" />
        Recursos da Comunidade
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="resource in communityResources" :key="resource.id"
             class="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <component :is="resource.icon" class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 class="font-medium text-gray-900">{{ resource.name }}</h4>
              <p class="text-sm text-gray-500">{{ resource.type }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">{{ resource.location }}</span>
            <span class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="resource.statusClass">
              {{ resource.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Risk Areas -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <AlertTriangle class="w-5 h-5 text-red-600" />
        Áreas de Risco Identificadas
      </h3>

      <div class="space-y-3">
        <div v-for="area in riskAreas" :key="area.id"
             class="flex items-center gap-4 p-4 border border-red-100 bg-red-50 rounded-lg">
          <div class="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle class="w-6 h-6 text-red-600" />
          </div>

          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{{ area.name }}</h4>
            <p class="text-sm text-gray-600">{{ area.description }}</p>
            <p class="text-xs text-gray-500">{{ area.families }} famílias afetadas</p>
          </div>

          <div class="text-right">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="area.priorityClass">
              {{ area.priority }}
            </span>
          </div>

          <div class="flex gap-2">
            <BaseButton variant="secondary" size="sm">
              Ver Detalhes
            </BaseButton>
            <BaseButton variant="primary" size="sm">
              Intervir
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Home, Users, Package, AlertTriangle, MapPin, School, Heart, Utensils } from 'lucide-vue-next'
import CommunityMap from '@/components/common/CommunityMap.vue'

const communityResources = ref([
  {
    id: 1,
    name: 'Escola Municipal',
    type: 'Educação',
    location: 'Centro',
    status: 'Ativo',
    statusClass: 'bg-green-100 text-green-800',
    icon: School
  },
  {
    id: 2,
    name: 'Centro de Saúde',
    type: 'Saúde',
    location: 'Bairro Novo',
    status: 'Ativo',
    statusClass: 'bg-green-100 text-green-800',
    icon: Heart
  },
  {
    id: 3,
    name: 'Banco de Alimentos',
    type: 'Alimentação',
    location: 'Centro',
    status: 'Em Manutenção',
    statusClass: 'bg-orange-100 text-orange-800',
    icon: Utensils
  },
  {
    id: 4,
    name: 'Centro Comunitário',
    type: 'Recreação',
    location: 'Vila Esperança',
    status: 'Ativo',
    statusClass: 'bg-green-100 text-green-800',
    icon: Home
  },
  {
    id: 5,
    name: 'Programa de Apadrinhamento',
    type: 'Social',
    location: 'Regional',
    status: 'Ativo',
    statusClass: 'bg-green-100 text-green-800',
    icon: Users
  },
  {
    id: 6,
    name: 'Transporte Escolar',
    type: 'Mobilidade',
    location: 'Centro',
    status: 'Inativo',
    statusClass: 'bg-red-100 text-red-800',
    icon: Package
  }
])

const riskAreas = ref([
  {
    id: 1,
    name: 'Favela do Morro',
    description: 'Alta incidência de violência doméstica e abandono infantil',
    families: 23,
    priority: 'Crítica',
    priorityClass: 'bg-red-100 text-red-800'
  },
  {
    id: 2,
    name: 'Bairro Industrial',
    description: 'Contaminação ambiental e falta de saneamento básico',
    families: 18,
    priority: 'Alta',
    priorityClass: 'bg-orange-100 text-orange-800'
  },
  {
    id: 3,
    name: 'Zona Rural Distante',
    description: 'Dificuldade de acesso a serviços essenciais',
    families: 12,
    priority: 'Média',
    priorityClass: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 4,
    name: 'Centro Urbano Decadente',
    description: 'Concentração de moradores de rua e dependentes químicos',
    families: 15,
    priority: 'Alta',
    priorityClass: 'bg-orange-100 text-orange-800'
  }
])
</script>
