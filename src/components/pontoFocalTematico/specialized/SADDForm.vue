<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <FileText class="w-8 h-8" />
        Ficha SADD - Direitos e Documentação
      </h2>
      <p class="text-blue-100 mt-2">Avaliação especializada para direitos e documentação da criança</p>
    </div>

    <!-- Procedimentos -->
    <div class="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
        <Info class="w-5 h-5" />
        Procedimentos de Preenchimento
      </h4>
      <ul class="text-sm text-blue-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
          Verificar a existência física de Certidão de Nascimento ou Assento.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
          Em caso de falta, identificar se o motivo é abandono, perda ou falta de registro inicial.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
          Avaliar a situação documental dos progenitores para facilitar o registro tardio.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
          Anexar fotos de quaisquer documentos parciais ou declarações de testemunhas.
        </li>
      </ul>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl border border-blue-200 p-8 shadow-sm">
      <h3 class="text-xl font-semibold text-blue-900 flex items-center gap-2 mb-6">
        <FileText class="w-6 h-6" />
        Dados da Avaliação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Certidão de Nascimento -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Tem Certidão de Nascimento? *
          </label>
          <select
            v-model="modelValue.temCertidao"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <!-- Motivo da Falta -->
        <div v-if="modelValue.temCertidao === false" class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Motivo da Falta de Certidão
          </label>
          <input
            v-model="modelValue.motivoFaltaCertidao"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Ex: Registo tardio, perda de documentos"
            :disabled="isReadOnly"
          />
        </div>

        <!-- Outros Documentos -->
        <div class="md:col-span-2 space-y-3">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Outros Documentos em Falta
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              v-for="doc in ['BI', 'NUIT', 'Cartão de Eleitor']"
              :key="doc"
              class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              <input
                type="checkbox"
                :value="doc"
                v-model="modelValue.outrosDocumentosEmFalta"
                class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                :disabled="isReadOnly"
              />
              <span class="text-sm font-medium text-gray-700">{{ doc }}</span>
            </label>
          </div>
        </div>

        <!-- Situação Documental dos Pais -->
        <div class="md:col-span-2 space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Situação Documental dos Pais
          </label>
          <textarea
            v-model="modelValue.situacaoPais"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Descreva se os pais possuem documentação ou se estão falecidos..."
            :disabled="isReadOnly"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Info, FileText } from 'lucide-vue-next'

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
