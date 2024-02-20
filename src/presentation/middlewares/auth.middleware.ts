import { NoAuthTokenProvidedError } from '@/domain'
import { type NextFunction, type Request, type Response } from 'express'
import { decode } from 'jsonwebtoken'

interface DecodedToken {
  accountId: string
  type: 'token' | 'refresh'
}

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const bearerToken = request.headers.authorization
  if (bearerToken === undefined) {
    throw new NoAuthTokenProvidedError()
  }
  const refreshToken = request.headers.refresh as string | undefined
  if (refreshToken === undefined) {
    throw new NoAuthTokenProvidedError()
  }
  const [, token] = bearerToken.split(' ')
  const { accountId, type: tokenType } = decode(token) as DecodedToken
  if (tokenType !== 'token') throw new NoAuthTokenProvidedError()
  const { type: refreshTokenType } = decode(refreshToken) as DecodedToken
  if (refreshTokenType !== 'refresh') throw new NoAuthTokenProvidedError()
  request.account = { accountId }
  next()
}
