<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <HeartPulse class="w-8 h-8" />
        Ficha SASBE - Saúde e Bem-Estar
      </h2>
      <p class="text-purple-100 mt-2">Avaliação especializada para saúde e bem-estar da criança</p>
    </div>

    <!-- Procedimentos -->
    <div class="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-bold text-purple-900 flex items-center gap-2 mb-4">
        <Info class="w-5 h-5" />
        Procedimentos de Preenchimento
      </h4>
      <ul class="text-sm text-purple-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
          Solicitar o Cartão de Saúde/Vacinação da criança.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
          Verificar se o calendário nacional de vacinação está em dia.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar prevalência de doenças crónicas ou sazonais.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
          Avaliar a necessidade de consultas de especialidade (oftalmo, dentista, etc).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
          Registar data da última consulta para monitoramento do bem-estar.
        </li>
      </ul>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl border border-purple-200 p-8 shadow-sm">
      <h3 class="text-xl font-semibold text-purple-900 flex items-center gap-2 mb-6">
        <HeartPulse class="w-6 h-6" />
        Dados da Avaliação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Vacinas Completas -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Cartão de Vacinas Completo? *
          </label>
          <select
            v-model="modelValue.vacinasCompletas"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <!-- Vacinas em Falta -->
        <div v-if="modelValue.vacinasCompletas === false" class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Vacinas em Falta
          </label>
          <input
            v-model="modelValue.vacinasEmFalta"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Ex: Pólio, Sarampo..."
            :disabled="isReadOnly"
          />
        </div>

        <!-- Doenças Crônicas -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Doenças Crônicas Identificadas
          </label>
          <textarea
            v-model="modelValue.doencasCronicas"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            placeholder="Ex: Asma, HIV, Tuberculose..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <!-- Deficiências -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Deficiências Físicas ou Cognitivas
          </label>
          <textarea
            v-model="modelValue.deficiencias"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            placeholder="Descreva se houver alguma deficiência..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <!-- Data Última Consulta -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Data da Última Consulta Médica
          </label>
          <input
            v-model="modelValue.dataUltimaConsulta"
            type="date"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            :disabled="isReadOnly"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Info, HeartPulse } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  isReadOnly: {
    type: Boolean,
    default: false
  }
})
</script>
