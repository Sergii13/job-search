import { render, screen } from '@testing-library/vue'
import { userEvent } from '@testing-library/user-event'
import { useRouter } from 'vue-router'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckboxGroup.vue'
import type { Mock } from 'vitest'
import { expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>
    action: Mock
  }

  const createProps = (props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}) => ({
    header: 'Some header',
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props
  })
  const renderJobFiltersSidebarJobTypes = (props: JobFiltersSidebarCheckboxGroupProps) => {
    useRouterMock.mockReturnValue({
      push: vi.fn()
    })

    const pinia = createTestingPinia({ stubActions: false })
    const userStore = useUserStore()

    render(JobFilterSidebarCheckboxGroup, {
      props: { ...props },
      global: {
        plugins: [pinia]
      }
    })

    return { userStore }
  }
  it('renders unique list of values', async () => {
    const props = createProps({
      uniqueValues: new Set(['Full-time', 'Part-time'])
    })
    renderJobFiltersSidebarJobTypes(props)

    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((item) => item.textContent)

    expect(jobTypes).toEqual(['Full-time', 'Part-time'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      const action = vi.fn()
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action
      })
      renderJobFiltersSidebarJobTypes(props)

      const fullTimeCheckbox = screen.getByRole('checkbox', { name: /full-time/i })

      await userEvent.click(fullTimeCheckbox)

      expect(action).toHaveBeenCalledWith(['Full-time'])
    })

    it('navigates user to job result page to see fresh batch of filtered jobs', async () => {
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time'])
      })
      renderJobFiltersSidebarJobTypes(props)

      const fullTimeCheckbox = screen.getByRole('checkbox', { name: /full-time/i })

      await userEvent.click(fullTimeCheckbox)

      expect(useRouterMock().push).toHaveBeenCalledWith({
        name: 'JobResults'
      })
    })
  })

  describe('when user clears job filters', () => {
    it('unchecks any checked checkboxes', async () => {
      const props = createProps({
        uniqueValues: new Set(['Full-time'])
      })
      const { userStore } = renderJobFiltersSidebarJobTypes(props)

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i
      })

      await userEvent.click(fullTimeCheckboxBeforeAction)

      expect(fullTimeCheckboxBeforeAction.checked).toBe(true)

      userStore.clearUserJobFilterSelections()
      const fullTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i
      })

      expect(fullTimeCheckboxAfterAction.checked).toBe(false)
    })
  })
})
