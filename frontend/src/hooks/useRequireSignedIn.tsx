import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSnackbar } from '../context/SnackbarContext'
import { useCurrentUserState } from './useCurrentUser'

export const useRequireSignedIn = () => {
  const navigate = useNavigate()
  const [currentUser] = useCurrentUserState()
  const { openSnackbar } = useSnackbar()

  useEffect(() => {
    if (
      currentUser.isFetched &&
      !currentUser.isSignedIn &&
      !currentUser.isDeleted
    ) {
      openSnackbar('ログインが必要です', 'error')
      navigate('/signin')
    }
  }, [currentUser, navigate, openSnackbar])
}
