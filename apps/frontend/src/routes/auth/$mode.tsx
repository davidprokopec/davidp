import * as React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSession } from '@/hooks/useSession'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSpring, animated } from 'react-spring'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github } from '@/components/icons/github'
import { Facebook } from '@/components/icons/facebook'
import { Google } from '@/components/icons/google'
import { Mail } from 'lucide-react'

const authPageSearchSchema = z.object({
  mode: z.enum(['signup', 'login']).optional().default('login'),
})

export const Route = createFileRoute('/auth/$mode')({
  component: RouteComponent,
  loader: ({ params }) => {
    const { mode } = authPageSearchSchema.parse(params)
    return { mode }
  },
})

function RouteComponent() {
  const { mode } = Route.useLoaderData()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = React.useState(mode === 'signup')
  const { data: session, isPending } = useSession()
  const { signIn, signUp, socialSignIn } = useAuth()

  React.useEffect(() => {
    setIsSignUp(mode === 'signup')
  }, [mode])

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const slideProps = useSpring({
    transform: isSignUp ? 'translateX(-50%)' : 'translateX(0%)',
    config: { tension: 280, friction: 60 },
  })

  const toggleMode = () => {
    navigate({
      to: `/auth/$mode`,
      params: { mode: isSignUp ? 'login' : 'signup' },
      replace: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      signUp.mutate(formData)
    } else {
      signIn.mutate({
        email: formData.email,
        password: formData.password,
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  React.useEffect(() => {
    if (isSignUp) {
      document.title = 'Sign Up'
    } else {
      document.title = 'Sign In'
    }
  }, [isSignUp])

  React.useEffect(() => {
    if (session) {
      navigate({ to: '/', replace: true })
    }
  }, [session, navigate])

  if (isPending) return <div></div>

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden">
        <animated.div style={slideProps} className="flex w-[200%]">
          <CardContent className="w-1/2 p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            </CardHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={signUp.isPending}>
                {signUp.isPending ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={toggleMode}
                className="text-sm text-primary hover:underline"
                type="button"
              >
                Already have an account? Sign in
              </button>
            </div>
          </CardContent>
        </animated.div>
      </Card>
    </div>
  )
}
