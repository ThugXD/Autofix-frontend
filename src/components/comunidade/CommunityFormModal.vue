<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Editar Comunidade' : 'Nova Comunidade'"
    size="md"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <BaseInput
          v-model="form.name"
          label="Nome da Comunidade / Instituição"
          placeholder="Ex: Associação Vida Plena"
          required
          :error="errors.name"
        />
      </div>

      <div>
        <BaseInput
          v-model="form.location"
          label="Localização / Província"
          placeholder="Ex: Maputo Cidade"
          required
          :error="errors.location"
        />
      </div>

      <div>
        <BaseInput
          v-model="form.responsavel"
          label="Nome do Responsável"
          placeholder="Nome completo do Ponto Focal"
          required
          :error="errors.responsavel"
        />
      </div>

      <div>
        <BaseInput
          v-model="form.email"
          label="Email de Contato"
          type="email"
          placeholder="exemplo@sacco.org.mz"
          required
          :error="errors.email"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">
          Status da Parceria
        </label>
        <select v-model="form.status" class="input" required>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Pendente">Pendente</option>
        </select>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <BaseButton
          type="button"
          variant="secondary"
          @click="$emit('update:modelValue', false)"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          type="submit"
          variant="primary"
          :loading="loading"
        >
          {{ isEdit ? 'Salvar Alterações' : 'Criar Comunidade' }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  community: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const isEdit = computed(() => !!props.community)
const loading = ref(false)

const form = ref({
  name: '',
  location: '',
  responsavel: '',
  email: '',
  status: 'Ativo'
})

const errors = ref({})

watch(() => props.modelValue, (val) => {
  if (val) {
    if (props.community) {
      form.value = {
        name: props.community.name || '',
        location: props.community.location || '',
        responsavel: props.community.responsavel || '',
        email: props.community.email || '',
        status: props.community.status || 'Ativo'
      }
    } else {
      resetForm()
    }
  }
})

const resetForm = () => {
  form.value = {
    name: '',
    location: '',
    responsavel: '',
    email: '',
    status: 'Ativo'
  }
  errors.value = {}
}

const validate = () => {
  const newErrors = {}
  if (!form.value.name) newErrors.name = 'Nome é obrigatório'
  if (!form.value.location) newErrors.location = 'Localização é obrigatória'
  if (!form.value.responsavel) newErrors.responsavel = 'Responsável é obrigatório'
  if (!form.value.email) newErrors.email = 'Email é obrigatório'
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true
  try {
    emit('submit', { ...form.value })
  } finally {
    loading.value = false
  }
}
</script>
