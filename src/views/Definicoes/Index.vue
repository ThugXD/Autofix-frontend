<template>
  <div>
    <div class="card mb-6">
      <h2 class="page-title">Definições</h2>
      <p class="page-subtitle">Configure as preferências da sua Comunidade</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Menu Lateral -->
      <div class="lg:col-span-1">
        <div class="card space-y-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            <span class="font-medium">{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="lg:col-span-2">
        <!-- Perfil da Comunidade -->
        <div v-if="activeTab === 'comunidade'" class="card">
          <h3 class="section-title">Perfil da Comunidade</h3>
          <div class="space-y-4">
            <BaseInput
              v-model="settings.oficina.name"
              label="Nome da Comunidade"
              placeholder="Ex: SACCO Maputo"
            />
            <div class="grid grid-cols-2 gap-4">
              <BaseInput
                v-model="settings.oficina.email"
                label="Email"
                type="email"
                placeholder="contato@comunidade.com"
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
            <div class="pt-4">
              <BaseButton variant="primary" @click="saveSettings">
                Salvar Alterações
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- Horário de Funcionamento -->
        <div v-if="activeTab === 'horario'" class="card">
          <h3 class="section-title">Horário de Funcionamento</h3>
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
          <h3 class="section-title">Notificações</h3>
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
          <h3 class="section-title">Segurança</h3>
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
          <h3 class="section-title">Sistema</h3>
          <div class="space-y-6">
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
              <h4 class="font-medium text-gray-900 mb-3">Navegação</h4>
              <p class="text-sm text-gray-600 mb-4">
                Escolha como pretende navegar na aplicação. A alteração é aplicada imediatamente.
              </p>
              <div class="flex flex-col gap-3">
                <label class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-400">
                  <div>
                    <p class="font-medium text-gray-900">Barra Lateral</p>
                    <p class="text-sm text-gray-600">Navegação tradicional com menu à esquerda.</p>
                  </div>
                  <input
                    type="radio"
                    value="sidebar"
                    v-model="menuType"
                    class="w-4 h-4 text-blue-600"
                  />
                </label>

                <label class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-400">
                  <div>
                    <p class="font-medium text-gray-900">Menu Inferior</p>
                    <p class="text-sm text-gray-600">Menu compacto fixo na parte inferior.</p>
                  </div>
                  <input
                    type="radio"
                    value="bottom"
                    v-model="menuType"
                    class="w-4 h-4 text-blue-600"
                  />
                </label>
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
              <p class="text-sm text-gray-600 mb-3">AÇÕES IRREVERSÍVEIS</p>
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
    import { ref, computed } from 'vue'
    import {
    Building2,
    Clock,
    Bell,
    Shield,
    Settings,
    Download
    } from 'lucide-vue-next'
    import BaseInput from '@/components/common/BaseInput.vue'
    import BaseButton from '@/components/common/BaseButton.vue'
    import { useToast } from 'vue-toastification'
    import { useAuthStore } from '@/stores/auth'

    const toast = useToast()
    const authStore = useAuthStore()

    const activeTab = ref('comunidade')

    const tabs = [
    { id: 'comunidade', label: 'Comunidade', icon: Building2 },
    { id: 'horario', label: 'Horário', icon: Clock },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'sistema', label: 'Sistema', icon: Settings }
    ]

    const weekDays = [
    { id: 'monday', label: 'Segunda-feira' },
    { id: 'tuesday', label: 'Terça-feira' },
    { id: 'wednesday', label: 'Quarta-feira' },
    { id: 'thursday', label: 'Quinta-feira' },
    { id: 'friday', label: 'Sexta-feira' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' }
    ]

    const settings = ref({
    oficina: {
        name: 'SACCO Maputo',
        email: 'contato@SACCO.com',
        phone: '841234567',
        address: 'Av. Julius Nyerere, 1234',
        city: 'Maputo',
        nuit: '123456789'
    },
    horario: {
        monday: { active: true, start: '08:00', end: '18:00' },
        tuesday: { active: true, start: '08:00', end: '18:00' },
        wednesday: { active: true, start: '08:00', end: '18:00' },
        thursday: { active: true, start: '08:00', end: '18:00' },
        friday: { active: true, start: '08:00', end: '18:00' },
        saturday: { active: true, start: '08:00', end: '13:00' },
        sunday: { active: false, start: '', end: '' }
    },
    notificacoes: {
        emailNovasOrdens: true,
        emailConclusao: true,
        alertaEstoque: true
    }
    })

    const passwordForm = ref({
    current: '',
    new: '',
    confirm: ''
    })

    const menuType = computed({
    get() {
        return authStore.settings?.menu?.type || 'sidebar'
    },
    set(value) {
        authStore.setMenuType(value)
    }
    })

    const saveSettings = () => {
    toast.success('Configurações salvas com sucesso!')
    }

    const changePassword = () => {
    if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
        toast.error('Preencha todos os campos')
        return
    }
    if (passwordForm.value.new !== passwordForm.value.confirm) {
        toast.error('As senhas não coincidem')
        return
    }
    toast.success('Senha alterada com sucesso!')
    passwordForm.value = { current: '', new: '', confirm: '' }
    }
</script>
