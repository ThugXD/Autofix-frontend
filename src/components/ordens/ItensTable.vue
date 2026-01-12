<template>
  <div>
    <div v-if="!itens.length" class="text-center py-8 text-gray-500">
      Nenhum item adicionado ainda
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
              Tipo
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
              Descrição
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
              Qtd
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
              Preço Unit.
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
              Subtotal
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="item in itens" :key="item.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">
              <span :class="['badge', item.tipo === 'servico' ? 'badge-info' : 'badge-success']">
                {{ item.tipo === 'servico' ? 'Serviço' : 'Peça' }}
              </span>
            </td>
            <td class="px-4 py-3">
              <p class="font-medium text-gray-900">{{ item.descricao }}</p>
            </td>
            <td class="px-4 py-3 text-center text-gray-900">
              {{ item.quantidade }}
            </td>
            <td class="px-4 py-3 text-right text-gray-900">
              {{ formatCurrency(item.preco_unitario) }}
            </td>
            <td class="px-4 py-3 text-right font-semibold text-gray-900">
              {{ formatCurrency(item.subtotal) }}
            </td>
            <td class="px-4 py-3 text-center">
              <button
                @click="$emit('remove', item.id)"
                class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remover"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-gray-50 border-t-2">
          <tr>
            <td colspan="4" class="px-4 py-3 text-right font-semibold text-gray-900">
              Total:
            </td>
            <td class="px-4 py-3 text-right font-bold text-lg text-gray-900">
              {{ formatCurrency(total) }}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
  itens: {
    type: Array,
    default: () => []
  }
})

defineEmits(['remove'])

const total = computed(() => {
  return props.itens.reduce((sum, item) => sum + item.subtotal, 0)
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value) + ' MT'
}
</script>