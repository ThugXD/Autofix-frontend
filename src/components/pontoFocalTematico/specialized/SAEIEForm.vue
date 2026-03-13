<template>
  <div class="space-y-6">
    <!-- Procedimentos -->
    <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
      <h4 class="text-sm font-bold text-indigo-900 flex items-center gap-2 mb-2">
        <Info class="w-4 h-4" />
        Procedimentos de Preenchimento - SAEIE
      </h4>
      <ul class="text-xs text-indigo-800 space-y-1 list-disc pl-4">
        <li>Confirmar se a criança possui vaga e frequenta as aulas regularmente.</li>
        <li>Identificar o motivo de eventuais desistências ou atrasos escolares (idade/classe).</li>
        <li>Avaliar o desempenho académico através do caderno ou conversa com tutor.</li>
        <li>Identificar necessidades materiais urgentes (uniforme, cadernos, mochila).</li>
        <li>Observar barreiras físicas ou sociais que impeçam a inclusão plena.</li>
      </ul>
    </div>

    <div class="bg-indigo-50/50 rounded-xl border border-indigo-100 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-indigo-900 flex items-center gap-2">
        <GraduationCap class="w-5 h-5" />
        Avaliação Especializada: SAEIE - Educação e Inclusão Escolar
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Frequenta a Escola? *
          </label>
          <select 
            v-model="modelValue.frequentaEscola" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <div v-if="modelValue.frequentaEscola === false">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Motivo do Abandono ou Não Frequência
          </label>
          <input 
            v-model="modelValue.motivoNaoFrequencia" 
            type="text" 
            class="input-field"
            placeholder="Ex: Falta de recursos, trabalho infantil, distância..."
            :disabled="isReadOnly"
          />
        </div>

        <div v-if="modelValue.frequentaEscola">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Escola e Classe Atual
          </label>
          <input 
            v-model="modelValue.escolaClasse" 
            type="text" 
            class="input-field"
            placeholder="Ex: EPC de Maputo - 5ª Classe"
            :disabled="isReadOnly"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Dificuldades de Aprendizagem
          </label>
          <textarea 
            v-model="modelValue.dificuldadesAprendizagem" 
            rows="2" 
            class="input-field"
            placeholder="Descreva se a criança apresenta dificuldades específicas..."
            :disabled="isReadOnly"
          ></textarea>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Necessidades de Material Escolar
          </label>
          <div class="flex flex-wrap gap-2 mt-2">
            <label 
              v-for="item in ['Livros', 'Cadernos', 'Uniforme', 'Mochila', 'Calçado']" 
              :key="item"
              class="inline-flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300"
            >
              <input 
                type="checkbox" 
                :value="item" 
                v-model="modelValue.materialNecessario" 
                class="w-4 h-4 text-indigo-600 rounded"
                :disabled="isReadOnly"
              />
              <span class="text-sm text-gray-700">{{ item }}</span>
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
