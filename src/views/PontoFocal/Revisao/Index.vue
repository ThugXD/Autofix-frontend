<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Revisao de Cadastros</h1>
        <p class="text-gray-500 mt-1">Revisao em 2 niveis + Consolidacao de necessidades</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosAguardandoN1.length }}</p>
            <p class="text-sm text-gray-500">Aguardando N1</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <FileCheck class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosAguardandoN2.length }}</p>
            <p class="text-sm text-gray-500">Aguardando N2</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Calculator class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosParaOrcamento.length }}</p>
            <p class="text-sm text-gray-500">Definir Orcamento</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ cadastrosProntos.length }}</p>
            <p class="text-sm text-gray-500">Prontos Publicar</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex gap-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ tab.label }}
          <span
            v-if="tab.count > 0"
            :class="[
              'ml-2 px-2 py-0.5 text-xs rounded-full',
              activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else>
      <!-- NIVEL 1: PF Comunitario Revisa -->
      <div v-if="activeTab === 'nivel1'" class="space-y-4">
        <div v-if="cadastrosAguardandoN1.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro aguardando revisao de Nivel 1</p>
        </div>

        <div
          v-for="cadastro in cadastrosAguardandoN1"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              :alt="cadastro.nomeCompleto"
              class="w-16 h-16 rounded-xl object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
                  Aguardando Revisao N1
                </span>
              </div>
              <h3 class="font-semibold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>

              <!-- Progresso das Fichas -->
              <div class="mt-3">
                <p class="text-xs text-gray-500 mb-2">Fichas Tecnicas Submetidas:</p>
                <div class="flex gap-1.5 flex-wrap">
                  <span
                    v-for="pf in cadastro.pontosFocais"
                    :key="pf.pfId"
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      pf.status === 'concluido' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    ]"
                  >
                    {{ pf.pfId.toUpperCase() }}
                  </span>
                </div>
              </div>
            </div>
            <button
              @click="abrirRevisaoN1(cadastro)"
              class="btn-primary text-sm"
            >
              <FileCheck class="w-4 h-4 mr-1" />
              Revisar Fichas
            </button>
          </div>
        </div>
      </div>

      <!-- NIVEL 2: Gestor Associacao Revisa -->
      <div v-if="activeTab === 'nivel2'" class="space-y-4">
        <div v-if="cadastrosAguardandoN2.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro aguardando revisao de Nivel 2</p>
        </div>

        <div
          v-for="cadastro in cadastrosAguardandoN2"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              :alt="cadastro.nomeCompleto"
              class="w-16 h-16 rounded-xl object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                  Aguardando Revisao N2
                </span>
              </div>
              <h3 class="font-semibold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>
              <p class="text-xs text-green-600 mt-2">Todas as fichas aprovadas no Nivel 1</p>
            </div>
            <button
              @click="abrirRevisaoN2(cadastro)"
              class="btn-primary text-sm"
            >
              <Shield class="w-4 h-4 mr-1" />
              Revisao Final
            </button>
          </div>
        </div>
      </div>

      <!-- CONSOLIDACAO + ORCAMENTO -->
      <div v-if="activeTab === 'orcamento'" class="space-y-4">
        <div v-if="cadastrosParaOrcamento.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Calculator class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro para definir orcamento</p>
        </div>

        <div
          v-for="cadastro in cadastrosParaOrcamento"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              :alt="cadastro.nomeCompleto"
              class="w-16 h-16 rounded-xl object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                  Definir Orcamento
                </span>
              </div>
              <h3 class="font-semibold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>

              <!-- Resumo de Necessidades -->
              <div class="mt-3 flex items-center gap-4 text-sm">
                <span class="text-gray-500">
                  <ListChecks class="w-4 h-4 inline mr-1" />
                  {{ getNecessidadesCount(cadastro.id) }} necessidades
                </span>
                <span class="text-gray-500">
                  <Wallet class="w-4 h-4 inline mr-1" />
                  {{ formatCurrency(getTotalNecessidades(cadastro.id)) }} estimado
                </span>
              </div>
            </div>
            <button
              @click="abrirOrcamento(cadastro)"
              class="btn-primary text-sm"
            >
              <Calculator class="w-4 h-4 mr-1" />
              Definir Orcamento
            </button>
          </div>
        </div>
      </div>

      <!-- PRONTOS PARA PUBLICACAO -->
      <div v-if="activeTab === 'prontos'" class="space-y-4">
        <div v-if="cadastrosProntos.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Globe class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum cadastro pronto para publicacao</p>
        </div>

        <div
          v-for="cadastro in cadastrosProntos"
          :key="cadastro.id"
          class="bg-white rounded-xl border border-gray-100 p-5"
        >
          <div class="flex items-start gap-4">
            <img
              :src="cadastro.foto"
              :alt="cadastro.nomeCompleto"
              class="w-16 h-16 rounded-xl object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400">{{ cadastro.codigo }}</span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                  Pronto para Publicar
                </span>
              </div>
              <h3 class="font-semibold text-gray-900">{{ cadastro.nomeCompleto }}</h3>
              <p class="text-sm text-gray-500">{{ cadastro.localResidencia }}</p>

              <!-- Resumo Orcamento -->
              <div class="mt-3 flex items-center gap-4 text-sm">
                <span class="text-green-600 font-medium">
                  {{ formatCurrency(getOrcamentoTotal(cadastro.id)) }} orcamento anual
                </span>
              </div>
            </div>
            <button
              @click="publicarCrianca(cadastro)"
              class="btn-primary text-sm bg-green-600 hover:bg-green-700"
            >
              <Globe class="w-4 h-4 mr-1" />
              Publicar no Catalogo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Revisao N1 -->
    <div v-if="showModalN1" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Revisao Nivel 1</h3>
            <p class="text-gray-500">{{ cadastroSelecionado?.nomeCompleto }}</p>
          </div>
          <button @click="showModalN1 = false" class="p-2 hover:bg-gray-100 rounded-lg">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          <div
            v-for="ficha in fichasDoCadastro"
            :key="ficha.id"
            class="border border-gray-200 rounded-xl p-4"
          >
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-gray-900">{{ ficha.pfTematico.toUpperCase() }}</span>
                  <span :class="getStatusBadge(ficha.status)">{{ getStatusLabel(ficha.status) }}</span>
                </div>
                <p class="text-sm text-gray-500 mt-1">{{ getPFNome(ficha.pfTematico) }}</p>

                <!-- Diagnostico Resumido -->
                <div v-if="ficha.diagnostico?.descricaoAvaliacao" class="mt-3 text-sm">
                  <p class="text-gray-600 line-clamp-2">{{ ficha.diagnostico.descricaoAvaliacao }}</p>
                </div>

                <!-- Necessidades -->
                <div v-if="ficha.necessidades?.length > 0" class="mt-2">
                  <p class="text-xs text-gray-500">{{ ficha.necessidades.length }} necessidade(s) identificada(s)</p>
                </div>
              </div>

              <div v-if="ficha.status === 'submetida'" class="flex gap-2">
                <button
                  @click="aprovarFichaN1(ficha.id)"
                  class="px-3 py-1.5 text-sm rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                >
                  <CheckCircle class="w-4 h-4 inline mr-1" />
                  Aprovar
                </button>
                <button
                  @click="openFeedbackModal(ficha)"
                  class="px-3 py-1.5 text-sm rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200"
                >
                  <RotateCcw class="w-4 h-4 inline mr-1" />
                  Pedir Revisao
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex items-center justify-between">
          <p class="text-sm text-gray-500">
            {{ fichasAprovadasN1 }}/{{ fichasDoCadastro.length }} fichas aprovadas
          </p>
          <div class="flex gap-3">
            <button @click="showModalN1 = false" class="btn-secondary">Fechar</button>
            <button
              @click="submeterParaN2"
              :disabled="fichasAprovadasN1 < 7"
              :class="[
                'btn-primary',
                fichasAprovadasN1 < 7 ? 'opacity-50 cursor-not-allowed' : ''
              ]"
            >
              Enviar para Nivel 2
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Revisao N2 -->
    <div v-if="showModalN2" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Revisao Final - Nivel 2</h3>
            <p class="text-gray-500">{{ cadastroSelecionado?.nomeCompleto }}</p>
          </div>
          <button @click="showModalN2 = false" class="p-2 hover:bg-gray-100 rounded-lg">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          <!-- Resumo Geral -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h4 class="font-medium text-gray-900 mb-3">Resumo do Cadastro</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p class="text-gray-500">Fichas Tecnicas</p>
                <p class="font-semibold">7/7 aprovadas N1</p>
              </div>
              <div>
                <p class="text-gray-500">Necessidades</p>
                <p class="font-semibold">{{ todasNecessidades.length }}</p>
              </div>
              <div>
                <p class="text-gray-500">Custo Total</p>
                <p class="font-semibold">{{ formatCurrency(custoTotalNecessidades) }}</p>
              </div>
              <div>
                <p class="text-gray-500">Vulnerabilidades</p>
                <p class="font-semibold">{{ cadastroSelecionado?.vulnerabilidades?.length || 0 }}</p>
              </div>
            </div>
          </div>

          <!-- Lista de Necessidades Consolidadas -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Necessidades Consolidadas</h4>
            <div class="space-y-3">
              <div
                v-for="nec in todasNecessidades"
                :key="nec.id"
                class="border border-gray-200 rounded-lg p-3"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                        {{ nec.tipo?.toUpperCase() }}
                      </span>
                      <span :class="getPrioridadeBadge(nec.prioridade)">
                        {{ nec.prioridade }}
                      </span>
                    </div>
                    <p class="font-medium text-gray-900 mt-1">{{ nec.descricao }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ nec.fundamentacao }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">{{ formatCurrency(nec.custoEstimado) }}</p>
                    <p class="text-xs text-gray-500">{{ nec.tempoResolver }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <button @click="showModalN2 = false" class="btn-secondary">Fechar</button>
          <button
            @click="pedirAjustesN2"
            class="px-4 py-2.5 text-sm rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200"
          >
            Solicitar Ajustes
          </button>
          <button @click="aprovarN2" class="btn-primary bg-green-600 hover:bg-green-700">
            Aprovar para Orcamento
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Orcamento -->
    <div v-if="showModalOrcamento" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Definicao de Orcamento</h3>
            <p class="text-gray-500">{{ cadastroSelecionado?.nomeCompleto }}</p>
          </div>
          <button @click="showModalOrcamento = false" class="p-2 hover:bg-gray-100 rounded-lg">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <!-- Tabela de Orcamento por Area -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">Area Tematica</th>
                  <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Necessidades</th>
                  <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Orcamento Anual</th>
                  <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">Ja Coberto</th>
                  <th class="text-right py-3 px-4 text-sm font-medium text-gray-700">%</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="pf in pontosFocais"
                  :key="pf.id"
                  class="border-b border-gray-100"
                >
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100">{{ pf.codigo }}</span>
                      <span class="text-sm text-gray-700">{{ pf.nome.split(' ').slice(3).join(' ') }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-right text-sm text-gray-600">
                    {{ getNecessidadesByTipo(pf.id).length }}
                  </td>
                  <td class="py-3 px-4">
                    <input
                      type="number"
                      v-model.number="orcamentoForm[pf.id].total"
                      class="w-full px-3 py-2 text-right text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                    />
                  </td>
                  <td class="py-3 px-4">
                    <input
                      type="number"
                      v-model.number="orcamentoForm[pf.id].coberto"
                      class="w-full px-3 py-2 text-right text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      :max="orcamentoForm[pf.id].total"
                    />
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-green-500 rounded-full"
                          :style="{ width: getPercentagem(pf.id) + '%' }"
                        ></div>
                      </div>
                      <span class="text-sm font-medium text-gray-700">{{ getPercentagem(pf.id) }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-gray-50 font-medium">
                  <td class="py-4 px-4 text-gray-900">TOTAL</td>
                  <td class="py-4 px-4 text-right text-gray-900">{{ todasNecessidades.length }}</td>
                  <td class="py-4 px-4 text-right text-gray-900">{{ formatCurrency(totalOrcamento) }}</td>
                  <td class="py-4 px-4 text-right text-gray-900">{{ formatCurrency(totalCoberto) }}</td>
                  <td class="py-4 px-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <div class="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-green-500 rounded-full"
                          :style="{ width: percentagemGeral + '%' }"
                        ></div>
                      </div>
                      <span class="text-gray-900">{{ percentagemGeral }}%</span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Resumo Visual -->
          <div class="mt-6 grid grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-xl p-4 text-center">
              <p class="text-sm text-gray-500">Total Necessario</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalOrcamento) }}</p>
            </div>
            <div class="bg-green-50 rounded-xl p-4 text-center">
              <p class="text-sm text-green-600">Ja Coberto</p>
              <p class="text-2xl font-bold text-green-700">{{ formatCurrency(totalCoberto) }}</p>
            </div>
            <div class="bg-amber-50 rounded-xl p-4 text-center">
              <p class="text-sm text-amber-600">Faltante</p>
              <p class="text-2xl font-bold text-amber-700">{{ formatCurrency(totalOrcamento - totalCoberto) }}</p>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <button @click="showModalOrcamento = false" class="btn-secondary">Cancelar</button>
          <button @click="salvarOrcamento" class="btn-primary bg-green-600 hover:bg-green-700">
            Guardar e Aprovar para Publicacao
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Feedback -->
    <div v-if="showFeedbackModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-md">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">Pedir Revisao</h3>
          <p class="text-gray-500 text-sm">{{ fichaSelecionada?.pfTematico?.toUpperCase() }}</p>
        </div>
        <div class="p-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Feedback para o PF Tematico</label>
          <textarea
            v-model="feedbackText"
            rows="4"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Descreva o que precisa ser corrigido..."
          ></textarea>
        </div>
        <div class="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button @click="showFeedbackModal = false" class="btn-secondary">Cancelar</button>
          <button @click="enviarFeedback" class="btn-primary">Enviar Feedback</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { usePontoFocalStore } from '@/stores/pontoFocal'
