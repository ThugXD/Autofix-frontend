<template>
  <RouterLink
    :to="`/crianca/${crianca.id}`"
    class="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <!-- Imagem -->
    <div class="relative h-48 overflow-hidden bg-gray-200">
      <img
        :src="crianca.foto"
        :alt="crianca.nome"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Badge de Status -->
      <div class="absolute top-3 right-3">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold text-white',
            statusColor
          ]"
        >
          {{ crianca.status }}
        </span>
      </div>

      <!-- Progresso de Orçamento -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
        <div
          :style="{ width: percentualCoberto + '%' }"
          class="h-full bg-green-500 transition-all duration-300"
        />
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="p-4">
      <!-- Nome e Idade -->
      <div class="mb-3">
        <h3 class="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
          {{ crianca.nome }}
        </h3>
        <p class="text-sm text-gray-600">{{ crianca.idade }} anos • {{ crianca.regiao }}</p>
      </div>

      <!-- Vulnerabilidades -->
      <div class="mb-3">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="vuln in crianca.vulnerabilidades.slice(0, 2)"
            :key="vuln"
            class="text-xs bg-red-50 text-red-700 px-2 py-1 rounded"
          >
            {{ vuln }}
          </span>
          <span
            v-if="crianca.vulnerabilidades.length > 2"
            class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
          >
            +{{ crianca.vulnerabilidades.length - 2 }}
          </span>
        </div>
      </div>

      <!-- Orçamento -->
      <div class="border-t pt-3">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">Orçamento:</span>
          <span class="font-semibold text-gray-900">
            {{ formatarMoeda(crianca.orcamentoAnual) }}
          </span>
        </div>
        <div class="text-xs text-gray-500 mt-1">
          {{ percentualCoberto }}% coberto
        </div>
      </div>

      <!-- CTA -->
      <button
        @click.prevent
        class="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        Ver Detalhes
      </button>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  crianca: {
    type: Object,
    required: true
  }
})

const percentualCoberto = computed(() => {
  return Math.round((props.crianca.orcamentoCoberto / props.crianca.orcamentoAnual) * 100)
})

const statusColor = computed(() => {
  const status = props.crianca.status
  if (status === 'Disponível') return 'bg-blue-500'
  if (status === 'Parcialmente Apoiada') return 'bg-yellow-500'
  return 'bg-green-500'
})

const formatarMoeda = (valor) => {
  // Formatação customizada para MZN: xxx.xxx.xxx,xx MZN
  return valor.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' MZN'
}
</script>
