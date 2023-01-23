import createStyles from '@Utils'

const useCardStyles = () => {
  const cardStyles = {

    cardContainer: [
      'bg-white',
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

export default useCardStyles