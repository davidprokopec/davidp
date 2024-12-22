import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { authClient } from '../lib/auth-client'
import { Header } from '../lib/components/header/header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { data: session, isPending, error } = authClient.useSession()
  console.log('session', session)

  return (
    <>
      <Header />
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
