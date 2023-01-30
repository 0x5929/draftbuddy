/**
 * 
 *  The heart of the project
 *  inputs: 
 *    1. headCount
 *    2. draftPick
 *    3. API response data
 *  
 *  processes: 
 *    1. given headcount and draftpick calculate OPN (overall pick number)
 *    2. sort through API response data by ADP, grab three per position at each pick based on OPN
 * 
 * 
 *  outputs: 
 *    1. array of objects with key of each position of an array of player objects (3 at each pick, each position)
 *    2. NOTE: output is under the assumption there are 15 rounds total, and 15 players per team
 */

function algorithm ({headCount, draftPick, data}) {
  function resolveOPNs() {
    // create base array
    const base = [...Array(parseInt(headCount, 10)).keys()].map(x => x + 1)
    const reverseBase = [...Array(parseInt(headCount, 10)).keys()].map(x => x + 1).reverse()

    // total 15 of these arrays in one draft array
    const draft = []
    for (let i = 1; i <= 15; i++) {
      if ((i % 2) === 1){
        // odd number is always reg order
        draft.push(base)
      }
      else {
        // even number is always rev order
        draft.push(reverseBase)
      }
    }

    // get each round pick based on pick #
    // get Overall Draft Picks (ODPs) based by adding each round pick
    const ODP = []
    for (let i = 0; i < 15; i++ ) {
      ODP.push({
        round: i + 1,
        pick: draft[i].indexOf(parseInt(draftPick, 10)) + 1,
        
        // calculate ODP: base rounds (roundNum x headCount) + current pick 
        ODP: i === 0 ? 
          draft[i].indexOf(parseInt(draftPick, 10)) + 1
          : 
          (i * headCount) + (draft[i].indexOf(parseInt(draftPick, 10)) + 1) 
      })
    }

    return ODP


  }
  function sortData(ODP) {

    // sort players by ADP value, higher gets pushed.
    const adpSort = (a, b) => {
      let comp 
      if (a.adp === b.adp) {
        comp = 0
      }
      else if (a.adp < b.adp){
        comp = -1
      }
      else if (b.adp < a.adp) {
        comp = 1
      }

      return comp

    }

    // sort data base on ODP, into what we can display in DraftOutput
    const { players } = data
    const playerSorted = players.sort(adpSort)

    // look in small radius, for three, then apply rules to three. 
    // then if not look in bigger (repeate above step with bigger radius, until three is found)
    // const qbs = players.filter((el) => el.position === 'QB').sort(adpSort)
    // const rbs = players.filter((el) => el.position === 'RB').sort(adpSort)
    // const wrs = players.filter((el) => el.position === 'WR').sort(adpSort)
    // const tes = players.filter((el) => el.position === 'TE').sort(adpSort)

    // console.log('data.players: ', data.players)
    // console.log('qbs: ', qbs)
    // console.log('rbs: ', rbs)
    // console.log('wrs: ', wrs)
    // console.log('tes: ', tes)
    return data
  }

  
  function main() {
    const ODP = resolveOPNs()
    return sortData(ODP)

    
  }

  return main()
}

export default algorithm