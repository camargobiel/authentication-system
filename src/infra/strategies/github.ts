import { Strategy } from 'passport-github2'
import { env } from '@/env'
import passport from 'passport'

passport.use(
  new Strategy({
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_SECRET_KEY,
    callbackURL: 'http://localhost:5000/v1/authenticate/github/callback'
  }, (accessToken: string, refreshToken: string, profile: any, done: any) => {
    done(null, {
      name: profile._json.name,
      email: profile._json.email,
      githubId: profile._json.id.toString()
    })
  })
)

export { passport as githubPassportStrategy }
