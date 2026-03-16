<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <ShieldCheck class="w-8 h-8" />
        Ficha SAPS - Proteção e Segurança
      </h2>
      <p class="text-red-100 mt-2">Avaliação especializada para proteção e segurança da criança</p>
    </div>

    <!-- Procedimentos -->
    <div class="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-bold text-red-900 flex items-center gap-2 mb-4">
        <Info class="w-5 h-5" />
        Procedimentos de Preenchimento
      </h4>
      <ul class="text-sm text-red-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar todos os moradores da habitação e grau de parentesco.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          Avaliar a integridade física da estrutura habitacional (teto, paredes, piso).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          Observar sinais de alerta para abuso físico, emocional ou negligência severa.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          Verificar se a vizinhança apresenta riscos imediatos (tráfico, criminalidade).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
          Avaliar o nível de supervisão da criança durante o dia.
        </li>
      </ul>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl border border-red-200 p-8 shadow-sm">
      <h3 class="text-xl font-semibold text-red-900 flex items-center gap-2 mb-6">
        <ShieldCheck class="w-6 h-6" />
        Dados da Avaliação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Com quem vive -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Com quem vive a criança? *
          </label>
          <input
            v-model="modelValue.viveCom"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Ex: Avós, Tios, Mãe solo..."
            :disabled="isReadOnly"
            required
          />
        </div>

        <!-- Condições da Habitação -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Condições da Habitação *
          </label>
          <select
            v-model="modelValue.condicoesHabitacao"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
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

        <!-- Sente-se segura -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            A criança sente-se segura em casa/comunidade? *
          </label>
          <select
            v-model="modelValue.senteSegura"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <!-- Sinais de Abuso -->
        <div class="md:col-span-2 space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Sinais de Abuso ou Negligência Identificados
          </label>
          <textarea
            v-model="modelValue.sinaisAbusoNegligencia"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            placeholder="Descreva observações sobre integridade física e emocional..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <!-- Riscos na Vizinhança -->
        <div class="md:col-span-2 space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Principais Riscos Identificados na Vizinhança
          </label>
          <input
            v-model="modelValue.riscosVizinhanca"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
