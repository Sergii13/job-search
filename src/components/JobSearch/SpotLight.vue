<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface SpotLight {
  id: number
  img: string
  title: string
  description: string
}

const spotlights = ref<SpotLight[]>([])

onMounted(async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/spotlights`
  const response = await axios.get<SpotLight[]>(url)

  spotlights.value = response.data
})
</script>

<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :title="spotlight.title"
        :img="spotlight.img"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<style scoped></style>
