import { eq, desc, max } from 'drizzle-orm'
import db from '../../db/connection'
import type { UserInsert } from './users.schema'
import { schema } from '../../db'
import { unprocessable } from '../../utils/errors'
import { auth } from '../auth/auth'
import { Users } from '@repo/shared'

export abstract class BlogService {
  static authApi = auth.api

  static find(id: string) {
    return db.select().from(schema.user).where(eq(schema.user.id, id))
  }

  static update(id: string, data: Partial<UserInsert>) {
    auth.api.updateUser({ body: data })
    try {
      return db.update(schema.user).set(data).where(eq(schema.user.id, id)).returning()
    } catch (e) {
      throw unprocessable(e)
    }
  }

  static findByName(name: string) {
    return db.select().from(schema.user).where(eq(schema.user.name, name))
  }

  static async listUsers(): Promise<Users.ListResponse> {
    const users = await db
      .select({
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        emailVerified: schema.user.emailVerified,
        image: schema.user.image,
        createdAt: schema.user.createdAt,
        updatedAt: schema.user.updatedAt,
        role: schema.user.role,
        banned: schema.user.banned,
        banReason: schema.user.banReason,
        banExpires: schema.user.banExpires,
        lastActive: max(schema.session.updatedAt),
      })
      .from(schema.user)
      .leftJoin(schema.session, eq(schema.user.id, schema.session.userId))
      .groupBy(schema.user.id)
      .orderBy(desc(max(schema.session.updatedAt)))

    return { users }
  }

  static async listSessions(userId: string) {
    return this.authApi.listUserSessions({ body: { userId } })
  }

  static async revokeSession(sessionId: string) {
    return this.authApi.revokeUserSession({ body: { sessionToken: sessionId } })
  }

  static async updateBanStatus(id: string, reason: string, expiresAt?: string | null) {
    try {
      const updateData: Partial<UserInsert> = {
        banned: expiresAt !== null,
        banReason: expiresAt === null ? null : reason,
        banExpires: expiresAt ? new Date(expiresAt) : null,
      }

      return db.update(schema.user).set(updateData).where(eq(schema.user.id, id)).returning()
    } catch (e) {
      throw unprocessable(e)
    }
  }
}
