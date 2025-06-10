<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { useUserStore } from '@/stores/user.js'
import { getSingleMaterial, updateMaterial, deleteMaterial } from '../services/materialService.js'
import { errorMessage } from '../services/errorService.js'

const userStore = useUserStore()
userStore.loadUser()
const user_id = userStore.user?.user_id
const role = userStore.user?.role

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
  file: '',
  isSubmitting: false,
  uploadError: false,
})

const state = reactive({
  material: {},
  isLoading: true,
  isClosed: false,
  isDelete: false,
})

const toggleButton = () => {
  state.isClosed = !state.isClosed
}

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
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('uploadedBy', user_id)
    formData.append('subject', form.subject)
    formData.append('level', form.level)
    formData.append('file', image.value)

    const response = await updateMaterial(materialId, formData)

    router.push('/dashboard/teacher/materials')
    toast.success(`${response.message}.`, toastOpt.toastOptions)
  } catch (error) {
    errorMessage(error)
    form.uploadError = true
  } finally {
    image.value = null
    imagePreview.value = null
    form.isSubmitting = false
  }
}

const confirmDeleteMaterial = async () => {
  try {
    const response = await deleteMaterial(materialId)

    router.push('/dashboard/teacher/materials')
    toast.success(`${response.message}.`, toastOpt.toastOptions)
  } catch (error) {
    errorMessage(error)
  }
}

onMounted(async () => {
  try {
    const response = await getSingleMaterial(materialId)

    state.material = response.material
    state.isLoading = false

    form.title = state.material.title
    form.description = state.material.description
    form.subject = state.material.subject
    form.level = state.material.level

    imagePreview.value = state.material.file_url
    isPDF.value = state.material.file_url?.toLowerCase().endsWith('.pdf')
  } catch (error) {
    errorMessage(error)
  }
})
</script>

<template>
  <section v-if="role === 'teacher'" class="bg-[#F0F3FF] font-poppins">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
        <form @submit.prevent="handleSubmit">
          <div class="flex justify-between items-center mb-5">
            <div>
              <RouterLink
                :to="`/dashboard/${role}/materials`"
                class="text-gray-700 hover:text-gray-900"
              >
                <i class="fa fa-solid fa-arrow-left me-2"></i>
                Kembali ke Daftar Materi
              </RouterLink>
            </div>

            <div>
              <button @click="toggleButton" type="button" class="text-gray-700 hover:text-gray-900">
                Hapus Materi
                <i class="fa fa-solid fa-trash ms-2"></i>
              </button>
            </div>
          </div>

          <div
            role="alert"
            :class="[state.isClosed ? '' : 'hidden']"
            class="rounded-md border border-gray-300 bg-[#FF4646] p-4 shadow-sm"
          >
            <div class="flex items-start ms-3">
              <div class="flex-1">
                <strong class="font-medium text-white"> Hapus Materi </strong>

                <p class="mt-0.5 text-sm text-white">
                  Apakah Anda yakin ingin menghapus materi ini?
                </p>

                <div class="mt-3 flex items-center gap-2">
                  <button
                    @click="confirmDeleteMaterial"
                    type="button"
                    class="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:text-[#E5EDFF] hover:border-[#E5EDFF] cursor-pointer"
                  >
                    Ya
                  </button>

                  <button
                    @click="toggleButton"
                    type="button"
                    class="rounded border border-transparent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:text-gray-200 cursor-pointer"
                  >
                    Tidak
                  </button>
                </div>
              </div>

              <button
                @click="toggleButton"
                class="-m-3 rounded-full p-1.5 text-white transition-colors hover:bg-gray-50 hover:text-black"
                type="button"
                aria-label="Dismiss alert"
              >
                <span class="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <img class="h-20 w-auto m-auto" src="../assets/img/logo.png" alt="Vue Logo" />
          <h2 class="text-3xl text-center font-bold mb-8">Perbarui Materi</h2>

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
            {{ form.isSubmitting ? 'Memperbarui materi...' : 'Perbarui' }}
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

  <div v-else class="container m-auto max-w-lg py-14">
    <div class="group relative overflow-hidden border">
      <!-- Preview PDF atau Gambar -->
      <div v-if="imagePreview" class="text-center border-b">
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
          class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </div>

      <div class="relative border border-gray-100 bg-white p-6">
        <span
          :class="[
            form.level === 'basic'
              ? 'bg-green-500'
              : form.level === 'intermediate'
                ? 'bg-yellow-500'
                : 'bg-red-600',
          ]"
          class="px-3 py-1.5 text-white text-xs font-medium whitespace-nowrap"
        >
          {{ form.level }}
        </span>

        <h3 class="mt-4 text-lg font-medium text-gray-900">{{ form.title }}</h3>

        <p class="mt-1.5 text-sm text-gray-700">{{ form.description }}</p>

        <form class="mt-4 flex gap-4">
          <RouterLink
            :to="`/dashboard/${role}/materials`"
            class="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 cursor-pointer text-center"
          >
            <i class="fa fa-solid fa-arrow-left me-2"></i>
            Kembali ke Daftar Materi
          </RouterLink>

          <a
            :href="state.material.file_url"
            target="_blank"
            class="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105 cursor-pointer text-center"
          >
            Download Materi
          </a>
        </form>
      </div>
    </div>
  </div>
</template>
