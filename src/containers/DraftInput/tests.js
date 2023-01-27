import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import * as useAPIQuery from '@Hooks/useAPIQuery'
import preview from 'jest-preview'
import DraftInput from '.'


/**
 * 
 *  TO PROPERLY TEST REACT HOOK FORM 
 *  FOLLOW : https://stackoverflow.com/a/65982953/7347545
 * 
 */

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

  test('select input should work as expected onChange', () => {
    // first test the default value 1/2 PPR
    expect(screen.getByText('1/2 PPR')).toBeInTheDocument()
    expect(screen.getByRole('option', {name: '1/2 PPR'}).selected).toBe(true)

    // second test onChange of select input
    
    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      // Find and select the Ireland option
      screen.getByRole('option', {name: 'Standard non PPR'}),
    )
    // preview.debug()
    expect(screen.getByRole('option', {name: 'Standard non PPR'}).selected).toBe(true)
    expect(screen.getByRole('option', {name: 'Points Per Reception (PPR)'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: '1/2 PPR'}).selected).toBe(false)


  })

  test('textfield input should work as expected onChange', async () => {

    await act(async () => {
      userEvent.type(screen.getByLabelText('# of Participants'), '8')
    })
    expect(screen.getByLabelText('# of Participants')).toHaveValue('8')

    await act(async () => {
      userEvent.clear(screen.getByLabelText('# of Participants'))
    })
    expect(screen.getByLabelText('# of Participants')).toHaveValue('')
  })

  test('draft button should work as expected onClick with validation failure', async () => {

    // test submit without inputs for errors
    await act(async () => {
      fireEvent.click(screen.getByText('Draft'))
    })
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(screen.getByText('This field is required.')).toBeInTheDocument()

    // test by typing wrong inputs
    await act(async () => {
      await userEvent.type(screen.getByRole('textbox'), '7')
    })
    await act(async () => {
      fireEvent.click(screen.getByText('Draft'))
    })
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(screen.getByText('Please enter an even # between 8 to 16.'))

    // preview.debug()
  })

  test('draft button should work as expected onClick with validation success', async () => {
      // mock API function called once submitted
      const mockUseAPIQuery = jest.spyOn(useAPIQuery, 'default')
      mockUseAPIQuery.mockImplementation(() => Promise.resolve("data"))

      // enter inputs
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox'), '10')
      })
      await act(async () => {
        fireEvent.click(screen.getByText('Draft'))
      })
      expect(mockUseAPIQuery).toBeCalled()
  })

  test('clear button should work as expected onClick', async () => {
    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      // Find and select the Ireland option
      screen.getByRole('option', {name: 'Standard non PPR'}),
    )

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox'), '8')
    })
    expect(screen.getByRole('option', {name: 'Standard non PPR'}).selected).toBe(true)
    expect(screen.getByRole('option', {name: 'Points Per Reception (PPR)'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: '1/2 PPR'}).selected).toBe(false)
    expect(screen.getByLabelText('# of Participants')).toHaveValue('8')

    await act(async () => {
      fireEvent.click(screen.getByText('Clear'))
    })
    expect(screen.getByRole('option', {name: 'Standard non PPR'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: 'Points Per Reception (PPR)'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: '1/2 PPR'}).selected).toBe(true)
    expect(screen.getByLabelText('# of Participants')).toHaveValue('')
  })


  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })
})