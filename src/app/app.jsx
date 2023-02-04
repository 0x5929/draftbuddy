import { useState } from 'react'
import {  QueryClient, QueryClientProvider } from 'react-query'

import '@App/app.css'
import { DraftInput, DraftOutput, Header } from '@Containers'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})

function App() {
  
  const [ servRes, setServRes ] = useState(null)

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {
        !servRes ? 
        <DraftInput setServRes={setServRes} />
        :
        <DraftOutput data={servRes} setServRes={setServRes} />
      }
    </QueryClientProvider>
  )
}

export default App;
