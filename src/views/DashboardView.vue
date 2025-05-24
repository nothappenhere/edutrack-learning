<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import Hero from '@/components/Hero.vue'

const userStore = useUserStore()
userStore.loadUser()

const route = useRoute()
</script>

<template>
  <Hero v-if="route.path === '/dashboard/teacher'" />
  <router-view />
</template>
