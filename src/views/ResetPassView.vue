<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { checkEmailExist, resetPassword } from '@/services/authService.js'

const router = useRouter()
const form = reactive({
  email: '',
  password: '',
  isEmailValid: false,
  isSubmitting: false,
})

const checkEmail = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!form.email) {
    return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
  }

  form.isSubmitting = !form.isSubmitting
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const payload = {
      email: form.email,
    }

    const email = checkEmailExist(payload)
    if (email.exist) {
      toast.success(`${email.message}.`, toastOpt.toastOptions)
      form.isEmailValid = !form.isEmailValid
    }
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.[0]?.msg || // error dari express-validator
      'Terjadi kesalahan, silakan coba lagi'

    toast.error(`${message}.`, toastOpt.toastOptions)
  } finally {
    form.isSubmitting = !form.isSubmitting
  }
}

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!form.email || !form.password) {
    return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
  }

  if (form.password.length < 8) {
    return toast.error('Kata sandi baru harus minimal 8 karakter.', toastOpt.toastOptions)
  }

  form.isSubmitting = !form.isSubmitting
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const payload = {
      email: form.email,
      password: form.password,
    }

    const reset = resetPassword(payload)
    if (reset.status === 200) {
      router.push('/login')
      toast.success(`${reset.message}.`, toastOpt.toastOptions)
    }
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.[0]?.msg || // error dari express-validator
      'Terjadi kesalahan, silakan coba lagi'

    toast.error(`${message}.`, toastOpt.toastOptions)
  } finally {
    // Reset input
    form.email = ''
    form.password = ''
    form.isSubmitting = !form.isSubmitting
  }
}
</script>

<template>
  <section class="bg-[#F0F3FF] font-poppins">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" src="../assets/img/logo.png" alt="Vue Logo" />
          <h2 class="text-3xl text-center font-bold mb-8">Atur Kata Sandi Baru</h2>

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

          <div class="mb-4" v-if="form.isEmailValid">
            <i class="fa-solid fa-lock me-2"></i>
            <label class="text-gray-700 font-bold">Kata Sandi Baru</label>
            <input
              type="password"
              v-model="form.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Masukan Kata Sandi Baru"
              required
            />
          </div>

          <!-- Check Email Button -->
          <button
            v-if="!form.isEmailValid"
            @click="checkEmail"
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
            Periksa Email
          </button>

          <!-- Reset Password Button -->
          <button
            v-else
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
            Reset Kata Sandi
          </button>

          <div class="flex justify-start items-center mt-5">
            <i class="fa fa-solid fa-arrow-left me-2"></i>
            <RouterLink to="/login" class="text-gray-700 hover:text-gray-900">
              Kembali ke Halaman Masuk
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
