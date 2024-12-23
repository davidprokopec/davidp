import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, genericOAuth, organization } from 'better-auth/plugins'
import { getDb, schema } from '../../db'
import env from '../../utils/env'

export const auth = betterAuth({
  plugins: [
    admin(),
    organization(),
    genericOAuth({
      config: [
        {
          providerId: 'seznam',
          clientId: env.SEZNAM_CLIENT_ID,
          clientSecret: env.SEZNAM_CLIENT_SECRET,
          authorizationUrl: 'https://login.szn.cz/api/v1/oauth/auth',
          tokenUrl: 'https://login.szn.cz/api/v1/oauth/token',
          userInfoUrl: 'https://login.szn.cz/api/v1/user',
          redirectURI: 'http://localhost:3000/api/auth/oauth2/callback/seznam',
          scopes: ['identity', 'avatar'],
          mapProfileToUser: (profile) => {
            console.log(profile)
            return profile
          },
        },
      ],
    }),
  ],
  database: drizzleAdapter(getDb(), {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
      organization: schema.organization,
      member: schema.member,
      invitation: schema.invitation,
    },
  }),
  trustedOrigins: [env.FRONTEND_URL],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },

    // facebook: {
    //   clientId: env.FACEBOOK_CLIENT_ID,
    //   clientSecret: env.FACEBOOK_CLIENT_SECRET,
    // },
    // google: {
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // },
  },
})
