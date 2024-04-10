import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'
import { render, screen } from '@testing-library/vue'
import JobFilterSidebarPrompt from '@/components/JobResults/JobFiltersSidebar/JobFilterSidebarPrompt.vue'
import { userEvent } from '@testing-library/user-event'

describe('JobFilterSidebarPrompt', () => {
  describe('when user clicks Clear Filters button', () => {
    it('sends message to clear all of user`s job search filters', async () => {
      const pinia = createTestingPinia()
      const userStore = useUserStore()

      render(JobFilterSidebarPrompt, {
        global: { plugins: [pinia] }
      })

      const button = screen.getByRole('button', { name: /clear filters/i })
      await userEvent.click(button)

      expect(userStore.clearUserJobFilterSelections).toHaveBeenCalled()
    })
  })
})
