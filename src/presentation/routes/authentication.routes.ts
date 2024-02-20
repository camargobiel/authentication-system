import { makeAuthenticationController } from '@/infra/factories'
import { Router } from 'express'

const authenticationRoutes = Router()

const authenticationController = makeAuthenticationController()

authenticationRoutes.post(
  '/authentication',
  authenticationController.authenticate.bind(authenticationController)
)

authenticationRoutes.post(
  '/reauthenticate',
  authenticationController.reauthenticate.bind(authenticationController)
)

export default authenticationRoutes
