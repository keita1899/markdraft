import { LoadingButton } from '@mui/lab'

type SubmitButtonProps = {
  text: string
  isLoading: boolean
  disabled: boolean
}

export const SubmitButton = ({
  text,
  isLoading,
  disabled,
}: SubmitButtonProps) => (
  <LoadingButton
    type="submit"
    loading={isLoading}
    variant="contained"
    color="primary"
    fullWidth
    disabled={disabled}
    sx={{
      paddingY: 1,
    }}
  >
    {text}
  </LoadingButton>
)
