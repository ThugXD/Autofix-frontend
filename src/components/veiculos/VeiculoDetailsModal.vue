<template>
  <BaseModal
    v-model="isOpen"
    title="Detalhes do Veículo"
    size="lg"
  >
    <div v-if="veiculo" class="space-y-6">
      <!-- Informações Principais -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card de Informações do Veículo -->
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Car class="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">
                {{ veiculo.brand }} {{ veiculo.model }}
              </h3>
              <p class="text-sm text-gray-600">Ano {{ veiculo.year }}</p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Matrícula:</span>
              <span class="font-mono font-semibold text-gray-900">{{ veiculo.plate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Cor:</span>
              <span class="font-medium text-gray-900">{{ veiculo.color || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Combustível:</span>
              <span
                :class="[
                  'badge',
                  fuelTypeClasses[veiculo.fuelType] || 'badge-info'
                ]"
              >
                {{ fuelTypeLabels[veiculo.fuelType] || veiculo.fuelType || '-' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Card de Proprietário -->
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">Proprietário</h3>
              <p class="text-sm text-gray-600">{{ veiculo.cliente?.name || 'Não informado' }}</p>
            </div>
          </div>

          <div class="space-y-3 border-t pt-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Telefone:</span>
              <span class="font-medium text-gray-900">{{ veiculo.cliente?.phone || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">E-mail:</span>
              <span class="font-medium text-gray-900 break-all ml-4">{{ veiculo.cliente?.email || '-' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detalhes Técnicos -->
      <div class="border-t pt-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Detalhes Técnicos</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Gauge class="w-5 h-5 text-gray-600" />
            <div>
              <p class="text-xs text-gray-600">Quilometragem</p>
              <p class="font-semibold text-gray-900">
                {{ veiculo.mileage ? veiculo.mileage.toLocaleString() + ' km' : '0 km' }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Hash class="w-5 h-5 text-gray-600" />
            <div>
              <p class="text-xs text-gray-600">Chassi (VIN)</p>
              <p class="font-mono text-sm font-semibold text-gray-900">
                {{ veiculo.vin || 'Não informado' }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar class="w-5 h-5 text-gray-600" />
            <div>
              <p class="text-xs text-gray-600">Data de Registro</p>
              <p class="font-semibold text-gray-900">
                {{ formatDate(veiculo.createdAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Notas -->
      <div v-if="veiculo.notes" class="border-t pt-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-3">Observações</h4>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p class="text-sm text-gray-700 leading-relaxed">{{ veiculo.notes }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <BaseButton
        variant="secondary"
        @click="isOpen = false"
      >
        Fechar
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { Car, User, Gauge, Hash, Calendar, FileText } from 'lucide-vue-next'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  veiculo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const fuelTypeLabels = {
  gasoline: 'Gasolina',
  diesel: 'Diesel',
  electric: 'Elétrico',
  hybrid: 'Híbrido'
}

const fuelTypeClasses = {
  gasoline: 'badge-info',
  diesel: 'badge-warning',
  electric: 'badge-success',
  hybrid: 'badge-info'
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return '-'
  }
}
</script>