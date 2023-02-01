import PropTypes from 'prop-types'
import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BookOpenIcon,
  DocumentTextIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline'

import useHeaderStyles from './styles'

const menuItems = [
  {
    text: 'README',
    href: '#',
    icon: BookOpenIcon,
  },
  {
    text: 'Terms and Conditions',
    href: '#',
    icon: DocumentTextIcon,
  },
  { 
    text: 'Privacy Policy', 
    href: '#', 
    icon: EyeSlashIcon },
  {
    text: 'Cookie Policy',
    href: '#',
    icon: InformationCircleIcon,
  }
]



function Header () {

  const styles = useHeaderStyles()

  return (
    // header container
    <header>
      <Popover className={styles.headerContainer} data-testid='nav-header-container'>
        {/* flexbox container */}
        <nav className={styles.flexBoxContainer} data-testid='nav-flexbox-container'>
          {/* menu container */}
          <div className={styles.menuContainer} data-testid='nav-menu-container'>
            {/* menu */}
            <Popover className={styles.menu} data-testid='nav-menu'>
                  {/* menu Button */}
                  <Popover.Button
                    className={styles.menuButton}
                    data-testid='nav-menu-button'
                  >
                    {/* menu icon */}
                    <Bars3Icon className={styles.menuIcon} data-testid='nav-menu-icon'/>
                  </Popover.Button>

                  {/* transition */}
                  <Transition
                    as={Fragment}
                    enter={styles.transitionEnter}
                    enterFrom={styles.transitionEnterFrom}
                    enterTo={styles.transitionEnterTo}
                    leave={styles.transitionLeave}
                    leaveFrom={styles.transitionLeaveFrom}
                    leaveTo={styles.transitinoLeaveTo}
                  >
                    {/* menu dropdown container */}
                    <Popover.Panel className={styles.menuDropDownContainer} data-testid='nav-menu-dropdown-container'>
                      {/*  menu dropdown */}
                      <div className={styles.menuDropDown} data-testid='nav-menu-dropdown'>
                        {/* menu dropdown grid */}
                        <div className={styles.menuDropDownGrid} data-testid='nav-menu-dropdown-grid'>
                          {menuItems.map((item) => (
                            // menu item link
                            <a
                              key={item.text}
                              href={item.href}
                              className={styles.menuItemLink}
                              data-testid='nav-menu-item-link'
                            >
                              {/* menu item icon */}
                              <item.icon className={styles.menuItemIcon} data-testid='nav-menu-item-icon' aria-hidden="true" />
                              {/* menu item text container */}
                              <div className={styles.menuItemTextContainer} data-testid='nav-menu-item-text-container'>
                                {/* menu item text */}
                                <p className={styles.menuItemText} data-testid='nav-menu-item-text'>{item.text}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>

            </Popover>
          </div>
          {/* modeswitcher container */}
          <div className={styles.modeSwitcherContainer} data-testid='nav-modeswitcher'>
            <ModeSwitcher styles={styles.modeSwitcher} />
          </div>
        </nav>
      </Popover>
    </header>
  )

}

function ModeSwitcher({styles}) {
  const [ darkMode, setDarkMode ] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prev)=>!prev)
  }

  // initial render
  useEffect(() => {

    const html = document.querySelector('html')

    if (html.classList.contains('dark')) {
      setDarkMode(true) 
    }
    else {
      setDarkMode(false)
    }

  }, [])

  // toggle dark mode, triggered by toggleDarkMode
  useEffect(() => {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    if (darkMode) {
      html.classList.add('dark')
      html.classList.remove('bg-navy-100')
      body.classList.add('dark:bg-navy-900')
    }
    else {
      html.classList.remove('dark')
      body.classList.add('bg-navy-100')
    }

  }, [darkMode])


  return (
      <button data-testid='mode-switcher'>
        { darkMode ?
        // mode switcher 
          <SunIcon data-testid='sun-icon' className={styles} onClick={toggleDarkMode} />
          :
          <MoonIcon data-testid='moon-icon' className={styles} onClick={toggleDarkMode} />
        }
      </button>
  )
}


ModeSwitcher.propTypes = {
  styles: PropTypes.string.isRequired
}



export default Header

