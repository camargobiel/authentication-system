import { AuthenticationController } from '@/controllers'
import { AuthenticationService } from '@/services'
import { AccountsRepository } from '../repositories'
import prisma from '../prisma'

export const makeAuthenticationController = (): AuthenticationController => {
  const authenticationController = new AuthenticationController(
    new AuthenticationService(new AccountsRepository(prisma))
  )
  return authenticationController
}
