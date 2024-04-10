import { render, screen } from '@testing-library/vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import { userEvent } from '@testing-library/user-event'
import { useRouter } from 'vue-router'
import type { Mock } from 'vitest'

vi.mock('vue-router')
const userRouterMock = useRouter as Mock

describe('JobSearchForm', () => {
  describe('when user submits form', () => {
    userRouterMock.mockReturnValue({
      push: vi.fn()
    })

    it('directs user to job results page with user`s search parameters', async () => {
      render(JobSearchForm, {
        global: {
          stubs: { FontAwesomeIcon: true }
        }
      })
      const roleInput = screen.getByRole('textbox', { name: /role/i })
      await userEvent.type(roleInput, 'Vue Developer')

      const locationInput = screen.getByRole('textbox', { name: /where?/i })
      await userEvent.type(locationInput, 'Toronto')

      const submitButton = screen.getByRole('button', { name: /search/i })
      await userEvent.click(submitButton)

      expect(useRouter().push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: {
          role: 'Vue Developer',
          location: 'Toronto'
        }
      })
    })
  })
})
