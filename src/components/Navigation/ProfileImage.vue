<script setup lang="ts">
import { ref } from 'vue'

const imageLink = ref(
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png'
)
</script>

<template>
  <img class="h-8 w-8 rounded-3xl object-contain" :src="imageLink" alt="user profile image" />
</template>

<style scoped></style>
