<template>
  <BaseModal v-model="isOpen" title="Cadastro Rápido de Veículo" size="md">
    <div class="space-y-4">
      <ClienteSelect v-model="form.cliente_id" label="Cliente" required :error="errors.cliente_id" />
      <div class="grid grid-cols-2 gap-4">
        <BaseInput v-model="form.brand" label="Marca" required :error="errors.brand" />
        <BaseInput v-model="form.model" label="Modelo" required :error="errors.model" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <BaseInput v-model="form.year" label="Ano" type="number" required :error="errors.year" />
        <BaseInput v-model="form.plate" label="Matrícula" required :error="errors.plate" />
      </div>
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
import { useVeiculosStore } from '@/stores/veiculos'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import ClienteSelect from '@/components/common/ClienteSelect.vue'

const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue', 'created'])

const veiculosStore = useVeiculosStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref({ cliente_id: '', brand: '', model: '', year: new Date().getFullYear(), plate: '' })
const errors = ref({})
const loading = ref(false)

const handleSubmit = async () => {
  errors.value = {}
  if (!form.value.cliente_id) errors.value.cliente_id = 'Obrigatório'
  if (!form.value.brand) errors.value.brand = 'Obrigatório'
  if (!form.value.model) errors.value.model = 'Obrigatório'
  if (!form.value.plate) errors.value.plate = 'Obrigatório'
  if (Object.keys(errors.value).length) return

  loading.value = true
  const success = await veiculosStore.createVeiculo(form.value)
  loading.value = false

  if (success) {
    form.value = { cliente_id: '', brand: '', model: '', year: new Date().getFullYear(), plate: '' }
    emit('created')
  }
}
</script>