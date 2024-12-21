import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@repo/ui/button'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: () => {
    document.title = 'home'
  },
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
