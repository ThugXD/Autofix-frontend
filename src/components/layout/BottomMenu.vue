<template>
  <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    <div class="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]">

      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        custom
        v-slot="{ navigate }"
      >
        <button
          @click="() => { navigate(); handleItemClick() }"
          class="relative flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200 group"
          :class="isActive(item.path)
            ? 'text-blue-400'
            : 'text-white hover:text-white/75 hover:bg-blue-500/20'"
        >
          <!-- active pill -->
          <span
            v-if="isActive(item.path)"
            class="absolute inset-0 rounded-xl bg-blue-600/25 border border-blue-400/20 shadow-[inset_0_1px_0_rgba(147,197,253,0.15)]"
          />

          <component
            :is="item.icon"
            class="relative z-10 w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110"
            :stroke-width="isActive(item.path) ? 2.3 : 1.5"
          />
          <span class="relative z-10 text-[10px] font-semibold tracking-wide leading-none">
            {{ item.label }}
          </span>
        </button>
      </router-link>

      <!-- Divider -->
      <span class="w-px h-8 mx-1.5 flex-shrink-0 bg-white/[0.08]" />

      <!-- User -->
      <button class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-white/40 hover:text-white/75 hover:bg-white/5 transition-all duration-200 group">
        <div class="relative">
          <div class="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <span class="text-[9px] font-extrabold text-white leading-none">{{ userInitials }}</span>
          </div>
          <span class="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-black/50" />
        </div>
        <span class="text-[10px] font-semibold tracking-wide leading-none">{{ shortName }}</span>
      </button>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LayoutDashboard, UserCog, Settings, Info } from 'lucide-vue-next'

const props = defineProps({ isOpen: { type: Boolean, default: true } })
const emit  = defineEmits(['toggle'])

const route     = useRoute()
const authStore = useAuthStore()
const user      = computed(() => authStore.user)

const userInitials = computed(() => {
  const name = user.value?.name || 'U'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
})

const shortName = computed(() => {
  const name = user.value?.name || 'Perfil'
  return name.split(' ')[0]
})

const menuItems = [
  { name: 'dashboard',    label: 'Dashboard',    path: '/',             icon: LayoutDashboard },
  { name: 'utilizadores', label: 'Utilizadores', path: '/utilizadores', icon: UserCog },
  { name: 'definicoes',   label: 'Definições',   path: '/definicoes',   icon: Settings },
  { name: 'info',         label: 'Info',         path: '/info',         icon: Info },
]

const isActive = (path) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path)

const handleItemClick = () => {
  if (window.innerWidth < 768) emit('toggle')
}
</script>
