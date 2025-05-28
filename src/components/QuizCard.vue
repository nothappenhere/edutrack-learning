<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  quiz: {
    type: Object,
    required: true,
  },
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}
</script>

<template>
  <article class="rounded-[10px] border border-gray-200 bg-white ps-6 pb-4">
    <div class="flex justify-end">
      <strong
        :class="[
          quiz.level === 'basic'
            ? 'bg-green-500'
            : quiz.level === 'intermediate'
              ? 'bg-yellow-500'
              : 'bg-red-600',
        ]"
        class="inline-flex items-center gap-1 rounded-se-xl rounded-es-xl px-3 py-1.5 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>

        <span class="text-[10px] font-medium sm:text-xs">{{ quiz.level }}</span>
      </strong>
    </div>

    <time :datetime="quiz.created_at" class="block text-xs text-gray-500">
      {{ formatDate(quiz.created_at) }}
    </time>

    <RouterLink :to="`/dashboard/teacher/quizzes/edit/${quiz.id}`">
      <h3 class="mt-0.5 text-lg font-medium text-gray-900">
        {{ quiz.title }}
      </h3>
    </RouterLink>

    <div class="mt-4 flex flex-wrap gap-1 items-center">
      <div class="sm:flex sm:items-center sm:gap-2">
        <div class="flex items-center gap-1 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M15.17 11.053L11.18 15.315C10.8416 15.6932 10.3599 15.9119 9.85236 15.9178C9.34487 15.9237 8.85821 15.7162 8.51104 15.346C7.74412 14.5454 7.757 13.2788 8.54004 12.494L13.899 6.763C14.4902 6.10491 15.3315 5.72677 16.2161 5.72163C17.1006 5.71649 17.9463 6.08482 18.545 6.736C19.8222 8.14736 19.8131 10.2995 18.524 11.7L12.842 17.771C12.0334 18.5827 10.9265 19.0261 9.78113 18.9971C8.63575 18.9682 7.55268 18.4695 6.78604 17.618C5.0337 15.6414 5.07705 12.6549 6.88604 10.73L12.253 5"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>

          <p class="text-xs">{{ quiz.subject }}</p>
        </div>

        <span class="hidden sm:block" aria-hidden="true">&middot;</span>

        <p class="hidden sm:block sm:text-xs sm:text-gray-500">
          Dibuat oleh
          <a href="#" class="font-medium underline hover:text-gray-700">
            {{ quiz.full_name }}
          </a>
        </p>
      </div>
    </div>
  </article>
</template>
