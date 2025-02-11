import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { clearAuthStorage } from '../utils/authStorage'

const Signout = () => {
  const navigate = useNavigate()
  const { setCurrentUser } = useAuth()
  useEffect(() => {
    clearAuthStorage()
    setCurrentUser({
      id: 0,
      email: '',
      isSignedIn: false,
      isFetched: true,
    })
    navigate('/signin')
  }, [navigate, setCurrentUser])

  return <></>
}
export default Signout
