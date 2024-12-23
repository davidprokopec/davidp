import { edenFetch, edenTreaty } from '@elysiajs/eden'
import type { App } from '@repo/api'

export const api = edenTreaty<App>('http://localhost:3000')

export const apiFetch = edenFetch<App>('http://localhost:3000')
