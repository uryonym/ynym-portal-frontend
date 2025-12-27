export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// ---  Auth URLs from API contract ---
export const GOOGLE_AUTH_LOGIN_URL = `${API_BASE_URL}/api/auth/google/login`
export const GOOGLE_AUTH_CALLBACK_URL = `${API_BASE_URL}/api/auth/google/callback`
export const USERS_ME_URL = `${API_BASE_URL}/api/users/me`
export const LOGOUT_URL = `${API_BASE_URL}/api/auth/logout`

// ---  App constants ---
export const APP_NAME = 'ynym portal'
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
