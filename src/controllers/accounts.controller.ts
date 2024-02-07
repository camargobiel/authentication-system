import { type Request, type Response } from 'express'
import { type CreateAccountControllerParamsDTO } from './dtos'
import { type AccountsService } from '@/services'
import { AppError } from '@/utils'
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
    } catch (err) {
      if (!(err instanceof AppError)) throw err
      const { statusCode, code } = err
      response.status(statusCode).json({ code })
    }
  }
}
