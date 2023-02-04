import PropTypes from 'prop-types'
import { Button } from '../Inputs'

import useDialogStyles from './styles'

function Dialog ({title, children, onClick, isOpen}) {

  const styles = useDialogStyles()

  return (
    <div data-testid='base-dialog'>
      {
        isOpen &&
          <div className={styles.modalContainer}>
              <div className={styles.modalContentContainer}>
                  <div className={styles.modalContent}>
                      <div className={styles.modalHeader}>
                          <h3 className={styles.modalHeaderText}>
                              { title }
                          </h3>
                      </div>
                      <div className={styles.modalBody}>

                        { children }
                      
                      </div>
                      <div className={styles.modalFooter}>
                          <Button type="button" text='OK' onClick={onClick} />
                      </div>
                  </div>
              </div>
          </div>
        }
      </div>
  )

}

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, 
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}



export default Dialog