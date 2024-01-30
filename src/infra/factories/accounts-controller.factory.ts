import { AccountsController } from '@/controllers'
import { AccountsRepository } from '@/infra'
import prisma from '../prisma'
import { AccountsService } from '@/services'

export const makeAccountsController = (): AccountsController => {
  const accountsController = new AccountsController(
    new AccountsService(new AccountsRepository(prisma))
  )
  return accountsController
}
