<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Meu Padrinhado</h1>
        <p class="text-gray-500 mt-1">Acompanhe suas criancas apadrinhadas</p>
      </div>
      <router-link to="/">
        <BaseButton variant="secondary">
          <BookOpen class="w-4 h-4 mr-2" />
          Ver Catalogo
        </BaseButton>
      </router-link>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <Heart class="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">2</p>
            <p class="text-sm text-gray-500">Criancas Apadrinhadas</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <MessageCircle class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">3</p>
            <p class="text-sm text-gray-500">Mensagens Novas</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <TrendingUp class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">5</p>
            <p class="text-sm text-gray-500">Actualizacoes</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Acoes Rapidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link
          to="/"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <BookOpen class="w-5 h-5 text-blue-600" />
          <span class="font-medium text-gray-700">Explorar Catalogo</span>
        </router-link>
        
        <router-link
          to="/app/padrinho/mensagens"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <MessageCircle class="w-5 h-5 text-pink-600" />
          <span class="font-medium text-gray-700">Mensagens</span>
        </router-link>
      </div>
    </div>

    <!-- Placeholder content -->
    <div class="card bg-pink-50 border-pink-200">
      <p class="text-pink-700 text-sm">
        <strong>Painel do Padrinho:</strong> Este e o dashboard do Padrinho. 
        As funcionalidades completas serao implementadas no Modulo 2.
      </p>
    </div>
  </div>
</template>

<script setup>
import { Heart, MessageCircle, TrendingUp, BookOpen } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
</script>
