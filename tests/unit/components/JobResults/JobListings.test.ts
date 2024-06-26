import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/JobResults/JobListings.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import type { Mock } from 'vitest'
import { useDegreesStore } from '@/stores/degrees'

vi.mock('axios')
vi.mock('vue-router')
const useRouteMock = useRoute as Mock

describe('JobListings', () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const degreesStore = useDegreesStore()
    // @ts-expect-error
    jobsStore.filteredJobs = Array.from(15).fill({})

    render(JobListings, {
      global: { plugins: [pinia], stubs: { RouterLink: RouterLinkStub } }
    })
    return { jobsStore, degreesStore }
  }
  it('fetches jobs', () => {
    useRouteMock.mockReturnValue({ query: {} })
    const { jobsStore } = renderJobListings()

    expect(jobsStore.fetchJobs).toHaveBeenCalled()
  })

  it('fetches degrees', () => {
    useRouteMock.mockReturnValue({ query: {} })
    const { degreesStore } = renderJobListings()

    expect(degreesStore.fetchDegrees).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } })
    const { jobsStore } = renderJobListings()
    // @ts-expect-error
    jobsStore.filteredJobs = Array(15).fill({})

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })
      renderJobListings()

      expect(screen.getByText(/page 1/i)).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number 3', () => {
      useRouteMock.mockReturnValue({ query: { page: '3' } })

      renderJobListings()

      expect(screen.getByText(/page 3/i)).toBeInTheDocument()
    })
  })

  describe('when user is on first page', () => {
    it('does not show link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })

      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.filteredJobs = Array(15).fill({})
      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })
      const { jobsStore } = renderJobListings()

      // @ts-expect-error
      jobsStore.filteredJobs = Array(15).fill({})
      await screen.findAllByRole('listitem')

      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when user is on last page', () => {
    it('does not show link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })
      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.filteredJobs = Array(15).fill({})
      await screen.findAllByRole('listitem')

      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })
      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.filteredJobs = Array(15).fill({})
      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
