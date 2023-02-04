import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import READMEModal from './component'

describe('testing READMEModal component', () => {
  test('should render READMEModal Content', () => {

    render(
      <READMEModal 
        title='__TEST_TITLE__'
        onClick={jest.fn()}
        isOpen='true'
      />
    )

    expect(screen.getByTestId('base-dialog')).toHaveTextContent('Welcome to DraftBuddy.')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('fantasyfootballcalculator.com')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('not responsible')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('please see Terms and Conditions.')

    cleanup()
  })

})