import { Box } from '@mui/material'
import useSWR from 'swr'
import { Footer } from './components/layouts/Footer'
import { Header } from './components/layouts/Header'
import { FlexContainer } from './components/utilities/FlexContainer'
import Router from './routes/Router'
import { fetcher } from './utils'

const App = () => {
  const url = `${process.env.REACT_APP_API_URL}/hello`
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <FlexContainer flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex={1} px={1}>
        Backend Status: {data.status}
        <Router />
      </Box>
      <Footer />
    </FlexContainer>
  )
}

export default App
