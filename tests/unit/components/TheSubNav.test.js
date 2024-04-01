import { render, screen } from '@testing-library/vue'
import TheSubNav from '@/components/TheSubNav.vue'

describe('TheSubNav', () => {
  describe('when user is on jobs', () => {
    it('displays job count', () => {
      render(TheSubNav, {
        data() {
          return {
            onJobResultsPage: false
          }
        }
      })
      const jobCount = screen.getByText('11653')

      expect(jobCount).toBeInTheDocument()
    })
  })
})
