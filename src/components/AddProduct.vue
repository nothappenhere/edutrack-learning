<script setup>
import { ref, reactive, onMounted } from 'vue'
import Navbar from './Navbar.vue'

const product = reactive({
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
})

console.log('test tambah materi')

const image = ref(null)
const imagePreview = ref(null)
const isUploading = ref(false)
const uploadError = ref(false)
const files = ref([])
const location = ref('')

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    image.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  if (!image.value) {
    alert('Mohon pilih gambar produk terlebih dahulu!')
    return
  }

  isUploading.value = true
  uploadError.value = false

  const formData = new FormData()
  formData.append('name', product.name)
  formData.append('description', product.description)
  formData.append('category', product.category)
  formData.append('price', product.price)
  formData.append('stock', product.stock)

  if (image.value) {
    formData.append('image', image.value)
  }

  try {
    const response = await fetch('http://18.141.194.211/api/product/add', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Gagal mengupload produk')
    }

    const data = await response.json()
    location.value = data.location
    fetchFiles()

    // Kosongkan form setelah upload
    product.name = ''
    product.description = ''
    product.category = ''
    product.price = ''
    product.stock = ''
    image.value = null
    imagePreview.value = null

    alert('Produk berhasil diupload!')
  } catch (error) {
    uploadError.value = true
    console.error('Upload gagal:', error)
  } finally {
    isUploading.value = false
  }
}

const fetchFiles = async () => {
  try {
    const response = await fetch('http://18.141.194.211/api/files')
    if (!response.ok) {
      throw new Error('Gagal mengambil daftar file')
    }
    files.value = await response.json()
  } catch (error) {
    console.error('Gagal mengambil daftar file:', error)
  }
}

onMounted(fetchFiles)
</script>

<template>
  <Navbar />

  <section class="bg-gradient-to-br min-h-screen py-5 from-[#E0F6FD] to-[#E8E7FD]">
    <div class="max-w-2xl bg-white mx-auto my-5 p-6 rounded-lg border shadow-2xl">
      <h2 class="text-2xl font-bold text-center mb-4">Upload Product</h2>

      <!-- Alert Error Upload -->
      <div v-if="uploadError" role="alert" class="border-s-4 border-red-700 bg-red-100 p-4 mb-4">
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

          <strong class="font-medium"> Something went wrong </strong>
        </div>

        <p class="mt-2 text-sm text-red-700">Failed to upload the product. Please try again!</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Nama Produk -->
        <div>
          <label for="name" class="relative">
            <input
              type="text"
              id="name"
              v-model="product.name"
              placeholder=""
              class="peer mt-0.5 w-full rounded-sm border border-gray-300 shadow-sm sm:text-sm p-3 ps-4"
            />

            <span
              class="absolute inset-y-0 start-3 -translate-y-[22px] bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[22px]"
            >
              Product Name
            </span>
          </label>
        </div>

        <!-- Deskripsi Produk -->
        <div>
          <label for="description" class="relative">
            <textarea
              id="description"
              v-model="product.description"
              class="peer mt-0.5 w-full rounded-sm border border-gray-300 shadow-sm sm:text-sm p-3 ps-4"
              rows="5"
            ></textarea>

            <span
              :class="[
                'absolute inset-y-0 start-3 -translate-y-[100px] bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-focus:-translate-y-[118px]',
                product.description ? 'peer-valid:-translate-y-[118px]' : '-translate-y-[100px]',
              ]"
            >
              Description
            </span>
          </label>
        </div>

        <!-- Kategori Produk -->
        <div>
          <label for="category" class="relative">
            <select
              v-model="product.category"
              id="category"
              required
              class="w-full p-3 border border-gray-300 rounded-sm shadow-sm text-sm"
            >
              <option value="">-</option>
              <option value="Electronic">Electronic</option>
              <option value="Fashion">Fashion</option>
              <option value="Food">Food</option>
              <option value="Furniture">Furniture</option>
              <option value="Beauty">Beauty</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Automotive">Automotive</option>
              <option value="Books">Books</option>
              <option value="Health">Health</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Gadgets">Gadgets</option>
            </select>

            <span
              class="absolute inset-y-0 start-3 -translate-y-[22px] bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[22px]"
            >
              Category
            </span>
          </label>
        </div>

        <!-- Harga Produk -->
        <div>
          <label for="price" class="relative">
            <input
              type="number"
              id="price"
              v-model="product.price"
              placeholder=""
              class="peer mt-0.5 w-full rounded-sm border border-gray-300 shadow-sm sm:text-sm p-3 ps-4"
            />

            <span
              class="absolute inset-y-0 start-3 -translate-y-[22px] bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[22px]"
            >
              Price
            </span>
          </label>
        </div>

        <!-- Stok Produk -->
        <div>
          <label for="stock" class="relative">
            <input
              type="number"
              id="stock"
              v-model="product.stock"
              placeholder=""
              class="peer mt-0.5 w-full rounded-sm border border-gray-300 shadow-sm sm:text-sm p-3 ps-4"
            />

            <span
              class="absolute inset-y-0 start-3 -translate-y-[22px] bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[22px]"
            >
              Stock
            </span>
          </label>
        </div>

        <!-- Foto Produk -->
        <div>
          <label
            for="File"
            class="mt-5 flex flex-col items-center rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6 cursor-pointer hover:bg-gray-200"
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
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>

            <span class="mt-4 font-medium"> Upload your file(s) </span>

            <span
              class="mt-2 inline-block rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-200"
            >
              Browse files
            </span>

            <div v-if="imagePreview" class="mt-5 text-center">
              <img
                :src="imagePreview"
                alt="Image Preview"
                class="max-w-sm mx-auto rounded-sm shadow-sm border"
              />
            </div>

            <input
              type="file"
              id="File"
              accept="image/*"
              @change="handleFileChange"
              class="sr-only"
            />
          </label>
        </div>

        <!-- Submit Button -->
        <div>
          <hr class="text-gray-400 mt-5" />
          <button
            type="submit"
            :disabled="isUploading"
            class="w-full mt-5 text-center group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:ring-3 focus:outline-hidden cursor-pointer"
          >
            <span
              class="absolute inset-y-0 left-0 w-1 bg-indigo-600 transition-all duration-500 group-hover:w-full"
            ></span>

            <span
              class="relative font-semibold text-indigo-600 transition-colors group-hover:text-white"
            >
              {{ isUploading ? 'Uploading...' : 'Upload' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