import { usePontoFocalTematicoStore } from '@/stores/pontoFocalTematico'
import {
  Clock,
  FileCheck,
  Calculator,
  CheckCircle,
  Globe,
  Loader2,
  X,
  Shield,
  ListChecks,
  Wallet,
  RotateCcw
} from 'lucide-vue-next'

const pfStore = usePontoFocalStore()
const pfTematicoStore = usePontoFocalTematicoStore()

const loading = ref(false)
const activeTab = ref('nivel1')

const showModalN1 = ref(false)
const showModalN2 = ref(false)
const showModalOrcamento = ref(false)
const showFeedbackModal = ref(false)

const cadastroSelecionado = ref(null)
const fichaSelecionada = ref(null)
const feedbackText = ref('')

const orcamentoForm = reactive({
  sadd: { total: 0, coberto: 0 },
  sanc: { total: 0, coberto: 0 },
  sasbe: { total: 0, coberto: 0 },
  saad: { total: 0, coberto: 0 },
  saeie: { total: 0, coberto: 0 },
  saps: { total: 0, coberto: 0 },
  sape: { total: 0, coberto: 0 }
})

const pontosFocais = computed(() => pfStore.pontosFocaisTematicos)

// Cadastros por estado (simulacao para demo)
const cadastrosAguardandoN1 = computed(() =>
  pfStore.cadastros.filter(c => c.status === 'aguardando_revisao')
)

