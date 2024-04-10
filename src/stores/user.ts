import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref<boolean>(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const skillsSearchTerm = ref('')

  function loginUser() {
    isLoggedIn.value = true
  }

  function addSelectedOrganizations(organizations: string[]) {
    selectedOrganizations.value = organizations
  }

  function addSelectedJobTypes(jobTypes: string[]) {
    selectedJobTypes.value = jobTypes
  }

  function addSelectedDegrees(degrees: string[]) {
    selectedDegrees.value = degrees
  }

  function updateSkillsSearchTerm(term: string) {
    skillsSearchTerm.value = term
  }

  function clearUserJobFilterSelections() {
    selectedOrganizations.value = []
    selectedJobTypes.value = []
    selectedJobTypes.value = []
  }

  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    skillsSearchTerm,
    loginUser,
    addSelectedOrganizations,
    addSelectedJobTypes,
    addSelectedDegrees,
    updateSkillsSearchTerm,
    clearUserJobFilterSelections
  }
})
