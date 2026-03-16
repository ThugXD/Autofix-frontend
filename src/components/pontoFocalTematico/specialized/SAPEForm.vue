<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <Smile class="w-8 h-8" />
        Ficha SAPE - Psico-social Emocional
      </h2>
      <p class="text-pink-100 mt-2">Avaliação especializada para saúde psico-social e emocional da criança</p>
    </div>

    <!-- Procedimentos -->
    <div class="bg-pink-50 border-l-4 border-pink-500 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-bold text-pink-900 flex items-center gap-2 mb-4">
        <Info class="w-5 h-5" />
        Procedimentos de Preenchimento
      </h4>
      <ul class="text-sm text-pink-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
          Observar a expressão facial e o tom de voz da criança durante a visita.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar comportamentos atípicos (isolamento, agressividade, medo excessivo).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
          Conversar sobre o luto se houver perda de progenitores recente.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
          Verificar a qualidade da interação da criança com os seus pares e cuidadores.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
          Sinalizar necessidade urgente de terapia se houver sinais de trauma severo.
        </li>
      </ul>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl border border-pink-200 p-8 shadow-sm">
      <h3 class="text-xl font-semibold text-pink-900 flex items-center gap-2 mb-6">
        <Smile class="w-6 h-6" />
        Dados da Avaliação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Estado Emocional -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Estado Emocional Aparente *
          </label>
          <select
            v-model="modelValue.estadoEmocional"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white"
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

        <!-- Comportamento Social -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Comportamento Social *
          </label>
          <select
            v-model="modelValue.comportamentoSocial"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white"
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

        <!-- Sinais de Trauma -->
        <div class="md:col-span-2 space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Sinais de Trauma ou Luto Não Processado
          </label>
          <textarea
            v-model="modelValue.sinaisTrauma"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
            placeholder="Descreva se a criança demonstra dificuldades emocionais ligadas ao passado..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <!-- Necessita Terapia -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Necessita de Acompanhamento Psicológico
          </label>
          <div class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              v-model="modelValue.necessitaTerapia"
              class="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
              :disabled="isReadOnly"
            />
            <span class="text-sm font-medium text-gray-700">Sim</span>
          </div>
        </div>

        <!-- Observações para Psicólogo -->
        <div v-if="modelValue.necessitaTerapia" class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Observações para o Psicólogo
          </label>
          <input
            v-model="modelValue.observacoesPsicologo"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
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
