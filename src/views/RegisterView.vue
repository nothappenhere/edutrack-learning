<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { registerUser } from '../services/authService.js'
import { errorMessage } from '../services/errorService.js'

const route = useRoute()
const router = useRouter()
const form = reactive({
  full_name: '',
  email: '',
  password: '',
  isSubmitting: false,
})

const validRoles = ['student', 'teacher']
const role = computed(() => route.params.role)
if (!validRoles.includes(role.value)) {
  router.replace('/404')
}

const isActiveLink = (routePath) => route.path === routePath

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!form.full_name || !form.email || !form.password) {
    return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
  }

  form.isSubmitting = true
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const payload = {
      full_name: form.full_name,
      email: form.email,
      password: form.password,
      role: role.value,
    }

    const user = await registerUser(role.value, payload)
    if (user.user_id) {
      router.push(`/login`)
      toast.success(`${user.message}.`, toastOpt.toastOptions)
    }
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
          <div v-if="isActiveLink('/register/student')">
            <h2 class="text-3xl text-center font-bold mb-2">Buat Akun Siswa</h2>
            <p class="text-center text-gray-600 mb-8">
              Isi informasi Anda untuk mulai belajar dan menjelajahi berbagai materi seru.
            </p>
          </div>

          <div v-if="isActiveLink('/register/teacher')">
            <h2 class="text-3xl text-center font-bold mb-2">Buat Akun Pengajar</h2>
            <p class="text-center text-gray-600 mb-8">
              Daftarkan diri Anda dan mulai berbagi pengetahuan serta menginspirasi siswa.
            </p>
          </div>

          <div class="mb-2 hidden">
            <input
              type="text"
              :value="role"
              class="border w-full py-2 px-3 mb-4 mt-2"
              disabled
              required
            />
          </div>

          <div class="mb-2">
            <i class="fa-solid fa-user me-2"></i>
            <label class="text-gray-700 font-bold mb-2">Nama Lengkap</label>
            <input
              type="text"
              v-model="form.full_name"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Masukan Nama Lengkap"
              required
            />
          </div>

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
            Buat Akun
          </button>

          <div class="flex flex-col justify-center items-center mt-5">
            <p v-if="isActiveLink('/register/student')" class="text-gray-700 mt-2">
              Mendaftar sebagai pengajar?
              <RouterLink to="/register/teacher" class="text-[#5988FF] hover:text-[#4970D1]">
                Daftar di sini
              </RouterLink>
            </p>

            <p v-if="isActiveLink('/register/teacher')" class="text-gray-700 mt-2">
              Mendaftar sebagai siswa?
              <RouterLink to="/register/student" class="text-[#5988FF] hover:text-[#4970D1]">
                Daftar di sini
              </RouterLink>
            </p>
            <p class="text-gray-700 my-2">— atau —</p>
            <p class="text-gray-700">
              Sudah memiliki akun?
              <RouterLink to="/login" class="text-[#5988FF] hover:text-[#4970D1]">
                Masuk
              </RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
