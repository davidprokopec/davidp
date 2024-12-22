import { getEnv } from '@repo/shared'
import { z } from 'zod'

const base = z.object({ MODE: z.enum(['development', 'production']), VITE_API_URL: z.string() })
const schema = z.object({ VITE_API_URL: z.string() })
console.log(import.meta.env)
const env = getEnv(schema, { source: import.meta.env, customBase: base })

export default env
