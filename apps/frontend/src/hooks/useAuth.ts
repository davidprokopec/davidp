import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'
import { QueryKeys, MutationKeys } from '@/lib/query-keys'

export function useAuth() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // const signInMutation = useMutation({
  //   mutationKey: MutationKeys.auth.signIn,
  //   mutationFn: (credentials: { email: string; password: string }) =>
  //     authClient.signIn.credentials(credentials),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: QueryKeys.session })
  //     navigate({ to: '/', replace: true })
  //   },
  // })
  //
  // const signUpMutation = useMutation({
  //   mutationKey: MutationKeys.auth.signUp,
  //   mutationFn: (data: { email: string; password: string; firstName: string; lastName: string }) =>
  //     authClient.signUp.email({}),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: QueryKeys.session })
  //     navigate({ to: '/', replace: true })
  //   },
  // })

  const socialSignInMutation = useMutation({
    mutationKey: MutationKeys.auth.socialSignIn,
    mutationFn: (data: { provider: 'github' | 'google' | 'facebook' }) =>
      authClient.signIn.social(data),
  })

  const oauthSignInMutation = useMutation({
    mutationKey: MutationKeys.auth.oauth2,
    mutationFn: ({ providerId, callbackURL }: { providerId: string; callbackURL?: string }) =>
      authClient.signIn.oauth2({ providerId, callbackURL }),
  })

  return {
    // signIn: signInMutation,
    // signUp: signUpMutation,
    socialSignIn: socialSignInMutation,
    oauth2SignIn: oauthSignInMutation,
  }
}
