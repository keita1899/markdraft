import { FormHelperText } from '@mui/material'

type ErrorMessageProps = {
  error: string | undefined
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <FormHelperText error>{error}</FormHelperText>
)
