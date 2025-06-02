<script setup>
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()
userStore.loadUser()
const role = userStore.user?.role

const props = defineProps({
  questionNumber: Number,
  question: Object,
})
const emit = defineEmits(['update:question'])

const updateField = (field, value) => {
  emit('update:question', { ...props.question, [field]: value })
}
</script>

<template>
  <!-- Judul Quiz -->
  <div class="mb-3">
    <label class="text-gray-700 font-semibold block mb-1"> Soal {{ props.questionNumber }} </label>
    <input
      type="text"
      :value="question.question_text"
      @input="updateField('question_text', $event.target.value)"
      class="border w-full py-2 px-3 rounded"
      placeholder="Masukan soal quiz"
      required
      :disabled="role !== 'teacher'"
    />

    <!-- Teacher -->
    <div
      v-if="role === 'teacher'"
      :class="role === 'teacher' ? 'gap-4' : 'gap-6'"
      class="flex justify-center items-center"
    >
      <!-- Opsi Jawaban A -->
      <label class="relative text-gray-700 block my-4">
        <input
          type="text"
          :value="question.option_a"
          @input="updateField('option_a', $event.target.value)"
          placeholder=""
          class="peer mt-0.5 w-full rounded shadow-sm sm:text-sm border py-2 px-3"
          required
        />

        <span
          class="absolute inset-y-2 start-3 -translate-y-4 px-0.5 bg-white text-sm font-semibold text-gray-700 transition-transform peer-placeholder-shown:translate-y-[3px] peer-focus:-translate-y-4"
        >
          Opsi A
        </span>
      </label>

      <!-- Opsi Jawaban B -->
      <label class="relative text-gray-700 block my-4">
        <input
          type="text"
          :value="question.option_b"
          @input="updateField('option_b', $event.target.value)"
          placeholder=""
          class="peer mt-0.5 w-full rounded shadow-sm sm:text-sm border py-2 px-3"
          required
        />

        <span
          class="absolute inset-y-2 start-3 -translate-y-4 px-0.5 bg-white text-sm font-semibold text-gray-700 transition-transform peer-placeholder-shown:translate-y-[3px] peer-focus:-translate-y-4"
        >
          Opsi B
        </span>
      </label>

      <!-- Opsi Jawaban C -->
      <label class="relative text-gray-700 block my-4">
        <input
          type="text"
          :value="question.option_c"
          @input="updateField('option_c', $event.target.value)"
          placeholder=""
          class="peer mt-0.5 w-full rounded shadow-sm sm:text-sm border py-2 px-3"
          required
        />

        <span
          class="absolute inset-y-2 start-3 -translate-y-4 px-0.5 bg-white text-sm font-semibold text-gray-700 transition-transform peer-placeholder-shown:translate-y-[3px] peer-focus:-translate-y-4"
        >
          Opsi C
        </span>
      </label>

      <!-- Opsi Jawaban D -->
      <label class="relative text-gray-700 block my-4">
        <input
          type="text"
          :value="question.option_d"
          @input="updateField('option_d', $event.target.value)"
          placeholder=""
          class="peer mt-0.5 w-full rounded shadow-sm sm:text-sm border py-2 px-3"
          required
        />

        <span
          class="absolute inset-y-2 start-3 -translate-y-4 px-0.5 bg-white text-sm font-semibold text-gray-700 transition-transform peer-placeholder-shown:translate-y-[3px] peer-focus:-translate-y-4"
        >
          Opsi D
        </span>
      </label>
    </div>

    <!-- Student -->
    <fieldset v-else class="space-x-5 justify-center flex">
      <legend class="sr-only">Delivery</legend>
      <!-- Opsi Jawaban A -->
      <div>
        <label
          class="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-[#5988FF] has-checked:ring-1 has-checked:ring-[#4970D1] my-4"
        >
          <input
            type="radio"
            :name="`answer-${props.questionNumber}`"
            :value="question.option_a"
            class="size-5 border-gray-300"
            @change="updateField('selectedAnswer', question.option_a)"
          />

          <div>
            <p class="text-gray-700">{{ question.option_a }}</p>
          </div>
        </label>
      </div>

      <!-- Opsi Jawaban B -->
      <div>
        <label
          class="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-[#5988FF] has-checked:ring-1 has-checked:ring-[#4970D1] my-4"
        >
          <input
            type="radio"
            :name="`answer-${props.questionNumber}`"
            :value="question.option_b"
            class="size-5 border-gray-300"
            @change="updateField('selectedAnswer', question.option_a)"
          />

          <div>
            <p class="text-gray-700">{{ question.option_b }}</p>
          </div>
        </label>
      </div>

      <!-- Opsi Jawaban C -->
      <div>
        <label
          class="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-[#5988FF] has-checked:ring-1 has-checked:ring-[#4970D1] my-4"
        >
          <input
            type="radio"
            :name="`answer-${props.questionNumber}`"
            :value="question.option_c"
            class="size-5 border-gray-300"
            @change="updateField('selectedAnswer', question.option_a)"
          />

          <div>
            <p class="text-gray-700">{{ question.option_c }}</p>
          </div>
        </label>
      </div>

      <!-- Opsi Jawaban D -->
      <div>
        <label
          class="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-[#5988FF] has-checked:ring-1 has-checked:ring-[#4970D1] my-4"
        >
          <input
            type="radio"
            :name="`answer-${props.questionNumber}`"
            :value="question.option_d"
            class="size-5 border-gray-300"
            @change="updateField('selectedAnswer', question.option_a)"
          />

          <div>
            <p class="text-gray-700">{{ question.option_d }}</p>
          </div>
        </label>
      </div>
    </fieldset>

    <div v-if="role === 'teacher'" class="flex justify-center items-center gap-6">
      <label class="text-gray-700 font-semibold block mb-1">
        Jawaban Benar Soal {{ props.questionNumber }}
      </label>
      <input
        type="text"
        :value="question.correct_answer.toUpperCase()"
        @input="updateField('correct_answer', $event.target.value.toUpperCase())"
        class="border w-[102px] py-2 px-3 rounded"
        placeholder="A/ B/ C/D "
        required
      />
    </div>
  </div>
</template>
