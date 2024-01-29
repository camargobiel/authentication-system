import { AccountsController } from '@/controllers/accounts.controller'
import { Router } from 'express'

const accountsRouter = Router()

const accountsController = new AccountsController()

accountsRouter.post(
  '/accounts',
  (request, response) => (
    accountsController.createAccount(request, response)
  )
)

export default accountsRouter
