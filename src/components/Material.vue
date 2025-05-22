<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    id="material"
    class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 font-poppins"
  >
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
      <!-- Materi Matematika -->
      <div class="divide-y divide-gray-300 rounded-2xl shadow-xs bg-[#F0F3FF] hover:scale">
        <div class="p-6 sm:px-8">
          <h2 class="text-sm font-medium text-[#5988FF]">
            Dasar-Menengah
            <span class="sr-only">Plan</span>
          </h2>

          <p class="my-4">
            <strong class="text-1xl text-gray-900 sm:text-3xl"> Matematika </strong>
          </p>

          <p class="text-gray-700">
            Materi ini membahas konsep dasar hingga lanjutan dalam matematika yang sering dijumpai
            dalam kehidupan sehari-hari.
          </p>

          <RouterLink
            class="mt-4 block rounded-sm border border-[#5988FF] bg-[#5988FF] px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-[#5988FF] focus:ring-3 focus:outline-hidden sm:mt-6"
            to="/login"
          >
            Mulai Belajar
          </RouterLink>
        </div>

        <div class="p-6 sm:px-8">
          <p class="text-md font-medium text-gray-900 sm:text-md">Topik yang akan dipelajari:</p>

          <ul class="space-y-2 mt-3">
            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Penjumlahan dan Pengurangan </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Perkalian dan Pembagian </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Pecahan dan Desimal </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Geometri Dasar </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Statistik Sederhana </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Materi Bahasa Indonesia -->
      <div class="divide-y divide-gray-300 rounded-2xl shadow-xs bg-[#F0F3FF]">
        <div class="p-6 sm:px-8">
          <h2 class="text-sm font-medium text-[#5988FF]">
            Dasar-Menengah
            <span class="sr-only">Plan</span>
          </h2>

          <p class="my-4">
            <strong class="text-1xl text-gray-900 sm:text-3xl"> Bahasa Indonesia </strong>
          </p>

          <p class="text-gray-700">
            Pelajari penggunaan bahasa Indonesia yang baik dan benar, mulai dari ejaan, tata bahasa,
            hingga menulis paragraf efektif.
          </p>

          <RouterLink
            class="mt-4 block rounded-sm border border-[#5988FF] bg-[#5988FF] px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-[#5988FF] focus:ring-3 focus:outline-hidden sm:mt-6"
            to="/login"
          >
            Mulai Belajar
          </RouterLink>
        </div>

        <div class="p-6 sm:px-8">
          <p class="text-md font-medium text-gray-900 sm:text-md">Topik yang akan dipelajari:</p>

          <ul class="space-y-2 mt-3">
            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Ejaan dan Tanda Baca </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Kalimat Efektif </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Paragraf dan Wacana </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Teks Naratif dan Deskriptif </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Menyusun Argumentasi </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Materi IPA -->
      <div class="divide-y divide-gray-300 rounded-2xl shadow-xs bg-[#F0F3FF]">
        <div class="p-6 sm:px-8">
          <h2 class="text-sm font-medium text-[#5988FF]">
            Dasar-Menengah
            <span class="sr-only">Plan</span>
          </h2>

          <p class="my-4">
            <strong class="text-1xl text-gray-900 sm:text-3xl"> IPA </strong>
          </p>

          <p class="text-gray-700">
            Jelajahi dunia sains melalui pembelajaran biologi, fisika, dan kimia secara sederhana
            dan menyenangkan.
          </p>

          <RouterLink
            class="mt-4 block rounded-sm border border-[#5988FF] bg-[#5988FF] px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-[#5988FF] focus:ring-3 focus:outline-hidden sm:mt-6"
            to="/login"
          >
            Mulai Belajar
          </RouterLink>
        </div>

        <div class="p-6 sm:px-8">
          <p class="text-md font-medium text-gray-900 sm:text-md">Topik yang akan dipelajari:</p>

          <ul class="space-y-2 mt-3">
            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Makhluk Hidup dan Lingkungannya </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Sifat dan Perubahan Benda </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Energi dan Perubahannya </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Sistem Tata Surya </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span class="text-gray-700"> Organ Tubuh Manusia </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
