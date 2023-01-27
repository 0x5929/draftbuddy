import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './container'
import { headerStyles } from './styles'


describe('testing header container', () => {

  beforeEach(() => {
    render(<Header />)
  })
  test('header should have menu component', () => {
    expect(screen.getByTestId('nav-menu-icon')).toBeInTheDocument()
  })
  test('header should have working menu component', async () => {
      expect(screen.queryByText('README')).not.toBeInTheDocument()
      expect(screen.queryByText('Terms and Conditions')).not.toBeInTheDocument()
      expect(screen.queryByText('Privacy Policy')).not.toBeInTheDocument()
      expect(screen.queryByText('Cookie Policy')).not.toBeInTheDocument()

      await userEvent.click(screen.getByTestId('nav-menu-icon'))

      expect(screen.getByText('README')).toBeInTheDocument()
      expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Cookie Policy')).toBeInTheDocument()
  })
  test('header should have light/dark mode switcher component', () => {
    expect(screen.getByTestId('mode-switcher')).toBeInTheDocument()
  })
  test('header should have working light/dark mode switcher component', async () => {
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('moon-icon'))
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.getByRole('navigation').closest('html').classList.contains('dark')).toBe(true)

    await userEvent.click(screen.getByTestId('sun-icon'))
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.getByRole('navigation').closest('html').classList.contains('dark')).toBe(false)

  })

  // note this test made things uglier, since header is composed of complicated elements, it is hard to reference them
  // to be consistent, i just added a data-testid prop to all elements that is styled that is not an form or anything
  // most of the classNames tested are actually on div container elements, and sometimes container of containers
  test('header should have all header styles', async () => {
    // note transition css props are not tested here!
    const headerContainerClassList = headerStyles.headerContainer
    const flexBoxContainerClassList = headerStyles.flexBoxContainer
    const menuContainerClassList = headerStyles.menuContainer
    const menuClassList = headerStyles.menu
    const menuButtonClassList = headerStyles.menuButton
    const menuIconClassList = headerStyles.menuIcon
    const menuDropDownContainerClassList = headerStyles.menuDropDownContainer
    const menuDropDownClassList = headerStyles.menuDropDown
    const menuDropDownGridClassList = headerStyles.menuDropDownGrid
    const menuItemLinkClassList = headerStyles.menuItemLink
    const menuItemIconClassList = headerStyles.menuItemIcon
    const menuItemTextContainerClassList = headerStyles.menuItemTextContainer
    const menuItemTextClassList = headerStyles.menuItemText
    const modeSwitcherContainerClassList = headerStyles.modeSwitcherContainer
    const modeSwitcherClassList = headerStyles.modeSwitcher


    expect(screen.getByTestId('nav-header-container')).toHaveClass(headerContainerClassList)
    expect(screen.getByTestId('nav-flexbox-container')).toHaveClass(flexBoxContainerClassList)
    expect(screen.getByTestId('nav-menu-container')).toHaveClass(menuContainerClassList)
    expect(screen.getByTestId('nav-menu')).toHaveClass(menuClassList)
    expect(screen.getByTestId('nav-menu-button')).toHaveClass(menuButtonClassList)
    expect(screen.getByTestId('nav-menu-icon')).toHaveClass(menuIconClassList)


    await userEvent.click(screen.getByTestId('nav-menu-icon'))
    
    expect(screen.getByTestId('nav-menu-dropdown-container')).toHaveClass(menuDropDownContainerClassList)
    expect(screen.getByTestId('nav-menu-dropdown')).toHaveClass(menuDropDownClassList)
    expect(screen.getByTestId('nav-menu-dropdown-grid')).toHaveClass(menuDropDownGridClassList)
    expect(screen.getAllByTestId('nav-menu-item-link')[0]).toHaveClass(menuItemLinkClassList)
    expect(screen.getAllByTestId('nav-menu-item-icon')[0]).toHaveClass(menuItemIconClassList)
    expect(screen.getAllByTestId('nav-menu-item-text-container')[0]).toHaveClass(menuItemTextContainerClassList)
    expect(screen.getAllByTestId('nav-menu-item-text')[0]).toHaveClass(menuItemTextClassList)
    expect(screen.getByTestId('nav-modeswitcher')).toHaveClass(modeSwitcherContainerClassList)
    expect(screen.getByTestId('nav-modeswitcher')).toHaveClass(modeSwitcherContainerClassList)
    expect(screen.getByTestId('moon-icon')).toHaveClass(modeSwitcherClassList)

    await userEvent.click(screen.getByTestId('moon-icon'))
    expect(screen.getByTestId('sun-icon')).toHaveClass(modeSwitcherClassList)

    
    
  })

  // test('header menu items should open each individual modals', () => {throw new Error})
  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })
})