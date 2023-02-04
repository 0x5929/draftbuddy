import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Dialog from '.'

describe('testing dialog component', () => {

  let mockOnClick

  beforeEach(() => {

    mockOnClick = jest.fn()

    render(
      <Dialog
        isOpen='true'
        title='__TEST_MODAL_TITLE__'
        onClick={mockOnClick()}
      >
        __TEST_DIALOG_CONTENT__
      </Dialog>
    )

  })

  test('component should render title', () => {
    expect(screen.getByText('__TEST_MODAL_TITLE__')).toBeInTheDocument()
  })

  test('component should render child text', () => {
    expect(screen.getByText('__TEST_MODAL_TITLE__')).toBeInTheDocument()
  })

  test('component should render button', () => {
    expect(screen.getByRole('button', {name:'OK'})).toBeInTheDocument()
  })
  
  test('component should render when isOpen prop is true', () => {
    
    expect(screen.getByText('__TEST_MODAL_TITLE__')).toBeInTheDocument()
    expect(screen.getByText('__TEST_MODAL_TITLE__')).toBeInTheDocument()
    expect(screen.getByRole('button', {name:'OK'})).toBeInTheDocument()
  })

  test('component should not render when isOpen prop is false', () => {
    
    cleanup()
    render(      
      <Dialog
        title='__TEST_MODAL_TITLE__'
        onClick={mockOnClick()}
      >
        __TEST_DIALOG_CONTENT__
      </Dialog>
    )
    
    expect(screen.queryByText('__TEST_MODAL_TITLE__')).not.toBeInTheDocument()
    expect(screen.queryByText('__TEST_MODAL_TITLE__')).not.toBeInTheDocument()
    expect(screen.queryByText('button', {name:'OK'})).not.toBeInTheDocument()

  })

  test('should trigger onClick function when button is clicked', async () => {
    await userEvent.click(screen.getByRole('button', {name:'OK'}))
    
    expect(mockOnClick).toHaveBeenCalled()
  })

  afterEach(() => {
    mockOnClick = null
    jest.restoreAllMocks()
    cleanup()
  })

})