import { render, screen } from '@testing-library/vue'
import MainNav from '@/components/Navigation/MainNav.vue'
import { userEvent } from '@testing-library/user-event'
import { RouterLinkStub } from '@vue/test-utils'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'
import type { Mock } from 'vitest'

vi.mock('vue-router')
const useRouteMock = useRoute as Mock
describe('MainNav', () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia()
    useRouteMock.mockReturnValue({
      name: 'Home'
    })

    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true, RouterLink: RouterLinkStub }
      }
    })
  }
  it('displays company name', () => {
    renderMainNav()
    const companyName = screen.getByText('Careers Search')

    expect(companyName).toBeInTheDocument()
  })

  it('displays menu items for navigation', () => {
    render(MainNav)
    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent)
    expect(navigationMenuTexts).toEqual(['Teams', 'Location', 'Students', 'Jobs'])
  })

  describe('when the user logs in', () => {
    it('displays user profile picture', async () => {
      renderMainNav()
      const userStore = useUserStore()
      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      })

      userStore.isLoggedIn = true
      await userEvent.click(loginButton)

      const profileImage = screen.queryByRole('img', {
        name: /user profile image/i
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
