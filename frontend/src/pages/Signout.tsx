import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUserState } from '../hooks/useCurrentUser'
import { clearAuthStorage } from '../utils/authStorage'

const Signout = () => {
  const navigate = useNavigate()
  const [, setCurrentUser] = useCurrentUserState()
  useEffect(() => {
    clearAuthStorage()
    setCurrentUser({
      id: 0,
      email: '',
      isSignedIn: false,
      isFetched: true,
      isDeleted: false,
    })
    navigate('/signin')
  }, [navigate, setCurrentUser])

  return <></>
}
export default Signout
