import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import getJobs from '@/api/getJobs'
import { useUserStore } from '@/stores/user'
import type { Job } from '@/api/types'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])

  const uniqueOrganizations = computed(() => {
    const uniqueOrganizationsList = new Set<string>()
    jobs.value.forEach((job) => {
      uniqueOrganizationsList.add(job.organization)
    })

    return uniqueOrganizationsList
  })

  const uniqueJobTypes = computed(() => {
    const uniqueJobTypesList = new Set<string>()
    jobs.value.forEach((job) => uniqueJobTypesList.add(job.jobType))

    return uniqueJobTypesList
  })

  const uniqueDegrees = computed(() => {
    const uniqueDegreesList = new Set<string>()
    jobs.value.forEach((job) => uniqueDegreesList.add(job.degree))

    return uniqueDegreesList
  })

  const includeJobByOrganization = computed(() => (job: Job) => {
    const userStore = useUserStore()
    if (userStore.selectedOrganizations.length === 0) {
      return true
    }
    return userStore.selectedOrganizations.includes(job.organization)
  })

  const includeJobByJobType = computed(() => (job: Job) => {
    const userStore = useUserStore()
    if (userStore.selectedJobTypes.length === 0) {
      return true
    }
    return userStore.selectedJobTypes.includes(job.jobType)
  })

  const includeJobByDegree = computed(() => (job: Job) => {
    const userStore = useUserStore()
    if (userStore.selectedDegrees.length === 0) {
      return true
    }
    return userStore.selectedDegrees.includes(job.degree)
  })

  const includeJobBySkill = computed(() => (job: Job) => {
    const userStore = useUserStore()
    return job.title.toLowerCase().includes(userStore.skillsSearchTerm.toLowerCase())
  })

  const filteredJobs = computed(() => {
    return jobs.value
      .filter((job: Job) => includeJobByOrganization.value(job))
      .filter((job: Job) => includeJobByJobType.value(job))
      .filter((job: Job) => includeJobByDegree.value(job))
      .filter((job: Job) => includeJobBySkill.value(job))
  })

  async function fetchJobs() {
    const result = await getJobs()
    jobs.value = result
  }

  return {
    jobs,
    uniqueOrganizations,
    uniqueJobTypes,
    uniqueDegrees,
    includeJobByJobType,
    includeJobByOrganization,
    includeJobByDegree,
    includeJobBySkill,
    filteredJobs,
    fetchJobs
  }
})
