<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Cliente</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>Data de Registro</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="7" class="text-center py-8">
            <LoadingSpinner size="md" text="Carregando clientes..." />
          </td>
        </tr>

        <tr v-else-if="!clientes.length">
          <td colspan="7" class="text-center py-8 text-gray-500">
            Nenhum cliente encontrado
          </td>
        </tr>

        <tr v-else v-for="cliente in clientes" :key="cliente.id">
          <td class="font-medium text-gray-900">#{{ cliente.id }}</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ cliente.name }}</p>
              </div>
            </div>
          </td>
          <td class="text-gray-600">{{ cliente.email }}</td>
          <td class="text-gray-600">{{ cliente.phone }}</td>
          <td class="text-gray-600">{{ cliente.address || '-' }}</td>
          <td class="text-gray-600">{{ formatDate(cliente.created_at) }}</td>
          <td>
            <div class="flex items-center justify-center gap-2">
              <button
                @click="$emit('edit', cliente)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Editar"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button
                @click="$emit('delete', cliente)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Deletar"
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
import { format } from 'date-fns'
import { User, Edit, Trash2 } from 'lucide-vue-next'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  clientes: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return '-'
  }
}
</script>