import PropTypes from 'prop-types'
import useCardStyles from './styles'

function Card ({children}) {
  const styles = useCardStyles()

  return (
    /* card container */
    <div className={styles.cardContainer}>
      { children }
    </div>
  )

}


Card.propTypes = {
  children: PropTypes.node.isRequired
}

export default Card