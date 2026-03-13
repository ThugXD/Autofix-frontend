<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Biblioteca Técnica</h1>
        <p class="text-gray-500 mt-1">
          Manuais de procedimentos, protocolos e recursos para avaliação especializada
        </p>
      </div>
    </div>

    <!-- Areas Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="area in libraryAreas" 
        :key="area.id"
        class="card group cursor-pointer hover:border-primary/50 transition-all"
      >
        <div class="flex items-start gap-4 p-2">
          <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center transition-colors', area.bgClass]">
            <component :is="area.icon" :class="['w-6 h-6', area.textClass]" />
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-gray-900 group-hover:text-primary transition-colors">
              {{ area.nome }}
            </h3>
            <p class="text-sm text-gray-500 mt-1">{{ area.description }}</p>
            
            <div class="mt-4 space-y-2">
              <div 
                v-for="doc in area.documents" 
                :key="doc.title"
                class="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all group/doc"
              >
                <div class="flex items-center gap-2">
                  <FileText class="w-3.5 h-3.5 text-gray-400 group-hover/doc:text-primary" />
                  <span class="text-xs font-medium text-gray-700">{{ doc.title }}</span>
                </div>
                <Download class="w-3 h-3 text-gray-300 group-hover/doc:text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  FileText, 
  Heart, 
  Stethoscope, 
  UtensilsCrossed, 
  GraduationCap, 
  Shield, 
  Brain,
  Download
} from 'lucide-vue-next'

const libraryAreas = [
  {
    id: 'sadd',
    nome: 'Direitos e Documentação',
    icon: FileText,
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-600',
    description: 'Normas legais e processos de registo civil tardio.',
    documents: [
      { title: 'Protocolo de Registo de Nascimento.pdf' },
      { title: 'Guia de Proteção Legal da Criança.pdf' }
    ]
  },
  {
    id: 'sanc',
    nome: 'Nutrição e Crescimento',
    icon: Heart,
    bgClass: 'bg-green-50',
    textClass: 'text-green-600',
    description: 'Protocolos de avaliação antropométrica e suplementação.',
    documents: [
      { title: 'Tabelas IMC por Idade.pdf' },
      { title: 'Manual de Diversificação Alimentar.pdf' }
    ]
  },
  {
    id: 'sasbe',
    nome: 'Saúde e Bem-Estar',
    icon: Stethoscope,
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    description: 'Check-list de saúde preventiva e vacinação.',
    documents: [
      { title: 'Plano Nacional de Vacinação.pdf' },
      { title: 'Guia de Triagem Pediátrica.pdf' }
    ]
  },
  {
    id: 'saeie',
    nome: 'Educação e Inclusão',
    icon: GraduationCap,
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-600',
    description: 'Legislação escolar e inclusão de necessidades especiais.',
    documents: [
      { title: 'Estatuto Escolar Moçambique.pdf' },
      { title: 'Técnicas de Inclusão na Sala de Aula.pdf' }
    ]
  },
  {
    id: 'saps',
    nome: 'Proteção e Segurança',
    icon: Shield,
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    description: 'Prevenção de violência e mecanismos de denúncia.',
    documents: [
      { title: 'Rede de Proteção da Criança.pdf' },
      { title: 'Formulário de Denúncia VBG.pdf' }
    ]
  },
  {
    id: 'sape',
    nome: 'Psicosocial Emocional',
    icon: Brain,
    bgClass: 'bg-pink-50',
    textClass: 'text-pink-600',
    description: 'Primeiros socorros psicológicos e ludoterapia.',
    documents: [
      { title: 'Manual de Psicologia do Desenvolvimento.pdf' },
      { title: 'Atividades de Ludoterapia.pdf' }
    ]
  }
]
</script>
