import { makeAccountsController } from '@/infra/factories'
import { Router } from 'express'

const accountsRouter = Router()

const accountsController = makeAccountsController()

accountsRouter.post(
  '/accounts',
  accountsController.createAccount.bind(accountsController)
)

export default accountsRouter
