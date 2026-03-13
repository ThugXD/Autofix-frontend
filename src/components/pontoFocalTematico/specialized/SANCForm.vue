<template>
  <div class="space-y-6">
    <!-- Procedimentos -->
    <div class="bg-green-50 border border-green-200 rounded-xl p-4">
      <h4 class="text-sm font-bold text-green-900 flex items-center gap-2 mb-2">
        <Info class="w-4 h-4" />
        Procedimentos de Preenchimento - SANC
      </h4>
      <ul class="text-xs text-green-800 space-y-1 list-disc pl-4">
        <li>Realizar medição de peso (kg) e altura (cm) em local plano.</li>
        <li>O IMC será calculado automaticamente para auxiliar no diagnóstico.</li>
        <li>Identificar o estado nutricional com base nas curvas de crescimento.</li>
        <li>Questionar sobre a frequência e qualidade das refeições diárias.</li>
        <li>Observar acesso a água potável e saneamento básico.</li>
      </ul>
    </div>

    <div class="bg-green-50/50 rounded-xl border border-green-100 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-green-900 flex items-center gap-2">
        <Activity class="w-5 h-5" />
        Avaliação Especializada: SANC - Nutrição e Crescimento
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Peso (kg) *
          </label>
          <input 
            v-model.number="modelValue.peso" 
            type="number" 
            step="0.1"
            class="input-field"
            :disabled="isReadOnly"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Altura (cm) *
          </label>
          <input 
            v-model.number="modelValue.altura" 
            type="number" 
            class="input-field"
            :disabled="isReadOnly"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            IMC (Calculado)
          </label>
          <div class="input-field bg-gray-50 flex items-center text-gray-500">
            {{ imc || '-' }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Estado Nutricional *
          </label>
          <select 
            v-model="modelValue.estadoNutricional" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option value="">Selecione...</option>
            <option value="normal">Normal</option>
            <option value="desnutricao_leve">Desnutrição Leve</option>
            <option value="desnutricao_moderada">Desnutrição Moderada</option>
            <option value="desnutricao_grave">Desnutrição Grave</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Refeições Diárias *
          </label>
          <input 
            v-model.number="modelValue.refeicoesDiarias" 
            type="number" 
            min="0"
            max="5"
            class="input-field"
            :disabled="isReadOnly"
            required
          />
        </div>

        <div class="flex items-end pb-3">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="modelValue.aguaPotavel" 
              class="w-4 h-4 text-green-600 rounded"
              :disabled="isReadOnly"
            />
            <span class="text-sm font-medium text-gray-700">Acesso a Água Potável</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Info, Activity } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  isReadOnly: {
    type: Boolean,
    default: false
  }
})

const imc = computed(() => {
  if (props.modelValue.peso && props.modelValue.altura) {
    const alturaM = props.modelValue.altura / 100
    return (props.modelValue.peso / (alturaM * alturaM)).toFixed(1)
  }
  return null
})
</script>
