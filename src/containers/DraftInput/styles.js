import createStyles from '@Utils'

const useDraftInputSytles = () => {
  const daftInputSytles = {

    formContainer: [
      'flex',
      'flex-col',
      'justify-center',
      'items-center'
    ],

    form: [
      'space-y-6'
    ],

    gridContainer: [
      'grid',
      'md:grid',
      'grid-cols-1', 
      'md:grid-cols-1',
      'gap-6',
      'md:gap-6'
    ],

    gridColumn: [
      'mt-5',
      'space-y-6',
      'col-auto',
      'md:mt-0'
    ],

    btnContainer: [
      'flex',
      'justify-end'
    ],

    cancelBtn: [
      'bg-white',
      'hover:bg-gray-50',
      'border-gray-300',
      'text-gray-700',
    ],

    draftBtn: [
      'ml-3',
      'inline-flex',
      'justify-center',
      'border-transparent',
      'text-white',

      'bg-indigo-600',
      'hover:bg-indigo-700',

    ]
    
    
}

  return createStyles(daftInputSytles)
}

export default useDraftInputSytles