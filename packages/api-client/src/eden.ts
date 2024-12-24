import { edenFetch, edenTreaty, treaty } from '@elysiajs/eden'
import type { App } from '@repo/api'

/*
 * elysia.get('/blog') would in eden be api.blog.index.get() but request would be sent for `GET /blog/index` which doesnt exist
 * remove the index from the url before sending the request
 */
export const api = treaty<App>('http://localhost:3000', {
  onRequest(url, options) {
    console.log('requesting', url, options)
  },
  fetcher(url, options = {}) {
    console.log('fetching', url, options)
    const headers = new Headers(options.headers)
    const params = JSON.parse(headers.get('X-params') || '{}')

    console.log('params', params)
    url = url.toString().replace(/\/index$/, '')
    return fetch(url, {
      ...options,
      credentials: 'include', // This ensures cookies are sent with requests
    })
  },
})
