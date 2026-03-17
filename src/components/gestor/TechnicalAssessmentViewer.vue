<template>
  <div class="space-y-6">
    <!-- Header with Back Button -->
    <div class="flex items-center gap-4 mb-6">
      <button 
        @click="$emit('back')"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        title="Voltar ao resumo"
      >
        <ArrowLeft class="w-6 h-6" />
      </button>
      <div>
        <h3 class="text-xl font-bold text-gray-900">{{ title }}</h3>
        <p class="text-gray-500 text-sm">Visualização detalhada da avaliação técnica</p>
      </div>
    </div>

    <!-- Dynamic Form Container -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden min-h-[400px]">
      <div v-if="!formComponent" class="flex flex-col items-center justify-center p-20 text-gray-400">
        <AlertTriangle class="w-12 h-12 mb-4 opacity-20" />
        <p>Formulário não encontrado para esta área.</p>
      </div>
      
      <component 
        :is="formComponent" 
        v-else
        v-model="assessmentData"
        :is-read-only="true"
      />
    </div>

    <!-- Specialized Observations (Common to all) -->
    <div v-if="observations" class="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
      <h4 class="font-bold text-indigo-900 flex items-center gap-2 mb-2">
        <MessageSquare class="w-5 h-5" />
        Observações do Especialista
      </h4>
      <p class="text-indigo-800 italic">
        "{{ observations }}"
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, watchEffect } from 'vue'
import { ArrowLeft, AlertTriangle, MessageSquare } from 'lucide-vue-next'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: () => ({})
  },
  observations: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Detalhes da Avaliação'
  }
})

defineEmits(['back'])

// Internal model for the form components
const assessmentData = ref({})

watchEffect(() => {
  // Extract the specialized data from the ficha object
  // Based on the store, specialized data is in ficha.especializada
  assessmentData.value = props.data || {}
})

// Dynamic components map
const forms = {
  sadd: defineAsyncComponent(() => import('@/components/pontoFocalTematico/specialized/SADDForm.vue')),
  sanc: defineAsyncComponent(() => import('@/components/pontoFocalTematico/specialized/SANCForm.vue')),
  sasbe: defineAsyncComponent(() => import('@/components/pontoFocalTematico/specialized/SASBEForm.vue')),
  saad: defineAsyncComponent(() => import('@/components/pontoFocalTematico/specialized/SAADForm.vue')),
  saeie: defineAsyncComponent(() => import('@/components/pontoFocalTematico/specialized/SAEIEForm.vue')),
  saps: defineAsyncComponent(() => import('@/components/pontoFocalTematico/specialized/SAPSForm.vue')),
  sape: defineAsyncComponent(() => import('@/components/pontoFocalTematico/specialized/SAPEForm.vue'))
}

const formComponent = computed(() => forms[props.type.toLowerCase()])
</script>
