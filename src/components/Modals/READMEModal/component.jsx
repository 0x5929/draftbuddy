import PropTypes from 'prop-types'
import { Dialog } from '../../base'
import useModalBodyStyles from './styles'

function READMEModal ({title, onClick, isOpen}) {

  const styles = useModalBodyStyles()
  return (
    <Dialog title={title} onClick={onClick} isOpen={isOpen}>
      <p className={styles.textStyle}>
        Welcome to DraftBuddy.  This is a personal project that is completely free to use.  The technologies used to create this web app include Reactjs, ReactQuery, ReactHookForm, Tailwindcss, and HeroIcons.
      </p>
      <p className={styles.textStyle}>
        Special shoutout to <a href='https://fantasyfootballcalculator.com' target='_blank' rel='noopener noreferrer'>fantasyfootballcalculator.com</a> for their wonderful API system, providing data needed for this app.
      </p>

      <p className={styles.textStyle}>
        Lastly, DraftBuddy is not responsible for any of your draft picks.  You and only you are responsible for your season, this app is only used for statistical research purposes.  For more terms of usage, please see Terms and Conditions.
      </p>

      <p className={`${styles.textStyle} text-xs`}>
        PS. Currently this app uses data from year 2021.
      </p>
    </Dialog>
  )
}

READMEModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}



export default READMEModal