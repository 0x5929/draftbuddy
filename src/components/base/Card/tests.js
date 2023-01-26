import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import preview from 'jest-preview'
import Card from '.'
import { cardStyles } from './styles'


describe('testing card component', () => {
  const mockCardContent = '__TEST_CARD__'

  beforeEach(() => {
    render(
      <Card>
        { mockCardContent }
      </Card>
    )
  })
  test('component should have all base stylings', () => {
    
  preview.debug()
    const cardClassList = cardStyles.cardContainer
    expect(screen.getByText(mockCardContent).closest('div')).toHaveClass(cardClassList)

  })

  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })
})