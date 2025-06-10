<script setup>
import { reactive, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import QuizCard from '@/components/QuizCard.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { getQuizzes, getQuizzesById } from '../../backend/services/quizService.js'
import { errorMessage } from '../../backend/services/errorService.js'
import { useUserStore } from '@/stores/user'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
const userStore = useUserStore()
userStore.loadUser()
const user_id = userStore.user?.user_id
const role = userStore.user?.role

const state = reactive({
  list: [],
  isLoading: true,
  isClosed: false,
})

const toggleButton = () => {
  state.isClosed = !state.isClosed
}

const refreshQuizzes = async () => {
  try {
    let response = ''

    if (role === 'teacher') {
      response = await getQuizzesById(user_id)
    } else {
      response = await getQuizzes()
    }

    state.list = response.quizzes
    state.isLoading = false
  } catch (error) {
    errorMessage(error)
  }
}

onMounted(async () => {
  try {
    let response = ''

    if (role === 'teacher') {
      response = await getQuizzesById(user_id)
    } else {
      response = await getQuizzes()
    }

    state.list = response.quizzes
    state.isLoading = false
  } catch (error) {
    errorMessage(error)
  }
})
</script>

<template>
  <div class="flex">
    <Sidebar v-if="route.meta.requiresAuth === true" />

    <section class="bg-[#F0F3FF] flex-1/2 lg:min-h-screen px-4 py-10">
      <div class="container-xl lg:container m-auto">
        <div
          v-if="state.list.length === 0 && role === 'teacher'"
          class="flex flex-col items-center justify-center pt-36"
        >
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
          <div class="flex justify-center">
            <h2 class="text-3xl font-bold mb-6 text-center font-poppins">
              {{ role === 'teacher' ? 'Daftar Quiz Anda' : 'Daftar quiz yang tersedia' }}
            </h2>
            <svg
              @click="refreshQuizzes"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="size-8 ml-2 mt-1 text-[#292D32] hover:text-gray-600 cursor-pointer"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="0.4"
                  d="M16.19 2H7.82001C4.17001 2 2 4.17 2 7.81V16.18C2 19.82 4.17 21.99 7.81 21.99H16.18C19.82 21.99 21.99 19.82 21.99 16.18V7.81C22 4.17 19.83 2 16.19 2Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M18.0004 11.27C17.5804 11.27 17.2504 11.6 17.2504 12.02C17.2404 13.42 16.7004 14.73 15.7204 15.71C14.7304 16.7 13.4104 17.25 12.0104 17.25C10.6104 17.25 9.29038 16.7 8.30038 15.71C8.27038 15.68 8.2504 15.65 8.2204 15.62H9.05038C9.46038 15.62 9.80038 15.28 9.80038 14.87C9.80038 14.46 9.46038 14.12 9.05038 14.12H6.40039C5.99039 14.12 5.65039 14.46 5.65039 14.87V17.52C5.65039 17.93 5.99039 18.27 6.40039 18.27C6.81039 18.27 7.15039 17.93 7.15039 17.52V16.67C7.18039 16.7 7.21039 16.74 7.24039 16.78C8.51039 18.05 10.2104 18.76 12.0104 18.76C13.8104 18.76 15.5104 18.06 16.7804 16.78C18.0404 15.52 18.7404 13.83 18.7504 12.03C18.7504 11.61 18.4104 11.28 18.0004 11.27Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M6.00022 12.65C6.41022 12.65 6.74022 12.32 6.75022 11.91C6.77022 10.54 7.32022 9.25 8.28022 8.28C9.27022 7.29 10.5902 6.74 11.9902 6.74C13.3902 6.74 14.7102 7.29 15.7002 8.28C15.7302 8.31 15.7502 8.34 15.7802 8.37H14.9502C14.5402 8.37 14.2002 8.71 14.2002 9.12C14.2002 9.53 14.5402 9.87 14.9502 9.87H17.6002C18.0102 9.87 18.3502 9.53 18.3502 9.12V6.48C18.3502 6.07 18.0102 5.73 17.6002 5.73C17.1902 5.73 16.8502 6.07 16.8502 6.48V7.34C16.8202 7.31 16.7902 7.27 16.7602 7.23C15.4902 5.96 13.7902 5.25 11.9902 5.25C10.1902 5.25 8.49022 5.95 7.22022 7.23C5.97022 8.47 5.27022 10.13 5.25022 11.89C5.24022 12.3 5.57021 12.64 5.99021 12.65C6.00021 12.65 6.00022 12.65 6.00022 12.65Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuizCard v-for="quiz in state.list" :key="quiz.id" :quiz="quiz" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
