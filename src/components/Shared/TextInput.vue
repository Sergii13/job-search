<script setup lang="ts">
const modelValue = defineModel<string | number | null>()
</script>
<template>
  <input
    v-model="modelValue"
    type="text"
    class="bg-transparent w-full h-12 font-normal focus:outline-none"
  />
</template>

<style lang="scss" scoped></style>
