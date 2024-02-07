import { NoAuthTokenProvidedError } from '@/domain'
import { type NextFunction, type Request, type Response } from 'express'
import { decode } from 'jsonwebtoken'

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const bearerToken = request.headers.authorization
  if (bearerToken === undefined) {
    throw new NoAuthTokenProvidedError()
  }
  const [, token] = bearerToken.split(' ')
  const account = decode(token)
  request.account = account as Request['account']
  next()
}
