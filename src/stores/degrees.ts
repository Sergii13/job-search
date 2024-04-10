import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Degree } from '@/api/types'
import getDegrees from '@/api/getDegrees'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const uniqueDegrees = computed(() => {
    return degrees.value.map((degree) => degree.degree)
  })

  async function fetchDegrees() {
    const receivedDegrees = await getDegrees()
    degrees.value = receivedDegrees
  }

  return { degrees, uniqueDegrees, fetchDegrees }
})
