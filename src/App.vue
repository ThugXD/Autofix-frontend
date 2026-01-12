<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Verificar se há sessão ativa
  authStore.checkAuth()
})
</script>

<style>
#app {
  min-height: 100vh;
}
</style>