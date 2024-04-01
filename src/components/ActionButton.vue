<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  type: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value)
    }
  }
})

const buttonClass = computed(() => {
  return { [props.type]: true }
})
</script>

<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  @apply rounded px-5 py-3 font-medium;
}

.primary {
  @apply border-0 bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
  @apply transition bg-transparent text-white bg-brand-blue-2 hover:bg-brand-blue-1;
}
</style>
