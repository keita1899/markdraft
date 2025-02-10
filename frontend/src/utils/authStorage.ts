export const saveAuthStorage = (
  accessToken: string,
  client: string,
  uid: string,
) => {
  localStorage.setItem('access-token', accessToken)
  localStorage.setItem('client', client)
  localStorage.setItem('uid', uid)
}

export const clearAuthStorage = () => {
  localStorage.removeItem('access-token')
  localStorage.removeItem('client')
  localStorage.removeItem('uid')
}
