import { ProductsController } from '@/controllers'
import { ProductsService } from '@/services'
import { ProductsRepository } from '../repositories'
import prisma from '../prisma'

export const makeProductsController = (): ProductsController => {
  const productsController = new ProductsController(
    new ProductsService(new ProductsRepository(prisma))
  )
  return productsController
}
