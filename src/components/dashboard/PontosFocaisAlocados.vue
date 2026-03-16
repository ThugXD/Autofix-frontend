<template>
  <div class="card h-full">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Building2 class="w-5 h-5 text-blue-600" />
        Parceiros e Pontos Focais
      </h3>
      <button 
        @click="router.push({ name: 'admin-comunidades' })"
        class="text-sm text-blue-600 font-medium cursor-pointer hover:underline"
      >
        Ver todos
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="pf in pontosFocais" :key="pf.id" 
           class="flex items-center justify-between p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition-all group">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
            {{ pf.instituicao.charAt(0) }}
          </div>
          <div>
            <h4 class="font-bold text-gray-900">{{ pf.instituicao }}</h4>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-sm text-gray-500">{{ pf.responsavel }}</span>
              <span class="w-1 h-1 rounded-full bg-gray-300"></span>
              <span class="text-xs text-gray-400">{{ pf.email }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-end">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  :class="pf.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'">
              {{ pf.status }}
            </span>
          </div>
          <p class="text-sm font-medium text-gray-600">
            <span class="text-blue-600 font-bold">{{ pf.criancas }}</span> crianças
          </p>
        </div>
      </div>
    </div>

    <div v-if="!pontosFocais.length" class="text-center py-10 text-gray-500">
      Nenhum parceiro alocado recentemente.
    </div>
  </div>
</template>

<script setup>
import { Building2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  pontosFocais: {
    type: Array,
    default: () => []
  }
})
</script>
