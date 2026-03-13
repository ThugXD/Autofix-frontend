<template>
  <div class="space-y-6">
    <!-- Procedimentos -->
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <h4 class="text-sm font-bold text-amber-900 flex items-center gap-2 mb-2">
        <Info class="w-4 h-4" />
        Procedimentos de Preenchimento - SAAD
      </h4>
      <ul class="text-xs text-amber-800 space-y-1 list-disc pl-4">
        <li>Entrevistar o responsável sobre o número de pessoas que partilham a mesa.</li>
        <li>Avaliar o rendimento familiar mensal (incluindo agricultura de subsistência).</li>
        <li>Identificar a principal fonte de alimentos (compra, produção própria, doações).</li>
        <li>Registar a diversidade alimentar (quais grupos de alimentos são consumidos).</li>
        <li>Identificar períodos de escassez alimentar severa.</li>
      </ul>
    </div>

    <div class="bg-amber-50/50 rounded-xl border border-amber-100 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-amber-900 flex items-center gap-2">
        <ShoppingBag class="w-5 h-5" />
        Avaliação Especializada: SAAD - Alimentação Diária
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Quantidade de Membros no Agregado *
          </label>
          <input 
            v-model.number="modelValue.membrosAgregado" 
            type="number" 
            min="1"
            class="input-field"
            :disabled="isReadOnly"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Rendimento Mensal Estimado (MZN) *
          </label>
          <input 
            v-model.number="modelValue.rendimentoMensal" 
            type="number" 
            min="0"
            class="input-field"
            :disabled="isReadOnly"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Principal Fonte de Rendimento
          </label>
          <input 
            v-model="modelValue.fonteRendimento" 
            type="text" 
            class="input-field"
            placeholder="Ex: Agricultura, Comércio informal..."
            :disabled="isReadOnly"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Frequência de Acesso a Alimentos *
          </label>
          <select 
            v-model="modelValue.frequenciaAcessoAlimentos" 
            class="input-field" 
            :disabled="isReadOnly"
            required
          >
            <option value="">Selecione...</option>
            <option value="diaria">Diária</option>
            <option value="quase_diaria">Quase Diária (4-5 vezes/semana)</option>
            <option value="semanal">Semanal</option>
            <option value="irregular">Irregular (Escassez frequente)</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Alimentos Consumidos Habitualmente
          </label>
          <textarea 
            v-model="modelValue.alimentosHabituais" 
            rows="2" 
            class="input-field"
            placeholder="Ex: Xima, feijão, vegetais, peixe seco..."
            :disabled="isReadOnly"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Info, ShoppingBag } from 'lucide-vue-next'

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
