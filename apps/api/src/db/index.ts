import * as blogSchema from './blog-schema'
import * as schema from './schema'

import { migrate } from 'drizzle-orm/node-postgres/migrator'
import drizzleConfig from '../../drizzle.config'
import db from './connection'

export function enumToPgEnum(myEnum: Record<string, string>): [string, ...string[]] {
  return Object.values(myEnum).map((value) => `${value}`) as [string, ...string[]]
}

export { blogSchema, schema }

export async function migrateDb() {
  console.log('Migrating database...')
  await migrate(db, { migrationsFolder: drizzleConfig.out as string })
}
