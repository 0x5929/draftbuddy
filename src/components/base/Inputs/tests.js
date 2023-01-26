import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { TextField, Select, Button } from '.'
import { txtFldStylesNoErr, slctStyles, btnStyles } from './styles'

// import preview from 'jest-preview'
// preview.debug()

/**
 * 
 *  these are very basic and fundamental tests for base components
 *  further testings are done at the container lvl
 * 
 *  such as: onChange|onSubmit|onError behaviors, or container lvl style override
 * 
 */

describe('testing base input components', () => {
  describe('testing TextField component', () => {

    const mockParams = {
      register: jest.fn(),
      errors: {},
      name: '__TEST_NAME__',
      id: '__TEST_ID__',
      validation: {},
      styles: ''
    }


    beforeEach(() => {
      render(
        <TextField 
          register={mockParams.register}
          errors={mockParams.errors}
          name={mockParams.name}
          id={mockParams.id}
          validation={mockParams.validation}
          styles={mockParams.styles}
        />
      )
    })

    test('label should render name value', () => {
      expect(screen.getByLabelText(mockParams.name)).toBeInTheDocument()
    })
    test('component should have all base styling', () => {
      const labelClassList = txtFldStylesNoErr.label
      const inputContainerClassList = txtFldStylesNoErr.inputContainer
      const inputClassList = txtFldStylesNoErr.input

      expect(screen.getByText(mockParams.name)).toHaveClass(labelClassList)
      expect(screen.getByRole('textbox').closest('div')).toHaveClass(inputContainerClassList)
      expect(screen.getByRole('textbox')).toHaveClass(inputClassList)

    })


    afterEach(() => {
      jest.restoreAllMocks()
      cleanup()
    })

  })

  describe('testing Select component',  () => {
    const mockParams = {
      register: jest.fn(),
      name: '__TEST_NAME__',
      id: '__TEST_ID__',
      options: ['_TEST_OPT1__', '_TEST_OPT2__'],
      styles: ''
    }

    beforeEach(() => {
      render(
        <Select
          register={mockParams.register}
          name={mockParams.name}
          id={mockParams.id}
          options={mockParams.options}
        />
      )
    })    
    

    test('label should render name value', () => {
      expect(screen.getByLabelText(mockParams.name)).toBeInTheDocument()
    })
    test('component should have all base styling', () => {
      const labelClassList = slctStyles.label
      const selectClassList = slctStyles.select
      const optionsClassList = slctStyles.options

      expect(screen.getByText(mockParams.name)).toHaveClass(labelClassList)
      expect(screen.getByRole('combobox', {name: mockParams.name})).toHaveClass(selectClassList)

      screen.getAllByRole('option').forEach((opt) => {
        expect(opt).toHaveClass(optionsClassList)
      })
    })


    afterEach(() => {
      jest.restoreAllMocks()
      cleanup()
    })
  })

  describe('testing Button component', () => {
    const mockParams = {
      handleSubmit: jest.fn(),
      onSubmit: jest.fn(),
      text: '__TEST_BTN__',
    }

    beforeEach(() => {
      render(
        <Button
          text={mockParams.text}
          onClick={mockParams.handleSubmit(mockParams.onSubmit)}
        />
      )
    })

    test('component should render button text', () => {
      expect(screen.getByText(mockParams.text)).toBeInTheDocument()
    })
    test('component should have all base styling', () => {
      const buttonClassList = btnStyles.button
      expect(screen.getByText(mockParams.text)).toHaveClass(buttonClassList)
    })

    afterEach(() => {
      jest.restoreAllMocks()
      cleanup()
    })

  })


})