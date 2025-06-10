<script setup>
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { useUserStore } from '@/stores/user.js'
import { loginUser } from '../../backend/services/authService.js'
import { errorMessage } from '../../backend/services/errorService.js'

const router = useRouter()
const form = reactive({
  email: '',
  password: '',
  isSubmitting: false,
})

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()
  const userStore = useUserStore()

  if (!form.email || !form.password) {
    return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
  }

  form.isSubmitting = true
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const payload = {
      email: form.email,
      password: form.password,
    }

    const user = await loginUser(payload)
    const userData = {
      user_id: user.user_id,
      full_name: user.full_name,
      role: user.role,
      token: user.token,
    }

    userStore.setUser(userData)
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`

    router.push(`/dashboard/${user.role}`)
    toast.success(`${user.message}, selamat datang ${user.full_name}.`, toastOpt.toastOptions)
  } catch (error) {
    errorMessage(error)
  } finally {
    form.isSubmitting = false
  }
}
</script>

<template>
  <section class="bg-[#F0F3FF] font-poppins">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" src="../assets/img/logo.png" alt="Vue Logo" />
          <h2 class="text-3xl text-center font-bold mb-8">Masuk ke akun Anda</h2>

          <div class="mb-2">
            <i class="fa-solid fa-envelope me-2"></i>
            <label class="text-gray-700 font-bold mb-4">Alamat Email</label>
            <input
              type="email"
              v-model="form.email"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="eg. example@mail.com"
              required
            />
          </div>

          <div class="mb-4">
            <i class="fa-solid fa-lock me-2"></i>
            <label class="text-gray-700 font-bold">Kata Sandi</label>
            <input
              type="password"
              v-model="form.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Masukan Kata Sandi"
              required
            />
          </div>

          <button
            :class="[
              !form.isSubmitting
                ? 'bg-[#5988FF] hover:bg-[#4970D1] cursor-pointer '
                : 'bg-[#4970D1] cursor-not-allowed',
              'text-white',
              'font-medium',
              'py-4',
              'px-4',
              'w-full',
            ]"
            type="submit"
            :disabled="form.isSubmitting"
          >
            Masuk
          </button>

          <div class="flex justify-between mt-5">
            <RouterLink to="/reset-password" class="text-gray-700 hover:text-gray-900"
              >Lupa Kata Sandi?</RouterLink
            >
            <RouterLink to="/register/student" class="text-gray-700 hover:text-gray-900"
              >Buat Akun Gratis</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
