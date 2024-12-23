export const QueryKeys = {
  session: ['session'] as const,
  users: ['users'] as const,
} as const

export const MutationKeys = {
  auth: {
    signIn: ['auth', 'signIn'] as const,
    signUp: ['auth', 'signUp'] as const,
    signOut: ['auth', 'signOut'] as const,
    socialSignIn: ['auth', 'socialSignIn'] as const,
  },
} as const
