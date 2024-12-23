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
    <div className="max-w-2xl mx-auto mt-5">
      <h1 className="text-4xl font-bold mb-6">what's up, im David</h1>
      <section className="mb-8">
        <p className="text-lg mb-4">
          Welcome to my personal website. This is where you can share a brief introduction about
          yourself.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="mb-4">
          Here you can write a paragraph about your background, interests, or expertise.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Work</h2>
        <p className="mb-4">
          This section can highlight some of your key projects or achievements.
        </p>
      </section>
    </div>
  )
}
