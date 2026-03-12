<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans overflow-x-hidden selection:bg-primary-500 selection:text-white">
    
    <!-- NAVBAR -->
    <nav class="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Fix<span class="text-primary-600">Auto</span>
            </span>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Funcionalidades</a>
            <a href="#pricing" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Preços</a>
            <div class="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
            <router-link to="/login" class="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors">Entrar</router-link>
            <router-link 
              to="/register" 
              class="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gray-900 dark:bg-white dark:text-gray-900 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-primary-600 dark:hover:bg-primary-500 dark:hover:text-white"
            >
              Criar Conta Grátis
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <div class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <!-- Decorator Blob -->
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 border border-primary-100 dark:border-primary-500/20">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          Novo: Gestão de Inventário com IA
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight">
          A oficina do futuro <br class="hidden md:block" />
          <span class="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">começa aqui.</span>
        </h1>
        
        <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          Automação profissional para oficinas modernas. Controle ordens de serviço, stock e clientes em uma única plataforma intuitiva.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link 
            to="/register" 
            class="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-lg font-bold transition-all shadow-xl shadow-primary-500/20 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Começar Agora
            <ArrowRight class="w-5 h-5" />
          </router-link>
          
          <button class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-lg font-bold transition-all border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2">
            <PlayCircle class="w-5 h-5 text-primary-500" />
            Ver Demonstração
          </button>
        </div>

        <!-- Dashboard Preview Glass -->
        <div class="mt-20 relative max-w-5xl mx-auto">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-transparent z-20 h-full w-full pointer-events-none"></div>
          <div class="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden group">
            <div class="absolute top-0 left-0 right-0 h-11 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <img src="/dashboard-preview.png" alt="Dashboard Preview" class="w-full pt-10 transform transition-transform duration-700 group-hover:scale-[1.02]" />
          </div>
        </div>
      </div>
    </div>

    <!-- FEATURES GRID -->
    <div id="features" class="py-24 bg-white dark:bg-gray-800 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-primary-600 font-bold tracking-wide uppercase text-sm">Funcionalidades</h2>
          <p class="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Poder total nas suas mãos
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="group p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl hover:shadow-primary-500/5 hover:-translate-y-1 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
            <div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ClipboardList class="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Ordens de Serviço</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              Crie orçamentos detalhados, adicione peças e serviços, e gere PDFs profissionais com sua marca.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="group p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl hover:shadow-primary-500/5 hover:-translate-y-1 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
            <div class="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Package class="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Controle de Stock</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              Nunca mais perca vendas por falta de peças. Alertas automáticos e histórico de movimentação.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="group p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl hover:shadow-primary-500/5 hover:-translate-y-1 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
            <div class="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users class="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Gestão CRM</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              Mantenha o histórico completo de cada veículo e cliente. Fidelize através de um serviço personalizado.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- PRICING SECTION -->
    <div id="pricing" class="py-24 bg-gray-50 dark:bg-gray-900 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-primary-600 font-bold tracking-wide uppercase text-sm">Planos</h2>
          <p class="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Invista no crescimento da sua oficina
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Starter -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Starter</h3>
            <div class="mt-4 flex items-baseline text-gray-900 dark:text-white">
              <span class="text-5xl font-extrabold tracking-tight">Grátis</span>
            </div>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Ideal para quem está começando.</p>
            <ul class="mt-8 space-y-4">
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <Check class="h-5 w-5 text-primary-500 mr-3" /> 1 Utilizador
              </li>
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <Check class="h-5 w-5 text-primary-500 mr-3" /> 10 Ordens/mês
              </li>
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <Check class="h-5 w-5 text-primary-500 mr-3" /> Gestão Básica
              </li>
            </ul>
            <router-link to="/register" class="mt-8 block w-full py-3 px-6 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl text-center transition-colors">
              Criar Conta Grátis
            </router-link>
          </div>

          <!-- Professional -->
          <div class="relative bg-gray-900 text-white rounded-3xl p-8 shadow-2xl shadow-primary-900/20 transform scale-105 border border-gray-800">
            <div class="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
              MAIS POPULAR
            </div>
            <h3 class="text-lg font-semibold text-white">Profissional</h3>
            <div class="mt-4 flex items-baseline text-white">
              <span class="text-5xl font-extrabold tracking-tight">2500</span>
              <span class="ml-1 text-xl font-medium text-gray-400">MT/mês</span>
            </div>
            <p class="mt-2 text-sm text-gray-400">Tudo para oficinas em crescimento.</p>
            <ul class="mt-8 space-y-4">
              <li class="flex items-center text-gray-300">
                <div class="p-1 bg-primary-500/20 rounded-full mr-3">
                  <Check class="h-4 w-4 text-primary-400" />
                </div>
                Até 5 Utilizadores
              </li>
              <li class="flex items-center text-gray-300">
                <div class="p-1 bg-primary-500/20 rounded-full mr-3">
                  <Check class="h-4 w-4 text-primary-400" />
                </div>
                Ordens Ilimitadas
              </li>
              <li class="flex items-center text-gray-300">
                <div class="p-1 bg-primary-500/20 rounded-full mr-3">
                  <Check class="h-4 w-4 text-primary-400" />
                </div>
                Stock Ilimitado
              </li>
              <li class="flex items-center text-gray-300">
                <div class="p-1 bg-primary-500/20 rounded-full mr-3">
                  <Check class="h-4 w-4 text-primary-400" />
                </div>
                Suporte WhatsApp
              </li>
            </ul>
            <router-link to="/register" class="mt-8 block w-full py-3 px-6 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold rounded-xl text-center transition-all shadow-lg shadow-primary-500/25">
              Começar Teste Grátis
            </router-link>
          </div>

          <!-- Enterprise -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Enterprise</h3>
            <div class="mt-4 flex items-baseline text-gray-900 dark:text-white">
              <span class="text-4xl font-extrabold tracking-tight">Sob Consulta</span>
            </div>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Para redes e concessionárias.</p>
            <ul class="mt-8 space-y-4">
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <Check class="h-5 w-5 text-primary-500 mr-3" /> Múltiplas Filiais
              </li>
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <Check class="h-5 w-5 text-primary-500 mr-3" /> API Personalizada
              </li>
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <Check class="h-5 w-5 text-primary-500 mr-3" /> Gerente de Conta
              </li>
            </ul>
            <button class="mt-8 block w-full py-3 px-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-900 dark:text-white font-bold rounded-xl text-center transition-colors">
              Falar com Vendas
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-1 md:col-span-1">
             <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span class="text-xl font-bold text-gray-900 dark:text-white">
                  FixAuto
                </span>
              </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Transformando a gestão de oficinas em Moçambique e no mundo.
            </p>
          </div>
          
          <div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-4">Produto</h4>
            <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" class="hover:text-primary-600">Funcionalidades</a></li>
              <li><a href="#" class="hover:text-primary-600">Preços</a></li>
              <li><a href="#" class="hover:text-primary-600">Atualizações</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-4">Empresa</h4>
            <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" class="hover:text-primary-600">Sobre Nós</a></li>
              <li><a href="#" class="hover:text-primary-600">Carreiras</a></li>
              <li><a href="#" class="hover:text-primary-600">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" class="hover:text-primary-600">Privacidade</a></li>
              <li><a href="#" class="hover:text-primary-600">Termos</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 FixAuto Technologies. Todos os direitos reservados.
          </p>
          <div class="flex gap-4">
             <!-- Social Icons here if needed -->
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ClipboardList, Package, Users, Check, ArrowRight, PlayCircle } from 'lucide-vue-next';
</script>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
