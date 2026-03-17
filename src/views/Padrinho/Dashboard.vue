<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Meu Padrinhado</h1>
        <p class="text-gray-500 mt-1">Acompanhe suas criancas apadrinhadas e as suas atualizacoes</p>
      </div>
      <router-link to="/">
        <BaseButton variant="secondary">
          <BookOpen class="w-4 h-4 mr-2" />
          Ver Catalogo
        </BaseButton>
      </router-link>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <Heart class="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ padrinhados.length }}</p>
            <p class="text-sm text-gray-500">Criancas apadrinhadas</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <MessageCircle class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ novasMensagens }}</p>
            <p class="text-sm text-gray-500">Mensagens nuevas</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <TrendingUp class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ atualizacoes.length }}</p>
            <p class="text-sm text-gray-500">Actualizacoes recentes</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Solicitações pendentes -->
    <div v-if="pedidosPendentes.length > 0" class="card">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Solicitações pendentes</h2>
          <p class="text-sm text-gray-500">Aguardando aprovação do Tutor</p>
        </div>
        <router-link
          to="/app/padrinho/mensagens"
          class="text-xs font-semibold text-primary hover:underline"
        >
          Ver mensagens
        </router-link>
      </div>
      <div class="space-y-3">
        <div
          v-for="pedido in pedidosPendentes"
          :key="pedido.id"
          class="flex items-start gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-gray-100 transition cursor-pointer"
          @click="irParaMensagens({ remetente: 'Tutor', data: pedido.dataSolicitacao, conteudo: 'Solicitação de apadrinhamento enviada.' })"
        >
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
            <span class="text-sm font-semibold text-purple-600">{{ getInitials(pedido.padrinhoNome) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-sm font-semibold text-gray-900 truncate">{{ pedido.criancaNome }}</h3>
              <span class="text-xs text-gray-400">{{ formatarData(pedido.dataSolicitacao) }}</span>
            </div>
            <p class="text-xs text-gray-600 line-clamp-2">Status: <span class="font-semibold">{{ STATUS_LABELS[pedido.status] }}</span></p>
          </div>
          <span class="text-[10px] font-semibold text-white bg-amber-600 px-2 py-1 rounded-full">Aguardando</span>
        </div>
      </div>
    </div>

    <!-- Meus Afilhados -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Meus Afilhados</h2>
          <p class="text-sm text-gray-500">Veja o progresso e as necessidades de cada um.</p>
        </div>
        <router-link
          to="/"
          class="text-xs font-semibold text-primary hover:underline"
        >
          Ver mais
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="crianca in padrinhados"
          :key="crianca.id"
          class="border border-gray-100 rounded-2xl p-4 bg-white hover:shadow-sm transition"
        >
          <div class="flex items-center gap-4">
            <img :src="crianca.foto" class="w-14 h-14 rounded-xl object-cover" />
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900">{{ crianca.nome }}</h3>
              <p class="text-xs text-gray-500">{{ crianca.idade }} anos • {{ crianca.regiao }}</p>
            </div>
            <span
              :class="[
                'text-[11px] font-bold px-2 py-0.5 rounded-full',
                STATUS_CLASSES[crianca.status]
              ]"
            >
              {{ STATUS_LABELS[crianca.status] }}
            </span>
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Orçamento anual</span>
              <span class="font-semibold text-gray-900">{{ formatarMoeda(crianca.orcamentoAnual) }}</span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary"
                :style="{ width: `${getPercentualCoberto(crianca)}%` }"
              ></div>
            </div>
            <div class="flex items-center justify-between text-[10px] text-gray-500 mt-1">
              <span>{{ getPercentualCoberto(crianca) }}% coberto</span>
              <button
                @click="irParaPerfil(crianca.id)"
                class="text-primary font-semibold hover:underline"
              >
                Ver perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensagens Recentes -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Mensagens Recentes</h2>
          <p class="text-sm text-gray-500">Trocas com tutores e pontos focais.</p>
        </div>
        <router-link to="/app/padrinho/mensagens" class="text-xs font-semibold text-primary hover:underline">
          Ver todas
        </router-link>
      </div>

      <div class="space-y-3">
        <div
          v-for="msg in mensagensRecentes"
          :key="msg.id"
          class="flex items-start gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-gray-100 transition cursor-pointer"
          @click="irParaMensagens(msg)"
        >
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span class="text-sm font-semibold text-blue-600">{{ getInitials(msg.remetente) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-sm font-semibold text-gray-900 truncate">{{ msg.remetente }}</h3>
              <span class="text-[11px] text-gray-400">{{ msg.data }}</span>
            </div>
            <p class="text-xs text-gray-600 line-clamp-2">{{ msg.conteudo }}</p>
          </div>
          <span
            v-if="!msg.lida"
            class="w-2 h-2 bg-primary rounded-full mt-2"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Heart, MessageCircle, TrendingUp, BookOpen } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import { useApadrinhamentosStore, STATUS, STATUS_LABELS, STATUS_CLASSES } from '@/stores/apadrinhamentos'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const apadrinhamentosStore = useApadrinhamentosStore()
const authStore = useAuthStore()

// Padrinho ID dinâmico do authStore
const padrinhoId = computed(() => authStore.user?.id || 0)

const padrinhados = computed(() =>
  apadrinhamentosStore.getApadrinhamentosAtivosDosPadrinho(padrinhoId.value).value.map(a => ({
    id: a.criancaId,
    nome: a.criancaNome,
    idade: a.criancaIdade ?? 9,
    regiao: a.criancaRegiao,
    foto: a.criancaFoto,
    orcamentoAnual: a.orcamentoAnual ?? 15000,
    orcamentoCoberto: a.orcamentoCoberto ?? 5000,
    status: a.status,
    apadrinhamentoId: a.id,
  }))
)

const pedidosPendentes = computed(() =>
  apadrinhamentosStore.lista.filter(a => a.padrinhoId === padrinhoId.value && a.status === STATUS.PENDENTE_TUTOR)
)

const mensagens = ref([
  {
    id: 1,
    remetente: 'Ana Tutor (Tutor)',
    data: '15/03/2026',
    conteudo: 'Bom dia! Envio o relatório de frequência escolar do Miguel. Ele está muito empenhado nas aulas.',
    lida: false
  },
  {
    id: 2,
    remetente: 'João Silva (PF Temático)',
    data: '12/03/2026',
    conteudo: 'Olá! Recebemos a documentação atualizada do gabinete. Próximo passo: acompanhar o plano de nutrição.',
    lida: true
  },
  {
    id: 3,
    remetente: 'Maria Santos (PF Comunitário)',
    data: '08/03/2026',
    conteudo: 'Boa tarde! Agendamos visita na próxima semana para avaliar o estado de saúde da Sara.',
    lida: true
  }
])

const atualizacoes = computed(() => {
  const confirmedPayments = apadrinhamentosStore.pagamentos
    .filter(p => p.padrinhoId === padrinhoId.value && p.status === 'confirmado')
    .map(p => ({
      id: `p-${p.id}`,
      titulo: `Pagamento Confirmado (${formatarMoeda(p.valor)})`,
      data: formatarData(p.dataConfirmacao)
    }))

  const baseUpdates = [
    { id: 101, titulo: 'Relatório de Educação recebido', data: '15/03/2026' },
    { id: 102, titulo: 'Plano de nutrição atualizado', data: '12/03/2026' },
  ]

  return [...confirmedPayments, ...baseUpdates].slice(0, 5)
})

const novasMensagens = computed(() => mensagens.value.filter(m => !m.lida).length)

const mensagensRecentes = computed(() => mensagens.value.slice(0, 3))

const formatarMoeda = (valor) => {
  return valor.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' MZN'
}

const formatarData = (dataISO) => {
  const dt = new Date(dataISO)
  if (Number.isNaN(dt.getTime())) return dataISO
  return dt.toLocaleDateString('pt-PT')
}

const getPercentualCoberto = (crianca) => {
  return Math.round((crianca.orcamentoCoberto / crianca.orcamentoAnual) * 100)
}

const getInitials = (nome) => {
  return nome
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
}

const irParaPerfil = (id) => {
  router.push(`/crianca/${id}`)
}

const irParaMensagens = (msg) => {
  router.push('/app/padrinho/mensagens')
}
</script>
