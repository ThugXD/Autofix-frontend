<template>
  <div>
    <div class="card mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Informações</h2>
      <p class="text-gray-600">Sobre o sistema e suporte</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sobre o Sistema -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Wrench class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">AutoFixApp</h3>
            <p class="text-sm text-gray-600">Sistema de Gestão para Oficinas</p>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Versão</span>
            <span class="font-semibold text-gray-900">1.0.0</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Lançamento</span>
            <span class="font-semibold text-gray-900">Janeiro 2026</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Ambiente</span>
            <span class="badge badge-success">Produção</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-gray-600">Licença</span>
            <span class="font-semibold text-gray-900">Premium</span>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 class="font-semibold text-blue-900 mb-2">Desenvolvido por</h4>
          <p class="text-sm text-blue-800">Valter Zandamela</p>
          <p class="text-xs text-blue-600 mt-1">© 2026 Todos os direitos reservados</p>
        </div>
      </div>

      <!-- Suporte -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Headphones class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Suporte</h3>
            <p class="text-sm text-gray-600">Entre em contacto connosco</p>
          </div>
        </div>

        <div class="space-y-4">
          <a
            href="mailto:suporte@autofixapp.com"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Mail class="w-5 h-5 text-gray-600" />
            <div>
              <p class="text-sm font-medium text-gray-900">Email</p>
              <p class="text-xs text-gray-600">vvalterzandamela@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+258844847046"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Phone class="w-5 h-5 text-gray-600" />
            <div>
              <p class="text-sm font-medium text-gray-900">Telefone</p>
              <p class="text-xs text-gray-600">+258 84 484 7046</p>
            </div>
          </a>

          <a
            href="https://wa.me/258844847046"
            target="_blank"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MessageCircle class="w-5 h-5 text-gray-600" />
            <div>
              <p class="text-sm font-medium text-gray-900">WhatsApp</p>
              <p class="text-xs text-gray-600">+258 84 000 0000</p>
            </div>
          </a>
        </div>

        <div class="mt-6">
          <h4 class="font-semibold text-gray-900 mb-3">Horário de Atendimento</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Segunda a Sexta</span>
              <span class="font-medium text-gray-900">08:00 - 18:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Sábado</span>
              <span class="font-medium text-gray-900">08:00 - 13:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Domingo</span>
              <span class="font-medium text-gray-900">Fechado</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recursos -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <BookOpen class="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Recursos</h3>
            <p class="text-sm text-gray-600">Documentação e ajuda</p>
          </div>
        </div>

        <div class="space-y-2">
          <a
            href="#"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-3">
              <FileText class="w-5 h-5 text-gray-600" />
              <span class="text-sm font-medium text-gray-900">Manual do Usuário</span>
            </div>
            <ExternalLink class="w-4 h-4 text-gray-400" />
          </a>

          <a
            href="#"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-3">
              <Video class="w-5 h-5 text-gray-600" />
              <span class="text-sm font-medium text-gray-900">Tutoriais em Vídeo</span>
            </div>
            <ExternalLink class="w-4 h-4 text-gray-400" />
          </a>

          <a
            href="#"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-3">
              <HelpCircle class="w-5 h-5 text-gray-600" />
              <span class="text-sm font-medium text-gray-900">FAQ - Perguntas Frequentes</span>
            </div>
            <ExternalLink class="w-4 h-4 text-gray-400" />
          </a>

          <a
            href="#"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-3">
              <MessageSquare class="w-5 h-5 text-gray-600" />
              <span class="text-sm font-medium text-gray-900">Base de Conhecimento</span>
            </div>
            <ExternalLink class="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>

      <!-- Novidades -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Zap class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Novidades</h3>
            <p class="text-sm text-gray-600">Últimas atualizações</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="border-l-4 rounded-xl border-blue-500 pl-4 py-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge badge-info">v1.0.0</span>
              <span class="text-xs text-gray-500">09/01/2026</span>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Lançamento Oficial</h4>
            <p class="text-sm text-gray-600">Sistema completo de gestão para oficinas com dashboard, ordens de serviço, gestão de clientes e muito mais!</p>
          </div>

          <div class="border-l-4 rounded-xl border-green-500 pl-4 py-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge badge-success">Novo</span>
              <span class="text-xs text-gray-500">05/01/2026</span>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Sistema de Pagamentos</h4>
            <p class="text-sm text-gray-600">Suporte para múltiplos métodos de pagamento incluindo M-Pesa!</p>
          </div>

          <div class="border-l-4 rounded-xl border-purple-500 pl-4 py-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge bg-purple-100 text-purple-700">Em Breve</span>
              <span class="text-xs text-gray-500">Q1 2026</span>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">App Mobile</h4>
            <p class="text-sm text-gray-600">Aplicativo móvel para Android e iOS em desenvolvimento.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback -->
    <div class="card mt-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Star class="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Feedback</h3>
          <p class="text-sm text-gray-600">Ajude-nos a melhorar o sistema</p>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <p class="text-gray-700 mb-4">
          Sua opinião é muito importante para nós! Compartilhe suas sugestões, 
          reporte problemas ou simplesmente nos diga o que achou do sistema.
        </p>
        <BaseButton variant="primary" :icon="Send">
          Enviar Feedback
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Wrench,
  Headphones,
  BookOpen,
  Zap,
  Star,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Video,
  HelpCircle,
  MessageSquare,
  ExternalLink,
  Send
} from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
</script>