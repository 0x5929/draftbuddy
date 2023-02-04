
import { render, screen, cleanup } from '@testing-library/react'

import { mockSortedData } from '@Utils'
import PlayerCard from './component'


describe('testing DraftOutput Container', () => {

  const players = mockSortedData[0].players.rb

  beforeEach(() => {
    render(<PlayerCard players={players} />)
  })
  
  test('should render main card with first round draft info, starting with RB', () => {
    expect(screen.getByText('Choice # 1')).toBeInTheDocument()
    expect(screen.getByText('Nick Chubb')).toBeInTheDocument()
    expect(screen.getByText('CLE')).toBeInTheDocument()
    expect(screen.getByText('ADP: 7.9')).toBeInTheDocument()

    expect(screen.getByText('Choice # 2')).toBeInTheDocument()
    expect(screen.getByText('Saquon Barkley')).toBeInTheDocument()
    expect(screen.getByText('NYG')).toBeInTheDocument()
    expect(screen.getByText('ADP: 10.2')).toBeInTheDocument()

    expect(screen.getByText('Choice # 3')).toBeInTheDocument()
    expect(screen.getByText('Austin Ekeler')).toBeInTheDocument()
    expect(screen.getByText('LAC')).toBeInTheDocument()
    expect(screen.getByText('ADP: 10.7')).toBeInTheDocument()

  })




  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })


})

