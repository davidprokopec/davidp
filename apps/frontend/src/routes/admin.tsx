import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAdminGuard } from '@/hooks/useAdminGuard'
import { useUsers } from '@/hooks/useUsers'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending: isGuardPending } = useAdminGuard()
  const { data: users, isPending: isUsersPending, error } = useUsers()

  if (isGuardPending || isUsersPending) return <div></div>
  if (!users.data || error) return <div></div>

  return (
    <div>
      {users.data.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
