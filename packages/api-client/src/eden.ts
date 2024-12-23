import { edenFetch, edenTreaty } from '@elysiajs/eden'
import type { App } from '@repo/api'

/*
 * elysia.get('/blog') would in eden be api.blog.index.get() but request would be sent for `GET /blog/index` which doesnt exist
 * remove the index from the url before sending the request
 */
export const api = edenTreaty<App>('http://localhost:3000', {
  fetcher(url, options) {
    url = url.toString().replace(/\/index$/, '')
    return fetch(url, options)
  },
})