const cadastrosAguardandoN2 = computed(() =>
  pfStore.cadastros.filter(c => c.status === 'aprovado_nivel1')
)

const cadastrosParaOrcamento = computed(() =>
  pfStore.cadastros.filter(c => c.status === 'aprovado_nivel2')
)

const cadastrosProntos = computed(() =>
  pfStore.cadastros.filter(c => c.status === 'pronto_publicar')
)

const fichasDoCadastro = computed(() => {
  if (!cadastroSelecionado.value) return []
  return pfTematicoStore.getFichasByCadastro(cadastroSelecionado.value.id)
})

const fichasAprovadasN1 = computed(() =>
  fichasDoCadastro.value.filter(f => ['aprovada_nivel1', 'aprovada_nivel2'].includes(f.status)).length
)

const todasNecessidades = computed(() => {
  if (!cadastroSelecionado.value) return []
  return pfTematicoStore.getAllNecessidadesByCadastro(cadastroSelecionado.value.id)
})

const custoTotalNecessidades = computed(() =>
  todasNecessidades.value.reduce((sum, n) => sum + (n.custoEstimado || 0), 0)
)

const totalOrcamento = computed(() =>
  Object.values(orcamentoForm).reduce((sum, v) => sum + (v.total || 0), 0)
)

const totalCoberto = computed(() =>
  Object.values(orcamentoForm).reduce((sum, v) => sum + (v.coberto || 0), 0)
)

