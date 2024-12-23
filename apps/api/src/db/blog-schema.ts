import { json, pgSchema, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { Roles } from '@repo/shared'
import { enumToPgEnum, schema } from './index'
import { cuid2 } from '@repo/drizzle-cuid'

const id = cuid2('id')
export const blogSchema = pgSchema('blog')

export const role = blogSchema.enum('role', enumToPgEnum(Roles))

const createdAt = timestamp().notNull().defaultNow()
const updatedAt = timestamp().notNull().defaultNow()

export const blogUserRole = blogSchema.table('blog_user_access', {
  id: id.primaryKey().defaultRandom(),
  blogId: text()
    .notNull()
    .references(() => blog.id),
  userId: text()
    .notNull()
    .references(() => schema.user.id),
  role: text().notNull(),
  createdAt,
  updatedAt,
})

export const blog = blogSchema.table('blog', {
  id: id.primaryKey().defaultRandom(),
  title: varchar({ length: 50 }).notNull(),
  authorId: text()
    .notNull()
    .references(() => schema.user.id),
  metadata: json(),
  createdAt,
  updatedAt,
})

export const post = blogSchema.table('post', {
  id: id.primaryKey().defaultRandom(),
  blogId: text()
    .notNull()
    .references(() => blog.id),
  title: varchar({ length: 50 }).notNull(),
  content: text().notNull(),
  metadata: json(),
  createdAt,
  updatedAt,
})
