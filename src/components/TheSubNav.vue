<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<template>
  <div class="w-full py-3 border-b border-solid border-brand-gray-1 bg-white">
    <div class="px-8 container">
      <div class="flex items-center">
        <FontAwesomeIcon :icon="['fas', 'search']" class="mr-3" />
        <span> <span class="text-brand-green-1">1653</span> jobs matched </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
