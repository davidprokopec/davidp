import { getEnv } from '@repo/shared'
import { z } from 'zod'

const schema = z.object({ DATABASE_URL: z.string() })
const env = getEnv(schema)

export default env
