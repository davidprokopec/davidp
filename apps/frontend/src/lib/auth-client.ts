import { createAuthClient } from 'better-auth/react'
import env from '../utils/env'
import { organizationClient, adminClient, genericOAuthClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: env.VITE_API_URL,
  plugins: [organizationClient(), adminClient(), genericOAuthClient()],
})
