<script setup>
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
</script>

<template>
  <Navbar v-if="route.name !== 'NotFound'" />
  <RouterView />
  <Footer v-if="route.name !== 'NotFound'" />
</template>
