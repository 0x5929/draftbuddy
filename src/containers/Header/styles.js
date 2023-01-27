import createStyles from '@Utils'

const useHeaderStyles = () => {
 
  const headerStyles = {

    headerContainer: [
      'relative',

      'bg-white',
      'dark:bg-navy-800',

      'h-14'
    ],

    flexBoxContainer: [
      'flex',
      'relative',
      'px-6',
      'py-6'
    ],

    menuContainer: [
      'flex',
      'justify-start',
      'grow',
      '-mt-2'
    ],

    menu: [
      'flex',
      'relative'
    ],

    menuButton: [
      'text-gray-500',
      'inline-flex',
      'rounded-md',

      'bg-white',
      'dark:bg-navy-800',

      'text-base',

      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-navy-500',
      'focus:ring-offset-2'
    ],

    menuIcon: [
      'h-6',
      'w-6'
    ],


    transitionEnter: [
      'transition',
      'ease-out',
      'duration-200'
    ],

    transitionEnterFrom: [
      'opacity-0',
      'translate-y-1'
    ],

    transitionEnterTo: [
      'opacity-100',
      'translate-y-0'
    ],

    transitionLeave: [
      'transition',
      'ease-in',
      'duration-150',
    ],

    transitionLeaveFrom: [
      'opacity-100',
      'translate-y-0'
    ],
    
    transitinoLeaveTo: [
      'opacity-0',
      'translate-y-1'
    ],
  

    menuDropDownContainer: [
      'absolute',
      'top-4',
      'z-10',
      'mt-3',
      'transform',
      'px-2',
      'sm:px-0'
    ],

    menuDropDown: [
      'overflow-hidden',
      'rounded-lg',
      'shadow-lg',
      'ring-1',
      'ring-black',
      'ring-opacity-5'
    ],

    menuDropDownGrid: [
      'relative',
      'grid',

      'gap-6',
      'sm:gap-8',

      'px-5',
      'py-6',
      'sm:p-8',

      'bg-white',
      'dark:bg-navy-800'
    ],

    menuItemLink: [
      'flex',
      '-m-3',
      'items-start',
      'rounded-lg',
      'p-3',

      'hover:bg-gray-50',
      'dark:hover:bg-navy-600'
    ],

    menuItemIcon: [
      'h-6',
      'w-6',
      'flex-shrink-0',

      'text-navy-600',
      'dark:text-gray-500'
    ],

    menuItemTextContainer: [
      'ml-4'
    ],

    menuItemText: [
      'text-base',
      'font-medium',

      'text-gray-900',
      'dark:text-white'
    ],

    modeSwitcherContainer: [
      'flex',
      'justify-end',
      'grow',
      '-mt-2'

    ],

    modeSwitcher: [
      'h-6',
      'w-6',
      'flex-shrink-0',
      'text-gray-500'
    ]

  }

  return createStyles(headerStyles)
}

export default useHeaderStyles
export const headerStyles = useHeaderStyles()