import { createStyles } from '@Utils'

const useModalBodyStyles = () => {
  const modalBodyStyles = {

    textStyle: [
      'text-base',
      'leading-relaxed',
     
      'text-gray-500',
      'dark:text-gray-400'
    ]

}

  return createStyles(modalBodyStyles)
}


export default useModalBodyStyles