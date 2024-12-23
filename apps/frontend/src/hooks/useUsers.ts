import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { QueryKeys } from '@/lib/query-keys'

export function useUsers() {
  return useQuery({
    queryKey: QueryKeys.users,
    queryFn: () => authClient.admin.listUsers({ query: {} }),
  })
}
