import { StrategyOptionsWithRequest as GoogleStrategyOptionsWithRequest } from 'passport-google-oauth20'
const API_HOST_URL = process.env.API_HOST_URL as string
const FRONTEND_URL = process.env.FRONTEND_URL as string

export const PORT = process.env.API_HOST_PORT
export const SESSION_SECRET = process.env.SESSION_SECRET as string
export const API_BASE_URL = `${API_HOST_URL}${PORT ? `:${PORT}` : ''}`

export const URLS = {
  GRAPHQL: `${API_BASE_URL}/graphql`,
  CALLBACK_URL: `${API_BASE_URL}/auth/google/callback`,
  LOGOUT_REDIRECT: FRONTEND_URL,
  FAILURE_REDIRECT: FRONTEND_URL,
  SUCCESS_REDIRECT: FRONTEND_URL,
}

export const GOOGLE_OPTIONS: GoogleStrategyOptionsWithRequest = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: URLS.CALLBACK_URL,
  passReqToCallback: true,
}
