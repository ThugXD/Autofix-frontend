<template>
  <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    <div class="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl bg-[#050505]/90 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">

      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        custom
        v-slot="{ navigate }"
      >
        <button
          @click="() => { navigate(); handleItemClick() }"
          class="relative flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-xl transition-all duration-300 group"
          :class="isActive(item.path)
            ? 'text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/5'"
        >
          <!-- active pill -->
          <span
            v-if="isActive(item.path)"
            class="absolute inset-x-2 bottom-1.5 h-1 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />

          <component
            :is="getIcon(item.icon)"
            class="relative z-10 w-5 h-5 transition-all duration-300"
            :class="isActive(item.path) ? 'scale-110 text-blue-400' : 'group-hover:scale-110'"
            :stroke-width="isActive(item.path) ? 2.5 : 2"
          />
          <span class="relative z-10 text-[9px] font-bold tracking-wider uppercase leading-none opacity-80">
            {{ item.label }}
          </span>
        </button>
      </router-link>

      <!-- Divider -->
      <span class="w-px h-10 mx-2 flex-shrink-0 bg-white/10" />

      <!-- User -->
      <button class="flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 group">
        <div class="relative">
          <div class="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ring-2 ring-white/10">
            <span class="text-[9px] font-black text-white leading-none">{{ userInitials }}</span>
          </div>
          <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[#050505] shadow-sm" />
        </div>
        <span class="text-[9px] font-bold tracking-wider uppercase leading-none opacity-80">{{ shortName }}</span>
      </button>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ROLES, MENU_BY_ROLE } from '@/config/roles'
import { 
  LayoutDashboard, 
  UserCog, 
  Settings, 
  Info,
  ClipboardList,
  FileCheck,
  Heart,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  Baby,
  BookOpen,
  MessageCircle,
  Shield,
  Calendar,
  MapPin,
  Bell,
  MessageSquarePlus
} from 'lucide-vue-next'

const props = defineProps({ isOpen: { type: Boolean, default: true } })
const emit  = defineEmits(['toggle'])

const route     = useRoute()
const authStore = useAuthStore()
const user      = computed(() => authStore.user)
const userRole  = computed(() => authStore.userRole)

const userInitials = computed(() => {
  const name = user.value?.name || 'U'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
})

const shortName = computed(() => {
  const name = user.value?.name || 'Perfil'
  return name.split(' ')[0]
})

const icons = {
  LayoutDashboard, UserCog, Settings, Info,
  ClipboardList, FileCheck, Heart, Users,
  BarChart3, MessageSquare, FileText, Baby,
  BookOpen, MessageCircle, Shield, Calendar,
  MapPin, Bell, MessageSquarePlus
}

const getIcon = (iconName) => icons[iconName] || LayoutDashboard

const menuItems = computed(() => {
  const roleMenu = MENU_BY_ROLE[userRole.value]
  if (!roleMenu) return []
  
  // No menu inferior, mostramos apenas os itens principais (limitado a 4 para não sobrecarregar)
  return roleMenu.main.slice(0, 4)
})

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  if (route.path === path) return true
  if (route.path.startsWith(path + '/')) {
    const allPaths = menuItems.value.map(i => i.path)
    return !allPaths.some(p => p !== path && (route.path === p || route.path.startsWith(p + '/')) && p.length > path.length)
  }
  return false
}

const handleItemClick = () => {
  if (window.innerWidth < 768) emit('toggle')
}
</script>
