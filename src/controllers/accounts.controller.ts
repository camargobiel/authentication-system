import { type Request, type Response } from 'express'
import { type CreateAccountControllerParamsDTO } from './dtos'
import { type AccountsRepository } from '@/infra'

export class AccountsController {
  constructor (
    private readonly accountsRepository: AccountsRepository
  ) {}

  async createAccount (request: Request, response: Response): Promise<void> {
    const params: CreateAccountControllerParamsDTO = request.body
    const result = await this.accountsRepository.createAccount(params)
    response.status(201).json(result)
  }
}
