import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { authClient } from '../lib/auth-client'
import { Header } from '@/components/header/header'
import { ThemeProvider } from '@/components/theme-provider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { data: session, isPending, error } = authClient.useSession()
  console.log('session', session)

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
