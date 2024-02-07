import { statusCodeConstants } from '@/domain'
import { AppError } from '@/utils'
import { type NextFunction, type Request, type Response } from 'express'
import { decode } from 'jsonwebtoken'

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const bearerToken = request.headers.authorization
  if (bearerToken === undefined) {
    throw new AppError({
      statusCode: statusCodeConstants.UNAUTHORIZED,
      code: 'NO_AUTH_TOKEN_PROVIDED'
    })
  }
  const [, token] = bearerToken.split(' ')
  const account = decode(token)
  request.account = account as Request['account']
  next()
}
