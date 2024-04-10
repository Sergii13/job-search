import { useUserStore } from '@/stores/user'
import { createPinia, setActivePinia } from 'pinia'
import { expect } from 'vitest'

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('keeps track of if user is logged in', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('stores organizations that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })

  it('stores job types that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })
  it('stores degrees that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedDegrees).toEqual([])
  })
  it('store`s user`s search term for skills and qualification', () => {
    const store = useUserStore()
    expect(store.skillsSearchTerm).toEqual('')
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore()
      store.loginUser()
      expect(store.isLoggedIn).toBe(true)
    })
  })

  describe('add selected organizations', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.addSelectedOrganizations(['org1', 'org2'])

      expect(store.selectedOrganizations).toEqual(['org1', 'org2'])
    })
  })

  describe('add selected job types', () => {
    it('updates job types the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.addSelectedJobTypes(['Full-time', 'Part-time'])
      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time'])
    })
  })

  describe('add selected degrees', () => {
    it('updates degrees the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.addSelectedDegrees(['Master`s', 'Bachelor`s'])
      expect(store.selectedDegrees).toEqual(['Master`s', 'Bachelor`s'])
    })
  })

  describe('update skills search term', () => {
    it('receives search term for skills the user has entered', () => {
      const store = useUserStore()
      store.skillsSearchTerm = ''
      store.updateSkillsSearchTerm('Vue')
      expect(store.skillsSearchTerm).toEqual('Vue')
    })
  })

  describe('clear user job filter selections', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useUserStore()
      store.selectedDegrees = ['Random degree']
      store.selectedOrganizations = ['Random organization']
      store.selectedJobTypes = ['Random job type']

      store.clearUserJobFilterSelections

      expect(store.selectedDegrees).toEqual([])
      expect(store.selectedOrganizations).toEqual([])
      expect(store.selectedJobTypes).toEqual([])
    })
  })
})
