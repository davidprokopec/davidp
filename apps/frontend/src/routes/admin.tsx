import * as React from 'react'
import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'
import { useAdminGuard } from '@/hooks/useAdminGuard'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  loader: async () => {
    const allUsers = await authClient.admin.listUsers({ query: {} })
    console.log(allUsers)
    return allUsers
  },
})

function RouteComponent() {
  const { isPending } = useAdminGuard()
  const users = Route.useLoaderData()

  if (isPending) return <div></div>
  if (!users.data || users.error) return <div></div>
  return (
    <div>
      {users.data.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
