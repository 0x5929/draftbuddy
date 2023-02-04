import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import CookiePolicyModal from './component'

describe('testing CookiePolicy component', () => {
  test('should render Cookie Policy Content', () => {

    render(
      <CookiePolicyModal 
        title='__TEST_TITLE__'
        onClick={jest.fn()}
        isOpen='true'
      />
    )

    expect(screen.getByTestId('base-dialog')).toHaveTextContent('t collect any cookies from user data')
    expect(screen.getByTestId('base-dialog')).toHaveTextContent('created with such philosophies in mind')

    cleanup()
  })

})