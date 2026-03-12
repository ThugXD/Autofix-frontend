<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard do Tutor</h1>
        <p class="text-gray-500 mt-1">Gerencie suas criancas e padrinhos</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Baby class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">3</p>
            <p class="text-sm text-gray-500">Minhas Criancas</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <UserPlus class="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">2</p>
            <p class="text-sm text-gray-500">Padrinhos Interessados</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Users class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">5</p>
            <p class="text-sm text-gray-500">Padrinhos Activos</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <MessageCircle class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">4</p>
            <p class="text-sm text-gray-500">Mensagens Novas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Acoes Rapidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/app/tutor/interessados"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <UserPlus class="w-5 h-5 text-pink-600" />
          <span class="font-medium text-gray-700">Ver Interessados</span>
        </router-link>
        
        <router-link
          to="/app/tutor/progresso"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <TrendingUp class="w-5 h-5 text-green-600" />
          <span class="font-medium text-gray-700">Postar Progresso</span>
        </router-link>
        
        <router-link
          to="/app/tutor/mensagens"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <MessageCircle class="w-5 h-5 text-blue-600" />
          <span class="font-medium text-gray-700">Mensagens</span>
        </router-link>
      </div>
    </div>

    <!-- Placeholder content -->
    <div class="card bg-orange-50 border-orange-200">
      <p class="text-orange-700 text-sm">
        <strong>Painel do Tutor:</strong> Este e o dashboard do Tutor. 
        As funcionalidades completas serao implementadas no Modulo 2.
      </p>
    </div>
  </div>
</template>

<script setup>
import { Baby, UserPlus, Users, MessageCircle, TrendingUp } from 'lucide-vue-next'
</script>
