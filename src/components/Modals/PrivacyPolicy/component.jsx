import PropTypes from 'prop-types'
import { Dialog } from '../../base'
import useModalBodyStyles from './styles'

function PrivacyModal ({title, onClick, isOpen}) {

  const styles = useModalBodyStyles()
  return (
    <Dialog title={title} onClick={onClick} isOpen={isOpen}>
      <p className={styles.textStyle}>
        The only data that this site would save is your browser or Operating System preferences in regard to light or dark mode.  Data would be saved internally on the client browser side, nothing is stored at the site server.
      </p>
      <p className={styles.textStyle}>
        In addition, there are no other data saved or used by this application.  This may not be true for other sites, so it is always imperative to read all of their legal documentation before using the services offered by the site/app.
      </p>
    </Dialog>
  )
}

PrivacyModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}



export default PrivacyModal