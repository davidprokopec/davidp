import { createFileRoute } from '@tanstack/react-router'
import { api, apiFetch } from '@repo/api-client'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'

// const blogQuery = queryOptions({
//   queryKey: ['blogs'],
//   queryFn: () => apiFetch('/api/blog/index', {}),
// })

export const Route = createFileRoute('/blog')({
  component: RouteComponent,
  loader: async () => {
    const blogs = await api.blog.index.get()
    console.log(blogs)
  },
})

function RouteComponent() {
  return <div>Hello "/blog"!</div>
}
