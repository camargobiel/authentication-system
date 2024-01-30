import { type AccountEntity } from '@/domain'
import { type PrismaClient } from '@prisma/client'
import { type FindAccountByUniquesDTO, type CreateAccountParamsDTO } from './dtos'

export class AccountsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async findAccountByUniques ({
    id,
    email
  }: FindAccountByUniquesDTO): Promise<AccountEntity | null> {
    return await this.prisma.account.findUnique({
      where: {
        id,
        email
      }
    })
  }

  async createAccount (account: CreateAccountParamsDTO): Promise<AccountEntity> {
    return await this.prisma.account.create({
      data: {
        ...account
      }
    })
  }
}
