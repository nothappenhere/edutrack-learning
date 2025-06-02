<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import Hero from '@/components/Hero.vue'

const userStore = useUserStore()
userStore.loadUser()
const role = userStore.user?.role

const route = useRoute()
</script>

<template>
  <Hero v-if="route.path === `/dashboard/${role}`" />
  <router-view />
</template>
