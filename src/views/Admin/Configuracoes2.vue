<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p class="text-gray-500 mt-1">Gerencie as preferências globais e configurações da plataforma</p>
      </div>
      <BaseButton variant="primary" @click="saveSettings">
        Salvar Alterações
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sidebar Tabs -->
      <div class="lg:col-span-1 space-y-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'w-full flex items-center gap-3 p-3 rounded-xl transition-colors font-medium',
            activeTab === tab.id 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Geral -->
        <div v-if="activeTab === 'general'" class="card space-y-6">
          <h3 class="text-lg font-semibold flex items-center gap-2">
            <Globe class="w-5 h-5 text-blue-600" />
            Configurações Gerais
          </h3>
          
          <div class="space-y-4">
            <BaseInput v-model="settings.appName" label="Nome da Aplicação" />
            <BaseInput v-model="settings.supportEmail" label="Email de Suporte" type="email" />
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Idioma Padrão</label>
              <select v-model="settings.language" class="input">
                <option value="pt">Português (Moçambique)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notificações -->
        <div v-if="activeTab === 'notifications'" class="card space-y-6">
          <h3 class="text-lg font-semibold flex items-center gap-2">
            <Bell class="w-5 h-5 text-orange-600" />
            Notificações e Alertas
          </h3>
          
          <div class="space-y-4">
            <div 
              v-for="pref in settings.notifications" 
              :key="pref.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900">{{ pref.label }}</p>
                <p class="text-xs text-gray-500">{{ pref.description }}</p>
              </div>
              <input type="checkbox" v-model="pref.enabled" class="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>

        <!-- Segurança -->
        <div v-if="activeTab === 'security'" class="card space-y-6">
          <h3 class="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-green-600" />
            Segurança
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">Autenticação de Dois Fatores (2FA)</p>
                <p class="text-xs text-gray-500">Exigir 2FA para todos os administradores</p>
              </div>
              <input type="checkbox" v-model="settings.require2FA" class="w-4 h-4 text-blue-600" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Expiração de Sessão (minutos)</label>
              <input type="number" v-model="settings.sessionTimeout" class="input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Globe, 
  Bell, 
  ShieldCheck, 
  Palette, 
  Mail, 
  Database 
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const activeTab = ref('general')

const tabs = [
  { id: 'general', label: 'Geral', icon: Globe },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'security', label: 'Segurança', icon: ShieldCheck },
  { id: 'email', label: 'E-mail (SMTP)', icon: Mail },
  { id: 'backup', label: 'Backup e Dados', icon: Database }
]

const settings = ref({
  appName: 'SACCO - Sistema Gestão',
  supportEmail: 'suporte@sacco.org.mz',
  language: 'pt',
  require2FA: false,
  sessionTimeout: 60,
  notifications: [
    { id: 1, label: 'Novos Cadastros', description: 'Notificar quando um novo registro de criança é criado', enabled: true },
    { id: 2, label: 'Interesses de Apadrinhamento', description: 'Alertar sobre novos padrinhos interessados', enabled: true },
    { id: 3, label: 'Emails de Boas-vindas', description: 'Enviar email automático para novos utilizadores', enabled: false }
  ]
})

const saveSettings = () => {
  toast.success('Configurações salvas com sucesso!')
}
</script>
