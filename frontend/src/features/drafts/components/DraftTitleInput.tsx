import { TextField } from '@mui/material'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

type DraftTitleInputProps<T extends FieldValues> = {
  control: Control<T>
  label: string
  name: Path<T>
  error: FieldError | undefined
  rules: RegisterOptions<T, Path<T>>
}

export const DraftTitleInput = <T extends FieldValues>({
  control,
  label,
  name,
  error,
  rules,
}: DraftTitleInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error?.message}
          sx={{ width: '100%' }}
        />
      )}
    />
  )
}
