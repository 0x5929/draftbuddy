import { useQueryClient } from 'react-query'
import { algorithm } from '@Utils'

function useFetch() {
  const queryClient = useQueryClient()

  function mapData(format) {
    switch (format) {
      case '1/2 PPR':
        return 'half-ppr'
      case 'Points Per Reception (PPR)':
        return 'ppr'
      case 'Standard non PPR':
        return 'standard'
      default: 
        return false
    }
  }
  function getYear() {
    return (new Date().getFullYear() - 2).toString()
  }
  

  const fetchData = async (getParams) => {
    const format = mapData(getParams?.leagueFormat)
    const headCount = getParams?.headCount
    const year = getYear()
    
    // cancel query if no param. ie initializing
    if (!format || !headCount) {
      queryClient.cancelQueries('fetchFtbllAPI')
      throw new Error('We\'ve cancelled your query for the moment, please try again.')
    }

    const url = process.env.NODE_ENV === 'production' ? 
      `https://fantasyfootballcalculator.com/api/v1/adp/${format}?teams=${headCount}&year=${year}` 
        :
      `/api/v1/adp/${format}?teams=${headCount}&year=${year}`

    const resp = await fetch(url)
    const data = await resp.json()

    const sortedData = await algorithm({
      headCount, 
      draftPick: getParams?.pickNumber, 
      data
    })

    // algo part with data, 
    // then lastly, return it to DraftOuput
    // that way, isLoading would be true, and spinning would work
    return sortedData  
  }

  
  return fetchData

}


export default useFetch

