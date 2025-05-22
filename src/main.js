import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

// Set Authorization header untuk setiap request axios
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`

app.use(createPinia())
app.use(router)
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
})

app.mount('#app')
