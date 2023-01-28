import { createStyles } from '@Utils'

export const useTxtFldStyles = (err) => {
  const txtFldStyles = {

    label: [
      'block',
      'text-sm',
      'font-semibold',
      'text-gray-700',
      'dark:text-navy-200'
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

      'dark:bg-navy-900',
      'dark:text-navy-200',
      'border-navy-200',
      'font-medium',



      'rounded-md',
      'pr-10',

      'focus:outline-none',
      'sm:text-sm',

      err ? 'border-red-300' : 'border-navy-200',

      err ? 'focus:border-red-500' : 'focus:border-blue-500',
      err ? 'focus:ring-red-500' : 'focus:ring-blue-500'
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

export const txtFldStylesNoErr = useTxtFldStyles()


export const useSlctStyles = () => {
  const slctStyles = {
    label: [
      'block',
      'text-sm',
      'font-semibold',
      'text-navy-800',
      'dark:text-navy-200'
    ],

    select: [
      'dark:bg-navy-900',
      'text-navy-800',
      'dark:text-navy-200',
      'mt-1',
      'w-full',
      'font-medium',
      'rounded-md',
      'border-navy-200',
      'py-2',
      'pl-3',
      'pr-10',
      'text-base',

      'sm:text-sm',
      'focus:border-blue-500',
      'focus:outline-none',
      'focus:ring-blue-500', 
    ],

    options: [
      'dark:bg-navy-800',
      'text-navy-800',
      'dark:text-navy-200'
    ]
  }

  return createStyles(slctStyles)
}

export const slctStyles = useSlctStyles()

export const useBtnStyles = () => {
  const btnStyles = {
    button: [
      'shadow-sm',  
      'rounded-md', 
      'border', 
      'py-2', 
      'px-4', 
      'text-sm', 
      'font-semibold',
      'bg-navy-500',
      'dark:bg-navy-300',
      'dark:hover:bg-navy-200',
      'hover:bg-navy-200',
      'text-white',
      'dark:text-black',

      'focus:outline-none', 
      'focus:ring-2', 
      'focus:ring-offset-1' ,
      'border-transparent',
    ]
  }

  return createStyles(btnStyles)
}

export const btnStyles = useBtnStyles()