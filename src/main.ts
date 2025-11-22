import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Инициализируем авторизацию перед монтированием приложения
const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
  app.mount('#app')
})
