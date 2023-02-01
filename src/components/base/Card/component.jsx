import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import useCardStyles from './styles'

function Card ({children, styles, ...others}) {
  const baseStyles = useCardStyles()

  return (
    /* card container */
    <div className={twMerge(baseStyles.cardContainer, styles)} {...others}>
      { children }
    </div>
  )

}


Card.propTypes = {
  children: PropTypes.node.isRequired, 
  styles: PropTypes.string
}

Card.defaultProps = {
  styles: ''
}


export default Card