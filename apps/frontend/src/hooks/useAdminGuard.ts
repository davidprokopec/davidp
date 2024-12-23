import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export function useAdminGuard() {
  const { data: session, isPending } = authClient.useSession()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isPending && session && session.user.role !== 'admin') {
      navigate({ to: '/', replace: true })
    }
  }, [session, navigate, isPending])

  return { session, isPending }
}
