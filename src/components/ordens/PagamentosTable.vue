<template>
  <div>
    <div v-if="!pagamentos.length" class="text-center py-8 text-gray-500">
      Nenhum pagamento registrado
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
              Data
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
              Método
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
              Valor
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
              Status
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
              Observações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="pagamento in pagamentos" :key="pagamento.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 text-gray-900">
              {{ formatDate(pagamento.data_pagamento) }}
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <component :is="getMetodoIcon(pagamento.metodo)" class="w-4 h-4 text-gray-600" />
                <span class="text-gray-900">{{ metodoLabels[pagamento.metodo] }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-right font-semibold text-gray-900">
              {{ formatCurrency(pagamento.valor) }}
            </td>
            <td class="px-4 py-3 text-center">
              <span :class="['badge', statusClasses[pagamento.status]]">
                {{ statusLabels[pagamento.status] }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
              {{ pagamento.observacoes || '-' }}
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-gray-50 border-t-2">
          <tr>
            <td colspan="2" class="px-4 py-3 text-right font-semibold text-gray-900">
              Total Pago:
            </td>
            <td class="px-4 py-3 text-right font-bold text-lg text-green-600">
              {{ formatCurrency(totalPago) }}
            </td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import {
  Banknote,
  CreditCard,
  Smartphone,
  ArrowRightLeft
} from 'lucide-vue-next'

const props = defineProps({
  pagamentos: {
    type: Array,
    default: () => []
  }
})

const metodoLabels = {
  dinheiro: 'Dinheiro',
  cartao_credito: 'Cartão de Crédito',
  cartao_debito: 'Cartão de Débito',
  pix: 'M-Pesa',
  transferencia: 'Transferência'
}

const statusLabels = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado'
}

const statusClasses = {
  pendente: 'badge-warning',
  confirmado: 'badge-success',
  cancelado: 'badge-danger'
}

const totalPago = computed(() => {
  return props.pagamentos
    .filter(p => p.status === 'confirmado')
    .reduce((sum, p) => sum + p.valor, 0)
})

const getMetodoIcon = (metodo) => {
  const icons = {
    dinheiro: Banknote,
    cartao_credito: CreditCard,
    cartao_debito: CreditCard,
    pix: Smartphone,
    transferencia: ArrowRightLeft
  }
  return icons[metodo] || Banknote
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm')
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
</script>