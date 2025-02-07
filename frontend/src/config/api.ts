const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export const API_ENDPOINTS = {
  signup: `${BASE_URL}/api/v1/registrations`,
}
