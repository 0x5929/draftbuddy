
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import CircularProgress from './component'
import { spnrStyles } from './styles'

describe('testing spinner component', () => {
  beforeEach(() => {
    render(<CircularProgress />)
  })

  test('renders ciruclar progress', () => {
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument()
  })

  test('component should have all stylings', () => {
    const spinnerClassName = spnrStyles.spinner
    expect(screen.getByTestId('circular-progress')).toHaveClass(spinnerClassName)
  })

  afterEach(()=>{
    jest.restoreAllMocks()
    cleanup()
  })
})