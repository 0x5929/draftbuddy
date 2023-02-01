import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline'

import { Card, Button } from '@Components'
import { useDraftOutputStyles, usePlayerCardStyles } from './styles'

function DraftOutput({data, setServRes}) {
  const [ pos, setPos ] = useState('rb')
  const [ indx, setIndx ] = useState(0)

  const styles = useDraftOutputStyles()

  const onTabClick = (chosenPos) => {
    setPos(chosenPos)
  }


  const onNextClick = () => {
    setIndx((prevIndx) => {
      if (prevIndx === data.length - 1) {
        return prevIndx
      }

      return prevIndx + 1
    })
  }

  const onPrevClick = () => {
    setIndx((prevIndx) => {
      if (prevIndx === 0) {
        return prevIndx
      }

      return prevIndx - 1
    })
  }


  return (
    <>
      <div className={styles.mainCardContainer}>
        <Card styles={styles.card}>
          <ul className={styles.tabListContainer} role='tablist'>

            {/* 
            
              NOTE: these buttons arent from ui components @Components 
                bc they are special tab components used for 
                purposes other than a normal button

            */}

            <li className={styles.tabList}>
                <button type='button' role='tab' className={styles.tabListBtn} onClick={()=>onTabClick('rb')}>
                  RB
                </button>
            </li>
            <li className={styles.tabList}>
                <button type='button' role='tab' className={styles.tabListBtn} onClick={()=>onTabClick('wr')} >
                  WR
                </button>
            </li>
            <li className={styles.tabList}>
                <button type='button' role='tab' className={styles.tabListBtn} onClick={()=>onTabClick('qb')}>
                  QB
                </button>
            </li>
            <li className={styles.tabList}>
                <button type='button' role='tab' className={styles.tabListBtn} onClick={()=>onTabClick('te')}>
                  TE
                </button>
            </li>
          </ul>
          <div className={styles.metaInfoContainer}>
            <span className={styles.metaInfo}><p>Round: { data[indx].meta.round }</p></span>
            <span className={styles.metaInfo}><p>Pick: { data[indx].meta.pick }</p></span>
            <span className={styles.metaInfo}><p>Overall: { data[indx].meta.ODP  }</p></span>
          </div>
          <PlayerCards players={data[indx].players[pos]}/>
          <div className={styles.backToDraftBtnContainer}>
            <Button 
              text='Back to Draft Input'
              onClick={() => setServRes(null)}
              styles={styles.backToDraftBtn}
            />
          </div>
        </Card>
      </div>
      {
        indx < data.length - 1 &&
        <button data-testid='next-round-btn' className={styles.nextRndBtn} onClick={onNextClick} >
          <ChevronRightIcon />
        </button>
      }
      {
        indx > 0 &&
        <button data-testid='prev-round-btn' className={styles.prevRndBtn} onClick={onPrevClick}>
          <ChevronLeftIcon />
        </button>
      }
    </>
 
    )
}


function PlayerCards ({players}) {
  const styles = usePlayerCardStyles()

  return (
    <div className={styles.tabContentContainer}>
      <div className={styles.playerCardsContainer} role='tabpanel'>
        {
          players.map((player) =>
            <Card key={player.player_id} styles={styles.playerCard}>
              { player.name}
            </Card>
          )
        }
      </div>
    </div>
  )
}

DraftOutput.propTypes = {
  data: 
    PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.objectOf(
            PropTypes.number
          ),
          PropTypes.objectOf(
            PropTypes.arrayOf(
              PropTypes.objectOf(
                PropTypes.oneOfType([
                  PropTypes.number,
                  PropTypes.string
                ])
              )
            )
          )
        ])
      )
    ).isRequired,

  setServRes: PropTypes.func.isRequired

}

PlayerCards.propTypes = {
  players:  PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ])
    )).isRequired

}

export default DraftOutput