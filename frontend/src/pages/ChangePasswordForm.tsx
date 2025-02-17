import { Box, Container, Typography } from '@mui/material'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ErrorMessage } from '../components/form/ErrorMessage'
import { Input } from '../components/form/Input'
import { SubmitButton } from '../components/form/SubmitButton'
import { TextAlignContainer } from '../components/utilities/TextAlignContainer'
import { API_ENDPOINTS } from '../config/api'
import { useSnackbar } from '../context/SnackbarContext'
import { useRequireSignedIn } from '../hooks/useRequireSignedIn'
import { getAuthHeaders } from '../utils/getRequestHeaders'
import { ChangePasswordValidation } from '../validations/changePasswordValidation'

type ChangePasswordFormData = {
  currentPassword: string
  password: string
  confirmPassword: string
}

const ChangePasswordForm = () => {
  useRequireSignedIn()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { openSnackbar } = useSnackbar()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const validationRules = ChangePasswordValidation(watch)

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    setIsLoading(true)

    const requestData = {
      user: {
        current_password: data.currentPassword,
        password: data.password,
        password_confirmation: data.confirmPassword,
      },
    }

    await axios({
      method: 'PATCH',
      url: API_ENDPOINTS.change_password,
      data: requestData,
      headers: getAuthHeaders(),
    })
      .then((res: AxiosResponse) => {
        openSnackbar(res.data.message, 'success')
        navigate('/drafts')
      })
      .catch((e: AxiosError<{ error: string | string[] }>) => {
        console.log(e.message)
        const errorMessage = e.response?.data?.error

        if (typeof errorMessage === 'string') {
          openSnackbar(errorMessage, 'error')
        } else if (Array.isArray(errorMessage)) {
          openSnackbar(errorMessage.join('、'), 'error')
        } else {
          openSnackbar('パスワードの変更に失敗しました', 'error')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Container maxWidth="sm">
      <Box marginTop={6}>
        <TextAlignContainer align="center">
          <Typography variant="h4">パスワード変更</Typography>
        </TextAlignContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="currentPassword"
            label="現在のパスワード"
            control={control}
            type="password"
            rules={validationRules.currentPassword}
            error={!!errors.currentPassword}
          />
          {errors.currentPassword && (
            <ErrorMessage error={errors.currentPassword?.message} />
          )}
          <Input
            name="password"
            label="新しいパスワード"
            control={control}
            type="password"
            rules={validationRules.password}
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage error={errors.password?.message} />}
          <Input
            name="confirmPassword"
            label="新しいパスワード確認"
            control={control}
            type="password"
            rules={validationRules.confirmPassword}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <ErrorMessage error={errors.confirmPassword?.message} />
          )}
          <Box mt={3}>
            <SubmitButton
              text="保存"
              isLoading={isLoading}
              disabled={!isValid}
            />
          </Box>
        </form>
      </Box>
    </Container>
  )
}
export default ChangePasswordForm
