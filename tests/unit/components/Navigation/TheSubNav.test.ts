import { render, screen } from '@testing-library/vue'
import TheSubNav from '@/components/Navigation/TheSubNav.vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import type { Mock } from 'vitest'

vi.mock('vue-router')

const useRouteMock = useRoute as Mock
describe('TheSubNav', () => {
  const renderTheSubNav = (routeName: string) => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    useRouteMock.mockReturnValue({
      name: routeName
    })
    render(TheSubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      },
      data() {
        return {
          onJobResultsPage: true
        }
      }
    })
    return { jobsStore }
  }

  describe('when user is on jobs', () => {
    it('displays job count', async () => {
      const routeName = 'JobResults'
      const { jobsStore } = renderTheSubNav(routeName)
      const numberOfJobs = 16
      // @ts-expect-error: Getter is read only
      jobsStore.filteredJobs = Array(numberOfJobs).fill({})
      renderTheSubNav(routeName)

      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('when user is not on jobs', () => {
    it('does Not display job count', () => {
      const routeName = 'Home'
      const { jobsStore } = renderTheSubNav(routeName)
      const numberOfJobs = 16
      // @ts-expect-error: Getter is read only
      jobsStore.filteredJobs = Array(numberOfJobs).fill({})

      const jobCount = screen.queryByText(numberOfJobs)

      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
