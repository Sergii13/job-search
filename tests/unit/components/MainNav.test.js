import { render, screen } from '@testing-library/vue'
import MainNav from '@/components/MainNav.vue'
import { userEvent } from '@testing-library/user-event'

describe('MainNav', () => {
  it('displays company name', () => {
    render(MainNav)
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
      render(MainNav)

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      })
      await userEvent.click(loginButton)

      const profileImage = screen.queryByRole('img', {
        name: /user profile image/i
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
