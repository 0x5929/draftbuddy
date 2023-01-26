import { useQuery } from 'react-query'

function useAPIQuery() {
  const { isLoading, error, data} = useQuery('fetchFtbllAPI', () => new Promise((resolve, reject) => {
    resolve('hello world')
  }))

  if (isLoading) return {status: 'loading'}
  if (error) return {'error': error}

  return {'data': data}
}

export default useAPIQuery


/**
 * fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
       res.json()
     )
 *  
 * 
 * 
 */