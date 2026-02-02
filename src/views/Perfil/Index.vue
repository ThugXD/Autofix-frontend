<template>
  <div>
    <div class="card mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Meu Perfil</h2>
      <p class="text-gray-600">Gerir as suas informações pessoais e segurança</p>
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
        <!-- Informações Pessoais -->
        <div v-if="activeTab === 'pessoal'" class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Informações Pessoais</h3>
          <div class="space-y-4">
            <BaseInput
              v-model="profile.name"
              label="Nome Completo"
              placeholder="Ex: João da Silva"
            />
            <BaseInput
              v-model="profile.email"
              label="Email"
              type="email"
              placeholder="joao@exemplo.com"
              disabled
              hint="O email não pode ser alterado."
            />
            <BaseInput
              v-model="profile.phone"
              label="Telefone"
              placeholder="840000000"
            />
            
            <div class="pt-4 flex justify-end">
              <BaseButton 
                variant="primary" 
                :loading="loading"
                @click="handleUpdateProfile"
              >
                Salvar Alterações
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
                  v-model="passwordForm.currentPassword"
                  label="Senha Atual"
                  type="password"
                  placeholder="••••••••"
                />
                <BaseInput
                  v-model="passwordForm.newPassword"
                  label="Nova Senha"
                  type="password"
                  placeholder="••••••••"
                />
                <BaseInput
                  v-model="passwordForm.confirmPassword"
                  label="Confirmar Nova Senha"
                  type="password"
                  placeholder="••••••••"
                />
                <div class="pt-4 flex justify-end">
                  <BaseButton 
                    variant="primary" 
                    :loading="loading"
                    @click="handleChangePassword"
                  >
                    Alterar Senha
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { User, Shield } from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const authStore = useAuthStore()
const toast = useToast()

const activeTab = ref('pessoal')
const loading = ref(false)

const tabs = [
  { id: 'pessoal', label: 'Informações Pessoais', icon: User },
  { id: 'seguranca', label: 'Segurança', icon: Shield }
]

const profile = ref({
  name: '',
  email: '',
  phone: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(() => {
  if (authStore.user) {
    profile.value = {
      name: authStore.user.name,
      email: authStore.user.email,
      phone: authStore.user.phone || ''
    }
  }
})

const handleUpdateProfile = async () => {
  try {
    loading.value = true
    await authStore.updateProfile({
      name: profile.value.name,
      phone: profile.value.phone
    })
    toast.success('Perfil atualizado com sucesso!')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao atualizar perfil')
  } finally {
    loading.value = false
  }
}

const handleChangePassword = async () => {
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    toast.error('Preencha todos os campos')
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.error('A confirmação de senha não coincide')
    return
  }

  try {
    loading.value = true
    await authStore.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    })
    toast.success('Senha alterada com sucesso!')
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao alterar senha')
  } finally {
    loading.value = false
  }
}
</script>
