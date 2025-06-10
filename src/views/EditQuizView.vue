<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { useUserStore } from '@/stores/user.js'
import {
  getSingleQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from '../../backend/services/quizService.js'
import { errorMessage } from '../../backend/services/errorService.js'
import Question from '@/components/Question.vue'

const userStore = useUserStore()
userStore.loadUser()
const user_id = userStore.user?.user_id
const role = userStore.user?.role

const form = reactive({
  title: '',
  subject: '',
  level: '',
  isSubmitting: false,
  uploadError: false,
})

const state = reactive({
  quiz: {},
  isLoading: true,
  isClosed: false,
  isDelete: false,
})

const toggleButton = () => {
  state.isClosed = !state.isClosed
}

const toast = useToast()
const toastOpt = useToastOption()

const route = useRoute()
const quizId = route.params.id

const router = useRouter()
const questions = ref([])
const questionNumber = ref(0)
const validAnswer = ['A', 'B', 'C', 'D']
const score = ref(0)
const isFinished = ref(false)

const increaseQuestion = () => {
  questionNumber.value++
  questions.value.push({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  })
}
const decreaseQuestion = () => {
  if (questionNumber.value > 0) {
    questionNumber.value--
    questions.value.pop()
  }

  if (questionNumber.value <= 0) questionNumber.value = 0
}

const handleSubmit = async () => {
  if (role === 'teacher') {
    if (!user_id) {
      return toast.error('Penggguna belum login!', toastOpt.toastOptions)
    }

    if (!form.title || !form.subject || !form.level) {
      return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
    }

    if (questions.value.length === 0) {
      return toast.error(
        'Jumlah soal tidak boleh kosong, buat minimal 1 soal!',
        toastOpt.toastOptions,
      )
    }

    // Validasi tiap soal
    for (const [i, q] of questions.value.entries()) {
      if (!validAnswer.includes(q.correct_answer.toUpperCase())) {
        return toast.error(
          `Jawaban benar pada soal ${i + 1} tidak valid! Hanya boleh A, B, C, atau D.`,
          toastOpt.toastOptions,
        )
      }
    }

    form.isSubmitting = true
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    try {
      const payload = {
        title: form.title,
        subject: form.subject,
        level: form.level,
        created_by: user_id,
        questions: questions.value.map((q) => ({
          ...q,
          correct_answer: q.correct_answer.toUpperCase(), // Pastikan huruf besar saat dikirim
        })),
      }

      const quiz = await updateQuiz(quizId, payload)

      if (quiz.quiz_id) {
        router.push('/dashboard/teacher/quizzes')
        toast.success(`${quiz.message}.`, toastOpt.toastOptions)
      }
    } catch (error) {
      errorMessage(error)
      form.uploadError = true
    } finally {
      form.isSubmitting = false
    }
  } else if (role === 'student') {
    if (!user_id) {
      return toast.error('Penggguna belum login!', toastOpt.toastOptions)
    }

    form.isSubmitting = true

    try {
      // Kumpulkan jawaban siswa
      const payload = {
        quiz_id: quizId,
        user_id,
        answers: questions.value.map((q) => ({
          question_id: q.id,
          selected_answer: q.selectedAnswer || null,
        })),
      }

      const result = await submitQuiz(quizId, payload) // panggil API backend
      if (result) {
        isFinished.value = true
        score.value = result.score
      }

      // Tampilkan hasil
      toast.success(` ${result.message}`, toastOpt.toastOptions)
    } catch (error) {
      errorMessage(error)
      form.uploadError = true
    } finally {
      form.isSubmitting = false
    }
  }
}

const confirmDeleteQuiz = async () => {
  try {
    const response = await deleteQuiz(quizId)

    router.push('/dashboard/teacher/quizzes')
    toast.success(`${response.message}.`, toastOpt.toastOptions)
  } catch (error) {
    errorMessage(error)
  }
}

onMounted(async () => {
  try {
    const response = await getSingleQuiz(quizId)

    state.quiz = response.quiz
    state.isLoading = false

    form.title = state.quiz.title
    form.subject = state.quiz.subject
    form.level = state.quiz.level

    questions.value.push(...response.questions)
    questionNumber.value = response.questions.length
  } catch (error) {
    errorMessage(error)
  }
})
</script>

<template>
  <section class="bg-[#F0F3FF] font-poppins">
    <form @submit.prevent="handleSubmit" class="flex items-start justify-center gap-16 px-14">
      <div class="container max-w-lg py-14">
        <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
          <div class="flex justify-between items-center mb-5">
            <div>
              <RouterLink
                :to="`/dashboard/${role}/quizzes`"
                class="text-gray-700 hover:text-gray-900"
              >
                <i class="fa fa-solid fa-arrow-left me-2"></i>
                Kembali ke Daftar Quiz
              </RouterLink>
            </div>

            <div v-if="role === 'teacher'">
              <button @click="toggleButton" type="button" class="text-gray-700 hover:text-gray-900">
                Hapus Quiz
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
                <strong class="font-medium text-white"> Hapus Quiz </strong>

                <p class="mt-0.5 text-sm text-white">Apakah Anda yakin ingin menghapus quiz ini?</p>

                <div class="mt-3 flex items-center gap-2">
                  <button
                    @click="confirmDeleteQuiz"
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
          <h2 class="text-3xl text-center font-bold mb-8">
            {{ role === 'teacher' ? 'Perbarui Quiz' : 'Kerjakan Quiz' }}
          </h2>

          <!-- Judul Quiz -->
          <div class="mb-3">
            <label class="text-gray-700 font-semibold block mb-1">
              <i class="fa-solid fa-book-open-reader me-2"></i> Judul Quiz
            </label>
            <input
              type="text"
              v-model="form.title"
              class="border w-full py-2 px-3 rounded"
              placeholder="Contoh: Dasar Matematika"
              required
              :disabled="role !== 'teacher'"
            />
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
              required
              :disabled="role !== 'teacher'"
            />
          </div>

          <!-- Level -->
          <div class="mb-8">
            <label class="text-gray-700 font-semibold block mb-1">
              <i class="fa-solid fa-layer-group me-2"></i> Level Quiz
            </label>
            <select
              v-model="form.level"
              class="border w-full py-2 px-3 rounded"
              required
              :disabled="role !== 'teacher'"
            >
              <option disabled value="">Pilih level</option>
              <option value="basic">Dasar</option>
              <option value="intermediate">Menengah</option>
              <option value="advanced">Sulit</option>
            </select>
          </div>

          <button
            v-if="role === 'teacher'"
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
          >
            {{ role === 'teacher' && form.isSubmitting ? 'Memperbarui kuis...' : 'Perbarui' }}
          </button>

          <button
            v-if="role === 'student'"
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
          >
            {{
              role === 'student' && form.isSubmitting
                ? 'Menyimpan jawaban kuis...'
                : 'Kumpulkan Kuis'
            }}
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

            <p class="mt-2 text-sm text-red-700">
              {{ role === 'teacher' ? 'Gagal memperbarui kuis.' : 'Gagal menyimpan jawaban kuis.' }}
              Silakan coba lagi!
            </p>
          </div>
        </div>
      </div>

      <div class="container max-w-lg py-14">
        <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
          <!-- <img class="h-20 w-auto m-auto" src="../assets/img/logo.png" alt="Vue Logo" /> -->
          <h2 class="text-3xl text-center font-bold mb-8">Soal Quiz</h2>
          <div :class="[role === 'teacher' ? 'justify-end' : '']" class="flex justify-between">
            <div
              :class="[role === 'teacher' ? 'hidden' : '']"
              class="flex justify-between items-center mb-5 gap-3"
            >
              <div class="flex-1/2 font-semibold text-gray-700 text-right text-lg">
                <p>Score:</p>
              </div>

              <div class="bg-gray-100">
                <label for="Quantity" class="sr-only"> Score </label>

                <div class="flex items-center justify-center rounded-sm border border-gray-200">
                  <input
                    type="number"
                    id="Quantity"
                    :value="score"
                    disabled
                    class="h-8 w-14 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none px-3"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center mb-5 gap-3">
              <div class="flex-1/2 font-semibold text-gray-700 text-right text-lg">
                <p>Jumlah soal:</p>
              </div>

              <div class="bg-gray-100">
                <label for="Quantity" class="sr-only"> Quantity </label>

                <div class="flex items-center justify-center rounded-sm border border-gray-200">
                  <button
                    @click="decreaseQuestion"
                    :disabled="role !== 'teacher'"
                    type="button"
                    :class="[role === 'student' ? 'hidden' : '']"
                    class="size-10 leading-10 text-gray-600 transition hover:opacity-75 hover:border cursor-pointer"
                  >
                    &minus;
                  </button>

                  <input
                    type="number"
                    id="Quantity"
                    :value="questionNumber"
                    :disabled="role !== 'teacher'"
                    class="h-8 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <button
                    @click="increaseQuestion"
                    :disabled="role !== 'teacher'"
                    type="button"
                    :class="[role === 'student' ? 'hidden' : '']"
                    class="size-10 leading-10 text-gray-600 transition hover:opacity-75 hover:border cursor-pointer"
                  >
                    &plus;
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <!-- Soal Quiz -->
          <Question
            v-for="(q, index) in questions"
            :key="index"
            :question-number="index + 1"
            :isFinished="isFinished"
            v-model:question="questions[index]"
          />
        </div>
      </div>
    </form>
  </section>
</template>
