import { statusCodeConstants } from '@/domain'
import { type AuthenticationService } from '@/services'
import { AppError } from '@/utils'
import { type Request, type Response } from 'express'
import { type AuthenticateParamsDTO } from './dtos'

export class AuthenticationController {
  constructor (
    private readonly authenticationService: AuthenticationService
  ) {}

  async authenticate (request: Request, response: Response): Promise<void> {
    const { email, password }: AuthenticateParamsDTO = request.body
    try {
      const { token, account } = await this.authenticationService.authenticate({
        email,
        password
      })
      response.status(statusCodeConstants.OK).json({ token, account })
    } catch (error) {
      if (!(error instanceof AppError)) throw error
      const { code, statusCode } = error
      response.status(statusCode).json({ code })
    }
  }
}
