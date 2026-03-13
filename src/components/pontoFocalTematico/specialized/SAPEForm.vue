<template>
  <div class="space-y-6">
    <!-- Procedimentos -->
    <div class="bg-pink-50 border border-pink-200 rounded-xl p-4">
      <h4 class="text-sm font-bold text-pink-900 flex items-center gap-2 mb-2">
        <Info class="w-4 h-4" />
        Procedimentos de Preenchimento - SAPE
      </h4>
      <ul class="text-xs text-pink-800 space-y-1 list-disc pl-4">
        <li>Observar a expressão facial e o tom de voz da criança durante a visita.</li>
        <li>Identificar comportamentos atípicos (isolamento, agressividade, medo excessivo).</li>
        <li>Conversar sobre o luto se houver perda de progenitores recente.</li>
        <li>Verificar a qualidade da interação da criança com os seus pares e cuidadores.</li>
        <li>Sinalizar necessidade urgente de terapia se houver sinais de trauma severo.</li>
      </ul>
    </div>

    <div class="bg-pink-50/50 rounded-xl border border-pink-100 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-pink-900 flex items-center gap-2">
        <Smile class="w-5 h-5" />
        Avaliação Especializada: SAPE - Psico-social Emocional
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Estado Emocional Aparente *
          </label>
          <select 
            v-model="modelValue.estadoEmocional" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option value="">Selecione...</option>
            <option value="alegre">Alegre/Extrovertida</option>
            <option value="normal">Normal/Estável</option>
            <option value="triste">Triste/Melancólica</option>
            <option value="apatico">Apático/Desinteressado</option>
            <option value="ansioso">Ansioso/Inquieto</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Comportamento Social *
          </label>
          <select 
            v-model="modelValue.comportamentoSocial" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option value="">Selecione...</option>
            <option value="interage_bem">Interage bem com pares</option>
            <option value="isolado">Isolado/Tímido em excesso</option>
            <option value="agressivo">Agressivo/Reativo</option>
            <option value="dependente">Extremamente dependente</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Sinais de Trauma ou Luto Não Processado
          </label>
          <textarea 
            v-model="modelValue.sinaisTrauma" 
            rows="2" 
            class="input-field"
            placeholder="Descreva se a criança demonstra dificuldades emocionais ligadas ao passado..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <div class="flex items-end pb-3">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="modelValue.necessitaTerapia" 
              class="w-4 h-4 text-pink-600 rounded"
              :disabled="isReadOnly"
            />
            <span class="text-sm font-medium text-gray-700">Necessita de Acompanhamento Psicológico</span>
          </label>
        </div>

        <div v-if="modelValue.necessitaTerapia" class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Observações para o Psicólogo
          </label>
          <input 
            v-model="modelValue.observacoesPsicologo" 
            type="text" 
            class="input-field"
            placeholder="Indique os principais focos da terapia..."
            :disabled="isReadOnly"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Info, Smile } from 'lucide-vue-next'

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
