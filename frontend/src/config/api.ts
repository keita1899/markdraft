const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export const API_ENDPOINTS = {
  signup: `${BASE_URL}/api/v1/auth`,
  signin: `${BASE_URL}/api/v1/auth/sign_in`,
  change_password: `${BASE_URL}/api/v1/auth/password`,
  current_user: `${BASE_URL}/api/v1/current/user`,
  drafts: {
    index: (page?: string) => `${BASE_URL}/api/v1/drafts/?page=${page}`,
    create: `${BASE_URL}/api/v1/drafts`,
    update: (id: string) => `${BASE_URL}/api/v1/drafts/${id}`,
    show: (id: string) => `${BASE_URL}/api/v1/drafts/${id}`,
    destroy: (id: number) => `${BASE_URL}/api/v1/drafts/${id}`,
  },
}
