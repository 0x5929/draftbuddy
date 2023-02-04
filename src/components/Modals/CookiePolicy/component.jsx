import PropTypes from 'prop-types'
import { Dialog } from '../../base'
import useModalBodyStyles from './styles'

function CookiePolicyModal ({title, onClick, isOpen}) {

  const styles = useModalBodyStyles()
  return (
    <Dialog title={title} onClick={onClick} isOpen={isOpen}>
      <p className={styles.textStyle}>
        Congratulations, I applaud your meticulousness, not everyone reads this far; also, this app doesn’t collect any cookies from user data.  All collected cookies are created by and used internally by the application itself. 
      </p>
      <p className={styles.textStyle}>
        So you can have peace of mind when it comes to your personal data protection.  This app was created with such philosophies in mind.
      </p>
      <p className={styles.textStyle}>
        - nom nom the Cookie Monster
      </p>
    </Dialog>
  )
}

CookiePolicyModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}



export default CookiePolicyModal