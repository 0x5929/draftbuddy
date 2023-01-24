import createStyles from '@Utils'

export const useTxtFldStyles = (err) => {
  const txtFldStyles = {

    label: [
      'block',
      'text-sm',
      'font-medium',
      'text-gray-700'
    ],

    inputContainer: [
      'relative',
      'mt-1',
      'rounded-md',
      'shadow-sm'
    ],

    input: [
      'block',
      'w-full',
      'rounded-md',
      'pr-10',

      'focus:outline-none',
      'sm:text-sm',

      err ? 'border-red-300' : 'border-gray-300',

      err ? 'focus:border-red-500' : 'focus:border-indigo-500',
      err ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
    ],

    iconContainer: [
      'absolute',
      'flex',
      'pointer-events-none',
      'inset-y-0',
      'right-0',
      'items-center',
      'pr-3'
    ],

    icon: [
      'h-5',
      'w-5',
      'text-red-500'
    ],

    errMsg: [
      'mt-2',
      'text-sm',
      'text-red-600'
    ]


  } 
  
  return createStyles(txtFldStyles)
}


export const useSlctStyles = () => {
  const slctStyles = {

    label: [
      'block',
      'text-sm',
      'font-medium',
      'text-gray-700'
    ],

    select: [
      'mt-1',
      'w-full',
      'rounded-md',
      'border-gray-300',
      'py-2',
      'pl-3',
      'pr-10',
      'text-base',

      'sm:text-sm',
      'focus:border-indigo-500',
      'focus:outline-none',
      'focus:ring-indigo-500',
      
    ]
  }

  return createStyles(slctStyles)
}

export const useBtnStyles = () => {
  const btnStyles = {
    button: [
      'shadow-sm',  
      'rounded-md', 
      'border', 
      'py-2', 
      'px-4', 
      'text-sm', 
      'font-medium',

      'focus:outline-none', 
      'focus:ring-2', 
      'focus:ring-indigo-500', 
      'focus:ring-offset-2' 
    ]
  }

  return createStyles(btnStyles)
}
