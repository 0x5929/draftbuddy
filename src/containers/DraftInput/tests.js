import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import DraftInput from '.'

describe('testing DraftInput container', () => {

  beforeEach(() => {
    render(<DraftInput />)
  })

  test('container should contain input form and fields', () => {
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('combobox', {name: 'League Format'})).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  test('select input should work as expected onChange', () => { throw new Error})
  test('textfield input should work as expected onChange', () => {throw new Error})
  test('clear button should work as expected onClick', () => {throw new Error})
  test('draft button should work as expected onClick', () => {throw new Error})
  
  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })
})