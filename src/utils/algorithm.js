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
 *    2. NOTE: output is under the assumption there are 15 rounds total, and 15 draftable players per team
 */

function algorithm ({headCount, draftPick, data}) {
  // https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
  function closestValue(array, value) {
    let result
    let lastDelta;

    array.some((item) => {
        const delta = Math.abs(value - item.adp)
        if (delta > lastDelta) {
            return true
        }
        result = item
        lastDelta = delta
        return false
    })
    return result
  }

  // sort players by ADP value, higher gets pushed.
  function adpSort(a, b)  {
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
    // sort data base on ODP, into what we can display in DraftOutput
    const { players } = data
    const resultDraft = []

    // sort by pos
    const qbs = players.filter((el) => el.position === 'QB').sort(adpSort)
    const rbs = players.filter((el) => el.position === 'RB').sort(adpSort)
    const wrs = players.filter((el) => el.position === 'WR').sort(adpSort)
    const tes = players.filter((el) => el.position === 'TE').sort(adpSort)
  
    for (let i = 0; i < ODP.length; i++) {
      // each round of draft

      
      // for each ODP, grab each pos closest
      const clstQB = closestValue(qbs, ODP[i].ODP)
      const clstRB = closestValue(rbs, ODP[i].ODP)
      const clstWR = closestValue(wrs, ODP[i].ODP)
      const clstTE = closestValue(tes, ODP[i].ODP)

      
      // see what index closest is, and take its following three for each ODP
      const qbIndx = qbs.findIndex((element) => element.player_id === clstQB.player_id)
      const rbIndx = rbs.findIndex((element) => element.player_id === clstRB.player_id)
      const wrIndx = wrs.findIndex((element) => element.player_id === clstWR.player_id)
      const teIndx = tes.findIndex((element) => element.player_id === clstTE.player_id)

      resultDraft.push({
        meta: ODP[i],
        players: {
          qb: [qbs[qbIndx], qbs[qbIndx + 1], qbs[qbIndx + 2]],
          rb: [rbs[rbIndx], rbs[rbIndx + 1], rbs[rbIndx + 2]],
          wr: [wrs[wrIndx], wrs[wrIndx + 1], wrs[wrIndx + 2]],
          te: [tes[teIndx], tes[teIndx + 1], tes[teIndx + 2]],
        }
      })
    }
    // console.log('resultDraft: ', JSON.stringify(resultDraft))
    return resultDraft
  }

  
  function main() {
    const ODP = resolveOPNs()
    return sortData(ODP)

    
  }

  return main()
}




export default algorithm