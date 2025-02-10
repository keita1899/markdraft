import { createContext, Dispatch, SetStateAction } from 'react'

type AuthContextType = {
  currentUser: CurrentUser
  setCurrentUser: Dispatch<SetStateAction<CurrentUser>>
}

type CurrentUser = {
  id: number
  email: string
  isSignedIn: boolean
  isFetched: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)
