/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { makeAuthenticationController } from '@/infra/factories'
import { googlePassportStrategy } from '@/infra/strategies'
import { githubPassportStrategy } from '@/infra/strategies/github'
import { Router } from 'express'

const authenticationRoutes = Router()

const authenticationController = makeAuthenticationController()

authenticationRoutes.post(
  '/authenticate',
  authenticationController.authenticate.bind(authenticationController)
)

authenticationRoutes.get(
  '/authenticate/google',
  googlePassportStrategy.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
)

authenticationRoutes.get(
  '/authenticate/google/callback',
  googlePassportStrategy.authenticate('google', { session: false }),
  authenticationController.googleAuthentication.bind(authenticationController)
)

authenticationRoutes.get(
  '/authenticate/github',
  githubPassportStrategy.authenticate('github', { scope: ['profile', 'email'], prompt: 'select_account' })
)

authenticationRoutes.get(
  '/authenticate/github/callback',
  githubPassportStrategy.authenticate('github', { session: false }),
  authenticationController.githubAuthentication.bind(authenticationController)
)

authenticationRoutes.post(
  '/reauthenticate',
  authenticationController.reauthenticate.bind(authenticationController)
)

export default authenticationRoutes
