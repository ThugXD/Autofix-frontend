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
      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <FileCheck class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">12</p>
            <p class="text-sm text-gray-500">Revisoes Pendentes</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <Heart class="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">8</p>
            <p class="text-sm text-gray-500">Apadinhamentos Pendentes</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Users class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">45</p>
            <p class="text-sm text-gray-500">Padrinhos Activos</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Baby class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">67</p>
            <p class="text-sm text-gray-500">Criancas no Catalogo</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Acoes Rapidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/app/gestor/revisao"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <FileCheck class="w-5 h-5 text-blue-600" />
          <span class="font-medium text-gray-700">Revisao Nivel 2</span>
        </router-link>
        
        <router-link
          to="/app/gestor/apadinhamentos"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Heart class="w-5 h-5 text-pink-600" />
          <span class="font-medium text-gray-700">Aprovar Apadinhamentos</span>
        </router-link>
        
        <router-link
          to="/app/gestor/relatorios"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <BarChart3 class="w-5 h-5 text-green-600" />
          <span class="font-medium text-gray-700">Ver Relatorios</span>
        </router-link>
      </div>
    </div>

    <!-- Placeholder content -->
    <div class="card bg-blue-50 border-blue-200">
      <p class="text-blue-700 text-sm">
        <strong>Painel do Gestor:</strong> Este e o dashboard do Gestor da Associacao. 
        As funcionalidades completas serao implementadas no Modulo 2.
      </p>
    </div>
  </div>
</template>

<script setup>
import { FileCheck, Heart, Users, Baby, BarChart3 } from 'lucide-vue-next'
</script>
