<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'

const jobsStore = useJobsStore()
const { filteredJobs } = storeToRefs(jobsStore)

const route = useRoute()
const onJobResultsPage = computed(() => {
  return route.name === 'JobResults'
})
</script>
<template>
  <div
    v-if="onJobResultsPage"
    class="w-full py-3 border-b border-solid border-brand-gray-1 bg-white"
  >
    <div class="mx-auto container">
      <div class="flex items-center">
        <FontAwesomeIcon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1">{{ filteredJobs.length }}</span> jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
