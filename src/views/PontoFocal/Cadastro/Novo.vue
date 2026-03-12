<template>
  <div>
    <!-- Cabecalho -->
    <div class="card mb-6">
      <div class="flex items-center gap-4">
        <router-link :to="{ name: 'cadastro' }">
          <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft class="w-5 h-5 text-gray-600" />
          </button>
        </router-link>
        <div>
          <h2 class="page-title">Novo Cadastro - FICHA 00 SSFCC</h2>
          <p class="page-subtitle">Preencha os dados completos da crianca</p>
        </div>
      </div>
    </div>

    <!-- Stepper -->
    <div class="card mb-6">
      <div class="flex items-center justify-between">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="flex items-center"
        >
          <div
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
              currentStep >= index
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-500'
            ]"
          >
            {{ index + 1 }}
          </div>
          <span
            :class="[
              'ml-3 text-sm font-medium hidden md:block',
              currentStep >= index ? 'text-gray-900' : 'text-gray-500'
            ]"
          >
            {{ step.title }}
          </span>
          <ChevronRight
            v-if="index < steps.length - 1"
            class="w-5 h-5 text-gray-300 mx-4"
          />
        </div>
      </div>
    </div>

    <!-- Formulario -->
    <form @submit.prevent="submeterCadastro">
      <!-- Step 1: Identificacao -->
      <div v-show="currentStep === 0" class="card mb-6">
        <h3 class="section-title flex items-center gap-2">
          <User class="w-5 h-5" />
          A. Identificacao
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nomeCompleto"
              type="text"
              class="input"
              placeholder="Nome completo da crianca"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              URL da Foto <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.foto"
              type="url"
              class="input"
              placeholder="https://exemplo.com/foto.jpg"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.dataNascimento"
              type="date"
              class="input"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Sexo <span class="text-red-500">*</span>
            </label>
            <select v-model="form.sexo" class="input" required>
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Local de Residencia <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.localResidencia"
              type="text"
              class="input"
              placeholder="Bairro, Rua, Numero"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Provincia <span class="text-red-500">*</span>
            </label>
            <select v-model="form.provincia" class="input" required>
              <option value="">Selecione</option>
              <option value="Maputo Cidade">Maputo Cidade</option>
              <option value="Maputo Provincia">Maputo Provincia</option>
              <option value="Gaza">Gaza</option>
              <option value="Inhambane">Inhambane</option>
              <option value="Sofala">Sofala</option>
              <option value="Manica">Manica</option>
              <option value="Tete">Tete</option>
              <option value="Zambezia">Zambezia</option>
              <option value="Nampula">Nampula</option>
              <option value="Cabo Delgado">Cabo Delgado</option>
              <option value="Niassa">Niassa</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Distrito <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.distrito"
              type="text"
              class="input"
              placeholder="Nome do distrito"
              required
            />
          </div>
        </div>
      </div>

      <!-- Step 2: Situacao Familiar -->
      <div v-show="currentStep === 1" class="card mb-6">
        <h3 class="section-title flex items-center gap-2">
          <Users class="w-5 h-5" />
          B. Situacao Familiar
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Mae</label>
            <input
              v-model="form.nomeMae"
              type="text"
              class="input"
              placeholder="Nome completo da mae"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Situacao da Mae</label>
            <select v-model="form.situacaoMae" class="input">
              <option value="">Selecione</option>
              <option value="viva">Viva</option>
              <option value="falecida">Falecida</option>
              <option value="desaparecida">Desaparecida</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Pai</label>
            <input
              v-model="form.nomePai"
              type="text"
              class="input"
              placeholder="Nome completo do pai"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Situacao do Pai</label>
            <select v-model="form.situacaoPai" class="input">
              <option value="">Selecione</option>
              <option value="vivo">Vivo</option>
              <option value="falecido">Falecido</option>
              <option value="desaparecido">Desaparecido</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tutor/Responsavel <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.tutorNome"
              type="text"
              class="input"
              placeholder="Nome do tutor ou responsavel"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Contacto do Tutor <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.tutorContacto"
              type="tel"
              class="input"
              placeholder="84 123 4567"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Numero de Irmaos</label>
            <input
              v-model.number="form.numeroIrmaos"
              type="number"
              min="0"
              class="input"
              placeholder="0"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Situacao Economica</label>
            <textarea
              v-model="form.situacaoEconomica"
              rows="3"
              class="input"
              placeholder="Descreva a situacao economica da familia..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Step 3: Vulnerabilidades -->
      <div v-show="currentStep === 2" class="card mb-6">
        <h3 class="section-title flex items-center gap-2">
          <AlertTriangle class="w-5 h-5" />
          C. Vulnerabilidades
        </h3>

        <p class="text-sm text-gray-600 mb-4">Selecione todas as vulnerabilidades aplicaveis:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <label
            v-for="vuln in pontoFocalStore.vulnerabilidadesDisponiveis"
            :key="vuln.id"
            class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            :class="{ 'border-gray-900 bg-gray-50': form.vulnerabilidades.includes(vuln.id) }"
          >
            <input
              type="checkbox"
              :value="vuln.id"
              v-model="form.vulnerabilidades"
              class="w-4 h-4 text-gray-900 rounded"
            />
            <span class="text-sm text-gray-700">{{ vuln.label }}</span>
          </label>
        </div>

        <div v-if="form.vulnerabilidades.includes('outra')" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Especifique outra vulnerabilidade
          </label>
          <input
            v-model="form.outraVulnerabilidade"
            type="text"
            class="input"
            placeholder="Descreva a vulnerabilidade..."
          />
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Observacoes Preliminares</label>
          <textarea
            v-model="form.observacoes"
            rows="4"
            class="input"
            placeholder="Observacoes gerais sobre a situacao da crianca..."
          ></textarea>
        </div>
      </div>

      <!-- Step 4: Selecao dos 7 Pontos Focais -->
      <div v-show="currentStep === 3" class="card mb-6">
        <h3 class="section-title flex items-center gap-2">
          <ClipboardList class="w-5 h-5" />
          D. Selecao dos 7 Pontos Focais
        </h3>

        <p class="text-sm text-gray-600 mb-6">
          Selecione e defina as datas de visita para cada Ponto Focal Tematico:
        </p>

        <div class="space-y-4">
          <div
            v-for="pf in pontoFocalStore.pontosFocaisTematicos"
            :key="pf.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div
                  :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm',
                    pfColors[pf.cor]
                  ]"
                >
                  {{ pf.codigo.slice(0, 2) }}
                </div>
              </div>

              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{{ pf.codigo }}</h4>
                <p class="text-sm text-gray-600">{{ pf.nome }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ pf.descricao }}</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Data de Visita Planejada <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.pontosFocais[pf.id].dataVisita"
                      type="date"
                      class="input"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Observacoes</label>
                    <input
                      v-model="form.pontosFocais[pf.id].observacoes"
                      type="text"
                      class="input"
                      placeholder="Notas para este PF..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegacao -->
      <div class="card">
        <div class="flex items-center justify-between">
          <BaseButton
            v-if="currentStep > 0"
            variant="secondary"
            :icon="ArrowLeft"
            @click="prevStep"
          >
            Anterior
          </BaseButton>
          <div v-else></div>

          <div class="flex gap-3">
            <BaseButton
              v-if="currentStep < steps.length - 1"
              variant="primary"
              :icon="ArrowRight"
              icon-position="right"
              @click="nextStep"
            >
              Proximo
            </BaseButton>
            <BaseButton
              v-else
              variant="success"
              :icon="Check"
              type="submit"
              :loading="pontoFocalStore.loading"
            >
              Submeter Cadastro
            </BaseButton>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { useToast } from 'vue-toastification'
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  User,
  Users,
  AlertTriangle,
  ClipboardList,
  Check
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const pontoFocalStore = usePontoFocalStore()

