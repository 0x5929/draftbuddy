import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import PrivacyModal from './component'

describe('testing PrivacyModal component', () => {
  test('should render Privacy Policy Content', () => {

    render(
      <PrivacyModal 
        title='__TEST_TITLE__'
        onClick={jest.fn()}
        isOpen='true'
      />
    )
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('light or dark mode')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('nothing is stored at the site server')

    cleanup()
  })

})