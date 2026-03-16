<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <ShoppingBag class="w-8 h-8" />
        Ficha SAAD - Alimentação Diária
      </h2>
      <p class="text-amber-100 mt-2">Avaliação especializada para alimentação diária da criança</p>
    </div>

    <!-- Procedimentos -->
    <div class="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-bold text-amber-900 flex items-center gap-2 mb-4">
        <Info class="w-5 h-5" />
        Procedimentos de Preenchimento
      </h4>
      <ul class="text-sm text-amber-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
          Entrevistar o responsável sobre o número de pessoas que partilham a mesa.
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
          Avaliar o rendimento familiar mensal (incluindo agricultura de subsistência).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar a principal fonte de alimentos (compra, produção própria, doações).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
          Registar a diversidade alimentar (quais grupos de alimentos são consumidos).
        </li>
        <li class="flex items-start gap-2">
          <span class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
          Identificar períodos de escassez alimentar severa.
        </li>
      </ul>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
      <h3 class="text-xl font-semibold text-amber-900 flex items-center gap-2 mb-6">
        <ShoppingBag class="w-6 h-6" />
        Dados da Avaliação
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Membros no Agregado -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Quantidade de Membros no Agregado *
          </label>
          <input
            v-model.number="modelValue.membrosAgregado"
            type="number"
            min="1"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            :disabled="isReadOnly"
            required
          />
        </div>

        <!-- Rendimento Mensal -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Rendimento Mensal Estimado (MZN) *
          </label>
          <input
            v-model.number="modelValue.rendimentoMensal"
            type="number"
            min="0"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            :disabled="isReadOnly"
            required
          />
        </div>

        <!-- Fonte de Rendimento -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Principal Fonte de Rendimento
          </label>
          <input
            v-model="modelValue.fonteRendimento"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            placeholder="Ex: Agricultura, Comércio informal..."
            :disabled="isReadOnly"
          />
        </div>

        <!-- Frequência de Acesso -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Frequência de Acesso a Alimentos *
          </label>
          <select
            v-model="modelValue.frequenciaAcessoAlimentos"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
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

        <!-- Alimentos Habituais -->
        <div class="md:col-span-2 space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Alimentos Consumidos Habitualmente
          </label>
          <textarea
            v-model="modelValue.alimentosHabituais"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
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
