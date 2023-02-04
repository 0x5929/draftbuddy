import {  QueryClient, QueryClientProvider } from 'react-query'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
// import preview from 'jest-preview'
import { mockAPIData } from '@Utils'
import DraftInput from '.'


/**
 * 
 *  TO PROPERLY TEST REACT HOOK FORM 
 *  FOLLOW : https://stackoverflow.com/a/65982953/7347545
 * 
 */

const queryClient = new QueryClient()

describe('testing DraftInput container', () => {

  let mockSetServRes

  beforeEach(() => {

    mockSetServRes  = jest.fn()
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPIData)
    })

    render(
      <QueryClientProvider client={queryClient}>
        <DraftInput setServRes={mockSetServRes} />
      </QueryClientProvider>
    )
  })


  test('container should contain form title', () => {
    expect(screen.getByText('Draftbuddy Input')).toBeInTheDocument()
  })

  test('container should contain input form and fields', () => {
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('combobox', {name: 'League Format'})).toBeInTheDocument()
    expect(screen.getAllByRole('textbox')).toHaveLength(2)
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
      userEvent.type(screen.getByLabelText('Pick #'), '8')
    })
    expect(screen.getByLabelText('# of Participants')).toHaveValue('8')
    expect(screen.getByLabelText('Pick #')).toHaveValue('8')

    await act(async () => {
      userEvent.clear(screen.getByLabelText('Pick #'))
      userEvent.clear(screen.getByLabelText('# of Participants'))
    })
    expect(screen.getByLabelText('# of Participants')).toHaveValue('')
    expect(screen.getByLabelText('Pick #')).toHaveValue('')
  })

  test('pickNumber input is disabled until headCount is entered', async () => {
    expect(screen.getByLabelText('Pick #')).toBeDisabled()
    
    await act(async () => {
      userEvent.type(screen.getByLabelText('# of Participants'), '8')
    })
    
    expect(screen.getByLabelText('Pick #')).not.toBeDisabled()
  })

  test('draft button should work as expected onClick with validation failure', async () => {

    // test submit without inputs for errors
    await act(async () => {
      fireEvent.click(screen.getByText('Draft'))
    })
    expect(screen.getAllByRole('alert')).toHaveLength(4)
    expect(screen.getAllByText('This field is required.')).toHaveLength(2)

    // test by typing wrong inputs
    await act(async () => {
      await userEvent.type(screen.getByLabelText('# of Participants'), '7')
      await userEvent.type(screen.getByLabelText('Pick #'), '9')
    })
    await act(async () => {
      fireEvent.click(screen.getByText('Draft'))
    })
    expect(screen.getAllByRole('alert')).toHaveLength(4)
    expect(screen.getByText('Please enter an even # between 8 to 14.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid draft pick.')).toBeInTheDocument()

    // preview.debug()
  })

  // this test need to be chagned from testing if functions are called, but instead, what happens after
  // draft button is pressed, ie, grabs data and calculates in algo, and spits out some display, now we can await and expect/assert the displays
  test('draft button should work as expected onClick with validation success', async () => {
      // enter inputs
      await act(async () => {
        await userEvent.type(screen.getByLabelText('# of Participants'), '10')
        await userEvent.type(screen.getByLabelText('Pick #'), '10')
      })
      await act(async () => {
        fireEvent.click(screen.getByText('Draft'))
      })

      // assert server response setter called
      expect(mockSetServRes).toHaveBeenCalledTimes(1)
  })

  test('clear button should work as expected onClick', async () => {
    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      // Find and select the Ireland option
      screen.getByRole('option', {name: 'Standard non PPR'}),
    )

    await act(async () => {
      await userEvent.type(screen.getByLabelText('# of Participants'), '8')
      await userEvent.type(screen.getByLabelText('Pick #'), '8')
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
    expect(screen.getByLabelText('Pick #')).toHaveValue('')
  })


  afterEach(() => {
    
    // mockSetServRes = null
    jest.restoreAllMocks()
    cleanup()
  })
})