<template>
  <div class="space-y-6">
    <!-- Procedimentos -->
    <div class="bg-purple-50 border border-purple-200 rounded-xl p-4">
      <h4 class="text-sm font-bold text-purple-900 flex items-center gap-2 mb-2">
        <Info class="w-4 h-4" />
        Procedimentos de Preenchimento - SASBE
      </h4>
      <ul class="text-xs text-purple-800 space-y-1 list-disc pl-4">
        <li>Solicitar o Cartão de Saúde/Vacinação da criança.</li>
        <li>Verificar se o calendário nacional de vacinação está em dia.</li>
        <li>Identificar prevalência de doenças crónicas ou sazonais.</li>
        <li>Avaliar a necessidade de consultas de especialidade (oftalmo, dentista, etc).</li>
        <li>Registar data da última consulta para monitoramento do bem-estar.</li>
      </ul>
    </div>

    <div class="bg-purple-50/50 rounded-xl border border-purple-100 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-purple-900 flex items-center gap-2">
        <HeartPulse class="w-5 h-5" />
        Avaliação Especializada: SASBE - Saúde e Bem-Estar
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Cartão de Vacinas Completo? *
          </label>
          <select 
            v-model="modelValue.vacinasCompletas" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <div v-if="modelValue.vacinasCompletas === false">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Vacinas em Falta
          </label>
          <input 
            v-model="modelValue.vacinasEmFalta" 
            type="text" 
            class="input-field"
            placeholder="Ex: Pólio, Sarampo..."
            :disabled="isReadOnly"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Doenças Crônicas Identificadas
          </label>
          <textarea 
            v-model="modelValue.doencasCronicas" 
            rows="2" 
            class="input-field"
            placeholder="Ex: Asma, HIV, Tuberculose..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Deficiências Físicas ou Cognitivas
          </label>
          <textarea 
            v-model="modelValue.deficiencias" 
            rows="2" 
            class="input-field"
            placeholder="Descreva se houver alguma deficiência..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Data da Última Consulta Médica
          </label>
          <input 
            v-model="modelValue.dataUltimaConsulta" 
            type="date" 
            class="input-field"
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
