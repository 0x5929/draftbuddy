import PropTypes from 'prop-types'
import { useBtnStyles } from './styles'

function Button ({type, text, onClick, styles}) {

  const baseStyles = useBtnStyles()
  return (
    <button
      type={type || 'button'}
      className={`${baseStyles.button} ${styles}`}
      onClick={onClick}
    >
      { text }
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  type: null,
  styles: ''
}

export default Button