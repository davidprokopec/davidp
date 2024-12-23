import { Elysia, t } from 'elysia'
import db, { blogSchema, schema } from '../../db'
import { eq } from 'drizzle-orm'
import { userMiddleware } from '../../middlewares/auth-middleware'

export const blog = new Elysia({ prefix: '/api/blog' })
  .get('/', async () => {
    const posts = await db.select().from(blogSchema.blog)
    return posts
  })
  .get(
    '/:id',
    async ({ params: { id } }) => {
      const post = await db.select().from(blogSchema.blog).where(eq(blogSchema.blog.id, id))
      return post
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    '/',
    async ({ body }) => {
      const post = await db.insert(blogSchema.blog).values(body)
      return post
    },
    { body: t.Object({ title: t.String(), content: t.String(), authorId: t.String() }) },
  )
// .put(
//   '/:id',
//   async ({ params: { id }, body }) => {
//     // Update blog post
//     const post = await schema.blog.update({
//       where: { id },
//       data: body,
//     })
//     return post
//   },
//   {
//     params: t.Object({
//       id: t.String(),
//     }),
//     body: t.Object({
//       title: t.String(),
//       content: t.String(),
//     }),
//   },
// )
// .delete(
//   '/:id',
//   async ({ params: { id } }) => {
//     // Delete blog post
//     await schema.blog.delete({
//       where: { id },
//     })
//     return { success: true }
//   },
//   {
//     params: t.Object({
//       id: t.String(),
//     }),
//   },
