import { makeAuthenticationController } from '@/infra/factories'
import { Router } from 'express'
import passport from 'passport'

const authenticationRoutes = Router()

const authenticationController = makeAuthenticationController()

authenticationRoutes.post(
  '/authenticate',
  authenticationController.authenticate.bind(authenticationController)
)

authenticationRoutes.get(
  '/authenticate/google',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

authenticationRoutes.post(
  '/authenticate/google',
  authenticationController.googleAuthentication.bind(authenticationController)
)

authenticationRoutes.post(
  '/reauthenticate',
  authenticationController.reauthenticate.bind(authenticationController)
)

export default authenticationRoutes
