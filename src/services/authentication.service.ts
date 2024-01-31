import { type AccountsRepository } from '@/infra'
import { type AuthenticateParamsDTO, type AuthenticateResponseDTO } from './dtos'
import { AccountNotFoundError, WrongPasswordError } from '@/domain'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
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
    const token = sign({ accountId: account.id }, env.JWT_SECRET, {
      expiresIn: '1d'
    })
    Reflect.deleteProperty(account, 'password')
    return { token, account }
  }
}
