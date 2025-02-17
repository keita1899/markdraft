import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ErrorMessage } from '../components/form/ErrorMessage'
import { FormHeading } from '../components/form/FormHeading'
import { Input } from '../components/form/Input'
import { SubmitButton } from '../components/form/SubmitButton'
import { Loading } from '../components/utilities/Loading'
import { API_ENDPOINTS } from '../config/api'
import { useSnackbar } from '../context/SnackbarContext'
import { useCurrentUserState } from '../hooks/useCurrentUser'
import { useRequireSignedIn } from '../hooks/useRequireSignedIn'
import { clearAuthStorage } from '../utils/authStorage'
import { getAuthHeaders } from '../utils/getRequestHeaders'
import { deleteAccountValidation } from '../validations/deleteAccountValidation'

type DeleteAccountFormData = {
  password: string
}

const DeleteAccountForm = () => {
  useRequireSignedIn()
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()
  const [, setCurrentUser] = useCurrentUserState()
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<DeleteAccountFormData | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DeleteAccountFormData>({
    defaultValues: { password: '' },
    mode: 'onChange',
  })

  const handleDeleteConfirm = async () => {
    if (!formData) return
    setOpenModal(false)
    setIsLoading(true)

    axios({
      method: 'DELETE',
      url: API_ENDPOINTS.delete_account,
      data: formData,
      headers: getAuthHeaders(),
    })
      .then((res: AxiosResponse) => {
        clearAuthStorage()
        setCurrentUser({
          id: 0,
          email: '',
          isSignedIn: false,
          isFetched: true,
          isDeleted: true,
        })
        openSnackbar(res.data.message, 'success')
        navigate('/signin')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const errorMessage =
          e.response?.data?.error || 'アカウントの削除に失敗しました'
        openSnackbar(errorMessage, 'error')
      })
      .finally(() => {
        setIsLoading(false)
        setOpenModal(false)
      })
  }

  const handleDeleteCancel = () => {
    setOpenModal(false)
  }

  const handleDeleteClick = (data: DeleteAccountFormData) => {
    setFormData(data)
    setOpenModal(true)
  }

  const onSubmit: SubmitHandler<DeleteAccountFormData> = (data) => {
    handleDeleteClick(data)
  }

  return (
    <>
      {!isLoading ? (
        <>
          <Container maxWidth="sm">
            <Box marginTop={6}>
              <FormHeading
                title="アカウント削除"
                description="アカウント削除にはパスワードの再入力が必要です。"
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  name="password"
                  label="パスワード"
                  control={control}
                  type="password"
                  rules={deleteAccountValidation.password}
                  error={!!errors.password}
                />
                {errors.password && (
                  <ErrorMessage error={errors.password?.message} />
                )}
                <Box mt={3}>
                  <SubmitButton
                    text="削除"
                    isLoading={isLoading}
                    disabled={!isValid}
                  />
                </Box>
              </form>
            </Box>
          </Container>

          <Dialog
            open={openModal}
            onClose={handleDeleteCancel}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>アカウント削除確認</DialogTitle>
            <DialogContent>
              <Typography>本当にアカウントを削除しますか？</Typography>
              <Typography
                sx={{
                  mt: 1,
                  color: (theme) => theme.palette.error.dark, // エラーカラーパレットのダークカラーを使用
                }}
              >
                ※アカウントを削除すると、すべてのデータが失われ、元に戻すことはできません。
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeleteCancel}
                sx={{
                  backgroundColor: '#F9F9F9',
                  border: '1px solid #ccc',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                キャンセル
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                sx={{
                  backgroundColor: '#000',
                  color: '#F9F9F9',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                削除
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Loading message="アカウントを削除しています..." />
      )}
    </>
  )
}

export default DeleteAccountForm
