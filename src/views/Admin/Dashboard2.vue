<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Painel de Administracao</h1>
        <p class="text-gray-500 mt-1">Gestao completa do sistema SACCO</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Users class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">156</p>
            <p class="text-sm text-gray-500">Utilizadores</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Baby class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">89</p>
            <p class="text-sm text-gray-500">Criancas Registadas</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <Heart class="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">67</p>
            <p class="text-sm text-gray-500">Apadinhamentos Activos</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Activity class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">1.2k</p>
            <p class="text-sm text-gray-500">Acoes no Sistema</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Administracao</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <router-link
          to="/app/admin/utilizadores"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <UserCog class="w-5 h-5 text-blue-600" />
          <span class="font-medium text-gray-700">Utilizadores</span>
        </router-link>
        
        <router-link
          to="/app/admin/configuracoes"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Settings class="w-5 h-5 text-gray-600" />
          <span class="font-medium text-gray-700">Configuracoes</span>
        </router-link>
        
        <router-link
          to="/app/admin/logs"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <FileText class="w-5 h-5 text-purple-600" />
          <span class="font-medium text-gray-700">Logs</span>
        </router-link>

        <router-link
          to="/"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <BookOpen class="w-5 h-5 text-green-600" />
          <span class="font-medium text-gray-700">Ver Catalogo</span>
        </router-link>
      </div>
    </div>

    <!-- Admin Notice -->
    <div class="card bg-gray-900 text-white">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield class="w-5 h-5" />
        </div>
        <div>
          <h3 class="font-semibold mb-1">Acesso Total</h3>
          <p class="text-gray-300 text-sm">
            Como Administrador, voce tem acesso a todas as areas do sistema. 
            Use o menu lateral para navegar entre os diferentes paineis de cada actor.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Users, Baby, Heart, Activity, UserCog, Settings, FileText, BookOpen, Shield } from 'lucide-vue-next'
</script>
