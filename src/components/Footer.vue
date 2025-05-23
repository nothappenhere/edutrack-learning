<script setup>
import { RouterLink, useRoute } from 'vue-router'
</script>

<template>
  <footer class="bg-white border-t">
    <div class="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
      <div
        v-if="useRoute().path == '/'"
        class="flex flex-col items-center gap-4 rounded-lg bg-[#3F88C5] p-6 shadow-lg sm:flex-row sm:justify-between"
      >
        <p class="text-xl font-semibold text-white sm:text-xl">
          Siap Memulai Perjalanan Belajarmu?
        </p>

        <RouterLink
          aria-label="Mulai belajar sekarang"
          class="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-[#3F88C5] hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden transition-all duration-200 ease-in-out"
          to="/login"
        >
          <span class="text-sm font-medium"> Yuk, Mulai Belajar Sekarang! </span>

          <svg
            class="size-5 shadow-sm rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </RouterLink>
      </div>

      <div :class="[useRoute().path != '/' ? 'mt-0' : 'mt-10', 'flex', 'justify-center']">
        <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
          Copyright &copy; {{ new Date().getFullYear() }}. Muhammad Rizky Akbar.
        </p>
      </div>
    </div>
  </footer>
</template>
