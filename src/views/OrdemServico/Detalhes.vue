<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading && !ordem" class="flex items-center justify-center py-20">
      <LoadingSpinner size="lg" text="Carregando ordem..." />
    </div>

    <!-- Main System UI (Hidden on Print) -->
    <div v-else-if="ordem" class="main-ui no-print space-y-6">
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
                Aberta em {{ formatDate(ordem.dataAbertura) }}
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
              variant="primary"
              :icon="Download"
              :loading="isGeneratingPdf"
              loading-text="Gerando..."
              @click="handleDownloadPdf"
            >
              PDF
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
                <p class="font-semibold text-gray-900">{{ ordem.cliente?.name || 'Não informado' }}</p>
                <p class="text-sm text-gray-600 mt-1">Cliente ID: #{{ ordem.cliente?.id?.split('-')[0] || 'N/A' }}</p>
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
                <p class="font-semibold text-gray-900">{{ ordem.veiculo?.brand }} {{ ordem.veiculo?.model }}</p>
                <p class="text-sm text-gray-600 mt-1">Viatura ID: #{{ ordem.veiculo?.id?.split('-')[0] || 'N/A' }}</p>
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
                  {{ ordem.problemaRelatado }}
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
          <div 
            class="card transition-all duration-300 border shadow-sm"
            :class="totalPago >= ordem.total ? 'bg-green-50 border-green-200 ring-1 ring-green-100' : 'bg-gradient-to-br border-gray-300 from-gray-50 to-gray-100'"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Resumo Financeiro</h3>
              <CheckCircle v-if="totalPago >= ordem.total" class="w-5 h-5 text-green-600" />
            </div>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Serviços:</span>
                <span class="font-medium text-gray-900">
                  {{ formatCurrency(ordem.subtotalServicos) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Peças:</span>
                <span class="font-medium text-gray-900">
                  {{ formatCurrency(ordem.subtotalPecas) }}
                </span>
              </div>
              <div v-if="ordem.desconto > 0" class="flex justify-between text-sm">
                <span class="text-gray-600">Desconto:</span>
                <span class="font-medium text-red-600">
                  -{{ formatCurrency(ordem.desconto) }}
                </span>
              </div>
              <div v-if="ordem.taxaAdicional > 0" class="flex justify-between text-sm">
                <span class="text-gray-600">Taxa Adicional:</span>
                <span class="font-medium text-gray-900">
                  {{ formatCurrency(ordem.taxaAdicional) }}
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
                <span class="font-medium text-green-600 ">{{ formatCurrency(totalPago) }}</span>
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
                  {{ ordem.dataPrevista ? formatDate(ordem.dataPrevista) : '-' }}
                </span>
              </div>
              <div v-if="ordem.dataConclusao" class="flex justify-between">
                <span class="text-gray-600">Data Conclusão:</span>
                <span class="font-medium text-gray-900">
                  {{ formatDate(ordem.dataConclusao) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Responsável:</span>
                <span class="font-medium text-gray-900">
                  {{ ordem.responsavel?.name || '-' }}
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

    <!-- Professional Print Template (Only visible on print) -->
    <div v-if="ordem" class="hidden print:block print-template font-serif text-black p-8 bg-white min-h-screen">
      <!-- Receipt Header -->
      <div class="flex justify-between items-start border-b-2 border-black pb-6 mb-8 text-center sm:text-left">
        <div class="space-y-1 text-left">
          <h1 class="text-4xl font-black text-gray-900 italic tracking-tighter">FIXAUTO</h1>
          <p class="text-sm font-bold uppercase">Soluções Automotivas Profissionais</p>
          <p class="text-xs">Rua da Oficina, nº 123 • Bairro Industrial • Cidade, Moçambique</p>
          <p class="text-xs">Tel: (+258) 84 000 0000 • Email: contacto@fixauto.co.mz</p>
        </div>
        <div class="text-right flex flex-col justify-between h-full">
          <div class="bg-gray-100 p-2 border border-black mb-4">
            <h2 class="text-xl font-bold">RECIBO DE SERVIÇO</h2>
            <p class="text-lg font-mono">№ {{ ordem.numero }}</p>
          </div>
          <p class="text-sm">Data de Emissão: <span class="font-bold">{{ formatDate(new Date()) }}</span></p>
        </div>
      </div>

      <!-- Customer / Vehicle Grid -->
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div class="border border-black p-4 rounded bg-gray-50/50">
          <h3 class="text-sm font-bold border-b border-black mb-2 uppercase italic">DADOS DO CLIENTE</h3>
          <p class="font-bold text-lg">{{ ordem.cliente?.name }}</p>
          <p class="text-sm">ID: {{ ordem.cliente?.id?.split('-')[0] }}</p>
          <p class="text-sm" v-if="ordem.cliente?.phone">Telefone: {{ ordem.cliente?.phone }}</p>
          <p class="text-sm" v-if="ordem.cliente?.email">Email: {{ ordem.cliente?.email }}</p>
        </div>
        <div class="border border-black p-4 rounded">
          <h3 class="text-sm font-bold border-b border-black mb-2 uppercase italic">DADOS DO VEÍCULO</h3>
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded">{{ ordem.veiculo?.plate }}</span>
            <span class="text-sm font-bold">{{ ordem.veiculo?.brand }} {{ ordem.veiculo?.model }}</span>
          </div>
          <div class="grid grid-cols-2 text-xs gap-y-1">
            <p><span class="font-bold">Cor:</span> {{ ordem.veiculo?.color || '-' }}</p>
            <p><span class="font-bold">Ano:</span> {{ ordem.veiculo?.year || '-' }}</p>
            <p><span class="font-bold">Quilometragem:</span> {{ ordem.veiculo?.mileage ? `${ordem.veiculo.mileage} km` : '-' }}</p>
            <p><span class="font-bold">Combustível:</span> {{ ordem.veiculo?.fuelType || '-' }}</p>
          </div>
        </div>
      </div>

      <!-- Technical Summary -->
      <div class="mb-8 p-4 border border-gray-300 rounded shadow-sm">
        <h3 class="text-sm font-bold uppercase mb-2">Relatório Técnico</h3>
        <div class="space-y-4 text-sm italic">
          <div>
            <p class="font-bold not-italic underline">Sintoma/Problema:</p>
            <p class="text-gray-800">{{ ordem.problemaRelatado }}</p>
          </div>
          <div v-if="ordem.diagnostico">
            <p class="font-bold not-italic underline">Diagnóstico & Solução:</p>
            <p class="text-gray-800">{{ ordem.diagnostico }}</p>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <div class="mb-8">
        <h3 class="text-sm font-bold border-b border-black mb-2 uppercase">ITENS E PEÇAS UTILIZADAS</h3>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 border-y border-black">
              <th class="py-2 text-left text-xs uppercase px-2">Descrição</th>
              <th class="py-2 text-center text-xs uppercase w-16">Qtd</th>
              <th class="py-2 text-right text-xs uppercase w-32 px-2">P. Unitário</th>
              <th class="py-2 text-right text-xs uppercase w-32 px-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in ordem.itens" :key="item.id" class="border-b border-gray-300">
              <td class="py-2 text-sm px-2">
                <span class="font-bold">{{ item.tipo === 'servico' ? '🛠️' : '📦' }} {{ item.descricao }}</span>
              </td>
              <td class="py-2 text-center text-sm font-mono">{{ item.quantidade }}</td>
              <td class="py-2 text-right text-sm font-mono px-2">{{ formatCurrency(item.precoUnitario) }}</td>
              <td class="py-2 text-right text-sm font-mono px-2 font-bold">{{ formatCurrency(item.subtotal) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Financial Calculations -->
      <div class="flex justify-end mb-8 page-break-inside-avoid">
        <div class="w-72 space-y-2">
          <div class="flex justify-between text-sm py-1 border-b border-dashed border-gray-400">
            <span>Subtotal de Serviços:</span>
            <span class="font-mono">{{ formatCurrency(ordem.subtotalServicos) }}</span>
          </div>
          <div class="flex justify-between text-sm py-1 border-b border-dashed border-gray-400">
            <span>Subtotal de Peças:</span>
            <span class="font-mono">{{ formatCurrency(ordem.subtotalPecas) }}</span>
          </div>
          <div v-if="ordem.desconto > 0" class="flex justify-between text-sm py-1 border-b border-dashed border-gray-400 text-red-700">
            <span>Desconto Aplicado:</span>
            <span class="font-mono">-{{ formatCurrency(ordem.desconto) }}</span>
          </div>
          <div class="flex justify-between text-lg font-black bg-gray-100 p-2 border border-black">
            <span>TOTAL GERAL:</span>
            <span class="font-mono">{{ formatCurrency(ordem.total) }}</span>
          </div>
          
          <div class="pt-4 space-y-1">
             <div class="flex justify-between text-sm">
                <span class="font-bold underline">TOTAL JÁ PAGO:</span>
                <span class="font-mono font-bold">{{ formatCurrency(totalPago) }}</span>
             </div>
             <div class="flex justify-between text-sm border-t border-black pt-1">
                <span class="font-bold uppercase">Saldo em Aberto:</span>
                <span :class="['font-mono font-black', totalPago >= ordem.total ? 'text-green-700' : 'text-red-700']">
                  {{ formatCurrency(Math.max(0, ordem.total - totalPago)) }}
                </span>
             </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-auto pt-20">
        <div class="grid grid-cols-2 gap-20">
          <div class="text-center border-t border-black pt-2">
            <p class="text-xs uppercase font-bold text-gray-600">Assinatura do Responsável</p>
            <p class="text-sm mt-1 font-bold">{{ ordem.responsavel?.name || 'MecânicoFIX' }}</p>
          </div>
          <div class="text-center border-t border-black pt-2">
            <p class="text-xs uppercase font-bold text-gray-600">Assinatura do Cliente</p>
            <p class="text-sm mt-1">{{ ordem.cliente?.name }}</p>
          </div>
        </div>
        <div class="mt-12 text-center text-[10px] text-gray-400 italic">
          Este documento é um resumo de serviço prestado pela FIXAUTO. Válido para fins de conferência.
        </div>
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
  Plus,
  Download
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
    await ordensStore.fetchOrdemById(ordemId)
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

import html2pdf from 'html2pdf.js'
import { Download, FileText } from 'lucide-vue-next'

const isGeneratingPdf = ref(false)

const handleDownloadPdf = async () => {
  const element = document.querySelector('.print-template')
  
  // Make flexible for PDF generation (temporarily remove hidden class if needed or clone)
  // For simplicity, we clone the node to a visible off-screen area or just use the class trick
  
  // Better approach: Clone the element
  const clone = element.cloneNode(true)
  clone.classList.remove('hidden')
  clone.classList.remove('print:block')
  clone.style.display = 'block'
  clone.style.width = '800px' // A4 width approx
  
  // Container for the clone
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '-9999px'
  container.style.left = '-9999px'
  container.appendChild(clone)
  document.body.appendChild(container)
  
  isGeneratingPdf.value = true
  
  const opt = {
    margin: 10,
    filename: `Ordem_${ordem.value.numero}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  try {
    await html2pdf().set(opt).from(clone).save()
  } catch (err) {
    console.error('PDF Generation Error:', err)
  } finally {
    document.body.removeChild(container)
    isGeneratingPdf.value = false
  }
}
</script>

<style>
@media print {
  @page {
    margin: 1.5cm;
    size: A4;
  }
  
  .no-print {
    display: none !important;
  }

  .main-ui {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  body {
    background: white !important;
    font-family: serif !important;
    font-size: 11pt !important;
    color: black !important;
  }

  .print-template {
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .page-break-inside-avoid {
    page-break-inside: avoid;
  }
}
</style>