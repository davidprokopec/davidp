import * as blogSchema from './blog-schema'
import * as schema from './schema'
export { blogSchema, schema }

import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import env from '../utils/env'
import drizzleConfig from '../../drizzle.config'

export function getDb() {
  const db = drizzle(env.DATABASE_URL)
  return db
}

export async function migrateDb() {
  const db = getDb()
  console.log('Migrating database...')
  await migrate(db, { migrationsFolder: drizzleConfig.out as string })
}
