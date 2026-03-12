<template>
  <div class="min-h-screen flex flex-col bg-[#050505] text-gray-200 font-sans">

    <!-- ===================== FIXED TOP NAVBAR ===================== -->
    <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        :class="[
          'flex items-center justify-between w-full max-w-4xl rounded-full px-3 py-1.5 transition-all duration-300',
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border border-white/10 shadow-2xl'
            : 'bg-black/40 backdrop-blur-md border border-white/10 shadow-xl'
        ]"
      >
        <!-- Logo / Brand -->
        <div class="flex items-center gap-2 ml-1">
          <img src="@/assets/sacco_logo.png" alt="SACCO" class="w-8 h-8 rounded-full object-cover" />
          <span class="text-sm font-bold text-white hidden sm:inline tracking-wide">SACCO</span>
        </div>

        <!-- Menu Links (Center) -->
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#inicio" class="hover:text-white transition">Início</a>
          <a href="#como-funciona" class="hover:text-white transition">Como Funciona</a>
          <a href="#catalogo" class="hover:text-white transition">Crianças</a>
        </div>

        <!-- Botão (Right) -->
        <RouterLink
          to="/login"
          class="inline-block bg-[#a3e635] text-green-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-[#bceb65] transition shadow-[0_0_15px_rgba(163,230,53,0.3)] mr-1"
        >
          Área do Padrinho
        </RouterLink>
      </div>
    </nav>
    <!-- =========================== END NAV ========================= -->

    <!-- Hero Section Dark (padding-top para não ser coberto pela navbar) -->
    <section id="inicio" class="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
          alt="Crianças sorrindo" 
          class="w-full h-full object-cover opacity-50"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505]"></div>
      </div>

      <!-- Hero Center Text -->
      <div class="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <!-- Floating Pill com Avatares -->
        <div class="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full pl-2 pr-4 py-1.5 mb-6 shadow-xl">
           <div class="flex -space-x-2">
              <img class="w-6 h-6 rounded-full border border-gray-900" src="https://i.pravatar.cc/100?img=1" alt="Avatar">
              <img class="w-6 h-6 rounded-full border border-gray-900" src="https://i.pravatar.cc/100?img=5" alt="Avatar">
              <img class="w-6 h-6 rounded-full border border-gray-900" src="https://i.pravatar.cc/100?img=3" alt="Avatar">
           </div>
           <span class="text-xs font-medium text-gray-300 ml-1">500+ padrinhos ativos</span>
        </div>

        <h1 class="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-2 drop-shadow-md text-gray-100">
          Porquê apenas observar?
        </h1>
        <h2 class="text-4xl md:text-5xl lg:text-7xl font-bold italic text-[#a3e635] mb-10 font-serif drop-shadow-lg tracking-wide">
          Mude uma vida hoje.
        </h2>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink to="/register" class="bg-black hover:bg-gray-900 border border-white/20 text-white px-8 py-3 text-sm font-semibold rounded-full shadow-lg transition transform hover:-translate-y-0.5">
            Ser Padrinho
          </RouterLink>
          <a href="#catalogo" class="bg-transparent border border-white/40 text-white hover:bg-white/10 px-8 py-3 text-sm font-semibold rounded-full transition">
            Conhecer Crianças
          </a>
        </div>
      </div>
    </section>

    <!-- Como Funciona Section (Light) -->
    <section id="como-funciona" class="py-16 bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Como funciona o apadrinhamento?</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">Em apenas 3 passos simples, você pode começar a fazer a diferença na vida de uma criança.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="p-6 rounded-2xl bg-[#f0f9ff] border border-blue-100 transform transition hover:-translate-y-1">
            <div class="w-16 h-16 bg-[#171717] text-[#a3e635] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">1</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Escolha</h3>
            <p class="text-gray-600">Navegue pelo nosso catálogo e conheça as histórias de crianças que precisam de apoio.</p>
          </div>
          <div class="p-6 rounded-2xl bg-[#f0f9ff] border border-blue-100 transform transition hover:-translate-y-1">
            <div class="w-16 h-16 bg-[#171717] text-[#a3e635] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">2</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Contribua</h3>
            <p class="text-gray-600">Faça o seu registo, selecione o valor e a periodicidade da sua contribuição.</p>
          </div>
          <div class="p-6 rounded-2xl bg-[#f0f9ff] border border-blue-100 transform transition hover:-translate-y-1">
            <div class="w-16 h-16 bg-[#171717] text-[#a3e635] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">3</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Acompanhe</h3>
            <p class="text-gray-600">Receba atualizações regulares sobre o desenvolvimento e as conquistas do seu afilhado.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content: Filters & Catalog (Light) -->
    <section id="catalogo" class="flex-grow py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full bg-gray-50">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-6">
        <h2 class="text-2xl font-bold text-gray-900">Novas Crianças</h2>
        
        <!-- Filtros -->
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div class="relative flex-1 md:w-48">
            <select
              v-model="filtros.regiao"
              @change="atualizarFiltros"
              class="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition text-sm shadow-sm"
            >
              <option value="">Todas as regiões</option>
              <option v-for="regiao in criancasStore.regioes" :key="regiao" :value="regiao">
                {{ regiao }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div class="relative flex-1 md:w-56">
            <select
              v-model="filtros.vulnerabilidade"
              @change="atualizarFiltros"
              class="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition text-sm shadow-sm"
            >
              <option value="">Todas vulnerabilidades</option>
              <option
                v-for="vuln in criancasStore.vulnerabilidades"
                :key="vuln"
                :value="vuln"
              >
                {{ vuln }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <button
            v-if="temFiltros"
            @click="resetarFiltros"
            class="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-full transition shadow-sm"
          >
            Limpar
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="criancasStore.loading" class="flex justify-center py-20">
        <div class="w-10 h-10 border-4 border-gray-200 border-t-[#171717] rounded-full animate-spin" />
      </div>

      <!-- Grid de Crianças -->
      <div v-else>
        <div
          v-if="criancasStore.criancasFiltradas.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <RouterLink
            v-for="crianca in criancasStore.criancasFiltradas"
            :key="crianca.id"
            :to="`/crianca/${crianca.id}`"
            class="bg-white rounded-2xl overflow-hidden border border-gray-100 group cursor-pointer block hover:border-gray-300 transition-all duration-300 flex flex-col h-full hover:shadow-xl"
          >
            <div class="relative overflow-hidden aspect-[16/10] bg-gray-100">
              <img
                :src="crianca.foto"
                :alt="crianca.nome"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Badge Over Image -->
              <div class="absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-white font-bold text-lg drop-shadow-md truncate max-w-[70%]">
                  {{ crianca.nome }}
                </span>
                <span
                  :class="['text-[10px] font-bold px-2 py-0.5 rounded text-white shadow-sm', getStatusColor(crianca.status)]"
                >
                  {{ crianca.status }}
                </span>
              </div>
              <span
                :class="['absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded text-white shadow-sm transition-opacity duration-300 group-hover:opacity-0', getStatusColor(crianca.status)]"
              >
                {{ crianca.status }}
              </span>
            </div>
            
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="text-lg font-extrabold text-gray-900 mb-1 group-hover:text-[#171717] transition-colors line-clamp-1">{{ crianca.nome }}</h3>
              <p class="text-xs text-gray-500 font-medium mb-3 flex items-center">
                <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                {{ crianca.idade }} anos • {{ crianca.regiao }}
              </p>
              
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="(vuln, idx) in crianca.vulnerabilidades.slice(0, 2)"
                  :key="idx"
                  class="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] uppercase font-semibold px-2 py-0.5 rounded"
                >
                  {{ vuln }}
                </span>
                <span v-if="crianca.vulnerabilidades.length > 2" class="bg-gray-100 text-gray-600 border border-gray-200 text-[10px] uppercase font-semibold px-2 py-0.5 rounded">
                  +{{ crianca.vulnerabilidades.length - 2 }}
                </span>
              </div>
              
              <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Orçamento</p>
                  <span class="font-bold text-gray-900 text-sm">{{ formatarMoeda(crianca.orcamentoAnual) }}</span>
                </div>
                <!-- Mini Progress -->
                <div class="flex flex-col items-end w-20">
                  <span class="text-[10px] font-bold text-gray-700 mb-1">{{ getPercentualCoberto(crianca) }}% coberto</span>
                  <div class="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-[#171717] rounded-full" :style="{ width: `${getPercentualCoberto(crianca)}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-2xl border border-gray-200 text-center py-16 px-4 shadow-sm">
          <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Nenhuma criança encontrada</h3>
          <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">Não encontrámos crianças correspondentes aos filtros selecionados. Tente outras opções.</p>
          <button
            @click="resetarFiltros"
            class="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium py-2 px-6 rounded-full transition"
          >
            Ver Todas As Crianças
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useCriancasStore } from '@/stores/criancas'

  const criancasStore = useCriancasStore()
  const filtros = ref({ regiao: '', vulnerabilidade: '' })

  const temFiltros = computed(() => {
    return filtros.value.regiao || filtros.value.vulnerabilidade
  })

  const atualizarFiltros = () => {
    criancasStore.setFiltros(filtros.value)
  }

  const resetarFiltros = () => {
    filtros.value = { regiao: '', vulnerabilidade: '' }
    criancasStore.resetFiltros()
  }

  const getStatusColor = (status) => {
    if (status === 'Disponível') return 'bg-blue-600'
    if (status === 'Parcialmente Apoiada') return 'bg-amber-600'
    return 'bg-green-600'
  }

  const getPercentualCoberto = (crianca) => {
    return Math.round((crianca.orcamentoCoberto / crianca.orcamentoAnual) * 100)
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(valor)
  }

  const scrolled = ref(false)

  const handleScroll = () => {
    scrolled.value = window.scrollY > 60
  }

  onMounted(() => {
    criancasStore.fetchCriancas()
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>
