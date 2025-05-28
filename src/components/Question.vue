<script setup>
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
    />

    <div class="flex justify-center items-center gap-4">
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

    <div class="flex justify-center items-center gap-6">
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
