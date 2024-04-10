<script setup lang="ts">
import JobListing from '@/components/JobResults/JobListing.vue'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'
import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'
import { useDegreesStore } from '@/stores/degrees'

const route = useRoute()

const degreesStore = useDegreesStore()
onMounted(async () => {
  await degreesStore.fetchDegrees()
})

const jobsStore = useJobsStore()
const { filteredJobs } = storeToRefs(jobsStore)

const currentPage = computed(() => {
  return Number.parseInt((route.query.page as string) || '1')
})
const maxPage = computed(() => {
  return Math.ceil(filteredJobs.value.length / 10)
})

const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, maxPage)

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10

  return filteredJobs.value.slice(firstJobIndex, lastJobIndex)
})

onMounted(async () => {
  await jobsStore.fetchJobs()
})
</script>

<template>
  <div class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job of displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div v-if="displayedJobs.length > 0" class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }} of {{ maxPage }}</p>
        <div class="flex items-center justify-center">
          <RouterLink
            v-if="previousPage"
            :to="{
              name: 'JobResults',
              query: {
                page: previousPage
              }
            }"
            class="mx-3 test-sm font-semibold text-brand-blue-1"
            role="link"
          >
            Previous
          </RouterLink>
          <RouterLink
            v-if="nextPage"
            :to="{
              name: 'JobResults',
              query: {
                page: nextPage
              }
            }"
            class="mx-3 test-sm font-semibold text-brand-blue-1"
            role="link"
          >
            Next
          </RouterLink>
        </div>
      </div>
      <div v-else class="pt-10">
        <div class="text-base font-semibold text-center">Not results</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
