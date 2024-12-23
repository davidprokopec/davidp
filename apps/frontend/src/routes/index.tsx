import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: () => {
    document.title = 'home'
  },
})

function HomeComponent() {
  return <div className="max-w-2xl mx-auto mt-5">grc w</div>
}
