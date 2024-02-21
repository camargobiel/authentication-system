import { env } from '@/env'
import { InvalidTokenError, NoAuthTokenProvidedError } from '@/presentation'
import { type NextFunction, type Request, type Response } from 'express'
import { verify } from 'jsonwebtoken'

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

  try {
    const validatedToken = verify(token, env.JWT_SECRET)
    const validatedRefresh = verify(refreshToken, env.JWT_SECRET)
    const { type: tokenType, accountId } = validatedToken as DecodedToken
    if (tokenType !== 'token') {
      throw new InvalidTokenError()
    }
    const refreshTokenType = (validatedRefresh as DecodedToken).type
    if (refreshTokenType !== 'refresh') {
      throw new InvalidTokenError()
    }
    request.account = { accountId }
    next()
  } catch (error) {
    throw new InvalidTokenError()
  }
}