const percentagemGeral = computed(() => {
  if (totalOrcamento.value === 0) return 0
  return Math.round((totalCoberto.value / totalOrcamento.value) * 100)
})

const tabs = computed(() => [
  { id: 'nivel1', label: 'Nivel 1 - PF Comunitario', count: cadastrosAguardandoN1.value.length },
  { id: 'nivel2', label: 'Nivel 2 - Gestor', count: cadastrosAguardandoN2.value.length },
  { id: 'orcamento', label: 'Orcamento', count: cadastrosParaOrcamento.value.length },
  { id: 'prontos', label: 'Prontos Publicar', count: cadastrosProntos.value.length }
])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 0
  }).format(value || 0)
}

const getPFNome = (pfId) => {
  const pf = pontosFocais.value.find(p => p.id === pfId)
  return pf ? pf.nome : pfId
}

const getStatusBadge = (status) => {
  const classes = {
    submetida: 'px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700',
    aprovada_nivel1: 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700',
    aprovada_nivel2: 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700'
  }
  return classes[status] || 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
}

const getStatusLabel = (status) => {
  const labels = {
    submetida: 'Aguardando',
    aprovada_nivel1: 'Aprovada N1',
    aprovada_nivel2: 'Aprovada N2'
  }
  return labels[status] || status
}

