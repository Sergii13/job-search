<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  type: {
    type: String,
    default: 'primary',
    validator(value: string) {
      return ['primary', 'secondary'].includes(value)
    }
  }
})

const { type, text } = toRefs(props)

const buttonClass = computed(() => {
  return { [type.value]: true }
})
</script>

<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  @apply px-5 py-3 font-medium;
}

.primary {
  @apply rounded  border-0 bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
  @apply transition bg-transparent  text-brand-blue-2  hover:bg-brand-blue-1 hover:text-white;
}
</style>
