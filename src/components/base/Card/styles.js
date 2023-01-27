import createStyles from '@Utils'

const useCardStyles = () => {
  const cardStyles = {

    cardContainer: [
      
      'bg-white',
      'dark:bg-navy-800',
      'shadow',
      'rounded-lg',
      'sm:rounded-lg',
      'px-4',
      'py-5',
      'sm:p-6',
    ]
}

  return createStyles(cardStyles)
}

export const cardStyles = useCardStyles()

export default useCardStyles