import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
  loader: () => {
    document.title = 'about'
  },
})

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>About</h3>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
