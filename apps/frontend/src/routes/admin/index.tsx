import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAdminGuard } from '@/hooks/useAdminGuard'
import { useUsers } from '@/hooks/useUsers'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending: isGuardPending } = useAdminGuard()
  const { data: users, isPending: isUsersPending, error } = useUsers()
  console.log('users', users)

  if (isGuardPending || isUsersPending) return <div>Loading...</div>
  if (!users || !users.data) return <div>Error</div>

  return (
    <div>
      {users.data.map((user) => (
        <div key={user.user.id}>{user.user.name}</div>
      ))}
    </div>
  )
}
