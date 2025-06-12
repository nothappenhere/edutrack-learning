import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import { useUserStore } from '/stores/user.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
})

// Inisialisasi store pengguna dan konfigurasi axios
const userStore = useUserStore()
userStore.loadUser()

if (userStore.user?.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.user.token}`
}

app.mount('#app')
