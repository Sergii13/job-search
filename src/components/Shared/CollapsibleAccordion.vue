<script setup lang="ts">
import { computed, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  header: {
    type: String,
    required: true
  }
})
const isOpen = ref(false)

const caretIcon = computed(() => {
  return isOpen.value ? 'angle-up' : 'angle-down'
})

function open() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      role="button"
      class="flex cursor-pointer flex-wrap items-center justify-between"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <FontAwesomeIcon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>Whoops, somebody forgot to populate me!</p>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
