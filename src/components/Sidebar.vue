<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'

import { getCurrentUser } from '../services/authService.js'
import { errorMessage } from '../services/errorService.js'

import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/user'
import { useToastOption } from '@/stores/toast.js'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const toastOpt = useToastOption()

const userStore = useUserStore()
userStore.loadUser()
const user_id = userStore.user?.user_id
const role = userStore.user?.role

const state = reactive({
  full_name: '',
  email: '',
})

const logout = () => {
  userStore.clearUser()
  toast.success('Berhasil logout.', toastOpt.toastOptions)
  router.push('/')
}

onMounted(async () => {
  try {
    const response = await getCurrentUser(user_id)

    state.full_name = response.full_name
    state.email = response.email
  } catch (error) {
    errorMessage(error)
  }
})
</script>

<template>
  <div class="flex h-auto flex-col justify-between border-e border-gray-100 bg-[#E5EDFF] w-56 my-0">
    <div class="px-4 py-10">
      <span class="hidden md:block text-black text-4xl font-bold text-center">
        Edu<span class="text-[#5988FF]">Track</span>
      </span>

      <ul class="mt-6 space-y-1">
        <li>
          <RouterLink
            :to="`/dashboard/${role}`"
            :class="[
              route.name === 'Dashboard' ? 'bg-white text-gray-800' : 'bg-none text-gray-500',
            ]"
            class="block rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <i class="fa-solid fa-house me-2"></i> Home
          </RouterLink>
        </li>

        <!-- Teacher -->
        <li>
          <details
            :class="[
              route.name === 'List-Materials' || route.name === 'Add-Material'
                ? '[&_summary::-webkit-details-marker] text-gray-800'
                : '[&_summary::-webkit-details-marker]:hidden bg-none text-gray-500',
            ]"
            class="group"
          >
            <summary
              class="flex cursor-pointer items-center justify-between rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-800"
            >
              <span> <i class="fa-solid fa-folder me-2"></i> Materi </span>

              <span
                :class="[
                  route.name === 'List-Materials' || route.name === 'Add-Material'
                    ? '[&_summary::-webkit-details-marker]:visible'
                    : '',
                ]"
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul v-if="role === 'teacher'" class="mt-2 space-y-1 px-4">
              <li>
                <RouterLink
                  :to="`/dashboard/${role}/materials`"
                  :class="[
                    route.name === 'List-Materials'
                      ? 'bg-white text-gray-800'
                      : 'bg-none text-gray-500',
                  ]"
                  class="block rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Daftar Materi
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="`/dashboard/${role}/materials/add`"
                  :class="[
                    route.name === 'Add-Material'
                      ? 'bg-white text-gray-800'
                      : 'bg-none text-gray-500',
                  ]"
                  class="block rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Buat Materi
                </RouterLink>
              </li>
            </ul>

            <ul v-else class="mt-2 space-y-1 px-4">
              <li>
                <RouterLink
                  :to="`/dashboard/${role}/materials`"
                  :class="[
                    route.name === 'List-Materials'
                      ? 'bg-white text-gray-800'
                      : 'bg-none text-gray-500',
                  ]"
                  class="block rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Daftar Materi
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details
            :class="[
              route.name === 'List-Quizzes' || route.name === 'Add-Quiz'
                ? ' text-gray-800'
                : '[&_summary::-webkit-details-marker]:hidden bg-none text-gray-500',
            ]"
            class="group"
          >
            <summary
              class="flex cursor-pointer items-center justify-between rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-800"
            >
              <span> <i class="fa-solid fa-file me-2"></i> Quiz </span>

              <span
                :class="[
                  route.name === 'List-Quizzes' || route.name === 'Add-Quiz'
                    ? '[&_summary::-webkit-details-marker]:visible'
                    : '',
                ]"
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul v-if="role === 'teacher'" class="mt-2 space-y-1 px-4">
              <li>
                <RouterLink
                  :to="`/dashboard/${role}/quizzes`"
                  :class="[
                    route.name === 'List-Quizzes'
                      ? 'bg-white text-gray-800'
                      : 'bg-none text-gray-500',
                  ]"
                  class="block rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Daftar Quiz
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="`/dashboard/${role}/quizzes/add`"
                  :class="[
                    route.name === 'Add-Quiz' ? 'bg-white text-gray-800' : 'bg-none text-gray-500',
                  ]"
                  class="block rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Buat Quiz
                </RouterLink>
              </li>
            </ul>

            <ul v-else class="mt-2 space-y-1 px-4">
              <li>
                <RouterLink
                  :to="`/dashboard/${role}/quizzes`"
                  :class="[
                    route.name === 'List-Quizzes'
                      ? 'bg-white text-gray-800'
                      : 'bg-none text-gray-500',
                  ]"
                  class="block rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Daftar Quiz
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <button
            @click="logout"
            :class="[
              route.name === 'List-Material' ? 'bg-white text-gray-800' : 'bg-none text-gray-500',
            ]"
            class="cursor-pointer block w-full text-left rounded-md px-5 py-2 text-sm font-medium hover:bg-[#FF5678] hover:text-white"
          >
            <i class="fa-solid fa-right-from-bracket me-2"></i> Logout
          </button>
        </li>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <div class="flex items-center gap-2 bg-white p-4 hover:bg-gray-100">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 rounded-full object-cover"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="12" cy="9" r="3" stroke="#000000" stroke-width="1.5"></circle>
            <path
              d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
          </g>
        </svg>

        <div>
          <p class="text-xs">
            <strong class="block font-medium">{{ state.full_name }}</strong>

            <span> {{ state.email }} </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
