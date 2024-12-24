import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/lib/query-keys'
import { useApi } from '@/providers/api-provider'

export function useUsers() {
  const api = useApi()

  return useQuery({
    queryKey: QueryKeys.users,
    queryFn: () => api.users.index.get(),
  })
}
