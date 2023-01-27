import { useQueryClient } from 'react-query'

function useAPIQuery() {
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

  const queryFunc = async (postData) => {
    const format = mapData(postData?.leagueFormat)
    const headCount = postData?.headCount
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

    return data  
  }

  
  return queryFunc

}


export default useAPIQuery

