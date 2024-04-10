<script setup lang="ts">
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue'
import JobListings from '@/components/JobResults/JobListings.vue'
</script>
<template>
  <div class="container mx-auto">
    <div class="flex flex-row flex-nowrap w-full">
      <JobFiltersSidebar />
      <JobListings />
    </div>
  </div>
</template>

<style scoped></style>
