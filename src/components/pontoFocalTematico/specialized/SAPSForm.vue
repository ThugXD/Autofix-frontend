<template>
  <div class="space-y-6">
    <!-- Procedimentos -->
    <div class="bg-red-50 border border-red-200 rounded-xl p-4">
      <h4 class="text-sm font-bold text-red-900 flex items-center gap-2 mb-2">
        <Info class="w-4 h-4" />
        Procedimentos de Preenchimento - SAPS
      </h4>
      <ul class="text-xs text-red-800 space-y-1 list-disc pl-4">
        <li>Identificar todos os moradores da habitação e grau de parentesco.</li>
        <li>Avaliar a integridade física da estrutura habitacional (teto, paredes, piso).</li>
        <li>Observar sinais de alerta para abuso físico, emocional ou negligência severa.</li>
        <li>Verificar se a vizinhança apresenta riscos imediatos (tráfico, criminalidade).</li>
        <li>Avaliar o nível de supervisão da criança durante o dia.</li>
      </ul>
    </div>

    <div class="bg-red-50/50 rounded-xl border border-red-100 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-red-900 flex items-center gap-2">
        <ShieldCheck class="w-5 h-5" />
        Avaliação Especializada: SAPS - Proteção e Segurança
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Com quem vive a criança? *
          </label>
          <input 
            v-model="modelValue.viveCom" 
            type="text" 
            class="input-field"
            placeholder="Ex: Avós, Tios, Mãe solo..."
            :disabled="isReadOnly"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Condições da Habitação *
          </label>
          <select 
            v-model="modelValue.condicoesHabitacao" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option value="">Selecione...</option>
            <option value="boa">Boa/Estável</option>
            <option value="razoavel">Razoável</option>
            <option value="precaria">Precária</option>
            <option value="critica">Crítica/Risco</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            A criança sente-se segura em casa/comunidade? *
          </label>
          <select 
            v-model="modelValue.senteSegura" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Sinais de Abuso ou Negligência Identificados
          </label>
          <textarea 
            v-model="modelValue.sinaisAbusoNegligencia" 
            rows="2" 
            class="input-field"
            placeholder="Descreva observações sobre integridade física e emocional..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Principais Riscos Identificados na Vizinhança
          </label>
          <input 
            v-model="modelValue.riscosVizinhanca" 
            type="text" 
            class="input-field"
            placeholder="Ex: Criminalidade, falta de iluminação, distância de serviços..."
            :disabled="isReadOnly"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Info, ShieldCheck } from 'lucide-vue-next'

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
