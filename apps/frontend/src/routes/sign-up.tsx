import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/sign-up')({
  component: SignUpComponent,
  loader: () => {
    document.title = 'Sign Up'
  },
})

function SignUpComponent() {
  return (
    <div className="p-2">
      <h3>Sign Up</h3>
      <div>
        <button>Sign In</button>
      </div>
    </div>
  )
}
