import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: RouteComponent,
  loader: () => {
    document.title = 'Blok'
  }
})

function RouteComponent() {
  return <div>Hello "/blog"!</div>
}