<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Público -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <RouterLink to="/catalogo" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="font-bold text-xl text-gray-900">SACCO</span>
          </RouterLink>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-8">
            <RouterLink
              to="/catalogo"
              class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Catálogo
            </RouterLink>
            <a
              href="#como-funciona"
              class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Como Funciona
            </a>
          </nav>

          <!-- Auth Buttons -->
          <div class="flex items-center gap-3">
            <RouterLink
              to="/login"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/register"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Registar
            </RouterLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-white font-bold mb-4">SACCO</h3>
            <p class="text-sm">Sistema de Apoio às Crianças Carenciadas da Comunidade</p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Links</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Termos</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Contacto</h4>
            <p class="text-sm">Email: info@sacco.org</p>
            <p class="text-sm">Telefone: +258 21 xxx xxxx</p>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 SACCO. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
