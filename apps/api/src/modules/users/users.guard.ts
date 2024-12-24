import { Context } from 'elysia'
import { forbidden, unauthorized } from '../../utils/errors'
import { auth } from '../auth/auth'
import { Roles, Users } from '@repo/shared'

export const bannedGuard = async (c: Context) => {
  const session = await auth.api.getSession({ headers: c.request.headers })

  if (!session) {
    return unauthorized()
  }
  if (session.user.banned) {
    return forbidden('banned')
  }
}

export const adminGuard = async (c: Context) => {
  const session = await auth.api.getSession({ headers: c.request.headers })

  if (!session) {
    return unauthorized()
  }

  if (!session.user.role || !Roles.adminRoles.includes(session.user.role)) {
    return forbidden()
  }
}

export const authGuard = async (c: Context) => {
  const session = await auth.api.getSession({ headers: c.request.headers })

  if (!session) {
    return unauthorized()
  }
}
