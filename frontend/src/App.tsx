import { Box } from '@mui/material'
import { Footer } from './components/layouts/Footer'
import { Header } from './components/layouts/Header'
import { FlexContainer } from './components/utilities/FlexContainer'
import Router from './routes/Router'

const App = () => {
  return (
    <FlexContainer flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex={1} px={1}>
        <Router />
      </Box>
      <Footer />
    </FlexContainer>
  )
}

export default App
