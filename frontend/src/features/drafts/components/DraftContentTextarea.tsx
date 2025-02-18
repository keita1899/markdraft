import { TextField } from '@mui/material'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

type DraftContentTextareaProps<T extends FieldValues> = {
  control: Control<T>
  label: string
  name: Path<T>
  error: FieldError | undefined
  rules: RegisterOptions<T, Path<T>>
}

export const DraftContentTextarea = <T extends FieldValues>({
  control,
  label,
  name,
  error,
  rules,
}: DraftContentTextareaProps<T>) => {
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
          multiline
          minRows={50}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  )
}