const currentStep = ref(0)

const steps = [
  { id: 'identificacao', title: 'Identificacao' },
  { id: 'familia', title: 'Situacao Familiar' },
  { id: 'vulnerabilidades', title: 'Vulnerabilidades' },
  { id: 'pontos-focais', title: 'Pontos Focais' }
]

const pfColors = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  yellow: 'bg-yellow-500',
  pink: 'bg-pink-500'
}

// Inicializar pontos focais no formulario
const initPontosFocais = () => {
  const pfs = {}
  pontoFocalStore.pontosFocaisTematicos.forEach(pf => {
    pfs[pf.id] = {
      pfId: pf.id,
      dataVisita: '',
      observacoes: '',
      status: 'pendente'
    }
  })
  return pfs
}

const form = reactive({
  comunicacaoId: null,
  nomeCompleto: '',
  foto: '',
  dataNascimento: '',
  sexo: '',
  localResidencia: '',
  provincia: '',
  distrito: '',
  nomeMae: '',
  situacaoMae: '',
  nomePai: '',
  situacaoPai: '',
  tutorNome: '',
  tutorContacto: '',
  numeroIrmaos: 0,
  situacaoEconomica: '',
  vulnerabilidades: [],
  outraVulnerabilidade: '',
  observacoes: '',
  pontosFocais: initPontosFocais()
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submeterCadastro = async () => {
  try {
    // Converter pontosFocais para array
    const pontosFocaisArray = Object.values(form.pontosFocais)

    const cadastroData = {
      ...form,
      pontosFocais: pontosFocaisArray
    }

    await pontoFocalStore.addCadastro(cadastroData)
    toast.success('Cadastro criado com sucesso!')
    router.push({ name: 'cadastro' })
  } catch (error) {
    toast.error('Erro ao criar cadastro')
  }
}

// Pre-preencher dados se vier de uma comunicacao
onMounted(() => {
  const comunicacaoId = route.query.comunicacaoId
  if (comunicacaoId) {
    const comunicacao = pontoFocalStore.getComunicacaoById(comunicacaoId)
    if (comunicacao) {
      form.comunicacaoId = comunicacao.id
      form.nomeCompleto = comunicacao.nome
      form.foto = comunicacao.foto
      form.localResidencia = comunicacao.bairro
    }
  }
})
</script>
