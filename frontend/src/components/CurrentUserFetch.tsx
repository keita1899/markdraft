import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'
import { useCurrentUserState } from '../hooks/useCurrentUser'
import { getAuthHeaders } from '../utils/getRequestHeaders'

const CurrentUserFetch = () => {
  const [currentUser, setCurrentUser] = useCurrentUserState()

  useEffect(() => {
    if (currentUser.isFetched) {
      return
    }

    if (localStorage.getItem('access-token')) {
      const url = API_ENDPOINTS.current_user
      axios
        .get(url, {
          headers: getAuthHeaders(),
        })
        .then((res: AxiosResponse) => {
          setCurrentUser({
            ...currentUser,
            ...res.data,
            isSignedIn: true,
            isFetched: true,
          })
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message)
          setCurrentUser({
            ...currentUser,
            isFetched: true,
          })
        })
    } else {
      setCurrentUser({
        ...currentUser,
        isFetched: true,
      })
    }
  }, [currentUser, setCurrentUser])

  return <></>
}

export default CurrentUserFetch
