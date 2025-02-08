import { TextField } from '@mui/material'
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  type?: string
  rules?: RegisterOptions<T, Path<T>>
  error?: boolean
  helperText?: string
}

export const Input = <T extends FieldValues>({
  name,
  label,
  control,
  type = 'text',
  rules,
  error,
}: InputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        type={type}
        fullWidth
        variant="outlined"
        error={error}
        margin="normal"
      />
    )}
  />
)
