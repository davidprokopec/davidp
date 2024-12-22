import { pgSchema, text, varchar } from 'drizzle-orm/pg-core'
import { cuid2 } from '@repo/drizzle-cuid'

export const blogSchema = pgSchema('blog')

export const post = blogSchema.table('post', {
  id: cuid2('id').primaryKey().defaultRandom(),
  title: varchar({ length: 50 }).notNull(),
  content: text().notNull(),
})
