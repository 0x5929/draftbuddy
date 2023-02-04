import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import TermsOfUseModal from './component'

describe('testing TermsOfUseModal component', () => {
  test('should render TermsOfUseModal Content', () => {

    render(
      <TermsOfUseModal 
        title='__TEST_TITLE__'
        onClick={jest.fn()}
        isOpen='true'
      />
    )


    expect(screen.getByTestId('base-dialog')).toHaveTextContent('fantasyfootballcalculator.com')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('not responsible')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('I will take this down upon request')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('elemental.software.solutions@gmail.com')
    

    cleanup()
  })

})