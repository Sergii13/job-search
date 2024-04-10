<script setup lang="ts">
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckboxGroup.vue'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const degreeStore = useDegreesStore()
const { uniqueDegrees } = storeToRefs(degreeStore)
</script>

<template>
  <JobFilterSidebarCheckboxGroup
    :action="userStore.addSelectedDegrees"
    :unique-values="uniqueDegrees"
  />
</template>

<style scoped></style>
