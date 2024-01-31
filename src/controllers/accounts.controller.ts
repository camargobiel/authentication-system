import { type Request, type Response } from 'express'
import { type CreateAccountControllerParamsDTO } from './dtos'
import { type AccountsService } from '@/services'
import { type AppError } from '@/utils'
import { statusCodeConstants } from '@/domain'

export class AccountsController {
  constructor (
    private readonly accountsService: AccountsService
  ) {}

  async createAccount (request: Request, response: Response): Promise<void> {
    const params: CreateAccountControllerParamsDTO = request.body
    try {
      const result = await this.accountsService.createAccount(params)
      response.status(statusCodeConstants.CREATED).json(result)
    } catch (error) {
      const { statusCode, code } = error as AppError
      response.status(statusCode).json({ code })
    }
  }
}
