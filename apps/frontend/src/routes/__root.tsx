import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '@/components/header/header'
import { ThemeProvider } from '@/components/theme-provider'
import { useSession } from '@/hooks/useSession'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { data: session, isPending, error } = useSession()

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="davidp-theme">
        <Header />
        <hr />
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </ThemeProvider>
    </>
  )
}
