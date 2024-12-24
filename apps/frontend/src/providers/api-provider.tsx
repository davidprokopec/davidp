import { api } from '@repo/api-client'
import { createContext, useContext, type ReactNode } from 'react'

type ApiContextType = typeof api

const ApiContext = createContext<ApiContextType | null>(null)

export function ApiProvider({ children }: { children: ReactNode }) {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export function useApi() {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
