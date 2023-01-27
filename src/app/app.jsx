import { useState } from 'react'
import {  QueryClient, QueryClientProvider } from 'react-query'

import '@App/app.css';
import { DraftInput, DraftOutput, Header} from '@Containers'

const queryClient = new QueryClient()

function App() {
  
  const [ servRes, setServRes ] = useState(null)

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {
        !servRes ? 
        <DraftInput setServRes={setServRes} />
        :
        <DraftOutput />
      }
    </QueryClientProvider>
  )
}

export default App;
