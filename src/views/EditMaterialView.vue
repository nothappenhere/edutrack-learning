<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

// import BackButton from '@/components/BackButton.vue'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { useUserStore } from '@/stores/user.js'
import { updateMaterial } from '@/services/materialService.js'

const userStore = useUserStore()
userStore.loadUser()
const user_id = userStore.user?.user_id

const route = useRoute()
const materialId = route.params.id
const router = useRouter()
const image = ref(null)
const imagePreview = ref(null)
const isPDF = ref(false)

const form = reactive({
  title: '',
  description: '',
  subject: '',
  level: '',
  isSubmitting: false,
  uploadError: false,
})

const state = reactive({
  material: {},
  isLoading: true,
})

const toast = useToast()
const toastOpt = useToastOption()

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    image.value = file
    const fileUrl = URL.createObjectURL(file)
    imagePreview.value = fileUrl
    isPDF.value = file.type === 'application/pdf'
  }
}

const handleSubmit = async () => {
  if (!user_id) {
    return toast.error('Penggguna belum login!', toastOpt.toastOptions)
  }

  if (!form.title || !form.description || !form.subject || !form.level) {
    return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
  }

  if (!image.value) {
    return toast.error('Mohon pilih file materi terlebih dahulu!', toastOpt.toastOptions)
  }

  form.isSubmitting = true
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const payload = {
      title: form.title,
      description: form.description,
      uploadedBy: user_id,
      subject: form.subject,
      level: form.level,
      file: image.value,
    }

    const material = await updateMaterial(materialId, payload)
    console.log(material)
    if (material.status === 200) {
      router.push('/dashboard/teacher/materials')
      toast.success(`${material.data.message}.`, toastOpt.toastOptions)
    }
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.[0]?.msg || // error dari express-validator
      'Terjadi kesalahan, silakan coba lagi'

    toast.error(`${message}.`, toastOpt.toastOptions)
    form.uploadError = true
  } finally {
    image.value = null
    imagePreview.value = null
    form.isSubmitting = false
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/materials/${materialId}`)

    state.material = response.data.material
    state.isLoading = false

    form.title = state.material.title
    form.description = state.material.description
    form.subject = state.material.subject
    form.level = state.material.level
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.[0]?.msg ||
      'Terjadi kesalahan saat mengambil data materi. Silakan coba kembali.'

    toast.error(message, toastOpt.toastOptions)
  }
})
</script>

<template>
  <!-- <BackButton :id="jobId" /> -->

  <section class="bg-[#F0F3FF] font-poppins">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" src="../assets/img/logo.png" alt="Vue Logo" />
          <h2 class="text-3xl text-center font-bold mb-8">Ubah Materi</h2>

          <!-- Judul Materi -->
          <div class="mb-3">
            <label class="text-gray-700 font-semibold block mb-1">
              <i class="fa-solid fa-book-open-reader me-2"></i> Judul Materi
            </label>
            <input
              type="text"
              v-model="form.title"
              class="border w-full py-2 px-3 rounded"
              placeholder="Contoh: Dasar Matematika"
              required
            />
          </div>

          <!-- Deskripsi Materi -->
          <div class="mb-3">
            <label class="text-gray-700 font-semibold block mb-1">
              <i class="fa-solid fa-folder me-2"></i> Deskripsi
            </label>
            <textarea
              v-model="form.description"
              class="border w-full py-2 px-3 rounded"
              placeholder="Berikan deskripsi singkat materi"
              rows="3"
            ></textarea>
          </div>

          <!-- Subjek -->
          <div class="mb-3">
            <label class="text-gray-700 font-semibold block mb-1">
              <i class="fa-solid fa-table me-2"></i> Subjek
            </label>
            <input
              type="text"
              v-model="form.subject"
              class="border w-full py-2 px-3 rounded"
              placeholder="Misalnya: Matematika, Fisika, Biologi, dll."
            />
          </div>

          <!-- Level -->
          <div class="mb-8">
            <label class="text-gray-700 font-semibold block mb-1">
              <i class="fa-solid fa-layer-group me-2"></i> Level Materi
            </label>
            <select v-model="form.level" class="border w-full py-2 px-3 rounded" required>
              <option disabled value="">Pilih level</option>
              <option value="basic">Dasar</option>
              <option value="intermediate">Menengah</option>
              <option value="advanced">Sulit</option>
            </select>
          </div>

          <!-- Upload File -->
          <div class="mb-8">
            <label
              for="File"
              class="mt-5 flex flex-col items-center rounded border p-4 text-gray-900 shadow-sm sm:p-6 cursor-pointer hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25"
                />
              </svg>

              <span class="mt-4 font-medium">Unggah Materi (PDF/Gambar)</span>
              <span
                class="mt-2 inline-block rounded border bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xl"
              >
                Browse files
              </span>

              <!-- Preview PDF atau Gambar -->
              <div v-if="imagePreview" class="mt-4 text-center">
                <!-- Preview PDF -->
                <iframe
                  v-if="isPDF"
                  :src="imagePreview"
                  class="w-full max-w-3xl h-80 border rounded"
                ></iframe>

                <!-- Preview Gambar -->
                <img
                  v-else
                  :src="imagePreview"
                  alt="Preview"
                  class="max-w-sm mx-auto border rounded"
                />
              </div>

              <input
                type="file"
                id="File"
                accept="application/pdf,image/*"
                @change="handleFileChange"
                class="sr-only"
                required
              />
            </label>
          </div>

          <button
            :class="[
              !form.isSubmitting
                ? 'bg-[#5988FF] hover:bg-[#4970D1] cursor-pointer'
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
            {{ form.isSubmitting ? 'Menyimpan materi...' : 'Simpan' }}
          </button>

          <!-- Alert Error Upload -->
          <div
            v-if="form.uploadError"
            role="alert"
            class="border-s-4 border-e-4 border-red-700 bg-red-100 p-4 mt-4"
          >
            <div class="flex items-center gap-2 text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"
                />
              </svg>

              <strong class="font-medium"> Terjadi kesalahan </strong>
            </div>

            <p class="mt-2 text-sm text-red-700">Gagal memperbarui materi. Silakan coba lagi!</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
