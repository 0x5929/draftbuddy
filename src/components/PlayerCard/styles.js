import { createStyles } from '@Utils'

const usePlayerCardStyles = () => {
  const playerCardStyles = {
    tabContentContainer: [
      'px-6',
      'py-4'
    ],

    playerCardsContainer: [
      'flex',
      'flex-col',
      'justify-center',

      'sm:flex-row',
    ],

    playerCard: [
      'text-center',
      'grow',
      'max-w-sm',
      'mx-2',

      'px-0',
      'sm:px-0',
      'pt-0',
      'sm:pt-0',
      'mt-6',
      'sm:mt-4',

      'hover:shadow-2xl',

      'rounded-xl',
      'sm:rounded-xl',

      'dark:bg-navy-900',
      'dark:text-white',
      
    ],

    playerCardTitle : [
      'font-semibold',
      'w-full',
      'mb-4',
      'p-1',
      'rounded-t-lg',
      
      'bg-gray-50',
      'dark:bg-gray-800',
      
    ],

    playerCardNameAndTeam: [
      'mb-4',
      'pb-4',
      'dark:text-gray-400',
      'border-b',
      'border-slate-200',
      'dark:border-slate-600',
    ],


    playerCardADP: [
      'mb-4',
      'dark:text-gray-400'
    ]

  }

  return createStyles(playerCardStyles)
}


export default usePlayerCardStyles