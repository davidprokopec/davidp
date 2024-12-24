import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useSession } from './useSession'
import { Roles } from '@repo/shared'

export function useAdminGuard() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (
      !isPending &&
      session &&
      session.user.role &&
      !Roles.adminRoles.includes(session.user.role)
    ) {
      navigate({ to: '/', replace: true })
    }
    if (!session) {
      navigate({ to: '/auth/$mode', params: { mode: 'login' }, replace: true })
    }
  }, [session, navigate, isPending])

  return { session, isPending }
}
