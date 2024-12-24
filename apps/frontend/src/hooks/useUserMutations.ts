import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/providers/api-provider'
import { QueryKeys } from '@/lib/query-keys'
import { authClient } from '@/lib/auth-client'

interface User {
  id: string
  name: string | null
  email: string
  role: string | null
  banned: boolean | null
  banReason: string | null
  banExpires: Date | null
}

interface UpdateUserData {
  name?: string
  email?: string
  role?: string
}

interface BanUserData {
  reason: string
  expiresAt?: string | null
}

interface Session {
  id: string
  device: string
  lastActive: string
  ipAddress: string | null
}

export function useUserMutations(userId?: string) {
  const api = useApi()
  const queryClient = useQueryClient()

  const updateUser = useMutation({
    mutationFn: async ({ id, ...data }: UpdateUserData & { id: string }) => {
      const response = await api.users({ id }).patch(data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.users })
    },
  })

  const banUser = useMutation({
    mutationFn: async ({ id, ...data }: BanUserData & { id: string }) => {
      console.log(api)
      const response = await api.users({ id }).ban.patch({ ...data })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.users })
    },
  })

  const { data: sessions, isLoading: isLoadingSessions } = useQuery({
    queryKey: [QueryKeys.users, userId, 'sessions'],
    queryFn: async () => {
      if (!userId) return []
      const response = await authClient.admin.listUserSessions({ userId })
      return response.data
    },
    enabled: !!userId,
  })

  const revokeSession = useMutation({
    mutationFn: async ({ userId, sessionId }: { userId: string; sessionId: string }) => {
      const response = await api
        .users({ id: userId })
        .sessions({ sessionId })
        .delete({
          params: { id: userId, sessionId },
        })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.users, userId, 'sessions'] })
    },
  })

  return {
    updateUser,
    banUser,
    sessions,
    isLoadingSessions,
    revokeSession,
  }
}
