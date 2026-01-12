<template>
  <BaseModal v-model="isOpen" title="Cadastro Rápido de Cliente" size="md">
    <div class="space-y-4">
      <BaseInput v-model="form.name" label="Nome" required :error="errors.name" />
      <div class="grid grid-cols-2 gap-4">
        <BaseInput v-model="form.phone" label="Telefone" required :error="errors.phone" />
        <BaseInput v-model="form.email" label="Email" type="email" required :error="errors.email" />
      </div>
      <BaseInput v-model="form.address" label="Endereço" />
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="isOpen = false">Cancelar</BaseButton>
      <BaseButton variant="primary" @click="handleSubmit" :loading="loading">
        Cadastrar
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useClientesStore } from '@/stores/clientes'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue', 'created'])

const clientesStore = useClientesStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref({ name: '', phone: '', email: '', address: '' })
const errors = ref({})
const loading = ref(false)

const handleSubmit = async () => {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Obrigatório'
  if (!form.value.phone) errors.value.phone = 'Obrigatório'
  if (!form.value.email) errors.value.email = 'Obrigatório'
  if (Object.keys(errors.value).length) return

  loading.value = true
  const success = await clientesStore.createCliente(form.value)
  loading.value = false

  if (success) {
    form.value = { name: '', phone: '', email: '', address: '' }
    emit('created')
  }
}
</script>