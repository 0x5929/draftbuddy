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
    console.log('resultDraft: ', JSON.stringify(resultDraft))
    return resultDraft
  }

  
  function main() {
    const ODP = resolveOPNs()
    return sortData(ODP)

    
  }

  return main()
}


/**  from the following input (2021 data): 
*     1. 1/2 PPR, 2. 8 headCount, 3. 8thpick
*/

const sampleAlgOutput = [
  {
    "meta": {
      "round": 1,
      "pick": 8,
      "ODP": 8
    },
    "players": {
      "qb": [
        {
          "player_id": 2462,
          "name": "Patrick Mahomes",
          "position": "QB",
          "team": "KC",
          "adp": 21.2,
          "adp_formatted": "3.05",
          "times_drafted": 578,
          "high": 8,
          "low": 33,
          "stdev": 4.9,
          "bye": 8
        },
        {
          "player_id": 2885,
          "name": "Josh Allen",
          "position": "QB",
          "team": "BUF",
          "adp": 34.6,
          "adp_formatted": "5.03",
          "times_drafted": 870,
          "high": 20,
          "low": 46,
          "stdev": 5.5,
          "bye": 7
        },
        {
          "player_id": 3299,
          "name": "Kyler Murray",
          "position": "QB",
          "team": "ARI",
          "adp": 40.5,
          "adp_formatted": "5.08",
          "times_drafted": 507,
          "high": 31,
          "low": 54,
          "stdev": 3.6,
          "bye": 13
        }
      ],
      "rb": [
        {
          "player_id": 2863,
          "name": "Nick Chubb",
          "position": "RB",
          "team": "CLE",
          "adp": 7.9,
          "adp_formatted": "1.08",
          "times_drafted": 869,
          "high": 3,
          "low": 14,
          "stdev": 1.6,
          "bye": 9
        },
        {
          "player_id": 2860,
          "name": "Saquon Barkley",
          "position": "RB",
          "team": "NYG",
          "adp": 10.2,
          "adp_formatted": "2.02",
          "times_drafted": 791,
          "high": 4,
          "low": 18,
          "stdev": 2.5,
          "bye": 9
        },
        {
          "player_id": 2625,
          "name": "Austin Ekeler",
          "position": "RB",
          "team": "LAC",
          "adp": 10.7,
          "adp_formatted": "2.03",
          "times_drafted": 985,
          "high": 5,
          "low": 19,
          "stdev": 2,
          "bye": 8
        }
      ],
      "wr": [
        {
          "player_id": 2125,
          "name": "Davante Adams",
          "position": "WR",
          "team": "GB",
          "adp": 7,
          "adp_formatted": "1.07",
          "times_drafted": 817,
          "high": 2,
          "low": 13,
          "stdev": 1.7,
          "bye": 14
        },
        {
          "player_id": 2390,
          "name": "Tyreek Hill",
          "position": "WR",
          "team": "KC",
          "adp": 11.2,
          "adp_formatted": "2.03",
          "times_drafted": 1098,
          "high": 5,
          "low": 18,
          "stdev": 2.1,
          "bye": 8
        },
        {
          "player_id": 2316,
          "name": "Stefon Diggs",
          "position": "WR",
          "team": "BUF",
          "adp": 15.6,
          "adp_formatted": "2.08",
          "times_drafted": 1473,
          "high": 9,
          "low": 23,
          "stdev": 2.2,
          "bye": 7
        }
      ],
      "te": [
        {
          "player_id": 1989,
          "name": "Travis Kelce",
          "position": "TE",
          "team": "KC",
          "adp": 8.7,
          "adp_formatted": "2.01",
          "times_drafted": 831,
          "high": 3,
          "low": 18,
          "stdev": 2,
          "bye": 8
        },
        {
          "player_id": 2322,
          "name": "Darren Waller",
          "position": "TE",
          "team": "LV",
          "adp": 22.6,
          "adp_formatted": "3.07",
          "times_drafted": 996,
          "high": 14,
          "low": 31,
          "stdev": 3,
          "bye": 6
        },
        {
          "player_id": 2499,
          "name": "George Kittle",
          "position": "TE",
          "team": "SF",
          "adp": 29.4,
          "adp_formatted": "4.05",
          "times_drafted": 1046,
          "high": 20,
          "low": 40,
          "stdev": 3.5,
          "bye": 9
        }
      ]
    }
  },
  {
    "meta": {
      "round": 2,
      "pick": 1,
      "ODP": 9
    },
    "players": {
      "qb": [
        {
          "player_id": 2462,
          "name": "Patrick Mahomes",
          "position": "QB",
          "team": "KC",
          "adp": 21.2,
          "adp_formatted": "3.05",
          "times_drafted": 578,
          "high": 8,
          "low": 33,
          "stdev": 4.9,
          "bye": 8
        },
        {
          "player_id": 2885,
          "name": "Josh Allen",
          "position": "QB",
          "team": "BUF",
          "adp": 34.6,
          "adp_formatted": "5.03",
          "times_drafted": 870,
          "high": 20,
          "low": 46,
          "stdev": 5.5,
          "bye": 7
        },
        {
          "player_id": 3299,
          "name": "Kyler Murray",
          "position": "QB",
          "team": "ARI",
          "adp": 40.5,
          "adp_formatted": "5.08",
          "times_drafted": 507,
          "high": 31,
          "low": 54,
          "stdev": 3.6,
          "bye": 13
        }
      ],
      "rb": [
        {
          "player_id": 2863,
          "name": "Nick Chubb",
          "position": "RB",
          "team": "CLE",
          "adp": 7.9,
          "adp_formatted": "1.08",
          "times_drafted": 869,
          "high": 3,
          "low": 14,
          "stdev": 1.6,
          "bye": 9
        },
        {
          "player_id": 2860,
          "name": "Saquon Barkley",
          "position": "RB",
          "team": "NYG",
          "adp": 10.2,
          "adp_formatted": "2.02",
          "times_drafted": 791,
          "high": 4,
          "low": 18,
          "stdev": 2.5,
          "bye": 9
        },
        {
          "player_id": 2625,
          "name": "Austin Ekeler",
          "position": "RB",
          "team": "LAC",
          "adp": 10.7,
          "adp_formatted": "2.03",
          "times_drafted": 985,
          "high": 5,
          "low": 19,
          "stdev": 2,
          "bye": 8
        }
      ],
      "wr": [
        {
          "player_id": 2125,
          "name": "Davante Adams",
          "position": "WR",
          "team": "GB",
          "adp": 7,
          "adp_formatted": "1.07",
          "times_drafted": 817,
          "high": 2,
          "low": 13,
          "stdev": 1.7,
          "bye": 14
        },
        {
          "player_id": 2390,
          "name": "Tyreek Hill",
          "position": "WR",
          "team": "KC",
          "adp": 11.2,
          "adp_formatted": "2.03",
          "times_drafted": 1098,
          "high": 5,
          "low": 18,
          "stdev": 2.1,
          "bye": 8
        },
        {
          "player_id": 2316,
          "name": "Stefon Diggs",
          "position": "WR",
          "team": "BUF",
          "adp": 15.6,
          "adp_formatted": "2.08",
          "times_drafted": 1473,
          "high": 9,
          "low": 23,
          "stdev": 2.2,
          "bye": 7
        }
      ],
      "te": [
        {
          "player_id": 1989,
          "name": "Travis Kelce",
          "position": "TE",
          "team": "KC",
          "adp": 8.7,
          "adp_formatted": "2.01",
          "times_drafted": 831,
          "high": 3,
          "low": 18,
          "stdev": 2,
          "bye": 8
        },
        {
          "player_id": 2322,
          "name": "Darren Waller",
          "position": "TE",
          "team": "LV",
          "adp": 22.6,
          "adp_formatted": "3.07",
          "times_drafted": 996,
          "high": 14,
          "low": 31,
          "stdev": 3,
          "bye": 6
        },
        {
          "player_id": 2499,
          "name": "George Kittle",
          "position": "TE",
          "team": "SF",
          "adp": 29.4,
          "adp_formatted": "4.05",
          "times_drafted": 1046,
          "high": 20,
          "low": 40,
          "stdev": 3.5,
          "bye": 9
        }
      ]
    }
  },
  {
    "meta": {
      "round": 3,
      "pick": 8,
      "ODP": 24
    },
    "players": {
      "qb": [
        {
          "player_id": 2462,
          "name": "Patrick Mahomes",
          "position": "QB",
          "team": "KC",
          "adp": 21.2,
          "adp_formatted": "3.05",
          "times_drafted": 578,
          "high": 8,
          "low": 33,
          "stdev": 4.9,
          "bye": 8
        },
        {
          "player_id": 2885,
          "name": "Josh Allen",
          "position": "QB",
          "team": "BUF",
          "adp": 34.6,
          "adp_formatted": "5.03",
          "times_drafted": 870,
          "high": 20,
          "low": 46,
          "stdev": 5.5,
          "bye": 7
        },
        {
          "player_id": 3299,
          "name": "Kyler Murray",
          "position": "QB",
          "team": "ARI",
          "adp": 40.5,
          "adp_formatted": "5.08",
          "times_drafted": 507,
          "high": 31,
          "low": 54,
          "stdev": 3.6,
          "bye": 13
        }
      ],
      "rb": [
        {
          "player_id": 2518,
          "name": "Chris Carson",
          "position": "RB",
          "team": "SEA",
          "adp": 24.2,
          "adp_formatted": "3.08",
          "times_drafted": 1088,
          "high": 17,
          "low": 34,
          "stdev": 2.8,
          "bye": 11
        },
        {
          "player_id": 3238,
          "name": "David Montgomery",
          "position": "RB",
          "team": "CHI",
          "adp": 25.7,
          "adp_formatted": "4.02",
          "times_drafted": 792,
          "high": 18,
          "low": 36,
          "stdev": 2.9,
          "bye": 14
        },
        {
          "player_id": 3255,
          "name": "Josh Jacobs",
          "position": "RB",
          "team": "LV",
          "adp": 27.4,
          "adp_formatted": "4.03",
          "times_drafted": 533,
          "high": 17,
          "low": 36,
          "stdev": 3.8,
          "bye": 6
        }
      ],
      "wr": [
        {
          "player_id": 4876,
          "name": "Justin Jefferson",
          "position": "WR",
          "team": "MIN",
          "adp": 23.2,
          "adp_formatted": "3.07",
          "times_drafted": 890,
          "high": 16,
          "low": 30,
          "stdev": 2.4,
          "bye": 7
        },
        {
          "player_id": 3247,
          "name": "A.J. Brown",
          "position": "WR",
          "team": "TEN",
          "adp": 25.2,
          "adp_formatted": "4.01",
          "times_drafted": 784,
          "high": 19,
          "low": 34,
          "stdev": 2.2,
          "bye": 6
        },
        {
          "player_id": 1992,
          "name": "Keenan Allen",
          "position": "WR",
          "team": "LAC",
          "adp": 27.7,
          "adp_formatted": "4.04",
          "times_drafted": 1171,
          "high": 20,
          "low": 36,
          "stdev": 2.7,
          "bye": 8
        }
      ],
      "te": [
        {
          "player_id": 2322,
          "name": "Darren Waller",
          "position": "TE",
          "team": "LV",
          "adp": 22.6,
          "adp_formatted": "3.07",
          "times_drafted": 996,
          "high": 14,
          "low": 31,
          "stdev": 3,
          "bye": 6
        },
        {
          "player_id": 2499,
          "name": "George Kittle",
          "position": "TE",
          "team": "SF",
          "adp": 29.4,
          "adp_formatted": "4.05",
          "times_drafted": 1046,
          "high": 20,
          "low": 40,
          "stdev": 3.5,
          "bye": 9
        },
        {
          "player_id": 5181,
          "name": "Kyle Pitts",
          "position": "TE",
          "team": "ATL",
          "adp": 44,
          "adp_formatted": "6.04",
          "times_drafted": 736,
          "high": 28,
          "low": 64,
          "stdev": 6,
          "bye": 14
        }
      ]
    }
  },
  {
    "meta": {
      "round": 4,
      "pick": 1,
      "ODP": 25
    },
    "players": {
      "qb": [
        {
          "player_id": 2462,
          "name": "Patrick Mahomes",
          "position": "QB",
          "team": "KC",
          "adp": 21.2,
          "adp_formatted": "3.05",
          "times_drafted": 578,
          "high": 8,
          "low": 33,
          "stdev": 4.9,
          "bye": 8
        },
        {
          "player_id": 2885,
          "name": "Josh Allen",
          "position": "QB",
          "team": "BUF",
          "adp": 34.6,
          "adp_formatted": "5.03",
          "times_drafted": 870,
          "high": 20,
          "low": 46,
          "stdev": 5.5,
          "bye": 7
        },
        {
          "player_id": 3299,
          "name": "Kyler Murray",
          "position": "QB",
          "team": "ARI",
          "adp": 40.5,
          "adp_formatted": "5.08",
          "times_drafted": 507,
          "high": 31,
          "low": 54,
          "stdev": 3.6,
          "bye": 13
        }
      ],
      "rb": [
        {
          "player_id": 3238,
          "name": "David Montgomery",
          "position": "RB",
          "team": "CHI",
          "adp": 25.7,
          "adp_formatted": "4.02",
          "times_drafted": 792,
          "high": 18,
          "low": 36,
          "stdev": 2.9,
          "bye": 14
        },
        {
          "player_id": 3255,
          "name": "Josh Jacobs",
          "position": "RB",
          "team": "LV",
          "adp": 27.4,
          "adp_formatted": "4.03",
          "times_drafted": 533,
          "high": 17,
          "low": 36,
          "stdev": 3.8,
          "bye": 6
        },
        {
          "player_id": 5162,
          "name": "James Robinson",
          "position": "RB",
          "team": "JAX",
          "adp": 30.3,
          "adp_formatted": "4.06",
          "times_drafted": 1409,
          "high": 20,
          "low": 40,
          "stdev": 3.7,
          "bye": 11
        }
      ],
      "wr": [
        {
          "player_id": 3247,
          "name": "A.J. Brown",
          "position": "WR",
          "team": "TEN",
          "adp": 25.2,
          "adp_formatted": "4.01",
          "times_drafted": 784,
          "high": 19,
          "low": 34,
          "stdev": 2.2,
          "bye": 6
        },
        {
          "player_id": 1992,
          "name": "Keenan Allen",
          "position": "WR",
          "team": "LAC",
          "adp": 27.7,
          "adp_formatted": "4.04",
          "times_drafted": 1171,
          "high": 20,
          "low": 36,
          "stdev": 2.7,
          "bye": 8
        },
        {
          "player_id": 3449,
          "name": "Terry McLaurin",
          "position": "WR",
          "team": "WAS",
          "adp": 29.5,
          "adp_formatted": "4.06",
          "times_drafted": 833,
          "high": 22,
          "low": 39,
          "stdev": 2.7,
          "bye": 14
        }
      ],
      "te": [
        {
          "player_id": 2322,
          "name": "Darren Waller",
          "position": "TE",
          "team": "LV",
          "adp": 22.6,
          "adp_formatted": "3.07",
          "times_drafted": 996,
          "high": 14,
          "low": 31,
          "stdev": 3,
          "bye": 6
        },
        {
          "player_id": 2499,
          "name": "George Kittle",
          "position": "TE",
          "team": "SF",
          "adp": 29.4,
          "adp_formatted": "4.05",
          "times_drafted": 1046,
          "high": 20,
          "low": 40,
          "stdev": 3.5,
          "bye": 9
        },
        {
          "player_id": 5181,
          "name": "Kyle Pitts",
          "position": "TE",
          "team": "ATL",
          "adp": 44,
          "adp_formatted": "6.04",
          "times_drafted": 736,
          "high": 28,
          "low": 64,
          "stdev": 6,
          "bye": 14
        }
      ]
    }
  },
  {
    "meta": {
      "round": 5,
      "pick": 8,
      "ODP": 40
    },
    "players": {
      "qb": [
        {
          "player_id": 3299,
          "name": "Kyler Murray",
          "position": "QB",
          "team": "ARI",
          "adp": 40.5,
          "adp_formatted": "5.08",
          "times_drafted": 507,
          "high": 31,
          "low": 54,
          "stdev": 3.6,
          "bye": 13
        },
        {
          "player_id": 2888,
          "name": "Lamar Jackson",
          "position": "QB",
          "team": "BAL",
          "adp": 48.5,
          "adp_formatted": "6.08",
          "times_drafted": 651,
          "high": 35,
          "low": 62,
          "stdev": 4.9,
          "bye": 10
        },
        {
          "player_id": 2377,
          "name": "Dak Prescott",
          "position": "QB",
          "team": "DAL",
          "adp": 59.2,
          "adp_formatted": "8.03",
          "times_drafted": 697,
          "high": 43,
          "low": 75,
          "stdev": 6.1,
          "bye": 9
        }
      ],
      "rb": [
        {
          "player_id": 2309,
          "name": "Mike Davis",
          "position": "RB",
          "team": "ATL",
          "adp": 41.1,
          "adp_formatted": "6.01",
          "times_drafted": 874,
          "high": 30,
          "low": 54,
          "stdev": 4,
          "bye": 14
        },
        {
          "player_id": 3258,
          "name": "Myles Gaskin",
          "position": "RB",
          "team": "MIA",
          "adp": 42.1,
          "adp_formatted": "6.02",
          "times_drafted": 711,
          "high": 30,
          "low": 55,
          "stdev": 4.6,
          "bye": 11
        },
        {
          "player_id": 2450,
          "name": "Kareem Hunt",
          "position": "RB",
          "team": "CLE",
          "adp": 47.5,
          "adp_formatted": "6.07",
          "times_drafted": 775,
          "high": 30,
          "low": 68,
          "stdev": 6.5,
          "bye": 9
        }
      ],
      "wr": [
        {
          "player_id": 1981,
          "name": "Robert Woods",
          "position": "WR",
          "team": "LAR",
          "adp": 39.1,
          "adp_formatted": "5.07",
          "times_drafted": 1255,
          "high": 30,
          "low": 53,
          "stdev": 3.5,
          "bye": 7
        },
        {
          "player_id": 2277,
          "name": "Amari Cooper",
          "position": "WR",
          "team": "DAL",
          "adp": 43.1,
          "adp_formatted": "6.03",
          "times_drafted": 1179,
          "high": 32,
          "low": 60,
          "stdev": 4.2,
          "bye": 9
        },
        {
          "player_id": 1796,
          "name": "Julio Jones",
          "position": "WR",
          "team": "TEN",
          "adp": 44.3,
          "adp_formatted": "6.04",
          "times_drafted": 726,
          "high": 30,
          "low": 56,
          "stdev": 5.5,
          "bye": 6
        }
      ],
      "te": [
        {
          "player_id": 5181,
          "name": "Kyle Pitts",
          "position": "TE",
          "team": "ATL",
          "adp": 44,
          "adp_formatted": "6.04",
          "times_drafted": 736,
          "high": 28,
          "low": 64,
          "stdev": 6,
          "bye": 14
        },
        {
          "player_id": 2872,
          "name": "Mark Andrews",
          "position": "TE",
          "team": "BAL",
          "adp": 53.1,
          "adp_formatted": "7.05",
          "times_drafted": 744,
          "high": 38,
          "low": 67,
          "stdev": 5.7,
          "bye": 10
        },
        {
          "player_id": 3307,
          "name": "T.J. Hockenson",
          "position": "TE",
          "team": "DET",
          "adp": 54.1,
          "adp_formatted": "7.06",
          "times_drafted": 401,
          "high": 40,
          "low": 92,
          "stdev": 5.2,
          "bye": 6
        }
      ]
    }
  },
  {
    "meta": {
      "round": 6,
      "pick": 1,
      "ODP": 41
    },
    "players": {
      "qb": [
        {
          "player_id": 3299,
          "name": "Kyler Murray",
          "position": "QB",
          "team": "ARI",
          "adp": 40.5,
          "adp_formatted": "5.08",
          "times_drafted": 507,
          "high": 31,
          "low": 54,
          "stdev": 3.6,
          "bye": 13
        },
        {
          "player_id": 2888,
          "name": "Lamar Jackson",
          "position": "QB",
          "team": "BAL",
          "adp": 48.5,
          "adp_formatted": "6.08",
          "times_drafted": 651,
          "high": 35,
          "low": 62,
          "stdev": 4.9,
          "bye": 10
        },
        {
          "player_id": 2377,
          "name": "Dak Prescott",
          "position": "QB",
          "team": "DAL",
          "adp": 59.2,
          "adp_formatted": "8.03",
          "times_drafted": 697,
          "high": 43,
          "low": 75,
          "stdev": 6.1,
          "bye": 9
        }
      ],
      "rb": [
        {
          "player_id": 2309,
          "name": "Mike Davis",
          "position": "RB",
          "team": "ATL",
          "adp": 41.1,
          "adp_formatted": "6.01",
          "times_drafted": 874,
          "high": 30,
          "low": 54,
          "stdev": 4,
          "bye": 14
        },
        {
          "player_id": 3258,
          "name": "Myles Gaskin",
          "position": "RB",
          "team": "MIA",
          "adp": 42.1,
          "adp_formatted": "6.02",
          "times_drafted": 711,
          "high": 30,
          "low": 55,
          "stdev": 4.6,
          "bye": 11
        },
        {
          "player_id": 2450,
          "name": "Kareem Hunt",
          "position": "RB",
          "team": "CLE",
          "adp": 47.5,
          "adp_formatted": "6.07",
          "times_drafted": 775,
          "high": 30,
          "low": 68,
          "stdev": 6.5,
          "bye": 9
        }
      ],
      "wr": [
        {
          "player_id": 1981,
          "name": "Robert Woods",
          "position": "WR",
          "team": "LAR",
          "adp": 39.1,
          "adp_formatted": "5.07",
          "times_drafted": 1255,
          "high": 30,
          "low": 53,
          "stdev": 3.5,
          "bye": 7
        },
        {
          "player_id": 2277,
          "name": "Amari Cooper",
          "position": "WR",
          "team": "DAL",
          "adp": 43.1,
          "adp_formatted": "6.03",
          "times_drafted": 1179,
          "high": 32,
          "low": 60,
          "stdev": 4.2,
          "bye": 9
        },
        {
          "player_id": 1796,
          "name": "Julio Jones",
          "position": "WR",
          "team": "TEN",
          "adp": 44.3,
          "adp_formatted": "6.04",
          "times_drafted": 726,
          "high": 30,
          "low": 56,
          "stdev": 5.5,
          "bye": 6
        }
      ],
      "te": [
        {
          "player_id": 5181,
          "name": "Kyle Pitts",
          "position": "TE",
          "team": "ATL",
          "adp": 44,
          "adp_formatted": "6.04",
          "times_drafted": 736,
          "high": 28,
          "low": 64,
          "stdev": 6,
          "bye": 14
        },
        {
          "player_id": 2872,
          "name": "Mark Andrews",
          "position": "TE",
          "team": "BAL",
          "adp": 53.1,
          "adp_formatted": "7.05",
          "times_drafted": 744,
          "high": 38,
          "low": 67,
          "stdev": 5.7,
          "bye": 10
        },
        {
          "player_id": 3307,
          "name": "T.J. Hockenson",
          "position": "TE",
          "team": "DET",
          "adp": 54.1,
          "adp_formatted": "7.06",
          "times_drafted": 401,
          "high": 40,
          "low": 92,
          "stdev": 5.2,
          "bye": 6
        }
      ]
    }
  },
  {
    "meta": {
      "round": 7,
      "pick": 8,
      "ODP": 56
    },
    "players": {
      "qb": [
        {
          "player_id": 2377,
          "name": "Dak Prescott",
          "position": "QB",
          "team": "DAL",
          "adp": 59.2,
          "adp_formatted": "8.03",
          "times_drafted": 697,
          "high": 43,
          "low": 75,
          "stdev": 6.1,
          "bye": 9
        },
        {
          "player_id": 4887,
          "name": "Justin Herbert",
          "position": "QB",
          "team": "LAC",
          "adp": 61.2,
          "adp_formatted": "8.05",
          "times_drafted": 393,
          "high": 42,
          "low": 77,
          "stdev": 7,
          "bye": 8
        },
        {
          "player_id": 1004,
          "name": "Aaron Rodgers",
          "position": "QB",
          "team": "GB",
          "adp": 64.9,
          "adp_formatted": "9.01",
          "times_drafted": 896,
          "high": 47,
          "low": 88,
          "stdev": 6.6,
          "bye": 14
        }
      ],
      "rb": [
        {
          "player_id": 5185,
          "name": "Javonte Williams",
          "position": "RB",
          "team": "DEN",
          "adp": 57.4,
          "adp_formatted": "8.01",
          "times_drafted": 978,
          "high": 39,
          "low": 74,
          "stdev": 6.9,
          "bye": 9
        },
        {
          "player_id": 2980,
          "name": "Chase Edmonds",
          "position": "RB",
          "team": "ARI",
          "adp": 58.1,
          "adp_formatted": "8.02",
          "times_drafted": 825,
          "high": 42,
          "low": 73,
          "stdev": 6,
          "bye": 13
        },
        {
          "player_id": 5202,
          "name": "Trey Sermon",
          "position": "RB",
          "team": "SF",
          "adp": 67,
          "adp_formatted": "9.03",
          "times_drafted": 1161,
          "high": 51,
          "low": 85,
          "stdev": 6.1,
          "bye": 9
        }
      ],
      "wr": [
        {
          "player_id": 4891,
          "name": "Brandon Aiyuk",
          "position": "WR",
          "team": "SF",
          "adp": 55.8,
          "adp_formatted": "7.08",
          "times_drafted": 637,
          "high": 44,
          "low": 70,
          "stdev": 4.5,
          "bye": 9
        },
        {
          "player_id": 2876,
          "name": "D.J. Moore",
          "position": "WR",
          "team": "CAR",
          "adp": 59.9,
          "adp_formatted": "8.04",
          "times_drafted": 1093,
          "high": 45,
          "low": 77,
          "stdev": 5.4,
          "bye": 13
        },
        {
          "player_id": 4901,
          "name": "Chase Claypool",
          "position": "WR",
          "team": "PIT",
          "adp": 61.3,
          "adp_formatted": "8.05",
          "times_drafted": 642,
          "high": 45,
          "low": 79,
          "stdev": 6.2,
          "bye": 9
        }
      ],
      "te": [
        {
          "player_id": 3307,
          "name": "T.J. Hockenson",
          "position": "TE",
          "team": "DET",
          "adp": 54.1,
          "adp_formatted": "7.06",
          "times_drafted": 401,
          "high": 40,
          "low": 92,
          "stdev": 5.2,
          "bye": 6
        },
        {
          "player_id": 2151,
          "name": "Logan Thomas",
          "position": "TE",
          "team": "WAS",
          "adp": 69.6,
          "adp_formatted": "9.06",
          "times_drafted": 427,
          "high": 51,
          "low": 91,
          "stdev": 7,
          "bye": 14
        },
        {
          "player_id": 3251,
          "name": "Noah Fant",
          "position": "TE",
          "team": "DEN",
          "adp": 78.2,
          "adp_formatted": "10.06",
          "times_drafted": 256,
          "high": 58,
          "low": 133,
          "stdev": 7.7,
          "bye": 9
        }
      ]
    }
  },
  {
    "meta": {
      "round": 8,
      "pick": 1,
      "ODP": 57
    },
    "players": {
      "qb": [
        {
          "player_id": 2377,
          "name": "Dak Prescott",
          "position": "QB",
          "team": "DAL",
          "adp": 59.2,
          "adp_formatted": "8.03",
          "times_drafted": 697,
          "high": 43,
          "low": 75,
          "stdev": 6.1,
          "bye": 9
        },
        {
          "player_id": 4887,
          "name": "Justin Herbert",
          "position": "QB",
          "team": "LAC",
          "adp": 61.2,
          "adp_formatted": "8.05",
          "times_drafted": 393,
          "high": 42,
          "low": 77,
          "stdev": 7,
          "bye": 8
        },
        {
          "player_id": 1004,
          "name": "Aaron Rodgers",
          "position": "QB",
          "team": "GB",
          "adp": 64.9,
          "adp_formatted": "9.01",
          "times_drafted": 896,
          "high": 47,
          "low": 88,
          "stdev": 6.6,
          "bye": 14
        }
      ],
      "rb": [
        {
          "player_id": 5185,
          "name": "Javonte Williams",
          "position": "RB",
          "team": "DEN",
          "adp": 57.4,
          "adp_formatted": "8.01",
          "times_drafted": 978,
          "high": 39,
          "low": 74,
          "stdev": 6.9,
          "bye": 9
        },
        {
          "player_id": 2980,
          "name": "Chase Edmonds",
          "position": "RB",
          "team": "ARI",
          "adp": 58.1,
          "adp_formatted": "8.02",
          "times_drafted": 825,
          "high": 42,
          "low": 73,
          "stdev": 6,
          "bye": 13
        },
        {
          "player_id": 5202,
          "name": "Trey Sermon",
          "position": "RB",
          "team": "SF",
          "adp": 67,
          "adp_formatted": "9.03",
          "times_drafted": 1161,
          "high": 51,
          "low": 85,
          "stdev": 6.1,
          "bye": 9
        }
      ],
      "wr": [
        {
          "player_id": 4891,
          "name": "Brandon Aiyuk",
          "position": "WR",
          "team": "SF",
          "adp": 55.8,
          "adp_formatted": "7.08",
          "times_drafted": 637,
          "high": 44,
          "low": 70,
          "stdev": 4.5,
          "bye": 9
        },
        {
          "player_id": 2876,
          "name": "D.J. Moore",
          "position": "WR",
          "team": "CAR",
          "adp": 59.9,
          "adp_formatted": "8.04",
          "times_drafted": 1093,
          "high": 45,
          "low": 77,
          "stdev": 5.4,
          "bye": 13
        },
        {
          "player_id": 4901,
          "name": "Chase Claypool",
          "position": "WR",
          "team": "PIT",
          "adp": 61.3,
          "adp_formatted": "8.05",
          "times_drafted": 642,
          "high": 45,
          "low": 79,
          "stdev": 6.2,
          "bye": 9
        }
      ],
      "te": [
        {
          "player_id": 3307,
          "name": "T.J. Hockenson",
          "position": "TE",
          "team": "DET",
          "adp": 54.1,
          "adp_formatted": "7.06",
          "times_drafted": 401,
          "high": 40,
          "low": 92,
          "stdev": 5.2,
          "bye": 6
        },
        {
          "player_id": 2151,
          "name": "Logan Thomas",
          "position": "TE",
          "team": "WAS",
          "adp": 69.6,
          "adp_formatted": "9.06",
          "times_drafted": 427,
          "high": 51,
          "low": 91,
          "stdev": 7,
          "bye": 14
        },
        {
          "player_id": 3251,
          "name": "Noah Fant",
          "position": "TE",
          "team": "DEN",
          "adp": 78.2,
          "adp_formatted": "10.06",
          "times_drafted": 256,
          "high": 58,
          "low": 133,
          "stdev": 7.7,
          "bye": 9
        }
      ]
    }
  },
  {
    "meta": {
      "round": 9,
      "pick": 8,
      "ODP": 72
    },
    "players": {
      "qb": [
        {
          "player_id": 119,
          "name": "Tom Brady",
          "position": "QB",
          "team": "TB",
          "adp": 76.4,
          "adp_formatted": "10.04",
          "times_drafted": 590,
          "high": 53,
          "low": 109,
          "stdev": 8.8,
          "bye": 11
        },
        {
          "player_id": 1664,
          "name": "Matthew Stafford",
          "position": "QB",
          "team": "LAR",
          "adp": 85.2,
          "adp_formatted": "11.05",
          "times_drafted": 777,
          "high": 64,
          "low": 116,
          "stdev": 7.9,
          "bye": 7
        },
        {
          "player_id": 1899,
          "name": "Ryan Tannehill",
          "position": "QB",
          "team": "TEN",
          "adp": 90.9,
          "adp_formatted": "12.03",
          "times_drafted": 762,
          "high": 69,
          "low": 110,
          "stdev": 8.1,
          "bye": 6
        }
      ],
      "rb": [
        {
          "player_id": 2282,
          "name": "Melvin Gordon",
          "position": "RB",
          "team": "DEN",
          "adp": 72.1,
          "adp_formatted": "9.08",
          "times_drafted": 541,
          "high": 55,
          "low": 85,
          "stdev": 6.5,
          "bye": 9
        },
        {
          "player_id": 2867,
          "name": "Ronald Jones II",
          "position": "RB",
          "team": "TB",
          "adp": 74.5,
          "adp_formatted": "10.03",
          "times_drafted": 631,
          "high": 58,
          "low": 91,
          "stdev": 6.3,
          "bye": 11
        },
        {
          "player_id": 5194,
          "name": "Michael Carter",
          "position": "RB",
          "team": "NYJ",
          "adp": 76.6,
          "adp_formatted": "10.05",
          "times_drafted": 472,
          "high": 60,
          "low": 90,
          "stdev": 6.3,
          "bye": 10
        }
      ],
      "wr": [
        {
          "player_id": 2113,
          "name": "Odell Beckham Jr",
          "position": "WR",
          "team": "LAR",
          "adp": 70.4,
          "adp_formatted": "9.06",
          "times_drafted": 846,
          "high": 55,
          "low": 88,
          "stdev": 5.7,
          "bye": 7
        },
        {
          "player_id": 2488,
          "name": "Kenny Golladay",
          "position": "WR",
          "team": "NYG",
          "adp": 74.9,
          "adp_formatted": "10.03",
          "times_drafted": 510,
          "high": 60,
          "low": 88,
          "stdev": 5.5,
          "bye": 9
        },
        {
          "player_id": 5177,
          "name": "Ja'Marr Chase",
          "position": "WR",
          "team": "CIN",
          "adp": 77.3,
          "adp_formatted": "10.05",
          "times_drafted": 508,
          "high": 60,
          "low": 94,
          "stdev": 6.3,
          "bye": 10
        }
      ],
      "te": [
        {
          "player_id": 2151,
          "name": "Logan Thomas",
          "position": "TE",
          "team": "WAS",
          "adp": 69.6,
          "adp_formatted": "9.06",
          "times_drafted": 427,
          "high": 51,
          "low": 91,
          "stdev": 7,
          "bye": 14
        },
        {
          "player_id": 3251,
          "name": "Noah Fant",
          "position": "TE",
          "team": "DEN",
          "adp": 78.2,
          "adp_formatted": "10.06",
          "times_drafted": 256,
          "high": 58,
          "low": 133,
          "stdev": 7.7,
          "bye": 9
        },
        {
          "player_id": 2896,
          "name": "Dallas Goedert",
          "position": "TE",
          "team": "PHI",
          "adp": 88.1,
          "adp_formatted": "11.08",
          "times_drafted": 290,
          "high": 65,
          "low": 135,
          "stdev": 8.8,
          "bye": 7
        }
      ]
    }
  },
  {
    "meta": {
      "round": 10,
      "pick": 1,
      "ODP": 73
    },
    "players": {
      "qb": [
        {
          "player_id": 119,
          "name": "Tom Brady",
          "position": "QB",
          "team": "TB",
          "adp": 76.4,
          "adp_formatted": "10.04",
          "times_drafted": 590,
          "high": 53,
          "low": 109,
          "stdev": 8.8,
          "bye": 11
        },
        {
          "player_id": 1664,
          "name": "Matthew Stafford",
          "position": "QB",
          "team": "LAR",
          "adp": 85.2,
          "adp_formatted": "11.05",
          "times_drafted": 777,
          "high": 64,
          "low": 116,
          "stdev": 7.9,
          "bye": 7
        },
        {
          "player_id": 1899,
          "name": "Ryan Tannehill",
          "position": "QB",
          "team": "TEN",
          "adp": 90.9,
          "adp_formatted": "12.03",
          "times_drafted": 762,
          "high": 69,
          "low": 110,
          "stdev": 8.1,
          "bye": 6
        }
      ],
      "rb": [
        {
          "player_id": 2282,
          "name": "Melvin Gordon",
          "position": "RB",
          "team": "DEN",
          "adp": 72.1,
          "adp_formatted": "9.08",
          "times_drafted": 541,
          "high": 55,
          "low": 85,
          "stdev": 6.5,
          "bye": 9
        },
        {
          "player_id": 2867,
          "name": "Ronald Jones II",
          "position": "RB",
          "team": "TB",
          "adp": 74.5,
          "adp_formatted": "10.03",
          "times_drafted": 631,
          "high": 58,
          "low": 91,
          "stdev": 6.3,
          "bye": 11
        },
        {
          "player_id": 5194,
          "name": "Michael Carter",
          "position": "RB",
          "team": "NYJ",
          "adp": 76.6,
          "adp_formatted": "10.05",
          "times_drafted": 472,
          "high": 60,
          "low": 90,
          "stdev": 6.3,
          "bye": 10
        }
      ],
      "wr": [
        {
          "player_id": 2488,
          "name": "Kenny Golladay",
          "position": "WR",
          "team": "NYG",
          "adp": 74.9,
          "adp_formatted": "10.03",
          "times_drafted": 510,
          "high": 60,
          "low": 88,
          "stdev": 5.5,
          "bye": 9
        },
        {
          "player_id": 5177,
          "name": "Ja'Marr Chase",
          "position": "WR",
          "team": "CIN",
          "adp": 77.3,
          "adp_formatted": "10.05",
          "times_drafted": 508,
          "high": 60,
          "low": 94,
          "stdev": 6.3,
          "bye": 10
        },
        {
          "player_id": 1886,
          "name": "Antonio Brown",
          "position": "WR",
          "team": "TB",
          "adp": 79.1,
          "adp_formatted": "10.07",
          "times_drafted": 956,
          "high": 61,
          "low": 95,
          "stdev": 6.7,
          "bye": 11
        }
      ],
      "te": [
        {
          "player_id": 2151,
          "name": "Logan Thomas",
          "position": "TE",
          "team": "WAS",
          "adp": 69.6,
          "adp_formatted": "9.06",
          "times_drafted": 427,
          "high": 51,
          "low": 91,
          "stdev": 7,
          "bye": 14
        },
        {
          "player_id": 3251,
          "name": "Noah Fant",
          "position": "TE",
          "team": "DEN",
          "adp": 78.2,
          "adp_formatted": "10.06",
          "times_drafted": 256,
          "high": 58,
          "low": 133,
          "stdev": 7.7,
          "bye": 9
        },
        {
          "player_id": 2896,
          "name": "Dallas Goedert",
          "position": "TE",
          "team": "PHI",
          "adp": 88.1,
          "adp_formatted": "11.08",
          "times_drafted": 290,
          "high": 65,
          "low": 135,
          "stdev": 8.8,
          "bye": 7
        }
      ]
    }
  },
  {
    "meta": {
      "round": 11,
      "pick": 8,
      "ODP": 88
    },
    "players": {
      "qb": [
        {
          "player_id": 1664,
          "name": "Matthew Stafford",
          "position": "QB",
          "team": "LAR",
          "adp": 85.2,
          "adp_formatted": "11.05",
          "times_drafted": 777,
          "high": 64,
          "low": 116,
          "stdev": 7.9,
          "bye": 7
        },
        {
          "player_id": 1899,
          "name": "Ryan Tannehill",
          "position": "QB",
          "team": "TEN",
          "adp": 90.9,
          "adp_formatted": "12.03",
          "times_drafted": 762,
          "high": 69,
          "low": 110,
          "stdev": 8.1,
          "bye": 6
        },
        {
          "player_id": 5025,
          "name": "Jalen Hurts",
          "position": "QB",
          "team": "PHI",
          "adp": 95.1,
          "adp_formatted": "12.07",
          "times_drafted": 499,
          "high": 71,
          "low": 117,
          "stdev": 9.3,
          "bye": 7
        }
      ],
      "rb": [
        {
          "player_id": 2470,
          "name": "James Conner",
          "position": "RB",
          "team": "ARI",
          "adp": 87.5,
          "adp_formatted": "11.07",
          "times_drafted": 468,
          "high": 71,
          "low": 102,
          "stdev": 6.2,
          "bye": 13
        },
        {
          "player_id": 3267,
          "name": "Devin Singletary",
          "position": "RB",
          "team": "BUF",
          "adp": 88.8,
          "adp_formatted": "12.01",
          "times_drafted": 287,
          "high": 70,
          "low": 107,
          "stdev": 7.2,
          "bye": 7
        },
        {
          "player_id": 2445,
          "name": "Jamaal Williams",
          "position": "RB",
          "team": "DET",
          "adp": 96.1,
          "adp_formatted": "12.08",
          "times_drafted": 685,
          "high": 76,
          "low": 114,
          "stdev": 7.6,
          "bye": 6
        }
      ],
      "wr": [
        {
          "player_id": 2442,
          "name": "JuJu Smith-Schuster",
          "position": "WR",
          "team": "PIT",
          "adp": 88,
          "adp_formatted": "11.08",
          "times_drafted": 547,
          "high": 68,
          "low": 104,
          "stdev": 7.4,
          "bye": 9
        },
        {
          "player_id": 3246,
          "name": "Deebo Samuel",
          "position": "WR",
          "team": "SF",
          "adp": 88.2,
          "adp_formatted": "11.08",
          "times_drafted": 477,
          "high": 73,
          "low": 104,
          "stdev": 5.7,
          "bye": 9
        },
        {
          "player_id": 4871,
          "name": "Laviska Shenault Jr.",
          "position": "WR",
          "team": "JAX",
          "adp": 92.1,
          "adp_formatted": "12.04",
          "times_drafted": 786,
          "high": 74,
          "low": 108,
          "stdev": 6.7,
          "bye": 11
        }
      ],
      "te": [
        {
          "player_id": 2896,
          "name": "Dallas Goedert",
          "position": "TE",
          "team": "PHI",
          "adp": 88.1,
          "adp_formatted": "11.08",
          "times_drafted": 290,
          "high": 65,
          "low": 135,
          "stdev": 8.8,
          "bye": 7
        },
        {
          "player_id": 2796,
          "name": "Robert Tonyan Jr.",
          "position": "TE",
          "team": "GB",
          "adp": 92,
          "adp_formatted": "12.04",
          "times_drafted": 495,
          "high": 62,
          "low": 148,
          "stdev": 11.2,
          "bye": 14
        },
        {
          "player_id": 2906,
          "name": "Mike Gesicki",
          "position": "TE",
          "team": "MIA",
          "adp": 102.4,
          "adp_formatted": "13.06",
          "times_drafted": 405,
          "high": 73,
          "low": 156,
          "stdev": 11.1,
          "bye": 11
        }
      ]
    }
  },
  {
    "meta": {
      "round": 12,
      "pick": 1,
      "ODP": 89
    },
    "players": {
      "qb": [
        {
          "player_id": 1899,
          "name": "Ryan Tannehill",
          "position": "QB",
          "team": "TEN",
          "adp": 90.9,
          "adp_formatted": "12.03",
          "times_drafted": 762,
          "high": 69,
          "low": 110,
          "stdev": 8.1,
          "bye": 6
        },
        {
          "player_id": 5025,
          "name": "Jalen Hurts",
          "position": "QB",
          "team": "PHI",
          "adp": 95.1,
          "adp_formatted": "12.07",
          "times_drafted": 499,
          "high": 71,
          "low": 117,
          "stdev": 9.3,
          "bye": 7
        },
        {
          "player_id": 4882,
          "name": "Joe Burrow",
          "position": "QB",
          "team": "CIN",
          "adp": 110.2,
          "adp_formatted": "14.06",
          "times_drafted": 323,
          "high": 81,
          "low": 135,
          "stdev": 11.1,
          "bye": 10
        }
      ],
      "rb": [
        {
          "player_id": 3267,
          "name": "Devin Singletary",
          "position": "RB",
          "team": "BUF",
          "adp": 88.8,
          "adp_formatted": "12.01",
          "times_drafted": 287,
          "high": 70,
          "low": 107,
          "stdev": 7.2,
          "bye": 7
        },
        {
          "player_id": 2445,
          "name": "Jamaal Williams",
          "position": "RB",
          "team": "DET",
          "adp": 96.1,
          "adp_formatted": "12.08",
          "times_drafted": 685,
          "high": 76,
          "low": 114,
          "stdev": 7.6,
          "bye": 6
        },
        {
          "player_id": 2297,
          "name": "David Johnson",
          "position": "RB",
          "team": "HOU",
          "adp": 98.2,
          "adp_formatted": "13.02",
          "times_drafted": 309,
          "high": 80,
          "low": 116,
          "stdev": 6.9,
          "bye": 6
        }
      ],
      "wr": [
        {
          "player_id": 3246,
          "name": "Deebo Samuel",
          "position": "WR",
          "team": "SF",
          "adp": 88.2,
          "adp_formatted": "11.08",
          "times_drafted": 477,
          "high": 73,
          "low": 104,
          "stdev": 5.7,
          "bye": 9
        },
        {
          "player_id": 4871,
          "name": "Laviska Shenault Jr.",
          "position": "WR",
          "team": "JAX",
          "adp": 92.1,
          "adp_formatted": "12.04",
          "times_drafted": 786,
          "high": 74,
          "low": 108,
          "stdev": 6.7,
          "bye": 11
        },
        {
          "player_id": 2359,
          "name": "Tyler Boyd",
          "position": "WR",
          "team": "CIN",
          "adp": 94.3,
          "adp_formatted": "12.06",
          "times_drafted": 646,
          "high": 77,
          "low": 109,
          "stdev": 6.5,
          "bye": 10
        }
      ],
      "te": [
        {
          "player_id": 2896,
          "name": "Dallas Goedert",
          "position": "TE",
          "team": "PHI",
          "adp": 88.1,
          "adp_formatted": "11.08",
          "times_drafted": 290,
          "high": 65,
          "low": 135,
          "stdev": 8.8,
          "bye": 7
        },
        {
          "player_id": 2796,
          "name": "Robert Tonyan Jr.",
          "position": "TE",
          "team": "GB",
          "adp": 92,
          "adp_formatted": "12.04",
          "times_drafted": 495,
          "high": 62,
          "low": 148,
          "stdev": 11.2,
          "bye": 14
        },
        {
          "player_id": 2906,
          "name": "Mike Gesicki",
          "position": "TE",
          "team": "MIA",
          "adp": 102.4,
          "adp_formatted": "13.06",
          "times_drafted": 405,
          "high": 73,
          "low": 156,
          "stdev": 11.1,
          "bye": 11
        }
      ]
    }
  },
  {
    "meta": {
      "round": 13,
      "pick": 8,
      "ODP": 104
    },
    "players": {
      "qb": [
        {
          "player_id": 4882,
          "name": "Joe Burrow",
          "position": "QB",
          "team": "CIN",
          "adp": 110.2,
          "adp_formatted": "14.06",
          "times_drafted": 323,
          "high": 81,
          "low": 135,
          "stdev": 11.1,
          "bye": 10
        },
        {
          "player_id": 5197,
          "name": "Trey Lance",
          "position": "QB",
          "team": "SF",
          "adp": 115.8,
          "adp_formatted": "15.04",
          "times_drafted": 710,
          "high": 85,
          "low": 147,
          "stdev": 11.6,
          "bye": 9
        },
        {
          "player_id": 1342,
          "name": "Matt Ryan",
          "position": "QB",
          "team": "ATL",
          "adp": 123.8,
          "adp_formatted": "16.04",
          "times_drafted": 259,
          "high": 87,
          "low": 150,
          "stdev": 14.1,
          "bye": 14
        }
      ],
      "rb": [
        {
          "player_id": 3032,
          "name": "Phillip Lindsay",
          "position": "RB",
          "team": "MIA",
          "adp": 104.5,
          "adp_formatted": "13.08",
          "times_drafted": 386,
          "high": 79,
          "low": 122,
          "stdev": 9.5,
          "bye": 11
        },
        {
          "player_id": 3458,
          "name": "Alexander Mattison",
          "position": "RB",
          "team": "MIN",
          "adp": 106.6,
          "adp_formatted": "14.03",
          "times_drafted": 199,
          "high": 85,
          "low": 122,
          "stdev": 8,
          "bye": 7
        },
        {
          "player_id": 2865,
          "name": "Sony Michel",
          "position": "RB",
          "team": "LAR",
          "adp": 114.1,
          "adp_formatted": "15.02",
          "times_drafted": 1081,
          "high": 79,
          "low": 150,
          "stdev": 13.2,
          "bye": 7
        }
      ],
      "wr": [
        {
          "player_id": 2114,
          "name": "Brandin Cooks",
          "position": "WR",
          "team": "HOU",
          "adp": 103.3,
          "adp_formatted": "13.07",
          "times_drafted": 427,
          "high": 84,
          "low": 125,
          "stdev": 7.4,
          "bye": 6
        },
        {
          "player_id": 5178,
          "name": "Jaylen Waddle",
          "position": "WR",
          "team": "MIA",
          "adp": 105.2,
          "adp_formatted": "14.01",
          "times_drafted": 635,
          "high": 85,
          "low": 123,
          "stdev": 7.7,
          "bye": 11
        },
        {
          "player_id": 3426,
          "name": "Mecole Hardman",
          "position": "WR",
          "team": "KC",
          "adp": 109.5,
          "adp_formatted": "14.05",
          "times_drafted": 359,
          "high": 87,
          "low": 129,
          "stdev": 8.4,
          "bye": 8
        }
      ],
      "te": [
        {
          "player_id": 2370,
          "name": "Tyler Higbee",
          "position": "TE",
          "team": "LAR",
          "adp": 105.5,
          "adp_formatted": "14.02",
          "times_drafted": 803,
          "high": 73,
          "low": 150,
          "stdev": 12.2,
          "bye": 7
        },
        {
          "player_id": 1740,
          "name": "Rob Gronkowski",
          "position": "TE",
          "team": "TB",
          "adp": 119.5,
          "adp_formatted": "15.07",
          "times_drafted": 507,
          "high": 64,
          "low": 171,
          "stdev": 21,
          "bye": 11
        },
        {
          "player_id": 2490,
          "name": "Jonnu Smith",
          "position": "TE",
          "team": "NE",
          "adp": 128.6,
          "adp_formatted": "17.01",
          "times_drafted": 815,
          "high": 81,
          "low": 179,
          "stdev": 17.9,
          "bye": 10
        }
      ]
    }
  },
  {
    "meta": {
      "round": 14,
      "pick": 1,
      "ODP": 105
    },
    "players": {
      "qb": [
        {
          "player_id": 4882,
          "name": "Joe Burrow",
          "position": "QB",
          "team": "CIN",
          "adp": 110.2,
          "adp_formatted": "14.06",
          "times_drafted": 323,
          "high": 81,
          "low": 135,
          "stdev": 11.1,
          "bye": 10
        },
        {
          "player_id": 5197,
          "name": "Trey Lance",
          "position": "QB",
          "team": "SF",
          "adp": 115.8,
          "adp_formatted": "15.04",
          "times_drafted": 710,
          "high": 85,
          "low": 147,
          "stdev": 11.6,
          "bye": 9
        },
        {
          "player_id": 1342,
          "name": "Matt Ryan",
          "position": "QB",
          "team": "ATL",
          "adp": 123.8,
          "adp_formatted": "16.04",
          "times_drafted": 259,
          "high": 87,
          "low": 150,
          "stdev": 14.1,
          "bye": 14
        }
      ],
      "rb": [
        {
          "player_id": 3032,
          "name": "Phillip Lindsay",
          "position": "RB",
          "team": "MIA",
          "adp": 104.5,
          "adp_formatted": "13.08",
          "times_drafted": 386,
          "high": 79,
          "low": 122,
          "stdev": 9.5,
          "bye": 11
        },
        {
          "player_id": 3458,
          "name": "Alexander Mattison",
          "position": "RB",
          "team": "MIN",
          "adp": 106.6,
          "adp_formatted": "14.03",
          "times_drafted": 199,
          "high": 85,
          "low": 122,
          "stdev": 8,
          "bye": 7
        },
        {
          "player_id": 2865,
          "name": "Sony Michel",
          "position": "RB",
          "team": "LAR",
          "adp": 114.1,
          "adp_formatted": "15.02",
          "times_drafted": 1081,
          "high": 79,
          "low": 150,
          "stdev": 13.2,
          "bye": 7
        }
      ],
      "wr": [
        {
          "player_id": 5178,
          "name": "Jaylen Waddle",
          "position": "WR",
          "team": "MIA",
          "adp": 105.2,
          "adp_formatted": "14.01",
          "times_drafted": 635,
          "high": 85,
          "low": 123,
          "stdev": 7.7,
          "bye": 11
        },
        {
          "player_id": 3426,
          "name": "Mecole Hardman",
          "position": "WR",
          "team": "KC",
          "adp": 109.5,
          "adp_formatted": "14.05",
          "times_drafted": 359,
          "high": 87,
          "low": 129,
          "stdev": 8.4,
          "bye": 8
        },
        {
          "player_id": 2345,
          "name": "Will Fuller",
          "position": "WR",
          "team": "MIA",
          "adp": 111.5,
          "adp_formatted": "14.08",
          "times_drafted": 299,
          "high": 88,
          "low": 126,
          "stdev": 8.7,
          "bye": 11
        }
      ],
      "te": [
        {
          "player_id": 2370,
          "name": "Tyler Higbee",
          "position": "TE",
          "team": "LAR",
          "adp": 105.5,
          "adp_formatted": "14.02",
          "times_drafted": 803,
          "high": 73,
          "low": 150,
          "stdev": 12.2,
          "bye": 7
        },
        {
          "player_id": 1740,
          "name": "Rob Gronkowski",
          "position": "TE",
          "team": "TB",
          "adp": 119.5,
          "adp_formatted": "15.07",
          "times_drafted": 507,
          "high": 64,
          "low": 171,
          "stdev": 21,
          "bye": 11
        },
        {
          "player_id": 2490,
          "name": "Jonnu Smith",
          "position": "TE",
          "team": "NE",
          "adp": 128.6,
          "adp_formatted": "17.01",
          "times_drafted": 815,
          "high": 81,
          "low": 179,
          "stdev": 17.9,
          "bye": 10
        }
      ]
    }
  },
  {
    "meta": {
      "round": 15,
      "pick": 8,
      "ODP": 120
    },
    "players": {
      "qb": [
        {
          "player_id": 1342,
          "name": "Matt Ryan",
          "position": "QB",
          "team": "ATL",
          "adp": 123.8,
          "adp_formatted": "16.04",
          "times_drafted": 259,
          "high": 87,
          "low": 150,
          "stdev": 14.1,
          "bye": 14
        },
        {
          "player_id": 5186,
          "name": "Trevor Lawrence",
          "position": "QB",
          "team": "JAX",
          "adp": 126.7,
          "adp_formatted": "16.07",
          "times_drafted": 344,
          "high": 89,
          "low": 157,
          "stdev": 14.3,
          "bye": 11
        },
        {
          "player_id": 5191,
          "name": "Justin Fields",
          "position": "QB",
          "team": "CHI",
          "adp": 132,
          "adp_formatted": "17.04",
          "times_drafted": 452,
          "high": 100,
          "low": 156,
          "stdev": 12.3,
          "bye": 14
        }
      ],
      "rb": [
        {
          "player_id": 2948,
          "name": "Nyheim Hines",
          "position": "RB",
          "team": "IND",
          "adp": 120.2,
          "adp_formatted": "15.08",
          "times_drafted": 347,
          "high": 85,
          "low": 150,
          "stdev": 13.3,
          "bye": 14
        },
        {
          "player_id": 2534,
          "name": "J.D. McKissic",
          "position": "RB",
          "team": "WAS",
          "adp": 123.9,
          "adp_formatted": "16.04",
          "times_drafted": 301,
          "high": 95,
          "low": 150,
          "stdev": 10.9,
          "bye": 14
        },
        {
          "player_id": 1979,
          "name": "Giovani Bernard",
          "position": "RB",
          "team": "TB",
          "adp": 124.7,
          "adp_formatted": "16.05",
          "times_drafted": 255,
          "high": 91,
          "low": 150,
          "stdev": 12.6,
          "bye": 11
        }
      ],
      "wr": [
        {
          "player_id": 2436,
          "name": "Mike Williams",
          "position": "WR",
          "team": "LAC",
          "adp": 119.7,
          "adp_formatted": "15.08",
          "times_drafted": 314,
          "high": 95,
          "low": 146,
          "stdev": 9.2,
          "bye": 8
        },
        {
          "player_id": 2132,
          "name": "Jarvis Landry",
          "position": "WR",
          "team": "CLE",
          "adp": 120.6,
          "adp_formatted": "16.01",
          "times_drafted": 350,
          "high": 97,
          "low": 148,
          "stdev": 9,
          "bye": 9
        },
        {
          "player_id": 4874,
          "name": "Henry Ruggs III",
          "position": "WR",
          "team": "LV",
          "adp": 122.5,
          "adp_formatted": "16.02",
          "times_drafted": 253,
          "high": 93,
          "low": 146,
          "stdev": 11.1,
          "bye": 6
        }
      ],
      "te": [
        {
          "player_id": 1740,
          "name": "Rob Gronkowski",
          "position": "TE",
          "team": "TB",
          "adp": 119.5,
          "adp_formatted": "15.07",
          "times_drafted": 507,
          "high": 64,
          "low": 171,
          "stdev": 21,
          "bye": 11
        },
        {
          "player_id": 2490,
          "name": "Jonnu Smith",
          "position": "TE",
          "team": "NE",
          "adp": 128.6,
          "adp_formatted": "17.01",
          "times_drafted": 815,
          "high": 81,
          "low": 179,
          "stdev": 17.9,
          "bye": 10
        },
        {
          "player_id": 3460,
          "name": "Irv Smith Jr.",
          "position": "TE",
          "team": "MIN",
          "adp": 135.8,
          "adp_formatted": "17.08",
          "times_drafted": 310,
          "high": 87,
          "low": 174,
          "stdev": 18.7,
          "bye": 7
        }
      ]
    }
  }
]

export { sampleAlgOutput }
export default algorithm