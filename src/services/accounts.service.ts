import { type AccountsRepository } from '@/infra'
import { type FindAccountByUniquesDTO, type CreateAccountDTO } from './dtos'
import { type AccountEntity } from '@/domain'
import { AccountAlreadyExistsError } from '@/presentation'
import { hash } from 'bcrypt'

export class AccountsService {
  constructor (
    private readonly accountsRepository: AccountsRepository
  ) {}

  public async findAccountByUniques (params: FindAccountByUniquesDTO): Promise<AccountEntity | null> {
    return await this.accountsRepository.findAccountByUniques(params)
  }

  public async createAccount ({
    email,
    name,
    password
  }: CreateAccountDTO): Promise<AccountEntity> {
    const user = await this.findAccountByUniques({ email })
    if (user !== null) {
      throw new AccountAlreadyExistsError()
    }
    const hashedPassword = await hash(password, 10)
    return await this.accountsRepository.createAccount({
      email,
      name,
      password: hashedPassword
    })
  }
}
