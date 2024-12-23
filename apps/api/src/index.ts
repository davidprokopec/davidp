import { Elysia } from 'elysia'
import env from './utils/env'
import { migrateDb, schema } from './db'
import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import betterAuthView from './libs/auth/auth-view'
import { auth } from './libs/auth/auth'

if (env.MIGRATE_DB) {
  await migrateDb()
}

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .all('/api/auth/*', betterAuthView)
  .listen(env.PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
