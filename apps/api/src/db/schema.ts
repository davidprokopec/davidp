import { cuid2 } from '@repo/drizzle-cuid'
import { pgTable, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: cuid2('id').primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull(),
  image: text(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
  role: text(),
  banned: boolean(),
  banReason: text(),
  banExpires: timestamp(),
})

export const session = pgTable('session', {
  id: cuid2('id').primaryKey().defaultRandom(),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id),
  impersonatedBy: text(),
  activeOrganizationId: text(),
})

export const account = pgTable('account', {
  id: cuid2('id').primaryKey().defaultRandom(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
})

export const verification = pgTable('verification', {
  id: cuid2('id').primaryKey().defaultRandom(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp(),
  updatedAt: timestamp(),
})

export const organization = pgTable('organization', {
  id: cuid2('id').primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().unique(),
  logo: text(),
  createdAt: timestamp().notNull(),
  metadata: text(),
})

export const member = pgTable('member', {
  id: cuid2('id').primaryKey().defaultRandom(),
  organizationId: text()
    .notNull()
    .references(() => organization.id),
  userId: text()
    .notNull()
    .references(() => user.id),
  role: text().notNull(),
  createdAt: timestamp().notNull(),
})

export const invitation = pgTable('invitation', {
  id: cuid2('id').primaryKey().defaultRandom(),
  organizationId: text()
    .notNull()
    .references(() => organization.id),
  email: text().notNull(),
  role: text(),
  status: text().notNull(),
  expiresAt: timestamp().notNull(),
  inviterId: text()
    .notNull()
    .references(() => user.id),
})