import { CircularProgress } from '@mui/material'
import { FlexContainer } from './FlexContainer'

type LoadingProps = {
  message?: string
}

export const Loading = ({ message }: LoadingProps) => (
  <FlexContainer
    alignItems="center"
    justifyContent="center"
    sx={{ height: '100vh' }}
  >
    <CircularProgress />
    {message}
  </FlexContainer>
)
