import { env } from '@/env'
import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'

passport.use(new GoogleStrategy.Strategy({
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_SECRET_KEY,
  callbackURL: 'http://localhost:5000/v1/authenticate/google/callback',
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  request.body = {
    name: profile._json.name,
    email: profile._json.email,
    googleId: profile._json.sub
  }
  done(null, profile)
}))

export { passport as googlePassportStrategy }
