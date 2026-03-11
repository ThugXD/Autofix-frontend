<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <!-- Sidebar Menu -->
    <Sidebar
      v-if="menuType === 'sidebar'"
      :isOpen="sidebarOpen"
      @toggle="toggleSidebar"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header
        @toggleSidebar="toggleSidebar"
      />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6" :class="menuType === 'bottom' ? 'pb-32' : ''">
        <div class="max-w-7xl mx-auto">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>
      </main>
    </div>

    <!-- Bottom Menu -->
    <BottomMenu
      v-if="menuType === 'bottom'"
      :isOpen="bottomMenuOpen"
      @toggle="toggleBottomMenu"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/layout/Sidebar.vue'
import BottomMenu from '@/components/layout/BottomMenu.vue'
import Header from '@/components/layout/Header.vue'

const authStore = useAuthStore()

const sidebarOpen = ref(true)
const bottomMenuOpen = ref(false)

const menuType = computed(() => {
  return authStore.settings?.menu?.type || 'sidebar'
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleBottomMenu = () => {
  bottomMenuOpen.value = !bottomMenuOpen.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
