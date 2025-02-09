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
import { signinValidation } from '../validations/signinValidation'

type SigninFormData = {
  email: string
  password: string
}

const Signin = () => {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  })

  const validationRules = signinValidation

  const onSubmit: SubmitHandler<SigninFormData> = async (data) => {
    setIsLoading(true)
    const url = API_ENDPOINTS.signin
    const headers = {
      'Content-Type': 'application/json',
    }

    axios({ method: 'POST', url: url, data: data, headers: headers })
      .then((res: AxiosResponse<{ message: string; token: string }>) => {
        const tokenData = {
          token: res.data.token,
          expiry: Date.now() + 24 * 60 * 60 * 1000,
        }
        localStorage.setItem('accessToken', JSON.stringify(tokenData))

        openSnackbar(res.data.message, 'success')

        navigate('/drafts')
      })
      .catch((error: AxiosError<{ message: string; errors: string[] }>) => {
        const errorMessage =
          error.response?.data.message ?? '予期しないエラーが発生しました'

        openSnackbar(errorMessage, 'error')

        if (error.response?.data.errors) {
          openSnackbar(error.response.data.errors.join(', '), 'error')
        }

        console.error('Signin failed:', error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Container maxWidth="sm">
      <Box marginTop={6}>
        <TextAlignContainer align="center">
          <Typography variant="h4">ログイン</Typography>
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
          <Box mt={3}>
            <SubmitButton
              text="ログイン"
              isLoading={isLoading}
              disabled={!isValid}
            />
          </Box>
        </form>
        <TextAlignContainer align="center" mt={4}>
          <Typography variant="body2">
            アカウントをお持ちでない場合は
            <MuiLink
              component={Link}
              to="/signup"
              color="primary"
              marginLeft={2}
            >
              新規登録
            </MuiLink>
          </Typography>
        </TextAlignContainer>
      </Box>
    </Container>
  )
}

export default Signin
