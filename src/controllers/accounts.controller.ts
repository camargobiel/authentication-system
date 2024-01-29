import { type Request, type Response } from 'express'
import { type CreateAccountControllerParamsDTO } from './dtos'

export class AccountsController {
  createAccount (request: Request, response: Response): Response {
    const params: CreateAccountControllerParamsDTO = request.body
    console.log('params', params)

    return response.status(201).json({ message: 'Account created' })
  }
}
