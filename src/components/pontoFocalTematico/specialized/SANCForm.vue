<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <Activity class="w-8 h-8" />
        Ficha SANC - Nutrição e Crescimento
      </h2>
      <p class="text-green-100 mt-2">Avaliação especializada para nutrição e crescimento da criança</p>
    </div>

    <!-- Procedimentos -->
    <div class="bg-green-50 border-l-4 border-green-500 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-bold text-green-900 flex items-center gap-2 mb-4">
        <Info class="w-5 h-5" />
        Procedimentos de Preenchimento
      </h4>
      <ul class="text-sm text-green-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
          Realizar medição de peso (kg) e altura (cm) em local plano.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
          O IMC será calculado automaticamente para auxiliar no diagnóstico.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar o estado nutricional com base nas curvas de crescimento.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
          Questionar sobre a frequência e qualidade das refeições diárias.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
          Observar acesso a água potável e saneamento básico.
        </li>
      </ul>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl border border-green-200 p-8 shadow-sm">
      <h3 class="text-xl font-semibold text-green-900 flex items-center gap-2 mb-6">
        <Activity class="w-6 h-6" />
        Dados da Avaliação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Peso -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Peso (kg) *
          </label>
          <input
            v-model.number="modelValue.peso"
            type="number"
            step="0.1"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            :disabled="isReadOnly"
            required
          />
        </div>

        <!-- Altura -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Altura (cm) *
          </label>
          <input
            v-model.number="modelValue.altura"
            type="number"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            :disabled="isReadOnly"
            required
          />
        </div>

        <!-- IMC -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            IMC (Calculado)
          </label>
          <div class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center text-gray-600 font-medium">
            {{ imc || '-' }}
          </div>
        </div>

        <!-- Estado Nutricional -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Estado Nutricional *
          </label>
          <select
            v-model="modelValue.estadoNutricional"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
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

        <!-- Refeições Diárias -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Refeições Diárias *
          </label>
          <input
            v-model.number="modelValue.refeicoesDiarias"
            type="number"
            min="0"
            max="5"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            :disabled="isReadOnly"
            required
          />
        </div>

        <!-- Acesso a Água Potável -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Acesso a Água Potável
          </label>
          <div class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              v-model="modelValue.aguaPotavel"
              class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              :disabled="isReadOnly"
            />
            <span class="text-sm font-medium text-gray-700">Sim</span>
          </div>
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
