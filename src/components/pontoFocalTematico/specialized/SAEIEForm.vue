<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <GraduationCap class="w-8 h-8" />
        Ficha SAEIE - Educação e Inclusão Escolar
      </h2>
      <p class="text-indigo-100 mt-2">Avaliação especializada para educação e inclusão escolar da criança</p>
    </div>

    <!-- Procedimentos -->
    <div class="bg-indigo-50 border-l-4 border-indigo-500 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4">
        <Info class="w-5 h-5" />
        Procedimentos de Preenchimento
      </h4>
      <ul class="text-sm text-indigo-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
          Confirmar se a criança possui vaga e frequenta as aulas regularmente.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar o motivo de eventuais desistências ou atrasos escolares (idade/classe).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
          Avaliar o desempenho académico através do caderno ou conversa com tutor.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar necessidades materiais urgentes (uniforme, cadernos, mochila).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
          Observar barreiras físicas ou sociais que impeçam a inclusão plena.
        </li>
      </ul>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl border border-indigo-200 p-8 shadow-sm">
      <h3 class="text-xl font-semibold text-indigo-900 flex items-center gap-2 mb-6">
        <GraduationCap class="w-6 h-6" />
        Dados da Avaliação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Frequenta Escola -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Frequenta a Escola? *
          </label>
          <select
            v-model="modelValue.frequentaEscola"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <!-- Motivo Não Frequência -->
        <div v-if="modelValue.frequentaEscola === false" class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Motivo do Abandono ou Não Frequência
          </label>
          <input
            v-model="modelValue.motivoNaoFrequencia"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Ex: Falta de recursos, trabalho infantil, distância..."
            :disabled="isReadOnly"
          />
        </div>

        <!-- Escola e Classe -->
        <div v-if="modelValue.frequentaEscola" class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Escola e Classe Atual
          </label>
          <input
            v-model="modelValue.escolaClasse"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Ex: EPC de Maputo - 5ª Classe"
            :disabled="isReadOnly"
          />
        </div>

        <!-- Dificuldades de Aprendizagem -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Dificuldades de Aprendizagem
          </label>
          <textarea
            v-model="modelValue.dificuldadesAprendizagem"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            placeholder="Descreva se a criança apresenta dificuldades específicas..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <!-- Material Necessário -->
        <div class="md:col-span-2 space-y-3">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Necessidades de Material Escolar
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              v-for="item in ['Livros', 'Cadernos', 'Uniforme', 'Mochila', 'Calçado']"
              :key="item"
              class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="modelValue.materialNecessario"
                class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                :disabled="isReadOnly"
              />
              <span class="text-sm font-medium text-gray-700">{{ item }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Info, GraduationCap } from 'lucide-vue-next'

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
