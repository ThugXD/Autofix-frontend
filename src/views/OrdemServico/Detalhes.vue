<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading && !ordem" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando ordem..." />
    </div>

    <!-- Content -->
    <div v-else-if="ordem" class="space-y-6">
      <!-- Header -->
      <div class="card">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex items-center gap-4">
            <button
              @click="$router.back()"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft class="w-5 h-5" />
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ ordem.numero }}</h1>
              <p class="text-sm text-gray-600 mt-1">
                Aberta em {{ formatDate(ordem.data_abertura) }}
              </p>
            </div>
            <span :class="['badge text-sm', statusClasses[ordem.status]]">
              {{ statusLabels[ordem.status] }}
            </span>
          </div>

          <div class="flex gap-2">
            <BaseButton
              variant="secondary"
              :icon="Printer"
              @click="handlePrint"
            >
              Imprimir
            </BaseButton>
            <BaseButton
              variant="secondary"
              :icon="Edit"
              @click="showEditModal = true"
            >
              Editar
            </BaseButton>
            <BaseButton
              v-if="ordem.status !== 'concluido'"
              variant="success"
              :icon="CheckCircle"
              @click="showStatusModal = true"
            >
              Atualizar Status
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Cliente e Veículo -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Cliente Info -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações do Cliente</h3>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{{ ordem.cliente_name }}</p>
                <p class="text-sm text-gray-600 mt-1">Cliente ID: #{{ ordem.cliente_id }}</p>
                <router-link
                  :to="`/clientes`"
                  class="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block"
                >
                  Ver perfil do cliente →
                </router-link>
              </div>
            </div>
          </div>

          <!-- Veículo Info -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações do Veículo</h3>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Car class="w-6 h-6 text-orange-600" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{{ ordem.veiculo_info }}</p>
                <p class="text-sm text-gray-600 mt-1">Veículo ID: #{{ ordem.veiculo_id }}</p>
                <router-link
                  :to="`/veiculos`"
                  class="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block"
                >
                  Ver detalhes do veículo →
                </router-link>
              </div>
            </div>
          </div>

          <!-- Problema e Diagnóstico -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Problema e Diagnóstico</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm font-medium text-gray-700 mb-1">Problema Relatado:</p>
                <p class="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {{ ordem.problema_relatado }}
                </p>
              </div>
              <div v-if="ordem.diagnostico">
                <p class="text-sm font-medium text-gray-700 mb-1">Diagnóstico:</p>
                <p class="text-gray-900 bg-blue-50 p-3 rounded-lg">
                  {{ ordem.diagnostico }}
                </p>
              </div>
              <div v-if="ordem.observacoes">
                <p class="text-sm font-medium text-gray-700 mb-1">Observações:</p>
                <p class="text-gray-600 bg-yellow-50 p-3 rounded-lg">
                  {{ ordem.observacoes }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Resumo Financeiro -->
          <div class="card bg-gradient-to-br border border-gray-300 from-gray-50 to-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h3>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Serviços:</span>
                <span class="font-medium text-gray-900">
                  {{ formatCurrency(ordem.subtotal_servicos) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Peças:</span>
                <span class="font-medium text-gray-900">
                  {{ formatCurrency(ordem.subtotal_pecas) }}
                </span>
              </div>
              <div v-if="ordem.desconto > 0" class="flex justify-between text-sm">
                <span class="text-gray-600">Desconto:</span>
                <span class="font-medium text-red-600">
                  -{{ formatCurrency(ordem.desconto) }}
                </span>
              </div>
              <div v-if="ordem.taxa_adicional > 0" class="flex justify-between text-sm">
                <span class="text-gray-600">Taxa Adicional:</span>
                <span class="font-medium text-gray-900">
                  {{ formatCurrency(ordem.taxa_adicional) }}
                </span>
              </div>
              <div class="border-t pt-3 flex justify-between">
                <span class="font-semibold text-gray-900">Total:</span>
                <span class="font-bold text-xl text-gray-900">
                  {{ formatCurrency(ordem.total) }}
                </span>
              </div>
            </div>

            <!-- Status do Pagamento -->
            <div class="mt-4 pt-4 border-t">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Status Pagamento:</span>
                <span :class="['badge', totalPago >= ordem.total ? 'badge-success' : 'badge-warning']">
                  {{ totalPago >= ordem.total ? 'Pago' : 'Pendente' }}
                </span>
              </div>
              <div class="mt-2 flex justify-between text-sm">
                <span class="text-gray-600">Pago:</span>
                <span class="font-medium text-gray-900">{{ formatCurrency(totalPago) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Restante:</span>
                <span class="font-medium text-red-600">
                  {{ formatCurrency(Math.max(0, ordem.total - totalPago)) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Detalhes Adicionais -->
          <div class="card border border-gray-300">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Detalhes</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Prioridade:</span>
                <span :class="['badge', priorityClasses[ordem.priority]]">
                  {{ priorityLabels[ordem.priority] }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Data Prevista:</span>
                <span class="font-medium text-gray-900">
                  {{ ordem.data_prevista ? formatDate(ordem.data_prevista) : '-' }}
                </span>
              </div>
              <div v-if="ordem.data_conclusao" class="flex justify-between">
                <span class="text-gray-600">Data Conclusão:</span>
                <span class="font-medium text-gray-900">
                  {{ formatDate(ordem.data_conclusao) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Responsável:</span>
                <span class="font-medium text-gray-900">
                  {{ ordem.responsavel_name || '-' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Itens da Ordem -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Itens da Ordem</h3>
          <BaseButton
            variant="secondary"
            :icon="Plus"
            size="sm"
            @click="showAddItemModal = true"
          >
            Adicionar Item
          </BaseButton>
        </div>

        <ItensTable
          :itens="ordem.itens"
          @remove="handleRemoveItem"
        />
      </div>

      <!-- Pagamentos -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Pagamentos</h3>
          <BaseButton
            variant="secondary"
            :icon="Plus"
            size="sm"
            @click="showAddPaymentModal = true"
            :disabled="totalPago >= ordem.total"
          >
            Registar Pagamento
          </BaseButton>
        </div>

        <PagamentosTable
          :pagamentos="ordem.pagamentos"
        />
      </div>
    </div>

    <!-- Modals -->
    <AddItemModal
      v-model="showAddItemModal"
      :ordem-id="ordem?.id"
      @added="handleItemAdded"
    />

    <AddPaymentModal
      v-model="showAddPaymentModal"
      :ordem="ordem"
      :valor-restante="ordem ? ordem.total - totalPago : 0"
      @added="handlePaymentAdded"
    />

    <StatusUpdateModal
      v-model="showStatusModal"
      :ordem="ordem"
      @updated="handleStatusUpdated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdensServicoStore } from '@/stores/ordensServico'
import { format } from 'date-fns'
import {
  ArrowLeft,
  User,
  Car,
  Printer,
  Edit,
  CheckCircle,
  Plus
} from 'lucide-vue-next'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import ItensTable from '@/components/ordens/ItensTable.vue'
import PagamentosTable from '@/components/ordens/PagamentosTable.vue'
import AddItemModal from '@/components/ordens/AddItemModal.vue'
import AddPaymentModal from '@/components/ordens/AddPaymentModal.vue'
import StatusUpdateModal from '@/components/ordens/StatusUpdateModal.vue'

const route = useRoute()
const ordensStore = useOrdensServicoStore()

const loading = ref(false)
const showAddItemModal = ref(false)
const showAddPaymentModal = ref(false)
const showStatusModal = ref(false)
const showEditModal = ref(false)

const ordem = computed(() => ordensStore.currentOrdem)

const totalPago = computed(() => {
  if (!ordem.value?.pagamentos) return 0
  return ordem.value.pagamentos
    .filter(p => p.status === 'confirmado')
    .reduce((sum, p) => sum + p.valor, 0)
})

onMounted(async () => {
  const ordemId = route.params.id
  if (ordemId) {
    loading.value = true
    await ordensStore.fetchOrdemById(parseInt(ordemId))
    loading.value = false
  }
})

const statusLabels = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  aguardando_pecas: 'Aguardando Peças',
  concluido: 'Concluído',
  cancelado: 'Cancelado'
}

const statusClasses = {
  pendente: 'badge-warning',
  em_andamento: 'badge-info',
  aguardando_pecas: 'badge-warning',
  concluido: 'badge-success',
  cancelado: 'badge-danger'
}

const priorityLabels = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
  urgente: 'Urgente'
}

const priorityClasses = {
  baixa: 'bg-gray-100 text-gray-700',
  media: 'bg-blue-100 text-blue-700',
  alta: 'bg-orange-100 text-orange-700',
  urgente: 'bg-red-100 text-red-700'
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return '-'
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value) + ' MT'
}

const handleRemoveItem = async (itemId) => {
  if (confirm('Deseja realmente remover este item?')) {
    await ordensStore.removeItem(ordem.value.id, itemId)
  }
}

const handleItemAdded = async () => {
  showAddItemModal.value = false
  await ordensStore.fetchOrdemById(ordem.value.id)
}

const handlePaymentAdded = async () => {
  showAddPaymentModal.value = false
  await ordensStore.fetchOrdemById(ordem.value.id)
}

const handleStatusUpdated = async () => {
  showStatusModal.value = false
  await ordensStore.fetchOrdemById(ordem.value.id)
}

const handlePrint = () => {
  window.print()
}
</script>

<style>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>