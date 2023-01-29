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
    
    // total 15 of these arrays in one draft array
    const draft = []
    for (let i = 0; i < 15; i++) {
      if (((i + 1) % 2) === 1){
        // odd number is always reg order
        draft.push([...base])
      }
      else {
        // even number is always rev order
        draft.push([...base.reverse()])
      }
    }

    // get each round pick based on pick #
    // get Overall Draft Picks (ODPs) based by adding each round pick
    const ODP = []
    for (let i = 0; i < 15; i++ ) {
      ODP.push({
        round: i + 1,
        pick: draft[i].indexOf(parseInt(draftPick, 10)),
        
        // calculate ODP: base rounds (roundNum x headCount) + current pick 
        ODP: ((i + 1) * (headCount)) + (draft[i].indexOf(parseInt(draftPick, 10)))
      })
    }

    console.log(ODP)


  }
  function sortData() {}

  
  function main() {}

  return main()
}

export default algorithm