import { type AccountsRepository } from '@/infra'
import { type ReauthenticateParamsDTO, type ReauthenticateResponseDTO, type AuthenticateParamsDTO, type AuthenticateResponseDTO, type VerifyRefreshTokenResultDTO, type GoogleAuthenticationParams, type GoogleAuthenticationResult } from './dtos'
import { AccountNotFoundError, TokenExpiredError, WrongPasswordError } from '@/presentation'
import { compareSync } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import { env } from '@/env'
import { createRefreshToken, createToken } from '@/utils'

export class AuthenticationService {
  constructor (
    private readonly accountsRepository: AccountsRepository
  ) {}

  async authenticate ({ email, password }: AuthenticateParamsDTO): Promise<AuthenticateResponseDTO> {
    const account = await this.accountsRepository.findAccountByUniques({ email })
    if (account === null) throw new AccountNotFoundError()
    if (account.password === null) throw new AccountNotFoundError()
    const passwordMatch = compareSync(password, account.password)
    if (!passwordMatch) throw new WrongPasswordError()
    Reflect.deleteProperty(account, 'password')
    const token = createToken({ accountId: account.id })
    const refreshToken = createRefreshToken({ accountId: account.id })
    return { token, refreshToken, account }
  }

  async reauthenticate ({
    refreshToken
  }: ReauthenticateParamsDTO): Promise<ReauthenticateResponseDTO> {
    try {
      const valid = verify(refreshToken, env.JWT_SECRET) as VerifyRefreshTokenResultDTO
      const account = await this.accountsRepository.findAccountByUniques({ id: valid.accountId })
      if (account === null) throw new AccountNotFoundError()
      Reflect.deleteProperty(account, 'password')
      const token = createToken({ accountId: account.id })
      const newRefreshToken = createRefreshToken({ accountId: account.id })
      return {
        account,
        token,
        newRefreshToken
      }
    } catch (err) {
      throw new TokenExpiredError()
    }
  }

  async googleAuthentication ({
    googleUser
  }: GoogleAuthenticationParams): Promise<GoogleAuthenticationResult> {
    let account = await this.accountsRepository.findAccountByUniques({
      email: googleUser._json.email
    })
    if (account === null) {
      account = await this.accountsRepository.createAccount({
        email: googleUser._json.email,
        name: googleUser._json.name,
        googleId: googleUser._json.sub,
        password: null
      })
    }
    if (account.googleId === null) {
      account = await this.accountsRepository.transformAccountToGoogleAccount({
        email: account.email,
        googleAccountId: googleUser._json.sub
      })
    }
    const token = createToken({ accountId: account.id })
    const refreshToken = createRefreshToken({ accountId: account.id })
    return {
      token,
      refreshToken,
      account
    }
  }
}
