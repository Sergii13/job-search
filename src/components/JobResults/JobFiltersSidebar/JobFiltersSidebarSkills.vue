<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()

const skillsSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm
  },
  set(value: string) {
    userStore.updateSkillsSearchTerm(value)
  }
})
</script>

<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computer programming, Finance degree"
    />
  </div>
</template>

<style scoped></style>
