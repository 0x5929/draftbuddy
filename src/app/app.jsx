import {  QueryClient, QueryClientProvider } from 'react-query'
import '@App/app.css';
import { DraftInput, Header} from '@Containers'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <div className="bg-green-300 border-green-600 border-b p-4 m-4 rounded">
        Hello World draftbuddy
      </div> */}
      <Header />
      <DraftInput />
    </QueryClientProvider>
  );
}

export default App;
