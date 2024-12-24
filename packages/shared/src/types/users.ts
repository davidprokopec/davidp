/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { z } from 'zod'

export namespace Users {
  const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: z.string().nullable(),
    banned: z.boolean().nullable(),
    banReason: z.string().nullable(),
    banExpires: z.date().nullable(),
    lastActive: z.date().nullable(),
  })

  export type User = z.infer<typeof userSchema>

  const usersListSchema = z.object({
    users: z.array(userSchema),
  })

  export type ListResponse = z.infer<typeof usersListSchema>
}
