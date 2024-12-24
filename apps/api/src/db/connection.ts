import { drizzle } from 'drizzle-orm/node-postgres'
import env from '../utils/env'
import { Pool } from 'pg'
import { logger } from '../utils/logger'

export const pool = new Pool({ connectionString: env.DATABASE_URL })
export const db = drizzle(pool, { logger })
export const closeDb = () => pool.end()

export default db
