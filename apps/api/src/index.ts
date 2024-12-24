import { Elysia, t, ValidationError } from 'elysia'
import env from './utils/env'
import { migrateDb, schema } from './db'
import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { unprocessable } from './utils/errors'
import betterAuthView from './modules/auth/auth.view'
import { logger } from '@tqman/nice-logger'
import usersController from './modules/users/users.controller'
import { bannedGuard } from './modules/users/users.guard'

if (env.MIGRATE_DB) {
  await migrateDb()
}

const app = new Elysia()
  .use(cors())
  .use(swagger())
  // .guard({ beforeHandle: bannedGuard })
  .get(
    '/test/:id',
    ({ params }) => {
      return params
    },
    { params: t.Object({ id: t.Number() }) },
  )
  .all('/api/auth/*', betterAuthView)
  .use(usersController)
  .listen(env.PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app
