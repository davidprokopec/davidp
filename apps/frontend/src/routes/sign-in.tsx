import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/sign-in')({
  component: SignInComponent,
  loader: () => {
    document.title = 'Sign In'
  },
})

function SignInComponent() {
  const signIn = () => {
    authClient.signIn.social({ provider: 'github' })
  }
  return (
    <div className="p-2">
      <h3>Sign In</h3>
      <section>
        <button onClick={() => signIn()}>Sign In</button>
      </section>
    </div>
  )
}
