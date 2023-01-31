
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockAPIData } from '@Utils'
import DraftOutput from './container'


describe('testing DraftOutput Container', () => {

  beforeEach(() => {
    render(<DraftOutput data={mockAPIData} />)
  })
  
  test('should render main card with first round draft info, starting with RB', () => {
    expect(screen.getByText('Nick Chubb')).toBeInTheDocument()
    expect(screen.getByText('Saquon Barkley')).toBeInTheDocument()
    expect(screen.getByText('Austin Ekeler')).toBeInTheDocument()

    throw new Error('not yet implemented')
  })

  test('should contain working tab buttons to switch between RB, WR, QB and TE', async () => {
    // assert buttons are there
    expect(screen.getByRole('button', {name: 'RB'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'WR'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'QB'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'TE'})).toBeInTheDocument()

    // assert buttons work
    await userEvent.click(screen.getByRole('button', {name: 'WR'}))
    expect(screen.getByText('Davante Adams')).toBeInTheDocument()
    expect(screen.getByText('Tyreek Hill')).toBeInTheDocument()
    expect(screen.getByText('Stefon Diggs')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: 'QB'}))
    expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument()
    expect(screen.getByText('Josh Allen')).toBeInTheDocument()
    expect(screen.getByText('Kyler Murray')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: 'TE'}))
    expect(screen.getByText('Travis Kelce')).toBeInTheDocument()
    expect(screen.getByText('Darren Waller')).toBeInTheDocument()
    expect(screen.getByText('George Kittle')).toBeInTheDocument()


    throw new Error('not yet implemented')
  })

  test('should have left/right arrow buttons to navigate through each rounds, total 15', async () => {
    expect(screen.getByRole('button', { name: 'Next Round'})).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Next Round'}))
    await userEvent.click(screen.getByRole('button', { name: 'Next Round'}))

    expect(screen.getByRole('button', {name: 'Prev Round'})).toBeInTheDocument()
    expect(screen.getByText('Chris Carson')).toBeInTheDocument()
    expect(screen.getByText('David Montgomery')).toBeInTheDocument()
    expect(screen.getByText('Josh Jacobs')).toBeInTheDocument()

    
    await userEvent.click(screen.getByRole('button', { name: 'Prev Round'}))
    await userEvent.click(screen.getByRole('button', { name: 'Prev Round'}))
    
    expect(screen.queryByRole('button', {name: 'Prev Round'})).not.toBeInTheDocument()
    expect(screen.getByText('Nick Chubb')).toBeInTheDocument()
    expect(screen.getByText('Saquon Barkley')).toBeInTheDocument()
    expect(screen.getByText('Austin Ekeler')).toBeInTheDocument()


    throw new Error('not yet implemented')
  })

  test('should have a back button to go back to DraftInput', async () => {
    expect(screen.getByRole('button', {name: 'Back to DraftInput'})).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: 'Back to DraftInput'}))

    expect(screen.queryByText('Nick Chubb')).not.toBeInTheDocument()
    expect(screen.queryByText('Saquon Barkley')).not.toBeInTheDocument()
    expect(screen.queryByText('Austin Ekeler')).not.toBeInTheDocument()

    throw new Error('not yet implemented')
  })

  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })


})

