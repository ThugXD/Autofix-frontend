<template>
  <div>
    <!-- Header -->
    <div class="card mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Atendimento</h2>
      <p class="text-gray-600">Recepcione clientes e inicie ordens de serviço rapidamente</p>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <button
        @click="showClienteModal = true"
        class="card hover:shadow-lg transition-all cursor-pointer group"
      >
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserPlus class="w-8 h-8 text-blue-600" />
          </div>
          <div class="text-left">
            <h3 class="font-semibold text-gray-900 text-lg">Novo Cliente</h3>
            <p class="text-sm text-gray-600">Cadastrar cliente</p>
          </div>
        </div>
      </button>

      <button
        @click="showVeiculoModal = true"
        class="card hover:shadow-lg transition-all cursor-pointer group"
      >
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Car class="w-8 h-8 text-orange-600" />
          </div>
          <div class="text-left">
            <h3 class="font-semibold text-gray-900 text-lg">Novo Veículo</h3>
            <p class="text-sm text-gray-600">Cadastrar veículo</p>
          </div>
        </div>
      </button>

      <button
        @click="showOrdemModal = true"
        class="card hover:shadow-lg transition-all cursor-pointer group"
      >
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText class="w-8 h-8 text-green-600" />
          </div>
          <div class="text-left">
            <h3 class="font-semibold text-gray-900 text-lg">Nova Ordem</h3>
            <p class="text-sm text-gray-600">Criar ordem de serviço</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Ordens Recentes -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Ordens de Hoje</h3>
        <router-link to="/ordem-servico" class="text-sm text-blue-600 hover:text-blue-700">
          Ver todas →
        </router-link>
      </div>

      <div class="space-y-3">
        <div
          v-for="ordem in ordensRecentes"
          :key="ordem.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          @click="$router.push(`/ordem-servico/${ordem.id}`)"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Wrench class="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">{{ ordem.numero }}</p>
              <p class="text-sm text-gray-600">{{ ordem.cliente_name }} • {{ ordem.veiculo_info }}</p>
            </div>
          </div>
          <div class="text-right">
            <span :class="['badge', statusClasses[ordem.status]]">
              {{ statusLabels[ordem.status] }}
            </span>
            <p class="text-xs text-gray-500 mt-1">{{ formatTime(ordem.data_abertura) }}</p>
          </div>
        </div>

        <div v-if="!ordensRecentes.length" class="text-center py-8 text-gray-500">
          Nenhuma ordem criada hoje
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ClienteFormModal
      v-model="showClienteModal"
      @created="handleClienteCreated"
    />

    <VeiculoFormModal
      v-model="showVeiculoModal"
      @created="handleVeiculoCreated"
    />

    <OrdemCreateModal
      v-model="showOrdemModal"
      @created="handleOrdemCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ordensServicoService } from '@/services/ordensServicoService'
import { format, isToday } from 'date-fns'
import {
  UserPlus,
  Car,
  FileText,
  Wrench
} from 'lucide-vue-next'
import ClienteFormModal from '@/components/atendimento/ClienteFormModal.vue'
import VeiculoFormModal from '@/components/atendimento/VeiculoFormModal.vue'
import OrdemCreateModal from '@/components/ordens/OrdemCreateModal.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const showClienteModal = ref(false)
const showVeiculoModal = ref(false)
const showOrdemModal = ref(false)
const ordensRecentes = ref([])

const statusLabels = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  aguardando_pecas: 'Aguardando Peças',
  concluido: 'Concluído'
}

const statusClasses = {
  pendente: 'badge-warning',
  em_andamento: 'badge-info',
  aguardando_pecas: 'badge-warning',
  concluido: 'badge-success'
}

onMounted(async () => {
  loadOrdensRecentes()
})

const loadOrdensRecentes = async () => {
  try {
    const response = await ordensServicoService.getAll({ per_page: 100 })
    ordensRecentes.value = response.data.data.filter(ordem => 
      isToday(new Date(ordem.data_abertura))
    ).slice(0, 5)
  } catch (error) {
    console.error('Erro ao carregar ordens:', error)
  }
}

const handleClienteCreated = () => {
  showClienteModal.value = false
  toast.success('Cliente cadastrado! Agora cadastre o veículo.')
  showVeiculoModal.value = true
}

const handleVeiculoCreated = () => {
  showVeiculoModal.value = false
  toast.success('Veículo cadastrado! Agora crie a ordem de serviço.')
  showOrdemModal.value = true
}

const handleOrdemCreated = (ordem) => {
  showOrdemModal.value = false
  loadOrdensRecentes()
  if (ordem?.id) {
    router.push(`/ordem-servico/${ordem.id}`)
  }
}

const formatTime = (date) => {
  try {
    return format(new Date(date), 'HH:mm')
  } catch {
    return '-'
  }
}
</script>