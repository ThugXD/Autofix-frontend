<template>
  <div class="space-y-6">
    <!-- Procedimentos -->
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <h4 class="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2">
        <Info class="w-4 h-4" />
        Procedimentos de Preenchimento - SADD
      </h4>
      <ul class="text-xs text-blue-800 space-y-1 list-disc pl-4">
        <li>Verificar a existência física de Certidão de Nascimento ou Assento.</li>
        <li>Em caso de falta, identificar se o motivo é abandono, perda ou falta de registro inicial.</li>
        <li>Avaliar a situação documental dos progenitores para facilitar o registro tardio.</li>
        <li>Anexar fotos de quaisquer documentos parciais ou declarações de testemunhas.</li>
      </ul>
    </div>

    <div class="bg-blue-50/50 rounded-xl border border-blue-100 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-blue-900 flex items-center gap-2">
        <FileText class="w-5 h-5" />
        Avaliação Especializada: SADD - Direitos e Documentação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Tem Certidão de Nascimento? *
          </label>
          <select 
            v-model="modelValue.temCertidao" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option :value="null">Selecione...</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>
        </div>

        <div v-if="modelValue.temCertidao === false">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Motivo da Falta de Certidão
          </label>
          <input 
            v-model="modelValue.motivoFaltaCertidao" 
            type="text" 
            class="input-field"
            placeholder="Ex: Registo tardio, perda de documentos"
            :disabled="isReadOnly"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Outros Documentos em Falta
          </label>
          <div class="flex flex-wrap gap-2 mt-2">
            <label 
              v-for="doc in ['BI', 'NUIT', 'Cartão de Eleitor']" 
              :key="doc"
              class="inline-flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300"
            >
              <input 
                type="checkbox" 
                :value="doc" 
                v-model="modelValue.outrosDocumentosEmFalta" 
                class="w-4 h-4 text-blue-600 rounded"
                :disabled="isReadOnly"
              />
              <span class="text-sm text-gray-700">{{ doc }}</span>
            </label>
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Situação Documental dos Pais
          </label>
          <textarea 
            v-model="modelValue.situacaoPais" 
            rows="2" 
            class="input-field"
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
  