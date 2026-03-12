import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from './plugins/toast'
import { useAuthStore } from '@/stores/auth'

// Estilos
import './assets/main.css'
import './assets/theme-transitions.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

//restaurar sessão
const auth = useAuthStore()
auth.checkAuth()

app.use(router)
app.use(Toast)

app.mount('#app')