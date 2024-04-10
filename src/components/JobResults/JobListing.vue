<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { Job } from '@/api/types'

const props = defineProps({
  job: { type: Object as PropType<Job>, required: true }
})

const jobPageLink = computed(() => {
  return `/jobs/results/${props.job.id}`
})
</script>

<template>
  <li class="mb-7">
    <RouterLink
      :to="jobPageLink"
      class="
        mx-auto
        block
        rounded
        border-solid border-brand-gray-2
        bg-white
        hover:shadow-gray
        transition
      "
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">{{ job.title }}</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>{{ job.organization }}</span>
          </div>
          <div class="">
            <ul>
              <li v-for="location in job.locations" :key="location" class="mr-2 inline-block">
                <span>{{ location }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="my-2">
          {{ job.jobType }}
        </div>

        <div class="py-4">
          <div>
            <h3 class="mt-1 mb-2">Qualifications:</h3>
            <div>
              <ul class="list-disc pl-8">
                <li v-for="qualification in job.minimumQualifications" :key="qualification">
                  {{ qualification }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-2 text-center">
          <RouterLink class="text-brand-blue-2" :to="jobPageLink">Expand</RouterLink>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped></style>
