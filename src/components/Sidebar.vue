<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div
    class="flex h-screen flex-col justify-between border-e border-gray-100 bg-[#E5EDFF] w-[230px]"
  >
    <div class="px-4 py-10">
      <span class="grid h-10 place-content-center rounded-lg font-bold text-3xl"> EduTrack </span>

      <ul class="mt-6 space-y-1">
        <li>
          <RouterLink
            to="/dashboard/teacher"
            :class="[route.name === 'Dashboard' ? 'bg-white' : 'bg-none']"
            class="block rounded-lg px-9 py-4 text-md"
          >
            Home
          </RouterLink>
        </li>

        <li>
          <details
            :class="[
              route.name === 'List-Material' || route.name === 'Add-Material'
                ? ''
                : '[&_summary::-webkit-details-marker]:hidden',
            ]"
            class="group"
          >
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-9 py-4 text-md"
            >
              <span> Materi </span>

              <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <RouterLink
                  to="/dashboard/teacher/materials"
                  :class="[route.name === 'List-Material' ? 'bg-white' : 'bg-none']"
                  class="block rounded-lg px-9 py-4 text-sm"
                >
                  Daftar Materi
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/dashboard/teacher/materials/add"
                  :class="[route.name === 'Add-Material' ? 'bg-white' : 'bg-none']"
                  class="block rounded-lg px-9 py-4 text-sm"
                >
                  Buat Materi
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Billing
          </a>
        </li>

        <li>
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Invoices
          </a>
        </li>

        <li>
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium"> Account </span>

              <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <a
                  href="#"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Details
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Security
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="w-full rounded-lg px-4 py-2 [text-align:_inherit] text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Logout
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="size-10 rounded-full object-cover"
        />

        <div>
          <p class="text-xs">
            <strong class="block font-medium">Eric Frusciante</strong>

            <span> eric@frusciante.com </span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>
