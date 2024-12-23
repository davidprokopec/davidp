'use client'

import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import { Github } from '@/components/icons/github'
import { z } from 'zod'
import { Facebook } from '@/components/icons/facebook'
import { useSpring, animated } from 'react-spring'
import { Google } from '@/components/icons/google'
import { authClient } from '@/lib/auth-client'
import env from '@/utils/env'
import { searchForWorkspaceRoot } from 'vite'

const authPageSearchSchema = z.object({
  mode: z.enum(['signup', 'login']).optional().default('login'),
})

type AuthPageSearch = z.infer<typeof authPageSearchSchema>

export const Route = createFileRoute('/auth')({
  component: AuthPage,
  validateSearch: (search) => authPageSearchSchema.parse(search),
})

export default function AuthPage() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()
  const isSignUp = searchParams.mode === 'signup'
  const { data: session } = authClient.useSession()

  const slideProps = useSpring({
    transform: isSignUp ? 'translateX(-50%)' : 'translateX(0%)',
    config: { tension: 280, friction: 60 },
  })

  const toggleMode = () => {
    navigate({
      to: `/auth`,
      search: { mode: isSignUp ? 'login' : 'signup' },
      replace: true,
    })
  }

  React.useEffect(() => {
    if (searchParams.mode === 'signup') {
      document.title = 'Sign Up'
    } else {
      document.title = 'Sign In'
    }
  }, [searchParams.mode])

  React.useEffect(() => {
    if (session) {
      navigate({ to: '/', replace: true })
    }
  }, [session, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden">
        <animated.div style={slideProps} className="flex w-[200%]">
          <CardContent className="w-1/2 p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            </CardHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <Input
                  id="email-signin"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <Input id="password-signin" type="password" autoComplete="current-password" />
              </div>
              <Button type="submit" className="w-full">
                Sign in with Email
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => authClient.signIn.social({ provider: 'github' })}
              >
                <Github className="mr-2 h-4 w-4 stroke-white fill-white" />
                Github
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <Mail className="mr-2 h-4 w-4" />
                Seznam.cz
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <Facebook className="mr-2 h-4 w-4 stroke-white fill-white" />
                Facebook
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <Google className="mr-2 h-4 w-4 stroke-white fill-white" />
                Google
              </Button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={toggleMode}
                className="text-sm text-primary hover:underline"
                type="button"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </CardContent>
          <CardContent className="w-1/2 p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            </CardHeader>
            <form className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" autoComplete="given-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" autoComplete="family-name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input
                  id="email-signup"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" autoComplete="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" type="password" autoComplete="new-password" />
              </div>
              <Button type="submit" className="w-full">
                Create account
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
