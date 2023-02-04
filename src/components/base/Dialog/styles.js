import { createStyles } from '@Utils'

const useDialogStyles = () => {
  const dialogStyles = {

    modalContainer: [
      'fixed',
      'flex',
      'justify-center',
      'items-center',
      'z-50',
      'w-full',
      'p-4',
      'overflow-x-hidden',
      'overflow-y-auto',

      'sm:h-full'

    ],

    modalContentContainer: [
      'relative',
      'w-full',
      'h-full',
      'max-w-2xl',
      'md:h-auto'
    ],

    modalContent: [
      'relative',
      'rounded-lg',
      'shadow',
      'bg-white',
      'dark:bg-gray-700'
    ],

    modalHeader: [
      'flex',
      'items-start',
      'justify-between',
      'p-4',
      'rounded-t',
      'border-b',
      'dark:border-gray-600'
    ],

    modalHeaderText: [
      'text-xl',
      'font-semibold',
      'text-gray-900',
      'dark:text-white'
    ],

    modalBody: [
      'p-6',
      'space-y-6'
    ],

    modalFooter: [
      'flex',
      'items-center',
      'p-6',
      'space-x-2',
      'border-t',
      'rounded-b',
      'border-gray-200',
      'dark:border-gray-600'
    ]
}

  return createStyles(dialogStyles)
}


export default useDialogStyles