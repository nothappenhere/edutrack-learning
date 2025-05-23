<script setup></script>

<template>
  <div
    id="feedback"
    class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-[#D2FF5E] font-poppins"
  >
    <div class="flex justify-center">
      <h1
        class="text-3xl font-poppins text-gray-900 sm:text-4xl leading-tight text-center bg-white p-5 rounded-3xl mb-10"
      >
        Apa Kata Mereka Tentang Platform Kami
      </h1>
    </div>

    <div class="grid gap-2 sm:grid-cols-1 sm:items-stretch md:grid-cols-2 md:gap-6">
      <!-- Testimoni Pengguna -->
      <div class="block rounded-xl bg-[#FFFFFF] p-4 shadow-xs sm:p-6">
        <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
          <div class="sm:order-last sm:shrink-0">
            <img
              alt="Foto Profil Pengguna"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
              class="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </div>

          <div class="mt-4 sm:mt-0">
            <h3 class="text-lg font-medium text-pretty text-gray-900">
              “Belajar jadi lebih menyenangkan dan mudah dimengerti!”
            </h3>

            <p class="mt-1 text-sm text-gray-700">
              oleh <strong>John Doe</strong>, Mahasiswa Informatika
            </p>

            <p class="mt-4 text-sm text-pretty text-gray-700">
              Platform ini sangat membantu saya memahami materi yang sebelumnya terasa sulit.
              Penjelasannya ringkas, interaktif, dan sesuai kebutuhan saya. Sangat direkomendasikan!
            </p>
          </div>
        </div>

        <dl class="mt-6 flex gap-4 lg:gap-6">
          <div>
            <dt class="text-sm font-medium text-gray-700">Tanggal Ulasan</dt>
            <dd class="text-xs text-gray-700">15 Mei 2025</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-700">Rating</dt>
            <dd class="text-xs text-yellow-500">⭐⭐⭐⭐⭐</dd>
          </div>
        </dl>
      </div>

      <!-- Testimoni Pengguna -->
      <div class="block rounded-xl bg-[#FFFFFF] p-4 shadow-xs sm:p-6">
        <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
          <div class="sm:order-last sm:shrink-0">
            <img
              alt="Foto Profil Pengguna"
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              class="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </div>

          <div class="mt-4 sm:mt-0">
            <h3 class="text-lg font-medium text-pretty text-gray-900">
              “Materinya lengkap banget dan gampang dimengerti!”
            </h3>

            <p class="mt-1 text-sm text-gray-700">
              oleh <strong>Amelia Putri</strong>, Siswa SMA Kelas 12
            </p>

            <p class="mt-4 text-sm text-pretty text-gray-700">
              Saya pakai platform ini buat persiapan UTBK dan hasilnya sangat membantu.
              Penjelasannya step-by-step, ada latihan juga, jadi makin paham!
            </p>
          </div>
        </div>

        <dl class="mt-6 flex gap-4 lg:gap-6">
          <div>
            <dt class="text-sm font-medium text-gray-700">Tanggal Ulasan</dt>
            <dd class="text-xs text-gray-700">10 Mei 2025</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-700">Rating</dt>
            <dd class="text-xs text-yellow-500">⭐⭐⭐⭐⭐</dd>
          </div>
        </dl>
      </div>

      <!-- Testimoni Pengguna -->
      <div class="block rounded-xl bg-[#FFFFFF] p-4 shadow-xs sm:p-6">
        <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
          <div class="sm:order-last sm:shrink-0">
            <img
              alt="Foto Profil Pengguna"
              src="https://images.unsplash.com/photo-1603415526960-f8fbbfdc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              class="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </div>

          <div class="mt-4 sm:mt-0">
            <h3 class="text-lg font-medium text-pretty text-gray-900">
              “Sangat membantu saya dalam mengajar di kelas!”
            </h3>

            <p class="mt-1 text-sm text-gray-700">
              oleh <strong>Andi Setiawan</strong>, Guru Matematika
            </p>

            <p class="mt-4 text-sm text-pretty text-gray-700">
              Materi yang disediakan tidak hanya berguna untuk siswa, tapi juga sangat mendukung
              guru dalam menyiapkan bahan ajar interaktif. Sangat bagus!
            </p>
          </div>
        </div>

        <dl class="mt-6 flex gap-4 lg:gap-6">
          <div>
            <dt class="text-sm font-medium text-gray-700">Tanggal Ulasan</dt>
            <dd class="text-xs text-gray-700">8 Mei 2025</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-700">Rating</dt>
            <dd class="text-xs text-yellow-500">⭐⭐⭐⭐⭐</dd>
          </div>
        </dl>
      </div>

      <!-- Testimoni Pengguna -->
      <div class="block rounded-xl bg-[#FFFFFF] p-4 shadow-xs sm:p-6">
        <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
          <div class="sm:order-last sm:shrink-0">
            <img
              alt="Foto Profil Pengguna"
              src="https://images.unsplash.com/photo-1628890924931-1c05f2777396?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              class="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </div>

          <div class="mt-4 sm:mt-0">
            <h3 class="text-lg font-medium text-pretty text-gray-900">
              “Platform ini bikin belajar mandiri lebih efektif.”
            </h3>

            <p class="mt-1 text-sm text-gray-700">
              oleh <strong>Rizky Maulana</strong>, Mahasiswa Baru Teknik
            </p>

            <p class="mt-4 text-sm text-pretty text-gray-700">
              Fitur-fitur seperti kuis interaktif dan visualisasi materi bikin saya lebih semangat
              belajar. Cocok banget buat mahasiswa baru yang masih adaptasi.
            </p>
          </div>
        </div>

        <dl class="mt-6 flex gap-4 lg:gap-6">
          <div>
            <dt class="text-sm font-medium text-gray-700">Tanggal Ulasan</dt>
            <dd class="text-xs text-gray-700">6 Mei 2025</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-700">Rating</dt>
            <dd class="text-xs text-yellow-500">⭐⭐⭐⭐</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
