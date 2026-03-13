<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard do Gestor</h1>
        <p class="text-gray-500 mt-1">Gerencie apadinhamentos e revisoes</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-if="loading" v-for="i in 4" :key="i" class="card animate-pulse">
        <div class="h-12 w-full bg-gray-100 rounded-xl"></div>
      </div>
      
      <template v-else>
        <div class="card">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <FileCheck class="w-6 h-6" />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ pfStore.cadastrosAguardandoRevisao.length }}</p>
              <p class="text-sm text-gray-500">Revisoes N2 Pendentes</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
              <Heart class="w-6 h-6" />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ 0 }}</p>
              <p class="text-sm text-gray-500">Interesses Pendentes</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <Users class="w-6 h-6" />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ 45 }}</p>
              <p class="text-sm text-gray-500">Padrinhos Activos</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <Baby class="w-6 h-6" />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ pfStore.cadastrosPublicados.length }}</p>
              <p class="text-sm text-gray-500">Criancas no Catalogo</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Acoes Rapidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/app/gestor/revisao"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative group"
        >
          <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <FileCheck class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span class="font-bold text-gray-700 block">Revisao Nivel 2</span>
            <span class="text-xs text-gray-500" v-if="pfStore.cadastrosAguardandoRevisao.length > 0">
              {{ pfStore.cadastrosAguardandoRevisao.length }} pendentes
            </span>
          </div>
          <div v-if="pfStore.cadastrosAguardandoRevisao.length > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
            {{ pfStore.cadastrosAguardandoRevisao.length }}
          </div>
        </router-link>
        
        <router-link
          to="/app/gestor/apadinhamentos"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
        >
          <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Heart class="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <span class="font-bold text-gray-700 block">Aprovar Apadinhamentos</span>
            <span class="text-xs text-gray-500">Gestao de interesses</span>
          </div>
        </router-link>
        
        <router-link
          to="/app/gestor/relatorios"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
        >
          <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <BarChart3 class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <span class="font-bold text-gray-700 block">Ver Relatorios</span>
            <span class="text-xs text-gray-500">Analise de impacto</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Active Review Alert -->
    <div v-if="pfStore.cadastrosAguardandoRevisao.length > 0" class="card bg-amber-50 border-amber-200">
      <div class="flex items-start gap-3">
        <ShieldAlert class="w-5 h-5 text-amber-600 mt-0.5" />
        <div>
          <h3 class="font-bold text-amber-900">Atenção: Revisões Pendentes</h3>
          <p class="text-amber-700 text-sm mt-1">
            Existem {{ pfStore.cadastrosAguardandoRevisao.length }} crianças cujas fichas técnicas foram concluídas pelos especialistas e aguardam a sua revisão final para publicação.
          </p>
          <router-link to="/app/gestor/revisao" class="text-amber-900 text-sm font-bold underline mt-2 block">
            Ir para Revisão N2
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { FileCheck, Heart, Users, Baby, BarChart3, ShieldAlert } from 'lucide-vue-next'
import { usePontoFocalStore } from '@/stores/pontoFocal'

const pfStore = usePontoFocalStore()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await pfStore.fetchCadastros()
  loading.value = false
})
</script>
