import { AccountsController } from '@/controllers'
import { AccountsRepository } from '@/infra'
import prisma from '../prisma'

export const makeAccountsController = (): AccountsController => {
  const accountsController = new AccountsController(
    new AccountsRepository(prisma)
  )
  return accountsController
}
