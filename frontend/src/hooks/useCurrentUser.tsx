import useSWR from 'swr'

export const useCurrentUserState = () => {
  type currentUserStateType = {
    id: number
    email: string
    isSignedIn: boolean
    isFetched: boolean
    isDeleted: boolean
  }

  const fallbackData: currentUserStateType = {
    id: 0,
    email: '',
    isSignedIn: false,
    isFetched: false,
    isDeleted: false,
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [
    currentUserStateType,
    (value: currentUserStateType) => void,
  ]
}
