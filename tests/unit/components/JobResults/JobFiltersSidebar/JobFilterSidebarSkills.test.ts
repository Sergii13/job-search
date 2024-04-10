import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'
import { render, screen } from '@testing-library/vue'
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue'
import { userEvent } from '@testing-library/user-event'
import { expect } from 'vitest'

describe('JobFilterSidebarSkills', () => {
  const renderJobFilterSidebarSkills = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia]
      }
    })
    return { userStore }
  }

  it('populates search input from store', async () => {
    const { userStore } = renderJobFilterSidebarSkills()
    userStore.skillsSearchTerm = 'Programmer'
    const input = await screen.findByRole<HTMLInputElement>('textbox')

    expect(input).toBe('Programmer')
  })

  it('writes user input to store', async () => {
    const { userStore } = renderJobFilterSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'V')
    await userEvent.click(document.body)

    expect(userStore.skillsSearchTerm).toHaveBeenCalledWith('V')
  })

  it('removes whitespace from user input', async () => {
    const { userStore } = renderJobFilterSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '  Vue Developer    ')
    await userEvent.click(document.body)

    expect(userStore.skillsSearchTerm).toHaveBeenCalledWith('Vue Developer')
  })
})
