<script setup>
import { reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import QuizzesCard from '@/components/QuizzesCard.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { getQuizzes } from '@/services/quizService.js'
import { errorMessage } from '@/services/errorService.js'

const state = reactive({
  list: [],
  isLoading: true,
  isClosed: false,
})

const toggleButton = () => {
  state.isClosed = !state.isClosed
}

onMounted(async () => {
  try {
    const response = await getQuizzes()

    state.list = response.quizzes
    state.isLoading = false
  } catch (error) {
    errorMessage(error)
  }
})
</script>

<template>
  <section class="bg-[#F0F3FF] lg:min-h-screen px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <div v-if="state.list.length === 0" class="flex flex-col items-center justify-center pt-36">
        <h2 class="text-3xl font-bold mb-6 text-center font-poppins">
          Belum ada quiz yang tersedia.
        </h2>
        <RouterLink
          class="bg-[#5988FF] hover:bg-[#4970D1] rounded-md px-6 py-4 text-white font-poppins"
          to="/dashboard/teacher/quizzes/add"
        >
          Tambah quiz baru
        </RouterLink>

        <div v-if="state.isLoading" class="text-center py-6">
          <PulseLoader />
        </div>

        <div
          :class="[state.isClosed ? 'hidden' : '']"
          class="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div class="flex items-start justify-between">
              <h2 id="modalTitle" class="text-xl font-bold text-gray-900 sm:text-2xl">
                Quiz belum tersedia
              </h2>

              <button
                @click="toggleButton"
                type="button"
                class="-me-4 -mt-4 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800 focus:outline-none cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="mt-4">
              <p class="text-pretty text-gray-700">
                Anda belum menambahkan quiz apapun. Silakan mulai dengan membuat quiz pertama Anda
                untuk dibagikan kepada siswa.
              </p>
            </div>

            <footer class="mt-6 flex justify-end gap-2">
              <RouterLink
                class="rounded bg-[#5988FF] hover:bg-[#4970D1] px-4 py-2 text-sm font-medium text-white transition-colors"
                to="/dashboard/teacher/quizzes/add"
              >
                Tambah Quiz Baru
              </RouterLink>
            </footer>
          </div>
        </div>
      </div>

      <div v-else>
        <h2 class="text-3xl font-bold mb-6 text-center font-poppins">Daftar Quiz Anda</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuizzesCard v-for="material in state.list" :key="material.id" :material="material" />
        </div>
      </div>
    </div>
  </section>
</template>
