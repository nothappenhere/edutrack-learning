<script setup></script>

<template>
  <ol
    class="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-white py-16 bg-[#D2FF5E]"
  >
    <!-- 1. Registrasi -->
    <li class="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
      <div
        class="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
      >
        <span class="size-3 shrink-0 rounded-full bg-[#5988FF]"></span>
        <div class="-mt-2">
          <time class="text-xs/none font-medium text-gray-800 font-poppins">Langkah 1</time>
          <h3 class="text-lg font-bold text-[#00121D] font-poppins">Registrasi & Login</h3>
          <p class="mt-0.5 text-sm text-gray-800">
            Pengguna (siswa atau guru) membuat akun dan login ke dalam platform.
          </p>
        </div>
      </div>
      <div aria-hidden="true"></div>
    </li>

    <!-- 2. Akses Materi -->
    <li class="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
      <div
        class="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
      >
        <span class="size-3 shrink-0 rounded-full bg-[#5988FF]"></span>
        <div class="-mt-2">
          <time class="text-xs/none font-medium text-gray-800 font-poppins">Langkah 2</time>
          <h3 class="text-lg font-bold text[#00121D] font-poppins">Akses Materi Pembelajaran</h3>
          <p class="mt-0.5 text-sm text-gray-800">
            Siswa dapat melihat materi belajar yang direkomendasikan berdasarkan levelnya.
          </p>
        </div>
      </div>
      <div aria-hidden="true"></div>
    </li>

    <!-- 3. Kerjakan Kuis -->
    <li class="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
      <div
        class="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
      >
        <span class="size-3 shrink-0 rounded-full bg-[#5988FF]"></span>
        <div class="-mt-2">
          <time class="text-xs/none font-medium text-gray-800 font-poppins">Langkah 3</time>
          <h3 class="text-lg font-bold text[#00121D] font-poppins">Kerjakan Kuis Adaptif</h3>
          <p class="mt-0.5 text-sm text-gray-800">
            Siswa menyelesaikan kuis-kuis yang disesuaikan dengan kemampuan dan progresnya.
          </p>
        </div>
      </div>
      <div aria-hidden="true"></div>
    </li>

    <!-- 4. Analisis Akademik -->
    <li class="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
      <div
        class="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
      >
        <span class="size-3 shrink-0 rounded-full bg-[#5988FF]"></span>
        <div class="-mt-2">
          <time class="text-xs/none font-medium text-gray-800 font-poppins">Langkah 4</time>
          <h3 class="text-lg font-bold text[#00121D] font-poppins">Lihat Hasil & Statistik</h3>
          <p class="mt-0.5 text-sm text-gray-800">
            Sistem menganalisis hasil belajar dan menampilkan grafik perkembangan siswa.
          </p>
        </div>
      </div>
      <div aria-hidden="true"></div>
    </li>

    <!-- 5. Feedback Guru -->
    <li class="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
      <div
        class="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
      >
        <span class="size-3 shrink-0 rounded-full bg-[#5988FF]"></span>
        <div class="-mt-2">
          <time class="text-xs/none font-medium text-gray-800 font-poppins">Langkah 5</time>
          <h3 class="text-lg font-bold text[#00121D] font-poppins">Guru Memberikan Feedback</h3>
          <p class="mt-0.5 text-sm text-gray-800">
            Guru dapat memberikan evaluasi dan rekomendasi berdasarkan performa siswa.
          </p>
        </div>
      </div>
      <div aria-hidden="true"></div>
    </li>
  </ol>
</template>
