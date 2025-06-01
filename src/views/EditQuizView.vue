<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'
import { useUserStore } from '@/stores/user.js'
import { getSingleQuiz, updateQuiz, deleteQuiz } from '@/services/quizService.js'
import { errorMessage } from '@/services/errorService.js'
import Question from '@/components/Question.vue'

const userStore = useUserStore()
userStore.loadUser()
const user_id = userStore.user?.user_id

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
const questions = reactive([])
const questionNumber = ref(0)
const validAnswer = ['A', 'B', 'C', 'D']

const increaseQusetion = () => {
  questionNumber.value++
  questions.push({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  })
}
const decreaseQusetion = () => {
  if (questionNumber.value > 0) {
    questionNumber.value--
    questions.pop()
  }

  if (questionNumber.value <= 0) questionNumber.value = 0
}

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!user_id) {
    return toast.error('Penggguna belum login!', toastOpt.toastOptions)
  }

  if (!form.title || !form.subject || !form.level) {
    return toast.error('Semua kolom harus diisi!', toastOpt.toastOptions)
  }

  if (questions.length === 0) {
    return toast.error(
      'Jumlah soal tidak boleh kosong, buat minimal 1 soal!',
      toastOpt.toastOptions,
    )
  }

  // Validasi tiap soal
  for (const [i, q] of questions.entries()) {
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
      questions: questions.map((q) => ({
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

    questions.push(...response.questions)
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
              <RouterLink to="/dashboard/teacher/quizzes" class="text-gray-700 hover:text-gray-900">
                <i class="fa fa-solid fa-arrow-left me-2"></i>
                Kembali ke Daftar Quiz
              </RouterLink>
            </div>

            <div>
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
          <h2 class="text-3xl text-center font-bold mb-8">Perbarui Quiz</h2>

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
            />
          </div>

          <!-- Level -->
          <div class="mb-8">
            <label class="text-gray-700 font-semibold block mb-1">
              <i class="fa-solid fa-layer-group me-2"></i> Level Quiz
            </label>
            <select v-model="form.level" class="border w-full py-2 px-3 rounded" required>
              <option disabled value="">Pilih level</option>
              <option value="basic">Dasar</option>
              <option value="intermediate">Menengah</option>
              <option value="advanced">Sulit</option>
            </select>
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
            {{ form.isSubmitting ? 'Memperbarui quiz...' : 'Perbarui' }}
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

            <p class="mt-2 text-sm text-red-700">Gagal memperbarui quiz. Silakan coba lagi!</p>
          </div>
        </div>
      </div>

      <div class="container max-w-lg py-14">
        <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0 border">
          <!-- <img class="h-20 w-auto m-auto" src="../assets/img/logo.png" alt="Vue Logo" /> -->
          <h2 class="text-3xl text-center font-bold mb-8">Soal Quiz</h2>
          <div class="flex justify-between items-center mb-5 gap-3">
            <div class="flex-1/2 font-semibold text-gray-700 text-right text-lg">
              <p>Jumlah soal:</p>
            </div>

            <div class="bg-gray-100">
              <label for="Quantity" class="sr-only"> Quantity </label>

              <div class="flex items-center justify-center rounded-sm border border-gray-200">
                <button
                  @click="decreaseQusetion"
                  type="button"
                  class="size-10 leading-10 text-gray-600 transition hover:opacity-75 hover:border cursor-pointer"
                >
                  &minus;
                </button>

                <input
                  type="number"
                  id="Quantity"
                  :value="questionNumber"
                  class="h-8 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  @click="increaseQusetion"
                  type="button"
                  class="size-10 leading-10 text-gray-600 transition hover:opacity-75 hover:border cursor-pointer"
                >
                  &plus;
                </button>
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <!-- Soal Quiz -->
          <Question
            v-for="(q, index) in questions"
            :key="index"
            :question-number="index + 1"
            v-model:question="questions[index]"
          />
        </div>
      </div>
    </form>
  </section>
</template>
