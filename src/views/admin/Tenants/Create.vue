<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <router-link 
        to="/admin/tenants"
        class="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
      >
        <ArrowLeft class="w-6 h-6" />
      </router-link>
      <h1 class="text-2xl font-bold text-gray-800">Nova Oficina</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Dados da Oficina -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building class="w-5 h-5 text-blue-600" />
          Dados da Empresa
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Nome da Oficina *</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Ex: Auto Mecânica Silva"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Slug (URL) *</label>
            <input 
              v-model="form.slug"
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
              placeholder="auto-mecanica-silva"
            />
            <p class="text-xs text-gray-500">Identificador único para URL do sistema.</p>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Email Comercial *</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="contato@empresa.com"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Telefone</label>
            <input 
              v-model="form.phone"
              type="tel" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="(+258) 84 123 4567"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">NUIT</label>
            <input 
              v-model="form.nuit"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="123456789"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Endereço</label>
            <input 
              v-model="form.address"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Av. 24 de Julho..."
            />
          </div>
        </div>
      </div>

      <!-- Dados do Administrador Inicial -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserPlus class="w-5 h-5 text-green-600" />
          Administrador Inicial
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Nome Completo *</label>
            <input 
              v-model="form.adminName"
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Nome do responsável"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Email de Login *</label>
            <input 
              v-model="form.adminEmail"
              type="email" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="admin@empresa.com"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Senha Inicial *</label>
            <input 
              v-model="form.adminPassword"
              type="password" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="********"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <router-link 
          to="/admin/tenants"
          class="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </router-link>
        <button 
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          {{ loading ? 'Criando...' : 'Criar Oficina' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Building, UserPlus } from 'lucide-vue-next'
import adminService from '@/services/adminService'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const loading = ref(false)

const form = ref({
  name: '',
  slug: '',
  email: '',
  phone: '',
  nuit: '',
  address: '',
  city: 'Maputo', // Default
  state: 'Maputo', // Default
  adminName: '',
  adminEmail: '',
  adminPassword: ''
})

// Auto-generate slug from name
watch(() => form.value.name, (newName) => {
  if (newName) {
    form.value.slug = newName
      .toLowerCase()
      .normalize('NFD') // remove accents
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-') // replace non-alphanumeric with dash
      .replace(/-+/g, '-') // remove duplicate dashes
      .replace(/^-|-$/g, '') // remove leading/trailing dashes
  }
})

const handleSubmit = async () => {
  try {
    loading.value = true
    await adminService.createTenant(form.value)
    toast.success('Oficina criada com sucesso!')
    router.push('/admin/tenants')
  } catch (error) {
    console.error('Erro ao criar oficina:', error)
    const msg = error.response?.data?.message || 'Erro ao criar oficina'
    toast.error(msg)
  } finally {
    loading.value = false
  }
}
</script>
