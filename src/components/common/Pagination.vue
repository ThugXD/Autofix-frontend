<template>
  <div class="flex items-center justify-between">
    <!-- Info -->
    <div class="text-sm text-gray-600">
      Mostrando
      <span class="font-medium">{{ startItem }}</span>
      a
      <span class="font-medium">{{ endItem }}</span>
      de
      <span class="font-medium">{{ total }}</span>
      resultados
    </div>

    <!-- Pagination Buttons -->
    <div class="flex items-center gap-2">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>

      <!-- Page Numbers -->
      <div class="hidden sm:flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="page !== '...' && goToPage(page)"
          :class="[
            'px-3 py-2 border rounded-lg text-sm font-medium transition-colors',
            page === currentPage
              ? 'bg-gray-900 text-white border-gray-900'
              : page === '...'
              ? 'border-transparent cursor-default'
              : 'border-gray-300 hover:bg-gray-50'
          ]"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>

      <!-- Mobile: Current Page Info -->
      <div class="sm:hidden px-3 py-2 text-sm font-medium text-gray-700">
        {{ currentPage }} / {{ lastPage }}
      </div>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === lastPage"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['page-change'])

const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.total)
})

const visiblePages = computed(() => {
  const pages = []
  const delta = 2 // Número de páginas antes e depois da atual

  if (props.lastPage <= 7) {
    // Se tem poucas páginas, mostrar todas
    for (let i = 1; i <= props.lastPage; i++) {
      pages.push(i)
    }
  } else {
    // Mostrar com ellipsis
    if (props.currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(props.lastPage)
    } else if (props.currentPage >= props.lastPage - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = props.lastPage - 4; i <= props.lastPage; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = props.currentPage - delta; i <= props.currentPage + delta; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(props.lastPage)
    }
  }

  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>