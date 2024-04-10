<script setup lang="ts">
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckboxGroup.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/stores/jobs'

const userStore = useUserStore()

const jobsStore = useJobsStore()
const { uniqueJobTypes } = storeToRefs(jobsStore)
</script>

<template>
  <JobFilterSidebarCheckboxGroup
    :action="userStore.addSelectedJobTypes"
    :unique-values="uniqueJobTypes"
  />
</template>

<style scoped></style>
