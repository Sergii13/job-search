import { createPinia, setActivePinia } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import type { Mock } from 'vitest'
import { describe } from 'vitest'
import type { Job } from '@/api/types'
import { createJob } from '../../utils/createJob'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores job listing', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('FETCH_JOBS', () => {
    it('makes api request and stores received jobs', async () => {
      axiosGetMock.mockResolvedValue({ data: ['Job1', 'Job2'] })
      const store = useJobsStore()
      await store.fetchJobs()
      expect(store.jobs).toEqual(['Job1', 'Job2'])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('unique organizations', () => {
    it('find unique organization from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Amazon' })
      ]
      const result = store.uniqueOrganizations

      expect(result).toEqual(new Set(['Amazon', 'Google']))
    })
  })
  describe('unique job types', () => {
    it('finds jobs that are associated with the given organizations', () => {
      const store = useJobsStore()
      store.jobs = [
        { jobType: 'Full-time' },
        { jobType: 'Full-time' },
        { jobType: 'Temporary' }
      ] as Job[]

      const result = store.uniqueJobTypes
      expect(result).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })
  describe('include job by organization', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const store = useJobsStore()
        const job = createJob({ organization: 'Google' })

        const result = store.includeJobByOrganization(job)
        expect(result).toBe(true)
      })
    })
    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Facebook']
      const store = useJobsStore()
      const job = createJob({ organization: 'Google' })

      const result = store.includeJobByOrganization(job)
      expect(result).toBe(true)
    })
  })
  describe('include job by job type', () => {
    describe('when the user has not selected any job types', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const store = useJobsStore()
        const job = createJob({ jobType: 'Full-time' })

        const result = store.includeJobByJobType(job)
        expect(result).toBe(true)
      })
    })
    it('identifies if job is associated with given job types', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Full-time', 'Part-time']
      const store = useJobsStore()
      const job = createJob({ jobType: 'Full-time' })

      const result = store.includeJobByJobType(job)
      expect(result).toBe(true)
    })
  })

  describe('include job by degree', () => {
    describe('when the user has not selected any degree', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []
        const store = useJobsStore()
        const job = createJob({ degree: 'Master`s' })

        const result = store.includeJobByDegree(job)
        expect(result).toBe(true)
      })
    })
    it('identifies if job is associated with given degrees', () => {
      const userStore = useUserStore()
      userStore.selectedDegrees = ['Master`s', 'Bachelor`s']
      const store = useJobsStore()
      const job = createJob({ degree: 'Bachelor`s' })

      const result = store.includeJobByDegree(job)
      expect(result).toBe(true)
    })
  })

  describe('include job by skill', () => {
    it('identifies if job matches user`s skill', () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = 'Vue'
      const store = useJobsStore()
      const job = createJob({ title: 'Vue Developer' })

      const result = store.includeJobBySkill(job)

      expect(result).toBe(true)
    })
    describe('when the user has not entered any skill', () => {
      it('includes jobs', () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = ''
        const store = useJobsStore()
        const job = createJob({ title: 'Vue Developer' })

        const result = store.includeJobBySkill(job)

        expect(result).toBe(true)
      })
    })
  })
})
