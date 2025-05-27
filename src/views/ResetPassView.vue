<script setup>
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { checkEmailExist, resetPasswordUser } from '@/services/authService.js'
import { errorMessage } from '@/services/errorService.js'

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

  form.isSubmitting = true

  try {
    const email = await checkEmailExist({ email: form.email })
    if (email.exist) {
      toast.success(`${email.message}.`, toastOpt.toastOptions)
      form.isEmailValid = true
    }
  } catch (error) {
    errorMessage(error)
    form.isEmailValid = false
  } finally {
    form.isSubmitting = false
  }
}

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

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

    const reset = await resetPasswordUser(payload)

    router.push('/login')
    toast.success(`${reset.message}.`, toastOpt.toastOptions)
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
            type="button"
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
