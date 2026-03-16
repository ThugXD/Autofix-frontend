<template>
  <BaseModal
    v-model="isOpen"
    :title="isEdit ? 'Editar Utilizador' : 'Novo Utilizador'"
    size="md"
  >
    <div class="space-y-4">
      <BaseInput
        v-model="form.name"
        label="Nome Completo"
        placeholder="Nome do utilizador"
        required
        :error="errors.name"
      />

      <BaseInput
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="email@exemplo.com"
        required
        :error="errors.email"
      />

      <BaseInput
        v-model="form.phone"
        label="Telefone"
        type="tel"
        placeholder="840000000"
        :error="errors.phone"
      />

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Função <span class="text-red-500">*</span>
        </label>
        <select v-model="form.role" class="input" required>
          <option value="">Selecione a função</option>
          <option value="admin">Administrador do Sistema</option>
          <option value="gestor">Gestor da Associação</option>
          <option value="ponto_focal">Ponto Focal Comunitário</option>
          <option value="ponto_focal_tematico">Ponto Focal Temático</option>
          <option value="tutor">Tutor (Responsável da Criança)</option>
          <option value="padrinho">Padrinho (Apoiador)</option>
        </select>
        <p v-if="errors.role" class="mt-1.5 text-sm text-red-600">{{ errors.role }}</p>
      </div>

      <div v-if="form.role && form.role !== 'padrinho'">
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Instituição / Parceiro
        </label>
        <select v-model="form.instituicao" class="input">
          <option value="">Nenhuma instituição vinculada</option>
          <option v-for="inst in INSTITUICOES" :key="inst" :value="inst">
            {{ inst }}
          </option>
        </select>
      </div>

      <div v-if="!isEdit">
        <BaseInput
          v-model="form.password"
          label="Senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          required
          :error="errors.password"
        />
      </div>

      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          v-model="form.is_active"
          id="is_active_user"
          class="w-4 h-4 text-blue-600 rounded"
        />
        <label for="is_active_user" class="text-sm font-medium text-gray-700">
          Utilizador ativo
        </label>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="isOpen = false">
        Cancelar
      </BaseButton>
      <BaseButton variant="primary" @click="handleSubmit">
        {{ isEdit ? 'Salvar' : 'Criar' }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { INSTITUICOES } from '@/config/roles'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  user: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isEdit = computed(() => !!props.user)

const form = ref({
  name: '',
  email: '',
  phone: '',
  role: '',
  instituicao: '',
  password: '',
  is_active: true
})

const errors = ref({})

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.user) {
      form.value = {
        name: props.user.name || '',
        email: props.user.email || '',
        phone: props.user.phone || '',
        role: props.user.role || '',
        instituicao: props.user.instituicao || '',
        password: '',
        is_active: props.user.is_active !== undefined ? props.user.is_active : true
      }
    } else {
      resetForm()
    }
    errors.value = {}
  }
})

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    role: '',
    instituicao: '',
    password: '',
    is_active: true
  }
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.name.trim()) {
    errors.value.name = 'Nome é obrigatório'
    isValid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email inválido'
    isValid = false
  }

  if (!form.value.role) {
    errors.value.role = 'Função é obrigatória'
    isValid = false
  }

  if (!isEdit.value && (!form.value.password || form.value.password.length < 6)) {
    errors.value.password = 'Senha deve ter no mínimo 6 caracteres'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  const data = { ...form.value }
  if (isEdit.value) {
    delete data.password
  }

  emit('submit', data)
}
</script>