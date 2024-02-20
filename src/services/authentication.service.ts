import { type AccountsRepository } from '@/infra'
import { type ReauthenticateParamsDTO, type ReauthenticateResponseDTO, type AuthenticateParamsDTO, type AuthenticateResponseDTO, type VerifyRefreshTokenResultDTO } from './dtos'
import { AccountNotFoundError, TokenExpiredError, WrongPasswordError } from '@/domain'
import { compareSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { env } from '@/env'

export class AuthenticationService {
  constructor (
    private readonly accountsRepository: AccountsRepository
  ) {}

  async authenticate ({ email, password }: AuthenticateParamsDTO): Promise<AuthenticateResponseDTO> {
    const account = await this.accountsRepository.findAccountByUniques({ email })
    if (account === null) throw new AccountNotFoundError()
    const passwordMatch = compareSync(password, account.password)
    if (!passwordMatch) throw new WrongPasswordError()
    Reflect.deleteProperty(account, 'password')
    const token = sign({ accountId: account.id }, env.JWT_SECRET, {
      expiresIn: '1d'
    })
    const refreshToken = sign({ accountId: account.id }, env.JWT_SECRET, {
      expiresIn: '7d'
    })
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
      const token = sign({ accountId: account.id }, env.JWT_SECRET, {
        expiresIn: '1d'
      })
      const newRefreshToken = sign({ accountId: account.id }, env.JWT_SECRET, {
        expiresIn: '7d'
      })
      return {
        account,
        token,
        newRefreshToken
      }
    } catch (err) {
      throw new TokenExpiredError()
    }
  }
}
