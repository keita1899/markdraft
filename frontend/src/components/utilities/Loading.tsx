import { CircularProgress } from '@mui/material'
import { FlexContainer } from './FlexContainer'

export const Loading = () => (
  <FlexContainer
    alignItems="center"
    justifyContent="center"
    sx={{ height: '100vh' }}
  >
    <CircularProgress />
  </FlexContainer>
)
