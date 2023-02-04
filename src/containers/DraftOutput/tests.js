
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockSortedData } from '@Utils'
import DraftOutput from './container'


describe('testing DraftOutput Container', () => {

  let mockSetServResp

  beforeEach(() => {
    mockSetServResp = jest.fn()
    render(<DraftOutput data={mockSortedData} setServRes={mockSetServResp} />)
  })
  
  test('should render main card with first round draft info, minus player cards (tested in components)', () => {
    expect(screen.getByText('Round: 1')).toBeInTheDocument()
    expect(screen.getByText('Pick: 8')).toBeInTheDocument()
    expect(screen.getByText('Overall: 8')).toBeInTheDocument()
    
    expect(screen.getByText('Draftbuddy Results')).toBeInTheDocument()
    // throw new Error('not yet implemented')
  })

  test('should contain working tab buttons to switch between RB, WR, QB and TE', async () => {
    // assert buttons are there
    expect(screen.getByRole('tab', {name: 'RB'})).toBeInTheDocument()
    expect(screen.getByRole('tab', {name: 'WR'})).toBeInTheDocument()
    expect(screen.getByRole('tab', {name: 'QB'})).toBeInTheDocument()
    expect(screen.getByRole('tab', {name: 'TE'})).toBeInTheDocument()

    // assert buttons work
    await userEvent.click(screen.getByRole('tab', {name: 'WR'}))
    expect(screen.getByText('Davante Adams')).toBeInTheDocument()
    expect(screen.getByText('Tyreek Hill')).toBeInTheDocument()
    expect(screen.getByText('Stefon Diggs')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', {name: 'QB'}))
    expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument()
    expect(screen.getByText('Josh Allen')).toBeInTheDocument()
    expect(screen.getByText('Kyler Murray')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', {name: 'TE'}))
    expect(screen.getByText('Travis Kelce')).toBeInTheDocument()
    expect(screen.getByText('Darren Waller')).toBeInTheDocument()
    expect(screen.getByText('George Kittle')).toBeInTheDocument()


    // throw new Error('not yet implemented')
  })

  test('should have left/right arrow buttons to navigate through each rounds', async () => {
    expect(screen.getByTestId('next-round-btn')).toBeInTheDocument()

    await userEvent.click(screen.getByTestId('next-round-btn'))
    await userEvent.click(screen.getByTestId('next-round-btn'))

    expect(screen.getByTestId('prev-round-btn')).toBeInTheDocument()
    expect(screen.getByText('Chris Carson')).toBeInTheDocument()
    expect(screen.getByText('David Montgomery')).toBeInTheDocument()
    expect(screen.getByText('Josh Jacobs')).toBeInTheDocument()

    
    await userEvent.click(screen.getByTestId('prev-round-btn'))
    await userEvent.click(screen.getByTestId('prev-round-btn'))
    
    expect(screen.queryByTestId('prev-round-btn')).not.toBeInTheDocument()
    expect(screen.getByText('Nick Chubb')).toBeInTheDocument()
    expect(screen.getByText('Saquon Barkley')).toBeInTheDocument()
    expect(screen.getByText('Austin Ekeler')).toBeInTheDocument()


  //   throw new Error('not yet implemented')
  })

  test('should have a back button to go back to DraftInput', async () => {
    expect(screen.getByRole('button', {name: 'Back to Draft Input'})).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: 'Back to Draft Input'}))

    expect(mockSetServResp).toHaveBeenCalled()

    // throw new Error('not yet implemented')
  })

  test('should display current round of draft', async () => {
    expect(screen.getByText('Round: 1')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('next-round-btn'))
    
    expect(screen.getByText('Round: 2')).toBeInTheDocument()
    
    await userEvent.click(screen.getByTestId('prev-round-btn'))
    expect(screen.getByText('Round: 1')).toBeInTheDocument()

    // throw new Error('not yet implemented')
  })
  afterEach(() => {
    mockSetServResp = null
    jest.restoreAllMocks()
    cleanup()
  })


})

