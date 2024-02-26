/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { makeAuthenticationController } from '@/infra/factories'
import { googlePassportStrategy } from '@/infra/strategies'
import { Router } from 'express'

const authenticationRoutes = Router()

const authenticationController = makeAuthenticationController()

authenticationRoutes.post(
  '/authenticate',
  authenticationController.authenticate.bind(authenticationController)
)

authenticationRoutes.get(
  '/authenticate/google',
  googlePassportStrategy.authenticate('google', { scope: ['profile', 'email'] })
)

authenticationRoutes.get(
  '/authenticate/google/callback',
  googlePassportStrategy.authenticate('google', { session: false }),
  authenticationController.googleAuthentication.bind(authenticationController)
)

authenticationRoutes.post(
  '/reauthenticate',
  authenticationController.reauthenticate.bind(authenticationController)
)

export default authenticationRoutes
