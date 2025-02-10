import axios, { AxiosError, AxiosResponse } from 'axios'
import { ReactNode, useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../config/api'
import { AuthContext } from '../context/AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

type CurrentUser = {
  id: number
  email: string
  isSignedIn: boolean
  isFetched: boolean
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: 0,
    email: '',
    isSignedIn: false,
    isFetched: false,
  })

  useEffect(() => {
    if (currentUser.isFetched) {
      return
    }

    if (localStorage.getItem('access-token')) {
      const url = API_ENDPOINTS.current_user
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((res: AxiosResponse) => {
          setCurrentUser({
            ...currentUser,
            ...res.data,
            isSignedIn: true,
            isFetched: true,
          })
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
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

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
