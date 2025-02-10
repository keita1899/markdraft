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

    await axios({
      method: 'POST',
      url: url,
      data: { ...data },
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'] || '')
        localStorage.setItem('client', res.headers['client'] || '')
        localStorage.setItem('uid', res.headers['uid'] || '')
        openSnackbar('新規登録に成功しました', 'success')
        navigate('/drafts')
      })
      .catch((e: AxiosError<{ errors: string }>) => {
        console.log(e.message)
        openSnackbar('新規登録に失敗しました', 'error')
        setIsLoading(false)
      })
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
              to="/signin"
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
