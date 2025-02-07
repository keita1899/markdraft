import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorMessage } from '../components/form/ErrorMessage'
import { Input } from '../components/form/Input'
import { SubmitButton } from '../components/form/SubmitButton'
import { TextAlignContainer } from '../components/utilities/TextAlignContainer'
import { API_ENDPOINTS } from '../config/api'
import { useSnackbar } from '../context/SnackbarContext'
import { signupValidation } from '../validations/signupValidation'

type SignupFormData = {
  email: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupFormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
    mode: 'onChange',
  })

  const validationRules = signupValidation(watch)

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true)
    const url = API_ENDPOINTS.signup
    const headers = {
      'Content-Type': 'application/json',
    }
    const requestData = {
      user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      },
    }

    try {
      const res: AxiosResponse<{ message: string; token: string }> =
        await axios({
          method: 'POST',
          url: url,
          data: requestData,
          headers: headers,
        })

      localStorage.setItem('accessToken', res.data.token)
      openSnackbar(res.data.message, 'success')
      navigate('/drafts')
    } catch (e) {
      const error = e as AxiosError<{ message: string; errors: string[] }>
      const errorMessage =
        error.response?.data.message ?? '予期しないエラーが発生しました'
      openSnackbar(errorMessage, 'error')
      if (error.response?.data.errors) {
        openSnackbar(error.response.data.errors.join(', '), 'error')
      }
      console.error('Registration failed:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box marginTop={6}>
        <TextAlignContainer align="center">
          <Typography variant="h4">新規登録</Typography>
        </TextAlignContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            label="メールアドレス"
            control={control}
            error={!!errors.email}
            rules={validationRules.email}
          />
          {errors.email && <ErrorMessage error={errors.email?.message} />}
          <Input
            name="password"
            label="パスワード"
            control={control}
            type="password"
            rules={validationRules.password}
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage error={errors.password?.message} />}
          <Input
            name="confirmPassword"
            label="パスワード確認"
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
              text="登録"
              isLoading={isLoading}
              disabled={!isValid}
            />
          </Box>
        </form>
        <TextAlignContainer align="center" mt={4}>
          <Typography variant="body2">
            すでにアカウントをお持ちですか?
            <MuiLink
              component={Link}
              to="/login"
              color="primary"
              marginLeft={2}
            >
              ログイン
            </MuiLink>
          </Typography>
        </TextAlignContainer>
      </Box>
    </Container>
  )
}

export default Signup
