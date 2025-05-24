<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { useUserStore } from '@/stores/user.js'
import { addNewMaterials } from '@/services/materialService.js'

const userStore = useUserStore()
userStore.loadUser()
const user_id = userStore.user?.user_id

const form = reactive({
  title: '',
  description: '',
  subject: '',
  level: '',
  isSubmitting: false,
})

const image = ref(null)
const imagePreview = ref(null)
const isPDF = ref(false)
const isUploading = ref(false)
const uploadError = ref(false)
const files = ref([])

// const location = ref('')

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
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!user_id) {
    return toast.error('Penggguna belum login!', toastOpt.toastOptions)
  }

  if (!form.title || !form.description || !form.subject || !form.level) {
    return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
  }

  if (!image.value) {
    return toast.error('Mohon pilih file materi terlebih dahulu!', toastOpt.toastOptions)
  }

  isUploading.value = !isUploading.value
  uploadError.value = !uploadError.value
  form.isSubmitting = !form.isSubmitting
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const payload = {
      title: form.title,
      description: form.description,
      user_id: user_id,
      subject: form.subject,
      level: form.level,
      file: image.value,
    }

    const material = await addNewMaterials(payload)
    if (material.material_id) {
      // router.push('/login')
      toast.success(`${material.message}.`, toastOpt.toastOptions)
    }

    // fetchFiles()
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.[0]?.msg || // error dari express-validator
      'Terjadi kesalahan, silakan coba lagi'

    toast.error(`${message}.`, toastOpt.toastOptions)
  } finally {
    // Reset input
    form.title = ''
    form.description = ''
    form.subject = ''
    form.level = ''
    image.value = null
    imagePreview.value = null
    isUploading.value = false
  }
}

const fetchFiles = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/materials')
    files.value = response.data
  } catch (error) {
    console.error('Gagal mengambil daftar file:', error)
  }
}

onMounted(fetchFiles)
</script>

<template>
  <section class="bg-[#F0F3FF] font-poppins">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" src="../assets/img/logo.png" alt="Vue Logo" />
          <h2 class="text-3xl text-center font-bold mb-8">Buat Materi Baru</h2>

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
                  class="w-full max-w-2xl h-80 border rounded"
                ></iframe>

                <!-- Preview Gambar -->
                <img
                  v-else
                  :src="imagePreview"
                  alt="Preview"
                  class="max-w-sm mx-auto rounded shadow border"
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
            Simpan
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
