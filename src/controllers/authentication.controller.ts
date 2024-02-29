import { type OAuthAccountEntity, statusCodeConstants } from '@/domain'
import { type AuthenticationService } from '@/services'
import { AppError } from '@/utils'
import { type Request, type Response } from 'express'
import { type AuthenticateParamsDTO } from './dtos'
import { TokenExpiredError } from 'jsonwebtoken'

export class AuthenticationController {
  constructor (
    private readonly authenticationService: AuthenticationService
  ) {}

  async authenticate (request: Request, response: Response): Promise<void> {
    const { email, password }: AuthenticateParamsDTO = request.body
    try {
      const { token, refreshToken, account } = await this.authenticationService.authenticate({
        email,
        password
      })
      response.status(statusCodeConstants.OK).json({ token, refreshToken, account })
    } catch (err) {
      if (!(err instanceof AppError)) throw err
      const { code, statusCode } = err
      response.status(statusCode).json({ code })
    }
  }

  async reauthenticate (request: Request, response: Response): Promise<void> {
    const refreshToken = request.headers.refresh as string
    try {
      const { token, newRefreshToken, account } = await this.authenticationService.reauthenticate({
        refreshToken
      })
      response.status(statusCodeConstants.OK).json({ token, newRefreshToken, account })
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        response.status(statusCodeConstants.UNAUTHORIZED).json({ code: 'REFRESH_TOKEN_EXPIRED' })
      }
      if (!(err instanceof AppError)) throw err
      const { code, statusCode } = err
      response.status(statusCode).json({ code })
    }
  }

  async googleAuthentication (request: Request, response: Response): Promise<void> {
    try {
      const googleUser = request.body as OAuthAccountEntity
      const { token, refreshToken, account } = await this.authenticationService.useOAuth({
        oauthAccount: googleUser
      })
      response.status(statusCodeConstants.OK).json({ token, refreshToken, account })
    } catch (err) {
      response.status(statusCodeConstants.INTERNAL_SERVER_ERROR).send(err)
    }
  }

  async githubAuthentication (request: Request, response: Response): Promise<void> {
    try {
      const githubAccount = request.user as OAuthAccountEntity
      const { token, refreshToken, account } = await this.authenticationService.useOAuth({
        oauthAccount: githubAccount
      })
      response.status(statusCodeConstants.OK).json({ token, refreshToken, account })
    } catch (err) {
      response.status(statusCodeConstants.INTERNAL_SERVER_ERROR).send(err)
    }
  }
}
