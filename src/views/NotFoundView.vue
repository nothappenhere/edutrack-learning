<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    class="bg-gradient-to-tr from-[#f4f269] to-[#5cb270] h-screen text-center flex flex-col justify-center items-center font-poppins"
  >
    <div class="text-8xl font-bold mb-4 flex justify-center items-center gap-3">
      <h1 class="bg-gradient-to-tr from-[#9fccfa] to-[#0974f1] px-12 py-8 rounded-4xl text-white">
        404
      </h1>
      <h1 class="bg-white px-12 py-8 rounded-4xl font-normal">error</h1>
    </div>
    <p class="text-md mt-4 mb-14 font-light">Maaf, halaman ini sepertinya tidak ada</p>

    <div>
      <RouterLink
        class="relative inline-flex items-center overflow-hidden rounded-xl text-white bg-[#5988FF] hover:bg-[#709EE1] px-16 py-5 focus:outline-hidden"
        to="/"
      >
        <span class="text-sm font-medium transition-all">Kembali ke Beranda</span>
      </RouterLink>
    </div>
  </section>
</template>
