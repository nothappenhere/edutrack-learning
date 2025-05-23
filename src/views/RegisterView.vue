<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import router from '@/router'
import axios from 'axios'
import logo from '@/assets/img/logo.png'

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}

const register = reactive({
  full_name: '',
  email: '',
  password: '',
  isSubmitting: false,
})

const route = useRoute()
const role = computed(() => route.params.role)
const validRoles = ['student', 'teacher']
if (!validRoles.includes(role.value)) {
  router.replace('/404')
}

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!register.full_name || !register.email || !register.password) {
    return toast.error('All fields are required!', toastOpt.toastOptions)
  }
  if (register.password.length < 8) {
    return toast.error('Password must be at least 8 characters.', toastOpt.toastOptions)
  }

  const newRegister = {
    ...register,
    role: role.value,
  }

  console.log(newRegister.role)

  try {
    register.isSubmitting = !register.isSubmitting
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const response = await axios.post(
      `http://localhost:8000/api/auth/register/${role.value}`,
      newRegister,
    )
    const user = response.data

    if (user.user_id) {
      router.push('/login')
      toast.success(`Registration successful.`, toastOpt.toastOptions)
    }
  } catch (error) {
    toast.error('Something went wrong, please try again.', toastOpt.toastOptions)
  } finally {
    // Reset input
    register.full_name = ''
    register.email = ''
    register.password = ''
    register.isSubmitting = !register.isSubmitting
  }
}
</script>

<template>
  <!-- Citizen Registration -->
  <section class="bg-[#F0F3FF] font-poppins">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" :src="logo" alt="Vue Logo" />
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
              v-model="register.full_name"
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
              v-model="register.email"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="eg. example@mail.com"
              required
            />
          </div>

          <div class="mb-4">
            <i class="fa-solid fa-lock me-2"></i>
            <label class="text-gray-700 font-bold">Password</label>
            <input
              type="password"
              v-model="register.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Masukan Password"
              required
            />
          </div>

          <button
            :class="[
              !register.isSubmitting
                ? 'hover:bg-[#4970D1] cursor-pointer'
                : 'hover:bg-[#4970D1] cursor-not-allowed',
              'bg-[#5988FF]',
              'text-white',
              'font-medium',
              'py-4',
              'px-4',
              'w-full',
            ]"
            type="submit"
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
