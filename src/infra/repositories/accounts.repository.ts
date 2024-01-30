import { type AccountEntity } from '@/entities'
import { type PrismaClient } from '@prisma/client'
import { type CreateAccountParamsDTO } from './dtos'

export class AccountsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async createAccount (account: CreateAccountParamsDTO): Promise<AccountEntity> {
    return this.prisma.account.create({
      data: {
        ...account
      }
    })
  }
}
