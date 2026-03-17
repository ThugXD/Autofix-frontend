<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard do Tutor</h1>
        <p class="text-gray-500 mt-1">Gerencie suas criancas e padrinhos</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Baby class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">3</p>
            <p class="text-sm text-gray-500">Minhas Criancas</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <UserPlus class="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">2</p>
            <p class="text-sm text-gray-500">Padrinhos Interessados</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Users class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">5</p>
            <p class="text-sm text-gray-500">Padrinhos Activos</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <MessageCircle class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">4</p>
            <p class="text-sm text-gray-500">Mensagens Novas</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Novas Solicitações de Apadrinhamento -->
    <div v-if="pedidosPorTutor.length > 0" class="card border-pink-200 bg-pink-50/30">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
            <UserPlus class="w-5 h-5" />
          </div>
          <h2 class="text-lg font-bold text-gray-900">Novas Solicitações</h2>
        </div>
        <span class="badge badge-warning">{{ pedidosPorTutor.length }} novas</span>
      </div>

      <div class="space-y-3">
        <div 
          v-for="pedido in pedidosPorTutor" 
          :key="pedido.id"
          class="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">
              {{ pedido.padrinhoNome[0] }}
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">{{ pedido.padrinhoNome }}</p>
              <p class="text-xs text-gray-500">Interessado em: <span class="font-semibold">{{ pedido.criancaNome }}</span></p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="responderTutor(pedido, false)" class="btn btn-secondary text-[10px] py-1.5 px-3">Recusar</button>
            <button @click="responderTutor(pedido, true)" class="btn btn-primary text-[10px] py-1.5 px-3">Aceitar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagamentos para Confirmar -->
    <div v-if="pagamentosPendentes.length > 0" class="card border-blue-200 bg-blue-50/30">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <CreditCard class="w-5 h-5" />
          </div>
          <h2 class="text-lg font-bold text-gray-900">Pagamentos para Confirmar</h2>
        </div>
        <span class="badge badge-info">{{ pagamentosPendentes.length }} pendentes</span>
      </div>

      <div class="space-y-4">
        <div 
          v-for="pagamento in pagamentosPendentes" 
          :key="pagamento.id"
          class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 italic font-serif text-gray-400">
                P
              </div>
              <div>
                <p class="font-bold text-gray-900">{{ formatarMoeda(pagamento.valor) }}</p>
                <p class="text-xs text-gray-500">Submetido em {{ formatarData(pagamento.dataSubmissao) }}</p>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="item in pagamento.itens" :key="item" class="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <a 
                :href="pagamento.comprovativoUrl" 
                target="_blank"
                class="flex-1 md:flex-none btn btn-secondary text-xs py-2 px-3 flex items-center gap-2"
              >
                <FileText class="w-4 h-4" />
                Ver Comprovativo
              </a>
              <button 
                @click="confirmarPagamento(pagamento)"
                :disabled="confirmandoId === pagamento.id"
                class="flex-1 md:flex-none btn btn-primary text-xs py-2 px-4 flex items-center justify-center gap-2"
              >
                <div v-if="confirmandoId === pagamento.id" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <CheckCircle v-else class="w-4 h-4" />
                Confirmar
              </button>
            </div>
          </div>
          
          <div v-if="pagamento.nota" class="mt-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-600 italic border-l-2 border-gray-200">
            "{{ pagamento.nota }}"
          </div>
        </div>
      </div>
    </div>

    <!-- Pagamentos Confirmados Recentemente -->
    <div class="card">
      <div class="mb-4">
        <h2 class="text-lg font-bold text-gray-900">Pagamentos Confirmados</h2>
        <p class="text-sm text-gray-500">Histórico de confirmações recentes</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="text-xs text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th class="py-3 px-4">Padrinho</th>
              <th class="py-3 px-4">Valor</th>
              <th class="py-3 px-4">Data Confirmação</th>
              <th class="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="pag in pagamentosConfirmados" :key="pag.id" class="text-sm">
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-[10px] font-bold text-primary">
                    P
                  </div>
                  <span class="font-medium text-gray-700">Padrinho #{{ pag.padrinhoId }}</span>
                </div>
              </td>
              <td class="py-3 px-4 font-bold text-gray-900">{{ formatarMoeda(pag.valor) }}</td>
              <td class="py-3 px-4 text-gray-500">{{ formatarData(pag.dataConfirmacao) }}</td>
              <td class="py-3 px-4 text-right">
                <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">CONFIRMADO</span>
              </td>
            </tr>
            <tr v-if="pagamentosConfirmados.length === 0">
              <td colspan="4" class="py-8 text-center text-gray-400 text-xs italic">
                Nenhum pagamento confirmado recentemente.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/app/tutor/interessados"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <UserPlus class="w-5 h-5 text-pink-600" />
          <span class="font-medium text-gray-700">Ver Interessados</span>
        </router-link>
        
        <router-link
          to="/app/tutor/progresso"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <TrendingUp class="w-5 h-5 text-green-600" />
          <span class="font-medium text-gray-700">Postar Progresso</span>
        </router-link>
        
        <router-link
          to="/app/tutor/mensagens"
          class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <MessageCircle class="w-5 h-5 text-blue-600" />
          <span class="font-medium text-gray-700">Mensagens</span>
        </router-link>
      </div>
    </div>
    <!-- Placeholder content -->
    <div class="card bg-orange-50 border-orange-200">
      <p class="text-orange-700 text-sm">
        <strong>Painel do Tutor:</strong> Gerencie os pagamentos e o progresso das crianças sob sua tutoria.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useApadrinhamentosStore } from '@/stores/apadrinhamentos'
import { useCriancasStore } from '@/stores/criancas'
import { 
  Baby, UserPlus, Users, MessageCircle, TrendingUp, 
  CreditCard, FileText, CheckCircle 
} from 'lucide-vue-next'

const toast = useToast()
const apadrinhamentosStore = useApadrinhamentosStore()
const criancasStore = useCriancasStore()

// Mock tutor ID (Rosa Tutora)
const tutorId = 6

const pedidosPorTutor = computed(() => {
  return apadrinhamentosStore.getPedidosPorTutor(tutorId).value
})

const confirmandoId = ref(null)

const pagamentosPendentes = computed(() => {
  return apadrinhamentosStore.pagamentos.filter(p => p.status === 'pendente')
})

const pagamentosConfirmados = computed(() => {
  return apadrinhamentosStore.pagamentos.filter(p => p.status === 'confirmado')
})

const formatarMoeda = (valor) => {
  return valor.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' MZN'
}

const formatarData = (data) => {
  return new Intl.DateTimeFormat('pt-MZ', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(data))
}

const confirmarPagamento = async (pagamento) => {
  confirmandoId.value = pagamento.id
  try {
    // 1. Confirmar no store de apadrinhamentos
    await apadrinhamentosStore.confirmarPagamento(pagamento.id)
    
    // 2. Atualizar o orçamento da criança no store de crianças
    criancasStore.atualizarOrcamentoCoberto(pagamento.criancaId, pagamento.valor)
    
    toast.success('Pagamento confirmado com sucesso!')
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error)
    toast.error('Erro ao confirmar o pagamento.')
  } finally {
    confirmandoId.value = null
  }
}

const responderTutor = async (pedido, aceito) => {
  try {
    await apadrinhamentosStore.responderTutor(pedido.id, aceito)
    toast.success(aceito ? 'Solicitação aceita!' : 'Solicitação recusada.')
  } catch (error) {
    toast.error('Erro ao processar solicitação.')
  }
}
</script>
