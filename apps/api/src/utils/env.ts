import { getEnv } from '@repo/shared'
import { z } from 'zod'

const schema = z.object({
  MIGRATE_DB: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  FRONTEND_URL: z.string(),
  BETTER_AUTH_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  SEZNAM_CLIENT_ID: z.string(),
  SEZNAM_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
})
const env = getEnv(schema)

export default env
