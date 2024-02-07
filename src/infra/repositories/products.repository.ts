import { type PrismaClient } from '@prisma/client'
import { type CountAllProductsDTO, type FindProductsDTO } from './dtos'
import { type ProductEntity } from '@/domain'

export class ProductsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async findProducts ({
    skip,
    take,
    search
  }: FindProductsDTO): Promise<ProductEntity[]> {
    return this.prisma.product.findMany({
      take,
      skip,
      where: {
        name: {
          contains: search
        }
      }
    })
  }

  async countProducts ({
    search
  }: CountAllProductsDTO): Promise<number> {
    return this.prisma.product.count({
      where: {
        name: {
          contains: search
        }
      }
    })
  }
}
