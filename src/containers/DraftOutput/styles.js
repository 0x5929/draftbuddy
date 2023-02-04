import { createStyles } from '@Utils'

const useDraftOutputStyles = () => {
  const draftOutputStyles = {

    mainCardContainer : [
      'flex',
      'justify-center'
    ],

    card: [
      'shadow-xl',

      'mt-5',
      'sm:mt-24',
      'w-72',
      'sm:w-1/2',
      'pt-0',
      'sm:pt-0',
      'px-0',
      'sm:px-0',
      'dark:bg-navy-800',

      'rounded-xl',
      'sm:rounded-xl'
    ],

    tabListContainer: [
      'flex',
      'w-full',
      'text-sm',
      'font-medium',
      'text-center',
      'justify-center',
      'border-b',
      'rounded-t-lg',

      'text-gray-500',
      'dark:text-gray-400',
      'border-gray-200',
      'dark:border-gray-700',
      'bg-gray-50',
      'dark:bg-gray-800',

    ],

    tabList: [
      'mr-0'
    ],

    tabListBtn: [
      'inline-block',
      'p-4',

      'hover:text-gray-600',
      'hover:bg-gray-100',
      'dark:hover:bg-gray-700',
      'dark:hover:text-gray-300'      
    ],


    resultTitle: [
      'font-smooch',
      'text-center',
      'text-3xl',
      'my-6',
      'dark:text-white'
    ],

    positionTitle: [
      'font-smooch',
      'text-center',
      'text-xl',
      '-mt-3',
      'mb-6',
      'dark:text-white'
    ],

    metaInfoContainer: [
      'flex',
      'justify-center',
      'text-sm',
      'mt-2',
      'w-48',
      'mx-auto'
    ],

    metaInfo: [
      'mx-auto',
      'italic',

      'dark:text-white'
    ],

    backToDraftBtnContainer: [
      'justify-center',
      'flex',
    ],

    backToDraftBtn: [
      'mt-6',
      'sm:mt-14',

      'mb-6',
      'w-1/2',
      'inline-block',
    ],

    nextRndBtn: [
      'z-20',
      'absolute',
      'inset-y-1/2',
      'right-0',
      'w-12',
      'h-12',
      
      'dark:text-white'
    ],

    prevRndBtn: [
      'z-20',
      'absolute',
      'inset-y-1/2',
      'left-0',
      'w-12',
      'h-12',

      'dark:text-white'
    ]


  }

  return createStyles(draftOutputStyles)
}

export default useDraftOutputStyles