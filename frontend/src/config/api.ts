const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export const API_ENDPOINTS = {
  signup: `${BASE_URL}/api/v1/auth`,
  signin: `${BASE_URL}/api/v1/auth/sign_in`,
  current_user: `${BASE_URL}/api/v1/current/user`,
}
