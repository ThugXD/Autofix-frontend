<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Padrinhos Interessados</h1>
        <p class="text-gray-500 mt-1">Aceite ou rejeite padrinhos interessados nas suas crianças</p>
      </div>
    </div>

    <!-- Lista de Solicitações -->
    <div v-if="pedidosPorTutor.length > 0" class="space-y-4">
      <div 
        v-for="pedido in pedidosPorTutor" 
        :key="pedido.id"
        class="card hover:shadow-md transition-shadow"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <!-- Padrinho Info -->
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-lg shrink-0">
              {{ pedido.padrinhoNome[0] }}
            </div>
            <div class="space-y-1">
              <h3 class="text-lg font-bold text-gray-900">{{ pedido.padrinhoNome }}</h3>
              <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                <span class="flex items-center gap-1.5">
                  <Mail class="w-4 h-4" /> {{ pedido.padrinhoEmail }}
                </span>
                <span class="flex items-center gap-1.5">
                  <Phone class="w-4 h-4" /> {{ pedido.padrinhoTelefone }}
                </span>
                <span class="flex items-center gap-1.5">
                  <MapPin class="w-4 h-4" /> {{ pedido.padrinhoRegiao }}
                </span>
              </div>
            </div>
          </div>

          <!-- Child Info -->
          <div class="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div class="italic text-xs text-gray-400">Interessado em:</div>
            <div class="font-bold text-gray-800">{{ pedido.criancaNome }}</div>
            <div class="text-xs text-gray-500">({{ pedido.criancaIdade }} anos)</div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button 
              @click="responder(pedido, false)"
              class="btn btn-secondary px-6"
            >
              Recusar
            </button>
            <button 
              @click="responder(pedido, true)"
              class="btn btn-primary px-6"
            >
              Aceitar Padrinho
            </button>
          </div>
        </div>

        <!-- Message -->
        <div v-if="pedido.padrinhoMensagem" class="mt-6 p-4 bg-gray-50 rounded-2xl text-sm text-gray-600 italic border-l-4 border-pink-200">
          "{{ pedido.padrinhoMensagem }}"
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="card py-12 text-center">
      <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <UserPlus class="w-8 h-8 text-gray-300" />
      </div>
      <h3 class="text-lg font-medium text-gray-900">Nenhuma solicitação pendente</h3>
      <p class="text-gray-500 mt-1 max-w-sm mx-auto">
        No momento não existem padrinhos aguardando sua aprovação.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useApadrinhamentosStore } from '@/stores/apadrinhamentos'
import { useToast } from 'vue-toastification'
import { Mail, Phone, MapPin, UserPlus } from 'lucide-vue-next'

const apadrinhamentosStore = useApadrinhamentosStore()
const toast = useToast()

// Mock tutor ID (Rosa Tutora)
const tutorId = 6

const pedidosPorTutor = computed(() => {
  return apadrinhamentosStore.getPedidosPorTutor(tutorId).value
})

const responder = async (pedido, aceito) => {
  try {
    await apadrinhamentosStore.responderTutor(pedido.id, aceito)
    toast.success(aceito ? 'Solicitação aceita com sucesso!' : 'Solicitação recusada.')
  } catch (error) {
    console.error('Erro ao responder solicitação:', error)
    toast.error('Ocorreu um erro. Tente novamente.')
  }
}
</script>
