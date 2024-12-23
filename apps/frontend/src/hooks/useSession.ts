import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { QueryKeys } from '@/lib/query-keys'

export function useSession() {
  return useQuery({
    queryKey: QueryKeys.session,
    queryFn: async () => {
      const response = await authClient.getSession()
      return response.data ?? null
    },
  })
}
