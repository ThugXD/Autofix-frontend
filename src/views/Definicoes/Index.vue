`<template>
  <div>
    <!-- SETUP ALERT -->
    <div
      v-if="needsSetup"
      class="mb-6 p-4 border-xl rounded-lg border-l-4 border-yellow-300 bg-yellow-50"
    >
      <div class="flex items-start gap-3">
        <AlertTriangle class="w-6 h-6 text-yellow-600 mt-0.5" />
        <div>
          <h4 class="font-semibold text-yellow-800">
            Complete o registo da sua oficina
          </h4>
          <p class="text-sm text-yellow-700">
            Para começar a usar o sistema, termine a configuração inicial.
            Algumas funcionalidades estão bloqueadas até concluir este passo.
          </p>
        </div>
      </div>
    </div>

    <div class="card mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Definições</h2>
      <p class="text-gray-600">Configure as preferências da sua oficina</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Menu Lateral -->
      <div class="lg:col-span-1">
        <div class="card space-y-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :disabled="needsSetup && tab.id !== 'oficina'"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
              needsSetup && tab.id !== 'oficina' 
                ? 'opacity-50 cursor-not-allowed' 
                : ''   
            ]"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            <span class="font-medium">{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="lg:col-span-2">
        <!-- Perfil da Oficina -->
        <div v-if="activeTab === 'oficina'" class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Perfil da Oficina</h3>
          <div class="space-y-4">
            <BaseInput
              v-model="settings.oficina.name"
              label="Nome da Oficina"
              placeholder="Ex: AutoFix Maputo"
            />
            <div class="grid grid-cols-2 gap-4">
              <BaseInput
                v-model="settings.oficina.email"
                label="Email"
                type="email"
                placeholder="contato@oficina.com"
              />
              <BaseInput
                v-model="settings.oficina.phone"
                label="Telefone"
                placeholder="840000000"
              />
            </div>
            <BaseInput
              v-model="settings.oficina.address"
              label="Endereço"
              placeholder="Av. Principal, 123"
            />
            <div class="grid grid-cols-2 gap-4">
              <BaseInput
                v-model="settings.oficina.city"
                label="Cidade"
                placeholder="Maputo"
              />
              <BaseInput
                v-model="settings.oficina.nuit"
                label="NUIT"
                placeholder="000000000"
              />
            </div>
            <div class="pt-6 flex gap-3">
              <!-- BOTÃO FINALIZAR SETUP -->
              <BaseButton
                v-if="needsSetup"
                variant="primary"
                @click="completeSetup"
              >
                Finalizar Configuração
              </BaseButton>

              <!-- Botão Salvar Alterações -->
              <BaseButton 
                v-if="!needsSetup" 
                variant="primary" 
                @click="saveSettings"
              >
                Salvar Alterações
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- Horário de Funcionamento -->
        <div v-if="activeTab === 'horario'" class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Horário de Funcionamento</h3>
          <div class="space-y-4">
            <div v-for="day in weekDays" :key="day.id" class="flex items-center gap-4">
              <div class="w-32">
                <input
                  type="checkbox"
                  :id="`day-${day.id}`"
                  v-model="settings.horario[day.id].active"
                  class="w-4 h-4 text-blue-600 rounded mr-2"
                />
                <label :for="`day-${day.id}`" class="font-medium text-gray-700">
                  {{ day.label }}
                </label>
              </div>
              <div v-if="settings.horario[day.id].active" class="flex items-center gap-2 flex-1">
                <input
                  type="time"
                  v-model="settings.horario[day.id].start"
                  class="input w-32"
                />
                <span class="text-gray-500">até</span>
                <input
                  type="time"
                  v-model="settings.horario[day.id].end"
                  class="input w-32"
                />
              </div>
              <span v-else class="text-gray-400 text-sm">Fechado</span>
            </div>
            <div class="pt-4">
              <BaseButton variant="primary" @click="saveSettings">
                Salvar Horários
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- Notificações -->
        <div v-if="activeTab === 'notificacoes'" class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Notificações</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">Email de novas ordens</p>
                <p class="text-sm text-gray-600">Receber email quando uma nova ordem for criada</p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notificacoes.emailNovasOrdens"
                class="w-5 h-5 text-blue-600 rounded"
              />
            </div>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">Email de conclusão</p>
                <p class="text-sm text-gray-600">Notificar cliente quando ordem for concluída</p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notificacoes.emailConclusao"
                class="w-5 h-5 text-blue-600 rounded"
              />
            </div>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">Alerta de estoque baixo</p>
                <p class="text-sm text-gray-600">Notificar quando peças estiverem com estoque baixo</p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notificacoes.alertaEstoque"
                class="w-5 h-5 text-blue-600 rounded"
              />
            </div>
            <div class="pt-4">
              <BaseButton variant="primary" @click="saveSettings">
                Salvar Preferências
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- Segurança -->
        <div v-if="activeTab === 'seguranca'" class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Segurança</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Alterar Senha</h4>
              <div class="space-y-3">
                <BaseInput
                  v-model="passwordForm.current"
                  label="Senha Atual"
                  type="password"
                  placeholder="••••••••"
                />
                <BaseInput
                  v-model="passwordForm.new"
                  label="Nova Senha"
                  type="password"
                  placeholder="••••••••"
                />
                <BaseInput
                  v-model="passwordForm.confirm"
                  label="Confirmar Nova Senha"
                  type="password"
                  placeholder="••••••••"
                />
                <BaseButton variant="primary" @click="changePassword">
                  Alterar Senha
                </BaseButton>
              </div>
            </div>

            <div class="border-t pt-6">
              <h4 class="font-medium text-gray-900 mb-3">Autenticação de Dois Fatores</h4>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">2FA</p>
                  <p class="text-sm text-gray-600">Adicionar camada extra de segurança</p>
                </div>
                <span class="badge badge-warning">Em Breve</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sistema -->
        <div v-if="activeTab === 'sistema'" class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Sistema</h3>
          <div class="space-y-4">
            <div class="p-4 bg-gray-50 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Versão do Sistema</span>
                <span class="font-semibold text-gray-900">1.0.0</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Última Atualização</span>
                <span class="font-semibold text-gray-900">09/01/2026</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Plano Atual</span>
                <span class="badge badge-success">Premium</span>
              </div>
            </div>

            <div class="border-t pt-4">
              <h4 class="font-medium text-gray-900 mb-3">Backup de Dados</h4>
              <p class="text-sm text-gray-600 mb-3">Faça backup dos seus dados regularmente</p>
              <BaseButton variant="secondary" :icon="Download">
                Exportar Dados
              </BaseButton>
            </div>

            <div class="border-t pt-4">
              <h4 class="font-medium text-gray-900 mb-3 text-red-600">Zona de Perigo</h4>
              <p class="text-sm text-gray-600 mb-3">Ações irreversíveis</p>
              <BaseButton variant="danger">
                Desativar Conta
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useToast } from 'vue-toastification'
  import router from '@/router'
  import { useAuthStore } from '@/stores/auth'

  import {
    Building2,
    Clock,
    Bell,
    Shield,
    Settings,
    Download,
    AlertTriangle
  } from 'lucide-vue-next'

  import BaseInput from '@/components/common/BaseInput.vue'
  import BaseButton from '@/components/common/BaseButton.vue'

  const authStore = useAuthStore()
  const toast = useToast()

  // Ativa a aba inicial
  const activeTab = ref('oficina')

  // Tabs do menu lateral
  const tabs = computed(() => [
    { id: 'oficina', label: 'Oficina', icon: Building2, required: true },
    { id: 'horario', label: 'Horário', icon: Clock },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'sistema', label: 'Sistema', icon: Settings }
  ])

  // Computed para verificar se o tenant ainda precisa completar setup
  const needsSetup = computed(() => authStore.user?.tenant?.setupCompleted === false)

  // Dias da semana
  const weekDays = [
    { id: 'monday', label: 'Segunda-feira' },
    { id: 'tuesday', label: 'Terça-feira' },
    { id: 'wednesday', label: 'Quarta-feira' },
    { id: 'thursday', label: 'Quinta-feira' },
    { id: 'friday', label: 'Sexta-feira' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' }
  ]

  // Settings do tenant
  const settings = ref({
    oficina: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      nuit: ''
    },
    horario: {},
    notificacoes: {}
  })

  // Formulário de senha
  const passwordForm = ref({
    current: '',
    new: '',
    confirm: ''
  })

  // Carrega dados do tenant quando o componente monta
  onMounted(() => {
    const tenant = authStore.user?.tenant
    if (tenant) {
      settings.value.oficina = {
        name: tenant.name || '',
        email: tenant.email || '',
        phone: tenant.phone || '',
        address: tenant.address || '',
        city: tenant.city || '',
        nuit: tenant.nuit || ''
      }

      // Horário e notificações podem estar dentro do JSON `settings` do tenant
      settings.value.horario = tenant.settings?.businessHours || {
        monday: { active: true, start: '08:00', end: '18:00' },
        tuesday: { active: true, start: '08:00', end: '18:00' },
        wednesday: { active: true, start: '08:00', end: '18:00' },
        thursday: { active: true, start: '08:00', end: '18:00' },
        friday: { active: true, start: '08:00', end: '18:00' },
        saturday: { active: true, start: '08:00', end: '13:00' },
        sunday: { active: false, start: '', end: '' }
      }

      settings.value.notificacoes = tenant.settings?.notifications || {
        emailNovasOrdens: true,
        emailConclusao: true,
        alertaEstoque: true
      }
    }
  })

  // Função para completar setup
  const completeSetup = async () => {
    try {
      await authStore.completeSetup({
        name: settings.value.oficina.name,
        email: settings.value.oficina.email,
        phone: settings.value.oficina.phone,
        address: settings.value.oficina.address,
        city: settings.value.oficina.city,
        nuit: settings.value.oficina.nuit,
        businessHours: settings.value.horario,
        notifications: settings.value.notificacoes
      })

      toast.success('Configuração concluída com sucesso!')
      router.push('/')
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Erro ao completar configuração'
      )
    }
  }

  // Função para salvar alterações (update de configurações)
  const saveSettings = async () => {
    try {
      await authStore.updateTenantSettings({
        businessHours: settings.value.horario,
        notifications: settings.value.notificacoes
      })
      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Erro ao salvar configurações'
      )
    }
  }

  // Função para alterar senha
  const changePassword = async () => {
    if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
      toast.error('Preencha todos os campos')
      return
    }
    if (passwordForm.value.new !== passwordForm.value.confirm) {
      toast.error('As senhas não coincidem')
      return
    }

    try {
      await authStore.changePassword({
        current: passwordForm.value.current,
        newPassword: passwordForm.value.new
      })
      toast.success('Senha alterada com sucesso!')
      passwordForm.value = { current: '', new: '', confirm: '' }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Erro ao alterar senha'
      )
    }
  }
</script>
