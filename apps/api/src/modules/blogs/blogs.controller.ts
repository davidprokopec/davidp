import Elysia, { t } from 'elysia'
import { UserService } from './users.service'
import { forbidden } from '../../utils/errors'
import { adminGuard, authGuard } from './users.guard'
import { userMiddleware } from './users.middleware'

const usersController = new Elysia({ prefix: '/users' })
  .derive(({ request }) => userMiddleware(request))
  .get(
    '/:id',
    async ({ params }) => {
      const userId = params.id
      const userToGet = await UserService.find(userId)
      if (!userToGet) {
        return forbidden()
      }
      return userToGet
    },
    { params: t.Object({ id: t.String() }) },
  )
  .get('/', async ({ user }) => {
    if (!user) {
      return forbidden()
    }
    const users = await UserService.listUsers()
    return users
  })
  .get(
    '/:id/sessions',
    async ({ params }) => {
      const userId = params.id
      const sessions = await UserService.listSessions(userId)
      return sessions
    },
    {
      params: t.Object({ id: t.String() }),
      beforeHandle: adminGuard,
    },
  )
  .delete(
    '/:id/sessions/:sessionId',
    async ({ params }) => {
      const { id: userId, sessionId } = params
      await UserService.revokeSession(sessionId)
      return { success: true }
    },
    {
      params: t.Object({ id: t.String(), sessionId: t.String() }),
      beforeHandle: adminGuard,
    },
  )
  .patch(
    '/:id',
    async ({ params, body }) => {
      const userId = params.id
      const updatedUser = await UserService.update(userId, body)
      return updatedUser
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        name: t.Optional(t.String()),
        email: t.Optional(t.String()),
        role: t.Optional(t.String()),
      }),
      beforeHandle: adminGuard,
    },
  )
  .patch(
    '/:id/ban',
    async ({ params, body }) => {
      const userId = params.id
      const updatedUser = await UserService.updateBanStatus(userId, body.reason, body.expiresAt)
      return updatedUser
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        reason: t.String(),
        expiresAt: t.Optional(t.Union([t.String(), t.Null()])), // ISO date string or null for unban
      }),
      beforeHandle: adminGuard,
    },
  )

export default usersController
