<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Categoria</th>
          <th class="text-right">Preço Unit.</th>
          <th class="text-center">Stock</th>
          <th>Localização</th>
          <th>Status</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="9" class="text-center py-8">
            <LoadingSpinner size="md" text="Carregando peças..." />
          </td>
        </tr>

        <tr v-else-if="!pecas.length">
          <td colspan="9" class="text-center py-8 text-gray-500">
            Nenhuma peça encontrada no stock
          </td>
        </tr>

        <tr v-else v-for="peca in pecas" :key="peca.id" class="hover:bg-gray-50">
          <td>
            <span class="font-mono text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {{ peca.code }}
            </span>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ peca.name }}</p>
                <p class="text-xs text-gray-500 truncate max-w-[200px]" :title="peca.description">
                  {{ peca.description || 'Sem descrição' }}
                </p>
              </div>
            </div>
          </td>
          <td class="text-gray-700">{{ peca.brand || '-' }}</td>
          <td>
            <span class="badge badge-info">{{ peca.category || 'Geral' }}</span>
          </td>
          <td class="text-right font-semibold text-gray-900">
            {{ formatCurrency(peca.unitPrice) }}
          </td>
          <td class="text-center">
            <div class="flex flex-col items-center">
              <span :class="[
                'badge font-bold',
                peca.quantityInStock <= peca.minStockLevel ? 'badge-danger' : 'badge-success'
              ]">
                {{ peca.quantityInStock }} un.
              </span>
              <span v-if="peca.quantityInStock <= peca.minStockLevel" class="text-[10px] text-red-600 font-medium mt-1">
                Stock Baixo
              </span>
            </div>
          </td>
          <td class="text-sm text-gray-600 italic">{{ peca.location || '-' }}</td>
          <td>
            <span :class="['badge', peca.isActive ? 'badge-success' : 'badge-danger']">
              {{ peca.isActive ? 'Ativo' : 'Inativo' }}
            </span>
          </td>
          <td>
            <div class="flex items-center justify-center gap-2">
              <button
                @click="$emit('movement', peca)"
                class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Movimentar Stock"
              >
                <ArrowDownUp class="w-4 h-4" />
              </button>
              <button
                @click="$emit('edit', peca)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Editar"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button
                @click="$emit('delete', peca)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { Package, Edit, Trash2, ArrowDownUp } from 'lucide-vue-next'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  pecas: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete', 'movement'])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 0
  }).format(value)
}
</script>
