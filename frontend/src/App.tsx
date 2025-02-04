import useSWR from 'swr'
import Router from './routes/Router'
import { fetcher } from './utils'

const App = () => {
  const url = `${process.env.REACT_APP_API_URL}/hello`
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      Backend Status: {data.status}
      <Router />
    </>
  )
}

export default App
