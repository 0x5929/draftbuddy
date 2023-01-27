import createStyles from "@Utils"

const useSpnrStyles = () => {
  const spnrStyles = {

    spinner: [
      'absolute',
      'top-1/2',
      'left-1/2',
      'w-20',
      'h-20',
      'mr-2',
      'text-gray-200',
      'animate-spin',
      'text-gray-600',
      'fill-navy-300'
    ]
  }

  return createStyles(spnrStyles)
}

const spnrStyles = useSpnrStyles()

export { spnrStyles }
export default useSpnrStyles