const getPrioridadeBadge = (prioridade) => {
  const classes = {
    alta: 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700',
    media: 'px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700',
    baixa: 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
  }
  return classes[prioridade] || 'px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600'
}

const getNecessidadesCount = (cadastroId) => {
  return pfTematicoStore.getAllNecessidadesByCadastro(cadastroId).length
}

const getTotalNecessidades = (cadastroId) => {
  const necs = pfTematicoStore.getAllNecessidadesByCadastro(cadastroId)
  return necs.reduce((sum, n) => sum + (n.custoEstimado || 0), 0)
}

const getOrcamentoTotal = (cadastroId) => {
  const orc = pfTematicoStore.getOrcamentoByCadastro(cadastroId)
  return orc?.totalNecessario || 0
}

const getNecessidadesByTipo = (tipo) => {
  return todasNecessidades.value.filter(n => n.tipo === tipo)
}

const getPercentagem = (pfId) => {
  const orc = orcamentoForm[pfId]
  if (!orc?.total) return 0
  return Math.round((orc.coberto / orc.total) * 100)
}

const abrirRevisaoN1 = (cadastro) => {
  cadastroSelecionado.value = cadastro
  showModalN1.value = true
}

const abrirRevisaoN2 = (cadastro) => {
  cadastroSelecionado.value = cadastro
  showModalN2.value = true
}

const abrirOrcamento = (cadastro) => {
  cadastroSelecionado.value = cadastro
  
  // Preencher com dados existentes ou calcular dos custos
  const necs = pfTematicoStore.getAllNecessidadesByCadastro(cadastro.id)
  pontosFocais.value.forEach(pf => {
    const necsDoTipo = necs.filter(n => n.tipo === pf.id)
    const total = necsDoTipo.reduce((sum, n) => sum + (n.custoEstimado || 0), 0)
    orcamentoForm[pf.id] = { total, coberto: 0 }
  })
  
  showModalOrcamento.value = true
}

const aprovarFichaN1 = async (fichaId) => {
  await pfTematicoStore.aprovarFichaN1(fichaId, 'Aprovado pelo PF Comunitario')
}

const openFeedbackModal = (ficha) => {
  fichaSelecionada.value = ficha
  feedbackText.value = ''
  showFeedbackModal.value = true
}

const enviarFeedback = async () => {
  if (fichaSelecionada.value && feedbackText.value) {
    await pfTematicoStore.pedirRevisaoN1(fichaSelecionada.value.id, feedbackText.value)
    showFeedbackModal.value = false
  }
}

const submeterParaN2 = () => {
  // Simular mudanca de status
  if (cadastroSelecionado.value) {
    cadastroSelecionado.value.status = 'aprovado_nivel1'
  }
  showModalN1.value = false
}

const aprovarN2 = () => {
  if (cadastroSelecionado.value) {
    cadastroSelecionado.value.status = 'aprovado_nivel2'
  }
  showModalN2.value = false
}

const pedirAjustesN2 = () => {
  if (cadastroSelecionado.value) {
    cadastroSelecionado.value.status = 'aguardando_revisao'
  }
  showModalN2.value = false
}

const salvarOrcamento = async () => {
  if (cadastroSelecionado.value) {
    await pfTematicoStore.salvarOrcamento(cadastroSelecionado.value.id, { ...orcamentoForm })
    cadastroSelecionado.value.status = 'pronto_publicar'
  }
  showModalOrcamento.value = false
}

const publicarCrianca = (cadastro) => {
  cadastro.status = 'publicada'
  alert(`${cadastro.nomeCompleto} foi publicada no catalogo!`)
}

onMounted(async () => {
  loading.value = true
  await pfStore.fetchCadastros()
  await pfTematicoStore.fetchFichasTecnicas()
  loading.value = false
})
</script>
