import { Elysia } from 'elysia'
import env from './utils/env'

const app = new Elysia().get('/', () => 'Hello Elysia').listen(env.PORT)
const nejsem = 'jsdka'

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
