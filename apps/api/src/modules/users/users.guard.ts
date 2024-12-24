import { Context } from 'elysia'
import { forbidden, unauthorized } from '../../utils/errors'
import { auth } from '../auth/auth'

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
  if (session.user.role !== 'admin') {
    return forbidden()
  }
}

export const authGuard = async (c: Context) => {
  const session = await auth.api.getSession({ headers: c.request.headers })

  if (!session) {
    return unauthorized()
  }
}
