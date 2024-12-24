import { eq } from 'drizzle-orm'
import db from '../../db/connection'
import type { UserInsert } from './users.schema'
import { schema } from '../../db'
import { unprocessable } from '../../utils/errors'
import { auth } from '../auth/auth'

export abstract class UserService {
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

  static listUsers() {
    return db.select().from(schema.user)
  }
}
