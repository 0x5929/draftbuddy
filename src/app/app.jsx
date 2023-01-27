import { useEffect, useState } from 'react'
import {  QueryClient, QueryClientProvider } from 'react-query'

import '@App/app.css';
import { DraftInput, Header} from '@Containers'

const queryClient = new QueryClient()

function App() {
  
  const [ servRes, setServRes ] = useState(null)

  // useEffect(() => {
  //   // every rerender
  //   setPostData(null)
  //   setServRes(null)

  // })

  return (
    <QueryClientProvider client={queryClient}>

      <Header />


      {
        !servRes ? 
        <DraftInput setServRes={setServRes} />

        :
        
        <div>hello world DraftOutput</div>


      }

      
    </QueryClientProvider>
  );
}

export default App;
