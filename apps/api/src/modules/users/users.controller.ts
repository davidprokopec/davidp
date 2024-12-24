import Elysia, { t } from 'elysia'
import { UserService } from './users.service'
import { forbidden } from '../../utils/errors'
import { adminGuard, authGuard } from './users.guard'
import { userMiddleware } from './users.middleware'

const usersController = new Elysia({ prefix: '/users' })
  .derive(({ request }) => userMiddleware(request))
  .get(
    '/:id',
    async ({ params }) => {
      const userId = params.id
      const userToGet = await UserService.find(userId)
      if (!userToGet) {
        return forbidden()
      }
      return userToGet
    },
    { params: t.Object({ id: t.String() }) },
  )
  .get('/', async ({ user }) => {
    if (!user) {
      return forbidden()
    }
    const users = await UserService.listUsers()
    return users
  })

export default usersController
