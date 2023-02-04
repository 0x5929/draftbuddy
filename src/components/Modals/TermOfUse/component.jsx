import PropTypes from 'prop-types'
import { Dialog } from '../../base'
import useModalBodyStyles from './styles'

function TermsOfUseModal ({title, onClick, isOpen}) {

  const styles = useModalBodyStyles()
  return (
    <Dialog title={title} onClick={onClick} isOpen={isOpen}>
      <p className={styles.textStyle}>
        This is a free service site but is limited by the API call limit set forth by fantasyfootballcalculator.com.  Please don’t abuse or overuse this service. 
      </p>
      <p className={styles.textStyle}>
        This app is not responsible for any financial, physical, spiritual, or emotional loss due to the choice selections suggested by this app.  This app is made solely for the purpose of research via past statistics, it does not reflect any statistics nor predictions for the current season.  Football is a volatile sport, so make your choices wisely.
      </p>
      <p className={styles.textStyle}>
        As the project owner, I understand that there is another site called draftbuddy.com, so if need be, I will take this down upon request {'>'} <a href='mailto: elemental.software.solutions@gmail.com'>elemental.software.solutions@gmail.com</a>.
      </p>
    </Dialog>
  )
}

TermsOfUseModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}



export default TermsOfUseModal