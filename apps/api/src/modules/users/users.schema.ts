import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { t, type Static } from 'elysia'
import { schema } from '../../db'

export const userInsert = createInsertSchema(schema.user)
export const userSelect = createSelectSchema(schema.user)

export const userUpdate = t.Omit(userInsert, ['id', 'created_at', 'updated_at'])

export type UserInsert = Static<typeof userInsert>
export type User = Static<typeof userSelect>
