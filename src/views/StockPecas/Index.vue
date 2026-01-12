<template>
  <div>
    <div class="card mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Stock de Peças</h2>
        <BaseButton variant="primary" :icon="Plus" @click="showForm = true">
          Nova Peça
        </BaseButton>
      </div>

      <BaseInput
        v-model="searchQuery"
        placeholder="Procurar peças..."
        :icon-left="Search"
        clearable
      />
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Preço Unit.</th>
              <th>Estoque</th>
              <th>Localização</th>
              <th>Status</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="peca in pecas" :key="peca.id">
              <td class="font-mono text-sm">{{ peca.code }}</td>
              <td class="font-medium">{{ peca.name }}</td>
              <td>{{ peca.brand }}</td>
              <td><span class="badge badge-info">{{ peca.category }}</span></td>
              <td class="font-semibold">{{ formatCurrency(peca.unit_price) }}</td>
              <td>
                <span :class="[
                  'badge',
                  peca.quantity_in_stock <= peca.min_stock_level ? 'badge-danger' : 'badge-success'
                ]">
                  {{ peca.quantity_in_stock }} un.
                </span>
              </td>
              <td class="text-sm text-gray-600">{{ peca.location }}</td>
              <td>
                <span :class="['badge', peca.is_active ? 'badge-success' : 'badge-danger']">
                  {{ peca.is_active ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td>
                <div class="flex items-center justify-center gap-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pecasService } from '@/services/pecasService'
import { Plus, Search, Edit, Trash2 } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'

const pecas = ref([])
const searchQuery = ref('')
const showForm = ref(false)

onMounted(async () => {
  const response = await pecasService.getAll()
  pecas.value = response.data.data
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-MZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value) + ' MT'
}
</script>