import PropTypes from 'prop-types'
import Card from '../base/Card'
import  usePlayerCardStyles  from './styles'


function PlayerCard ({players}) {
  const styles = usePlayerCardStyles()

  return (
    <div className={styles.tabContentContainer}>
      <div className={styles.playerCardsContainer} role='tabpanel'>
        {
          players.map((player, index) =>
            {
              if (player === undefined) return null
              return (
              <Card key={player.player_id} styles={styles.playerCard}>
                <p className={styles.playerCardTitle}>
                  Choice # { index + 1 }
                </p>
                <p className={styles.playerCardNameAndTeam}>
                  { player.name }
                </p>
                <p className={styles.playerCardNameAndTeam}>
                  { player.team }
                </p>
                <p className={styles.playerCardADP}>
                  ADP: { player.adp.toString() }
                </p>
              </Card>
            )}
          )
        }
      </div>
    </div>
  )
}

PlayerCard.propTypes = {
  players:  PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ])
    )).isRequired

}

export default PlayerCard