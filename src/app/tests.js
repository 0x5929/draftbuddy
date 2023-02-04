import { render, screen, fireEvent, act, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockAPIData } from '@Utils'
import preview from 'jest-preview'
import App from '.'

test('integration tests', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockImplementation(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAPIData)
      }, 1000)
    }))
  })


  render(<App />)
  // throw Error('Need to implement integration tests here.')

  // assert initial UI
  expect(screen.getByText('Draftbuddy Input')).toBeInTheDocument()

  // click draft, assert error checking
  expect(screen.getByRole('button',{name:'Draft'})).toBeInTheDocument()
  await act(async () => {
    fireEvent.click(screen.getByRole('button',{name:'Draft'}))
  })
  expect(screen.getAllByText('This field is required.')).toHaveLength(2)
  expect(screen.getAllByRole('alert')).toHaveLength(4)
  
  // enter incorrect form values, assert error checking
  await act(async () => {
    await userEvent.type(screen.getByLabelText('# of Participants'), '7')
    await userEvent.type(screen.getByLabelText('Pick #'), '9')
  })
  await act(async () => {
    fireEvent.click(screen.getByText('Draft'))
  })
  expect(screen.getAllByRole('alert')).toHaveLength(4)
  expect(screen.getByText('Please enter an even # between 8 to 14.')).toBeInTheDocument()
  expect(screen.getByText('Please enter a valid draft pick.')).toBeInTheDocument()

  // clear inputs, enter correct inputs
  await act(async () => {
    userEvent.clear(screen.getByLabelText('Pick #'))
    userEvent.clear(screen.getByLabelText('# of Participants'))
    userEvent.type(screen.getByLabelText('# of Participants'), '8')
    userEvent.type(screen.getByLabelText('Pick #'), '8')
  })


  // press draft, assert circularProgress
  await act(async () => {
    fireEvent.click(screen.getByText('Draft'))
  })
  expect(screen.getByRole('status')).toBeInTheDocument()

  // assert night mode button, click on it
  expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  await userEvent.click(screen.getByTestId('moon-icon'))
  expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
  expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  
  // assert html change
  expect(screen.getByRole('navigation').closest('html').classList.contains('dark')).toBe(true)

  // assert sun mode button, click on it
  await userEvent.click(screen.getByTestId('sun-icon'))
  expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
  expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  
  // assert html change
  expect(screen.getByRole('navigation').closest('html').classList.contains('dark')).toBe(false)

  // click menu, assert menu list items
  expect(screen.getByTestId('nav-menu-icon')).toBeInTheDocument()
  await userEvent.click(screen.getByTestId('nav-menu-icon'))
  expect(screen.getByText('README')).toBeInTheDocument()
  expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  expect(screen.getByText('Cookie Policy')).toBeInTheDocument()

  // click on first item, assert modal opens and menu closes
  await userEvent.click(screen.getByText('README'))
  expect(screen.getByText('README')).toBeInTheDocument()
  expect(screen.queryByText('Terms and Conditions')).not.toBeInTheDocument()

  // assert button, and click it, assert modal closes
  expect(screen.getByRole('button', {name: 'OK'})).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', {name: 'OK'}))
  expect(screen.queryByText('README')).not.toBeInTheDocument()

  // click on menu again, click on second item, assert modal opens and menu closes
  await userEvent.click(screen.getByTestId('nav-menu-icon'))
  expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
  await userEvent.click(screen.getByText('Terms and Conditions'))
  expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
  expect(screen.queryByText('Privacy Policy')).not.toBeInTheDocument()

  // assert button, and click it, assert modal closes
  expect(screen.getByRole('button', {name: 'OK'})).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', {name: 'OK'}))
  expect(screen.queryByText('Terms and Conditions')).not.toBeInTheDocument()

  // click on menu again, click on third item, assert modal opens and menu closes
  await userEvent.click(screen.getByTestId('nav-menu-icon'))
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  await userEvent.click(screen.getByText('Privacy Policy'))
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  expect(screen.queryByText('Cookie Policy')).not.toBeInTheDocument()

  // assert button, and click it, assert modal closes
  expect(screen.getByRole('button', {name: 'OK'})).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', {name: 'OK'}))
  expect(screen.queryByText('Privacy Policy')).not.toBeInTheDocument()

  // click on menu again, click on fourth item, assert modal opens and menu closes
  await userEvent.click(screen.getByTestId('nav-menu-icon'))
  expect(screen.getByText('Cookie Policy')).toBeInTheDocument()
  await userEvent.click(screen.getByText('Cookie Policy'))
  expect(screen.getByText('Cookie Policy')).toBeInTheDocument()
  expect(screen.queryByText('README')).not.toBeInTheDocument()
  
  // assert button, and click it, assert modal closes
  expect(screen.getByRole('button', {name: 'OK'})).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', {name: 'OK'}))
  expect(screen.queryByText('Cookie Policy')).not.toBeInTheDocument()

  // assert DraftOutput texts ((NOTE: this changes if year data collected changes))
  preview.debug()

  expect(await screen.findByText('Choice # 1')).toBeInTheDocument()
  expect(await screen.findByText('Nick Chubb')).toBeInTheDocument()
  expect(await screen.findByText('CLE')).toBeInTheDocument()
  expect(await screen.findByText('ADP: 7.9')).toBeInTheDocument()

  // click different tabs, assert texts ((NOTE: this changes if year data collected changes))
  // assert buttons are there
  expect(screen.getByRole('tab', {name: 'RB'})).toBeInTheDocument()
  expect(screen.getByRole('tab', {name: 'WR'})).toBeInTheDocument()
  expect(screen.getByRole('tab', {name: 'QB'})).toBeInTheDocument()
  expect(screen.getByRole('tab', {name: 'TE'})).toBeInTheDocument()

  // assert buttons work
  await userEvent.click(screen.getByRole('tab', {name: 'WR'}))
  expect(await screen.findByText('Davante Adams')).toBeInTheDocument()
  expect(await screen.findByText('Tyreek Hill')).toBeInTheDocument()
  expect(await screen.findByText('Stefon Diggs')).toBeInTheDocument()

  await userEvent.click(screen.getByRole('tab', {name: 'QB'}))
  expect(await screen.findByText('Patrick Mahomes')).toBeInTheDocument()
  expect(await screen.findByText('Josh Allen')).toBeInTheDocument()
  expect(await screen.findByText('Kyler Murray')).toBeInTheDocument()

  await userEvent.click(screen.getByRole('tab', {name: 'TE'}))
  expect(await screen.findByText('Travis Kelce')).toBeInTheDocument()
  expect(await screen.findByText('Darren Waller')).toBeInTheDocument()
  expect(await screen.findByText('George Kittle')).toBeInTheDocument()

  // click RB again to resume test
  await userEvent.click(screen.getByRole('tab', {name: 'RB'}))

  // click next round and assert texts ((NOTE: this changes if year data collected changes))
  expect(screen.getByTestId('next-round-btn')).toBeInTheDocument()

  await userEvent.click(screen.getByTestId('next-round-btn'))
  await userEvent.click(screen.getByTestId('next-round-btn'))

  expect(await screen.findByTestId('prev-round-btn')).toBeInTheDocument()
  expect(await screen.findByText('Chris Carson')).toBeInTheDocument()
  expect(await screen.findByText('David Montgomery')).toBeInTheDocument()
  expect(await screen.findByText('Josh Jacobs')).toBeInTheDocument()

  // assert prev round button, and click, assert texts ((NOTE: this changes if year data collected changes))
  await userEvent.click(screen.getByTestId('prev-round-btn'))
  await userEvent.click(screen.getByTestId('prev-round-btn'))
  
  expect(await screen.findByText('Nick Chubb')).toBeInTheDocument()
  expect(await screen.findByText('Saquon Barkley')).toBeInTheDocument()
  expect(await screen.findByText('Austin Ekeler')).toBeInTheDocument()
  
  jest.restoreAllMocks()
  cleanup()
})
