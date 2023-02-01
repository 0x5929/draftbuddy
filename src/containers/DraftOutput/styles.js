import { createStyles } from '@Utils'

export const useDraftOutputStyles = () => {
  const draftOutputStyles = {

    mainCardContainer : [
      'flex',
      'justify-center'
    ],

    card: [
      'mt-5',
      'w-1/2',
      
      'pt-0',
      'sm:pt-0',
      'px-0',
      'sm:px-0'
    ],

    tabListContainer: [
      'flex',
      'w-full',
      'text-sm',
      'font-medium',
      'text-center',
      'justify-center',
      'border-b',
      'rounded-t-lg ',

      'text-gray-500',
      'dark:text-gray-400',
      'border-gray-200',
      'dark:border-gray-700',
      'bg-gray-50',
      'dark:bg-gray-800',

    ],

    tabList: [
      'mr-2'
    ],

    tabListBtn: [
      'inline-block',
      'p-4',

      'hover:text-gray-600',
      'hover:bg-gray-100',
      'dark:hover:bg-gray-700',
      'dark:hover:text-gray-300'      
    ],

    metaInfoContainer: [
      'flex',
      'justify-center',
      'text-sm',
      'mt-2'
    ],

    metaInfo: [
      'mx-2'
    ],

    backToDraftBtnContainer: [
      'mx-8'
    ],

    backToDraftBtn: [
      'w-full'
    ],

    nextRndBtn: [
      'z-20',
      'absolute',
      'inset-y-1/2',
      'right-0',
      'w-12',
      'h-12'
    ],

    prevRndBtn: [
      'z-20',
      'absolute',
      'inset-y-1/2',
      'left-0',
      'w-12',
      'h-12'
    ]


  }

  return createStyles(draftOutputStyles)
}

export const usePlayerCardStyles = () => {
  const playerCardStyles = {
    tabContentContainer: [
      'px-6',
      'py-4'
    ],

    playerCardsContainer: [
      'flex',
      'flex-col',
      'sm:flex-row',
      'justify-center'
    ],

    playerCard: [
      'flex',
      'grow',
      'mx-2',
      'mt-2',
      'max-w-sm'
    ]
  }

  return createStyles(playerCardStyles)
}